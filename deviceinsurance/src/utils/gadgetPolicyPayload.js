import { mapDeviceTypeToBackend } from './deviceMapper';

const trim = (v) => (typeof v === 'string' ? v.trim() : v ?? '');
const digitsOnly = (v) => String(v || '').replace(/\D/g, '');

const COMM_LABELS = {
  all: 'All Channels',
  sms: 'SMS',
  email: 'Email',
  whatsapp: 'WhatsApp',
};

/**
 * Per-device monthly premium: Math.round(deviceValue * (cover_percentage / 100))
 * Matches backendsure GadgetPolicyPurchaseService.line_premium.
 */
export function computeGadgetLinePremium(deviceCost, coverPercentage) {
  const val = typeof deviceCost === 'number' ? deviceCost : parseFloat(String(deviceCost || '').replace(/,/g, ''));
  if (!Number.isFinite(val) || val <= 0) return 0;
  const pct = Number(coverPercentage);
  if (!Number.isFinite(pct)) return 0;
  return Math.round(val * (pct / 100));
}

/**
 * Sum of per-line premiums and sum of device values (cover), using the same rules as the backend.
 */
export function computeGadgetPolicyTotals(devicePayloads, coverPercentage) {
  let totalPremium = 0;
  let totalCover = 0;
  for (const d of devicePayloads) {
    const cost = typeof d.device_cost === 'number' ? d.device_cost : parseFloat(d.device_cost);
    if (!Number.isFinite(cost) || cost <= 0) continue;
    totalCover += cost;
    totalPremium += computeGadgetLinePremium(cost, coverPercentage);
  }
  return { totalPremium, totalCover };
}

function buildOneDevicePayload(formSlice, selectedDeviceId) {
  const deviceValue = parseFloat(String(formSlice.devicePrice || '').replace(/,/g, ''));
  const warrantyYears = trim(formSlice.warrantyPeriod);
  const warrantyEnd = trim(formSlice.warrantyEndDate);
  const imei = trim(formSlice.imeiNumber);
  const serial = trim(formSlice.serialNumber);

  return {
    device_type: mapDeviceTypeToBackend(selectedDeviceId),
    device_category_key: selectedDeviceId || null,
    device_brand: trim(formSlice.deviceBrand),
    device_model: trim(formSlice.deviceModel),
    purchase_date: formSlice.purchaseDate,
    device_cost: deviceValue,
    description: trim(formSlice.deviceDescription),
    imei_number: imei || null,
    serial_number: serial || null,
    warranty_period_years:
      warrantyYears && !Number.isNaN(parseInt(warrantyYears, 10))
        ? parseInt(warrantyYears, 10)
        : null,
    warranty_end_date: warrantyEnd || null,
  };
}

/**
 * True when the current form has all required fields for one insured item (step 3 rules).
 */
export function isCompleteDeviceLine(formData, selectedDevice) {
  if (!selectedDevice) return false;
  if (!trim(formData.deviceModel)) return false;
  if (!trim(formData.deviceBrand)) return false;
  if (!trim(formData.deviceDescription)) return false;
  if (!formData.purchaseDate) return false;
  const price = String(formData.devicePrice || '').replace(/,/g, '');
  if (!price.trim() || !/^\d+(\.\d{1,2})?$/.test(price) || parseFloat(price) <= 0) return false;
  if ((selectedDevice === 'phone' || selectedDevice === 'tablet') && trim(formData.imeiNumber)) {
    if (!/^\d{15}$/.test(trim(formData.imeiNumber))) return false;
  }
  return true;
}

/**
 * True when saved snapshots match purchaseQueue order/length, or one short with a complete draft for the next slot.
 */
export function canProceedDeviceDetailsStep(savedSnapshots, purchaseQueue, formData, selectedDevice) {
  if (!purchaseQueue?.length) return false;
  if (savedSnapshots.length > purchaseQueue.length) return false;
  if (!savedSnapshots.every((s, i) => s.selectedDevice === purchaseQueue[i])) return false;
  if (savedSnapshots.length === purchaseQueue.length) return true;
  const nextId = purchaseQueue[savedSnapshots.length];
  return isCompleteDeviceLine(formData, selectedDevice) && selectedDevice === nextId;
}

/**
 * Builds devices[] for the API from saved snapshots plus an optional current draft.
 * Each snapshot: { selectedDevice, deviceBrand, deviceModel, ... } (same keys as formData device fields).
 */
export function collectGadgetDevicesForPurchase({
  formData,
  selectedDevice,
  savedDeviceSnapshots = [],
  includeCurrentDraft = true,
}) {
  const devices = (savedDeviceSnapshots || []).map((snap) =>
    buildOneDevicePayload(snap, snap.selectedDevice)
  );
  const draftOk = includeCurrentDraft && isCompleteDeviceLine(formData, selectedDevice);
  if (draftOk) {
    devices.push(buildOneDevicePayload(formData, selectedDevice));
  }
  return devices;
}

/**
 * Builds the gadget policy purchase body for POST /sales/gadget-policy-purchase/
 * Premium and cover_amount are totals derived from each device's cost and the plan's cover_percentage
 * (backend recomputes these; we send matching values for clients that display them).
 */
export function buildGadgetPolicyPurchasePayload({
  formData,
  selectedDevice,
  selectedPricingPlan,
  startDate,
  savedDeviceSnapshots = [],
  includeCurrentDraft = true,
}) {
  const devices = collectGadgetDevicesForPurchase({
    formData,
    selectedDevice,
    savedDeviceSnapshots,
    includeCurrentDraft,
  });

  const pct = selectedPricingPlan?.cover_percentage ?? 0;
  const { totalPremium, totalCover } = computeGadgetPolicyTotals(devices, pct);

  const prefCode = formData.preferredCommunicationChannel || 'all';
  const prefLabel = COMM_LABELS[prefCode] || 'All Channels';
  const viaAgent = formData.purchasedViaAgent === 'yes';

  const additional_information = {
    preferred_communication_channel: prefLabel,
    preferred_communication_channel_code: prefCode,
    purchase_via_agent: viaAgent,
    purchased_via_agent: viaAgent,
    agent_id_number: viaAgent ? trim(formData.agentIdNumber) : '',
  };

  const method = formData.paymentMethod || 'mpesa';
  let payment_details;

  if (method === 'mpesa') {
    payment_details = {
      payment_method: 'Mpesa',
      account_name: trim(formData.paymentAccountName) || `${trim(formData.firstName)} ${trim(formData.lastName)}`.trim(),
      phone_number: digitsOnly(formData.mpesaPhoneNumber) || digitsOnly(formData.phone),
      bank_name: '',
      account_number: '',
      branch_code: '',
    };
  } else if (method === 'bank_debit') {
    payment_details = {
      payment_method: 'Bank Debit',
      bank_name: trim(formData.bankName),
      account_name: trim(formData.bankAccountName),
      account_number: trim(formData.bankAccountNumber),
      branch_code: trim(formData.bankBranch),
      phone_number: digitsOnly(formData.phone),
    };
  } else {
    payment_details = {
      payment_method: 'Card',
      account_name: `${trim(formData.firstName)} ${trim(formData.lastName)}`.trim() || trim(formData.email),
      account_number: '',
      phone_number: digitsOnly(formData.phone),
      bank_name: '',
      branch_code: '',
    };
  }

  const beneficiaryEmail = trim(formData.beneficiaryEmail);
  const beneficiary = {
    first_name: trim(formData.beneficiaryFirstName),
    last_name: trim(formData.beneficiaryLastName),
    relationship: trim(formData.beneficiaryRelationship),
    gender: trim(formData.beneficiaryGender),
    phone_number: digitsOnly(formData.beneficiaryPhone),
    email: beneficiaryEmail || null,
  };

  const policy_owner = {
    first_name: trim(formData.firstName),
    last_name: trim(formData.lastName),
    email: trim(formData.email),
    phone_number: digitsOnly(formData.phone),
    id_number: trim(formData.idNumber),
    gender: trim(formData.gender),
  };

  return {
    start_date: startDate,
    premium: totalPremium,
    cover_amount: totalCover,
    pricing: selectedPricingPlan.id,
    cover_type: selectedPricingPlan.cover_type,
    policy_owner,
    devices,
    payment_details,
    additional_information,
    beneficiary,
  };
}
