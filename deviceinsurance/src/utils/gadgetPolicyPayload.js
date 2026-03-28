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
 * Builds the gadget policy purchase body for POST /sales/gadget-policy-purchase/
 * so it matches everything collected in the purchase flow.
 */
export function buildGadgetPolicyPurchasePayload({
  formData,
  selectedDevice,
  selectedPricingPlan,
  startDate,
}) {
  const deviceValue = parseFloat(formData.devicePrice);
  const premium = Math.round(deviceValue * (selectedPricingPlan.cover_percentage / 100));
  const prefCode = formData.preferredCommunicationChannel || 'all';
  const prefLabel = COMM_LABELS[prefCode] || 'All Channels';
  const viaAgent = formData.purchasedViaAgent === 'yes';

  const additional_information = {
    preferred_communication_channel: prefLabel,
    preferred_communication_channel_code: prefCode,
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

  const warrantyYears = trim(formData.warrantyPeriod);
  const warrantyEnd = trim(formData.warrantyEndDate);
  const imei = trim(formData.imeiNumber);
  const serial = trim(formData.serialNumber);

  const device = {
    device_type: mapDeviceTypeToBackend(selectedDevice),
    device_category_key: selectedDevice || null,
    device_brand: trim(formData.deviceBrand),
    device_model: trim(formData.deviceModel),
    purchase_date: formData.purchaseDate,
    device_cost: deviceValue,
    description: trim(formData.deviceDescription),
    imei_number: imei || null,
    serial_number: serial || null,
    warranty_period_years: warrantyYears && !Number.isNaN(parseInt(warrantyYears, 10))
      ? parseInt(warrantyYears, 10)
      : null,
    warranty_end_date: warrantyEnd || null,
  };

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
    premium,
    pricing: selectedPricingPlan.id,
    cover_amount: deviceValue,
    cover_type: selectedPricingPlan.cover_type,
    policy_owner,
    devices: [device],
    payment_details,
    additional_information,
    beneficiary,
  };
}
