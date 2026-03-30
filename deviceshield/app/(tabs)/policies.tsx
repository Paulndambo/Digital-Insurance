import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { Policy, PolicyPlan } from '@/types';
import { Shield, AlertTriangle, Lock, Droplet, Smartphone, CheckCircle, X, ChevronDown, Check, Calendar, User, Mail, Phone, CreditCard, Users, Trash2 } from 'lucide-react-native';

type DeviceType = 'phone' | 'laptop' | 'smartwatch' | 'tablet';

interface DeviceFormData {
  deviceType: DeviceType;
  brand: string;
  model: string;
  purchaseDate: string;
  deviceCost: string;
  imeiNumber: string;
  serialNumber: string;
  warrantyPeriod: string;
  warrantyEndDate: string;
  description: string;
}

type SavedDeviceLine = DeviceFormData & { id: string };

/** Same rule as backendsure GadgetPolicyPurchaseService.line_premium / web gadgetPolicyPayload. */
function linePremiumFromValue(deviceCost: number, coverPercentage: number): number {
  if (!Number.isFinite(deviceCost) || deviceCost <= 0) return 0;
  const pct = Number(coverPercentage);
  if (!Number.isFinite(pct)) return 0;
  return Math.round(deviceCost * (pct / 100));
}

function emptyDeviceForm(): DeviceFormData {
  return {
    deviceType: 'phone',
    brand: '',
    model: '',
    purchaseDate: '',
    deviceCost: '',
    imeiNumber: '',
    serialNumber: '',
    warrantyPeriod: '',
    warrantyEndDate: '',
    description: '',
  };
}

interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string;
  gender: 'male' | 'female' | 'other' | '';
}

const deviceTypeOptions: { value: DeviceType; label: string; icon: any }[] = [
  { value: 'phone', label: 'Phone', icon: Smartphone },
  { value: 'laptop', label: 'Laptop', icon: Smartphone },
  { value: 'smartwatch', label: 'Smartwatch', icon: Smartphone },
  { value: 'tablet', label: 'Tablet', icon: Smartphone },
];

const policyPlans: PolicyPlan[] = [
  {
    id: '1',
    name: 'Basic Protection',
    type: 'basic',
    coverPercentage: 5,
    monthlyPremium: 9.99,
    annualPremium: 99.99,
    coverage: {
      accidentalDamage: true,
      theft: false,
      liquidDamage: false,
      screenProtection: true,
    },
    claimLimit: 1,
    deductible: 149,
    features: [
      'Accidental damage coverage',
      'Screen protection',
      '1 claim per year',
      '$149 deductible',
      '24/7 customer support',
    ],
  },
  {
    id: '2',
    name: 'Standard Protection',
    type: 'standard',
    coverPercentage: 6,
    monthlyPremium: 19.99,
    annualPremium: 199.99,
    coverage: {
      accidentalDamage: true,
      theft: true,
      liquidDamage: false,
      screenProtection: true,
    },
    claimLimit: 2,
    deductible: 99,
    features: [
      'Accidental damage coverage',
      'Theft protection',
      'Screen protection',
      '2 claims per year',
      '$99 deductible',
      'Priority support',
      'Loaner device available',
    ],
  },
  {
    id: '3',
    name: 'Premium Protection',
    type: 'premium',
    coverPercentage: 7,
    monthlyPremium: 29.99,
    annualPremium: 299.99,
    coverage: {
      accidentalDamage: true,
      theft: true,
      liquidDamage: true,
      screenProtection: true,
    },
    claimLimit: 3,
    deductible: 49,
    features: [
      'Comprehensive coverage',
      'Accidental damage & theft',
      'Liquid damage protection',
      'Screen protection',
      '3 claims per year',
      '$49 deductible',
      'VIP support',
      'Same-day loaner device',
      'Extended warranty',
    ],
  },
];

export default function PoliciesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { policies, user } = useApp();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PolicyPlan | null>(null);
  const [purchaseStep, setPurchaseStep] = useState<
    'plan' | 'customer' | 'customerInfo' | 'devicePick' | 'device'
  >('plan');
  const [isForCustomer, setIsForCustomer] = useState<boolean | null>(null);
  const [showDeviceTypeDropdown, setShowDeviceTypeDropdown] = useState(false);
  const [deviceFormData, setDeviceFormData] = useState<DeviceFormData>(emptyDeviceForm);
  const [savedDeviceLines, setSavedDeviceLines] = useState<SavedDeviceLine[]>([]);
  const [customerFormData, setCustomerFormData] = useState<CustomerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    gender: '',
  });
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  /** Tap-to-add queue in devicePick (ordered slots). */
  const [deviceInsureQueue, setDeviceInsureQueue] = useState<DeviceType[]>([]);
  /** Copy of queue when leaving devicePick — drives which type is being detailed. */
  const [frozenInsureQueue, setFrozenInsureQueue] = useState<DeviceType[]>([]);
  const insets = useSafeAreaInsets();

  // Check if user is seller or seller_repair
  const isSellerUser = user?.userType === 'seller' || user?.userType === 'seller_repair';

  const handlePurchase = (plan: PolicyPlan) => {
    setSelectedPlan(plan);
    setPurchaseStep('plan');
    setIsForCustomer(null);
    setSavedDeviceLines([]);
    setDeviceInsureQueue([]);
    setFrozenInsureQueue([]);
    setDeviceFormData(emptyDeviceForm());
    setShowPurchaseModal(true);
  };

  const handleContinueFromPlan = () => {
    if (isSellerUser) {
      setPurchaseStep('customer');
    } else {
      setPurchaseStep('devicePick');
    }
  };

  const handleCustomerSelection = (forCustomer: boolean) => {
    setIsForCustomer(forCustomer);
    if (forCustomer) {
      setPurchaseStep('customerInfo');
    } else {
      setPurchaseStep('devicePick');
    }
  };

  const handleContinueFromCustomerInfo = () => {
    if (!validateCustomerForm()) return;
    setPurchaseStep('devicePick');
  };

  const handleContinueFromDevicePick = () => {
    if (deviceInsureQueue.length < 1) {
      Alert.alert('Error', 'Tap at least one device type to add it to your list.');
      return;
    }
    setFrozenInsureQueue([...deviceInsureQueue]);
    setSavedDeviceLines([]);
    setDeviceFormData({ ...emptyDeviceForm(), deviceType: deviceInsureQueue[0] });
    setPurchaseStep('device');
  };

  const enqueueInsureDeviceType = (t: DeviceType) => {
    setDeviceInsureQueue((q) => [...q, t]);
  };

  const removeInsureQueueAt = (index: number) => {
    setDeviceInsureQueue((q) => q.filter((_, i) => i !== index));
  };

  const appendToFrozenInsureQueue = (t: DeviceType) => {
    setFrozenInsureQueue((q) => [...q, t]);
  };

  useEffect(() => {
    if (purchaseStep !== 'device' || frozenInsureQueue.length === 0) return;
    const idx = savedDeviceLines.length;
    if (idx >= frozenInsureQueue.length) return;
    const want = frozenInsureQueue[idx];
    if (deviceFormData.deviceType !== want) {
      setDeviceFormData((prev) => ({ ...prev, deviceType: want }));
    }
  }, [purchaseStep, frozenInsureQueue, savedDeviceLines.length, deviceFormData.deviceType]);

  const handleBackToPlan = () => {
    setPurchaseStep('plan');
    setIsForCustomer(null);
  };

  const handleBackToCustomerSelection = () => {
    setPurchaseStep('customer');
    setIsForCustomer(null);
  };

  const updateDeviceField = (field: keyof DeviceFormData, value: string) => {
    setDeviceFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectDeviceType = (type: DeviceType) => {
    setDeviceFormData(prev => ({ ...prev, deviceType: type }));
    setShowDeviceTypeDropdown(false);
  };

  const validateCustomerForm = () => {
    if (!customerFormData.firstName.trim()) {
      Alert.alert('Error', 'Please enter customer first name');
      return false;
    }
    if (!customerFormData.lastName.trim()) {
      Alert.alert('Error', 'Please enter customer last name');
      return false;
    }
    if (!customerFormData.email.trim()) {
      Alert.alert('Error', 'Please enter customer email');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerFormData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    if (!customerFormData.phone.trim()) {
      Alert.alert('Error', 'Please enter customer phone number');
      return false;
    }
    if (!customerFormData.idNumber.trim()) {
      Alert.alert('Error', 'Please enter ID number or passport number');
      return false;
    }
    if (!customerFormData.gender) {
      Alert.alert('Error', 'Please select gender');
      return false;
    }
    return true;
  };

  const getDeviceFormErrors = (data: DeviceFormData): string | null => {
    if (!data.brand.trim()) return 'Please enter device brand';
    if (!data.model.trim()) return 'Please enter device model';
    if (!data.purchaseDate.trim()) return 'Please enter purchase date';
    if (!data.deviceCost.trim()) return 'Please enter device cost';
    if (!data.serialNumber.trim()) return 'Please enter serial number';
    return null;
  };

  const validateDeviceForm = () => {
    const err = getDeviceFormErrors(deviceFormData);
    if (err) {
      Alert.alert('Error', err);
      return false;
    }
    return true;
  };

  const handleAddDeviceToList = () => {
    if (frozenInsureQueue.length > 0) {
      const slot = frozenInsureQueue[savedDeviceLines.length];
      if (!slot || deviceFormData.deviceType !== slot) {
        Alert.alert('Error', 'Fill in this device before saving — the type is set by your selection order.');
        return;
      }
    }
    if (!validateDeviceForm()) return;
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const nextIdx = savedDeviceLines.length + 1;
    setSavedDeviceLines((prev) => [...prev, { ...deviceFormData, id }]);
    setDeviceFormData(() => {
      const empty = emptyDeviceForm();
      if (frozenInsureQueue.length > nextIdx) {
        return { ...empty, deviceType: frozenInsureQueue[nextIdx] };
      }
      return empty;
    });
  };

  const handleRemoveSavedDevice = (id: string) => {
    setSavedDeviceLines((prev) => {
      const idx = prev.findIndex((line) => line.id === id);
      if (idx < 0) return prev;
      setFrozenInsureQueue((q) => q.filter((_, i) => i !== idx));
      return prev.filter((line) => line.id !== id);
    });
  };

  const updateCustomerField = (field: keyof CustomerFormData, value: string) => {
    setCustomerFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceedDeviceDetails = (): boolean => {
    if (frozenInsureQueue.length === 0) {
      const draftOk = getDeviceFormErrors(deviceFormData) === null;
      return savedDeviceLines.length > 0 || draftOk;
    }
    if (savedDeviceLines.length > frozenInsureQueue.length) return false;
    if (!savedDeviceLines.every((line, i) => line.deviceType === frozenInsureQueue[i])) return false;
    if (savedDeviceLines.length === frozenInsureQueue.length) return true;
    const next = frozenInsureQueue[savedDeviceLines.length];
    return getDeviceFormErrors(deviceFormData) === null && deviceFormData.deviceType === next;
  };

  const handleCompletePurchase = () => {
    if (!canProceedDeviceDetails()) {
      Alert.alert(
        'Error',
        frozenInsureQueue.length > 0
          ? `Complete details for each device you selected (${savedDeviceLines.length} of ${frozenInsureQueue.length} saved). Use "Save device" between items or fill the last form and complete purchase.`
          : 'Add at least one device with all required fields.'
      );
      return;
    }

    const draftOk = getDeviceFormErrors(deviceFormData) === null;
    const itemCount =
      frozenInsureQueue.length > 0
        ? frozenInsureQueue.length
        : savedDeviceLines.length + (draftOk ? 1 : 0);

    const policyFor = isForCustomer ? 'customer' : 'yourself';
    Alert.alert(
      'Success',
      `Policy for ${itemCount} ${itemCount === 1 ? 'item' : 'items'} has been created successfully ${isForCustomer ? 'for the customer' : 'for you'}!`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowPurchaseModal(false);
            setPurchaseStep('plan');
            setIsForCustomer(null);
            setSavedDeviceLines([]);
            setDeviceInsureQueue([]);
            setFrozenInsureQueue([]);
            setDeviceFormData(emptyDeviceForm());
            setCustomerFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              idNumber: '',
              gender: '',
            });
          }
        }
      ]
    );
  };

  const handleCloseModal = () => {
    setShowPurchaseModal(false);
    setPurchaseStep('plan');
    setIsForCustomer(null);
    setSavedDeviceLines([]);
    setDeviceInsureQueue([]);
    setFrozenInsureQueue([]);
    setDeviceFormData(emptyDeviceForm());
    setShowDeviceTypeDropdown(false);
    setShowGenderDropdown(false);
  };

  const draftDeviceValid =
    frozenInsureQueue.length === 0
      ? getDeviceFormErrors(deviceFormData) === null
      : savedDeviceLines.length < frozenInsureQueue.length &&
        getDeviceFormErrors(deviceFormData) === null &&
        deviceFormData.deviceType === frozenInsureQueue[savedDeviceLines.length];

  const hasMoreDetailSlots =
    frozenInsureQueue.length > 0 && savedDeviceLines.length < frozenInsureQueue.length;
  const estimatedItemCount =
    savedDeviceLines.length + (draftDeviceValid ? 1 : 0);

  const estimatedTotalCover = (() => {
    let sum = 0;
    for (const line of savedDeviceLines) {
      const v = parseFloat(line.deviceCost);
      if (Number.isFinite(v)) sum += v;
    }
    if (draftDeviceValid) {
      const v = parseFloat(deviceFormData.deviceCost);
      if (Number.isFinite(v)) sum += v;
    }
    return sum;
  })();

  const estimatedMonthlyTotal =
    selectedPlan && estimatedItemCount > 0
      ? (() => {
          const pct = selectedPlan.coverPercentage;
          let prem = 0;
          for (const line of savedDeviceLines) {
            const c = parseFloat(line.deviceCost);
            prem += linePremiumFromValue(c, pct);
          }
          if (draftDeviceValid) {
            const c = parseFloat(deviceFormData.deviceCost);
            prem += linePremiumFromValue(c, pct);
          }
          return prem;
        })()
      : 0;

  const estimatedAnnualTotal =
    selectedPlan && estimatedMonthlyTotal > 0
      ? estimatedMonthlyTotal * 12
      : 0;

  const getStatusVariant = (status: Policy['status']) => {
    switch (status) {
      case 'active': return 'success';
      case 'expired': return 'danger';
      case 'cancelled': return 'default';
      default: return 'default';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title">My Policies</ThemedText>
          <ThemedText style={{ color: colors.muted }}>
            Manage your device insurance policies
          </ThemedText>
        </View>

        {/* Active Policies */}
        {policies.length > 0 && (
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Active Policies ({policies.filter(p => p.status === 'active').length})
            </ThemedText>
            {policies.map((policy) => (
              <Card key={policy.id} style={styles.policyCard}>
                <View style={styles.policyHeader}>
                  <View style={styles.policyTitleRow}>
                    <Shield 
                      size={24} 
                      color={colors.primary}
                    />
                    <View style={styles.policyInfo}>
                      <ThemedText type="defaultSemiBold">
                        {policy.device.name}
                      </ThemedText>
                      <ThemedText style={{ color: colors.muted, fontSize: 12 }}>
                        {policy.policyNumber}
                      </ThemedText>
                    </View>
                  </View>
                  <Badge 
                    label={policy.status} 
                    variant={getStatusVariant(policy.status)}
                  />
                </View>

                <View style={styles.policyDetails}>
                  <View style={styles.detailRow}>
                    <ThemedText style={{ color: colors.muted }}>Plan Type</ThemedText>
                    <ThemedText type="defaultSemiBold" style={{ textTransform: 'capitalize' }}>
                      {policy.type}
                    </ThemedText>
                  </View>
                  <View style={styles.detailRow}>
                    <ThemedText style={{ color: colors.muted }}>Premium</ThemedText>
                    <ThemedText type="defaultSemiBold">
                      ${policy.premium}/month
                    </ThemedText>
                  </View>
                  <View style={styles.detailRow}>
                    <ThemedText style={{ color: colors.muted }}>Coverage</ThemedText>
                    <ThemedText type="defaultSemiBold">
                      ${policy.device.value.toLocaleString()}
                    </ThemedText>
                  </View>
                  <View style={styles.detailRow}>
                    <ThemedText style={{ color: colors.muted }}>Valid Until</ThemedText>
                    <ThemedText type="defaultSemiBold">
                      {new Date(policy.endDate).toLocaleDateString()}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.coverageIcons}>
                  {policy.coverage.accidentalDamage && (
                    <View style={styles.coverageItem}>
                      <AlertTriangle size={16} color={colors.success} />
                      <ThemedText style={styles.coverageText}>Damage</ThemedText>
                    </View>
                  )}
                  {policy.coverage.theft && (
                    <View style={styles.coverageItem}>
                      <Lock size={16} color={colors.success} />
                      <ThemedText style={styles.coverageText}>Theft</ThemedText>
                    </View>
                  )}
                  {policy.coverage.liquidDamage && (
                    <View style={styles.coverageItem}>
                      <Droplet size={16} color={colors.success} />
                      <ThemedText style={styles.coverageText}>Liquid</ThemedText>
                    </View>
                  )}
                  {policy.coverage.screenProtection && (
                    <View style={styles.coverageItem}>
                      <Smartphone size={16} color={colors.success} />
                      <ThemedText style={styles.coverageText}>Screen</ThemedText>
                    </View>
                  )}
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* Available Plans */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Available Plans
          </ThemedText>
          <ThemedText style={{ color: colors.muted, marginBottom: 16 }}>
            Choose the perfect protection plan for your devices
          </ThemedText>

          {policyPlans.map((plan) => (
            <Card key={plan.id} style={styles.planCard}>
              <View style={styles.planHeader}>
                <View>
                  <ThemedText type="subtitle">{plan.name}</ThemedText>
                  <View style={styles.priceRow}>
                    <ThemedText type="title" style={{ color: colors.primary }}>
                      {plan.coverPercentage}%
                    </ThemedText>
                    <ThemedText style={{ color: colors.muted }}> of value / item / mo</ThemedText>
                  </View>
                  <ThemedText style={{ color: colors.muted, fontSize: 12 }}>
                    Total premium = sum of rounded {plan.coverPercentage}% of each insured item&apos;s value; total cover
                    = sum of item values.
                  </ThemedText>
                </View>
              </View>

              <View style={styles.planFeatures}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <CheckCircle 
                      size={20} 
                      color={colors.success}
                    />
                    <ThemedText style={styles.featureText}>{feature}</ThemedText>
                  </View>
                ))}
              </View>

              <Button
                title="Purchase Plan"
                onPress={() => handlePurchase(plan)}
                variant="primary"
                style={styles.purchaseButton}
              />
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* Purchase Modal */}
      <Modal
        visible={showPurchaseModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <ThemedText type="subtitle">
                {purchaseStep === 'plan' ? 'Purchase Policy' : 
                 purchaseStep === 'customer' ? 'Policy For' :
                 purchaseStep === 'customerInfo' ? 'Customer Information' :
                 purchaseStep === 'devicePick' ? 'Select devices' :
                 'Insured items'}
              </ThemedText>
              <TouchableOpacity onPress={handleCloseModal}>
                <X size={28} color={colors.muted} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {selectedPlan && purchaseStep === 'plan' && (
                <View>
                  {/* Plan Summary */}
                  <Card style={styles.summaryCard}>
                    <ThemedText type="defaultSemiBold" style={styles.summaryTitle}>
                      {selectedPlan.name}
                    </ThemedText>
                    <View style={styles.summaryRow}>
                      <ThemedText style={{ color: colors.muted }}>Premium rate</ThemedText>
                      <ThemedText type="defaultSemiBold">
                        {selectedPlan.coverPercentage}% of each item value / mo
                      </ThemedText>
                    </View>
                    <ThemedText style={{ color: colors.muted, fontSize: 12, marginBottom: 8 }}>
                      Your total monthly premium is the sum of this percentage applied to each insured device. Total
                      cover is the sum of all device values.
                    </ThemedText>
                    <View style={styles.summaryRow}>
                      <ThemedText style={{ color: colors.muted }}>Deductible</ThemedText>
                      <ThemedText type="defaultSemiBold">
                        ${selectedPlan.deductible}
                      </ThemedText>
                    </View>
                    <View style={styles.summaryRow}>
                      <ThemedText style={{ color: colors.muted }}>Claims per year</ThemedText>
                      <ThemedText type="defaultSemiBold">
                        {selectedPlan.claimLimit}
                      </ThemedText>
                    </View>
                  </Card>

                  <Button
                    title="Continue"
                    onPress={handleContinueFromPlan}
                    variant="primary"
                    style={{ marginTop: 16 }}
                  />
                  <Button
                    title="Cancel"
                    onPress={handleCloseModal}
                    variant="outline"
                    style={{ marginTop: 12 }}
                  />
                </View>
              )}

              {/* Customer Selection Step (for sellers only) */}
              {selectedPlan && purchaseStep === 'customer' && (
                <View>
                  <Card style={styles.summaryCard}>
                    <ThemedText type="defaultSemiBold" style={styles.summaryTitle}>
                      Who is this policy for?
                    </ThemedText>
                    <ThemedText style={{ color: colors.muted, marginBottom: 20 }}>
                      Select whether this policy is for yourself or for a customer
                    </ThemedText>

                    <TouchableOpacity
                      onPress={() => handleCustomerSelection(false)}
                      activeOpacity={0.7}
                    >
                      <Card style={[
                        styles.optionCard,
                        isForCustomer === false && { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.primary + '10' }
                      ]}>
                        <View style={styles.optionContent}>
                          <View style={[styles.optionIcon, { backgroundColor: colors.primary + '20' }]}>
                            <User size={24} color={colors.primary} />
                          </View>
                          <View style={{ flex: 1 }}>
                            <ThemedText type="defaultSemiBold">For Myself</ThemedText>
                            <ThemedText style={{ color: colors.muted, fontSize: 12 }}>
                              Create a policy for your own device
                            </ThemedText>
                          </View>
                          {isForCustomer === false && (
                            <Check size={24} color={colors.primary} />
                          )}
                        </View>
                      </Card>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleCustomerSelection(true)}
                      activeOpacity={0.7}
                    >
                      <Card style={[
                        styles.optionCard,
                        isForCustomer === true && { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.primary + '10' }
                      ]}>
                        <View style={styles.optionContent}>
                          <View style={[styles.optionIcon, { backgroundColor: colors.secondary + '20' }]}>
                            <User size={24} color={colors.secondary} />
                          </View>
                          <View style={{ flex: 1 }}>
                            <ThemedText type="defaultSemiBold">For a Customer</ThemedText>
                            <ThemedText style={{ color: colors.muted, fontSize: 12 }}>
                              Create a policy for a customer's device
                            </ThemedText>
                          </View>
                          {isForCustomer === true && (
                            <Check size={24} color={colors.primary} />
                          )}
                        </View>
                      </Card>
                    </TouchableOpacity>
                  </Card>

                  <Button
                    title="Back to Plan"
                    onPress={handleBackToPlan}
                    variant="outline"
                    style={{ marginTop: 16 }}
                  />
                </View>
              )}

              {/* Customer Information Form (for sellers creating customer policy) */}
              {selectedPlan && purchaseStep === 'customerInfo' && (
                <View>
                  <Card style={styles.summaryCard}>
                    <ThemedText type="defaultSemiBold" style={styles.summaryTitle}>
                      Customer Information
                    </ThemedText>
                    <ThemedText style={{ color: colors.muted, marginBottom: 20 }}>
                      Please provide the customer's details
                    </ThemedText>
                  </Card>

                  {/* First Name */}
                  <View style={styles.formGroup}>
                    <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                      First Name *
                    </ThemedText>
                    <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                      <User size={20} color={colors.muted} />
                      <TextInput
                        style={[styles.input, { color: colors.text }]}
                        placeholder="Enter customer's first name"
                        placeholderTextColor={colors.muted}
                        value={customerFormData.firstName}
                        onChangeText={(value) => updateCustomerField('firstName', value)}
                        autoCapitalize="words"
                      />
                    </View>
                  </View>

                  {/* Last Name */}
                  <View style={styles.formGroup}>
                    <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                      Last Name *
                    </ThemedText>
                    <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                      <User size={20} color={colors.muted} />
                      <TextInput
                        style={[styles.input, { color: colors.text }]}
                        placeholder="Enter customer's last name"
                        placeholderTextColor={colors.muted}
                        value={customerFormData.lastName}
                        onChangeText={(value) => updateCustomerField('lastName', value)}
                        autoCapitalize="words"
                      />
                    </View>
                  </View>

                  {/* Email Address */}
                  <View style={styles.formGroup}>
                    <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                      Email Address *
                    </ThemedText>
                    <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                      <Mail size={20} color={colors.muted} />
                      <TextInput
                        style={[styles.input, { color: colors.text }]}
                        placeholder="Enter customer's email address"
                        placeholderTextColor={colors.muted}
                        value={customerFormData.email}
                        onChangeText={(value) => updateCustomerField('email', value)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </View>
                  </View>

                  {/* Phone Number */}
                  <View style={styles.formGroup}>
                    <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                      Phone Number *
                    </ThemedText>
                    <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                      <Phone size={20} color={colors.muted} />
                      <TextInput
                        style={[styles.input, { color: colors.text }]}
                        placeholder="Enter customer's phone number"
                        placeholderTextColor={colors.muted}
                        value={customerFormData.phone}
                        onChangeText={(value) => updateCustomerField('phone', value)}
                        keyboardType="phone-pad"
                      />
                    </View>
                  </View>

                  {/* ID Number or Passport Number */}
                  <View style={styles.formGroup}>
                    <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                      ID Number or Passport Number *
                    </ThemedText>
                    <ThemedText style={{ fontSize: 12, color: colors.muted, marginBottom: 8 }}>
                      Enter national ID or passport number
                    </ThemedText>
                    <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                      <CreditCard size={20} color={colors.muted} />
                      <TextInput
                        style={[styles.input, { color: colors.text }]}
                        placeholder="Enter ID or passport number"
                        placeholderTextColor={colors.muted}
                        value={customerFormData.idNumber}
                        onChangeText={(value) => updateCustomerField('idNumber', value)}
                        autoCapitalize="characters"
                      />
                    </View>
                  </View>

                  {/* Gender */}
                  <View style={styles.formGroup}>
                    <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                      Gender *
                    </ThemedText>
                    <TouchableOpacity
                      onPress={() => setShowGenderDropdown(!showGenderDropdown)}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                        <Users size={20} color={colors.muted} />
                        <ThemedText style={{ flex: 1, fontSize: 16 }}>
                          {customerFormData.gender 
                            ? customerFormData.gender.charAt(0).toUpperCase() + customerFormData.gender.slice(1)
                            : 'Select gender'}
                        </ThemedText>
                        <ChevronDown size={20} color={colors.muted} />
                      </View>
                    </TouchableOpacity>

                    {showGenderDropdown && (
                      <Card style={[styles.dropdown, { borderColor: colors.border }]}>
                        {(['male', 'female', 'other'] as const).map((gender, index) => (
                          <TouchableOpacity
                            key={gender}
                            onPress={() => {
                              updateCustomerField('gender', gender);
                              setShowGenderDropdown(false);
                            }}
                            activeOpacity={0.7}
                          >
                            <View style={[
                              styles.dropdownItem,
                              index !== 2 && 
                              { borderBottomWidth: 1, borderBottomColor: colors.border }
                            ]}>
                              <ThemedText style={{ flex: 1, fontSize: 16 }}>
                                {gender.charAt(0).toUpperCase() + gender.slice(1)}
                              </ThemedText>
                              {customerFormData.gender === gender && (
                                <Check size={20} color={colors.primary} />
                              )}
                            </View>
                          </TouchableOpacity>
                        ))}
                      </Card>
                    )}
                  </View>

                  <ThemedText style={{ fontSize: 12, color: colors.muted, marginBottom: 16, fontStyle: 'italic' }}>
                    * Required fields
                  </ThemedText>

                  <Button
                    title="Continue to select devices"
                    onPress={handleContinueFromCustomerInfo}
                    variant="primary"
                  />
                  <Button
                    title="Back"
                    onPress={handleBackToCustomerSelection}
                    variant="outline"
                    style={{ marginTop: 12 }}
                  />
                </View>
              )}

              {selectedPlan && purchaseStep === 'devicePick' && (
                <View>
                  <Card style={styles.summaryCard}>
                    <ThemedText type="defaultSemiBold" style={styles.summaryTitle}>
                      Which devices are you insuring?
                    </ThemedText>
                    <ThemedText style={{ color: colors.muted, marginBottom: 16 }}>
                      Tap a category to add each item to your list. You can add the same type more than once (e.g. two
                      phones). On the next screen you will enter details for each item in order.
                    </ThemedText>
                  </Card>
                  <View style={styles.formGroup}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                      {deviceTypeOptions.map((opt) => (
                        <TouchableOpacity
                          key={opt.value}
                          onPress={() => enqueueInsureDeviceType(opt.value)}
                          activeOpacity={0.7}
                        >
                          <Card
                            style={{
                              paddingVertical: 12,
                              paddingHorizontal: 14,
                              borderWidth: 1,
                              borderColor: colors.border,
                            }}
                          >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                              <opt.icon size={20} color={colors.primary} />
                              <ThemedText type="defaultSemiBold">{opt.label}</ThemedText>
                              <ThemedText style={{ color: colors.primary, fontSize: 12 }}>+ Add</ThemedText>
                            </View>
                          </Card>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  {deviceInsureQueue.length > 0 && (
                    <View style={styles.formGroup}>
                      <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                        Your list ({deviceInsureQueue.length})
                      </ThemedText>
                      {deviceInsureQueue.map((t, index) => (
                        <Card key={`${t}-${index}`} style={[styles.savedDeviceCard, { marginBottom: 8 }]}>
                          <View style={styles.savedDeviceHeader}>
                            <ThemedText style={{ flex: 1 }}>
                              {index + 1}. {deviceTypeOptions.find((o) => o.value === t)?.label ?? t}
                            </ThemedText>
                            <TouchableOpacity onPress={() => removeInsureQueueAt(index)}>
                              <ThemedText style={{ color: colors.muted, fontSize: 13 }}>Remove</ThemedText>
                            </TouchableOpacity>
                          </View>
                        </Card>
                      ))}
                    </View>
                  )}
                  <Button title="Continue to device details" onPress={handleContinueFromDevicePick} variant="primary" />
                  <Button
                    title="Back"
                    onPress={() => {
                      if (isSellerUser) {
                        if (isForCustomer) setPurchaseStep('customerInfo');
                        else setPurchaseStep('customer');
                      } else {
                        setPurchaseStep('plan');
                      }
                    }}
                    variant="outline"
                    style={{ marginTop: 12 }}
                  />
                </View>
              )}

              {selectedPlan && purchaseStep === 'device' && (
                <View>
                  <Card style={styles.summaryCard}>
                    <ThemedText type="defaultSemiBold" style={styles.summaryTitle}>
                      Policy summary
                    </ThemedText>
                    <ThemedText style={{ color: colors.muted, marginBottom: 12 }}>
                      {frozenInsureQueue.length > 0
                        ? `Enter details for each device you selected (${savedDeviceLines.length} of ${frozenInsureQueue.length} saved). Use Save between items if you prefer.`
                        : 'Add one or more devices. Each item needs its own details. Use "Add device" to save the current form and enter another.'}
                    </ThemedText>
                    <View style={styles.summaryRow}>
                      <ThemedText style={{ color: colors.muted }}>Saved items</ThemedText>
                      <ThemedText type="defaultSemiBold">{savedDeviceLines.length}</ThemedText>
                    </View>
                    <View style={styles.summaryRow}>
                      <ThemedText style={{ color: colors.muted }}>Estimated items on policy</ThemedText>
                      <ThemedText type="defaultSemiBold">
                        {estimatedItemCount > 0 ? estimatedItemCount : '—'}
                      </ThemedText>
                    </View>
                    {estimatedItemCount > 0 && (
                      <>
                        <View style={styles.summaryRow}>
                          <ThemedText style={{ color: colors.muted }}>Plan rate</ThemedText>
                          <ThemedText type="defaultSemiBold">
                            {selectedPlan.coverPercentage}% / item / month
                          </ThemedText>
                        </View>
                        <View style={styles.summaryRow}>
                          <ThemedText style={{ color: colors.muted }}>Est. total cover</ThemedText>
                          <ThemedText type="defaultSemiBold">
                            ${estimatedTotalCover.toFixed(2)}
                          </ThemedText>
                        </View>
                        <View style={styles.summaryRow}>
                          <ThemedText style={{ color: colors.muted }}>Est. monthly total</ThemedText>
                          <ThemedText type="defaultSemiBold">
                            ${estimatedMonthlyTotal.toFixed(2)}
                          </ThemedText>
                        </View>
                        <View style={styles.summaryRow}>
                          <ThemedText style={{ color: colors.muted }}>Est. annual total</ThemedText>
                          <ThemedText type="defaultSemiBold">
                            ${estimatedAnnualTotal.toFixed(2)}
                          </ThemedText>
                        </View>
                      </>
                    )}
                  </Card>

                  {savedDeviceLines.length > 0 && (
                    <View style={styles.formGroup}>
                      <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                        Devices on this policy
                      </ThemedText>
                      {savedDeviceLines.map((line) => (
                        <Card key={line.id} style={styles.savedDeviceCard}>
                          <View style={styles.savedDeviceHeader}>
                            <View style={{ flex: 1 }}>
                              <ThemedText type="defaultSemiBold">
                                {deviceTypeOptions.find((o) => o.value === line.deviceType)?.label ?? line.deviceType}{' '}
                                · {line.brand} {line.model}
                              </ThemedText>
                              <ThemedText style={{ color: colors.muted, fontSize: 12, marginTop: 4 }}>
                                S/N {line.serialNumber}
                                {line.deviceCost
                                  ? ` · $${line.deviceCost} value · ~$${linePremiumFromValue(parseFloat(line.deviceCost) || 0, selectedPlan.coverPercentage).toFixed(0)}/mo`
                                  : ''}
                              </ThemedText>
                            </View>
                            <TouchableOpacity
                              onPress={() => handleRemoveSavedDevice(line.id)}
                              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                              accessibilityLabel="Remove device"
                            >
                              <Trash2 size={22} color={colors.muted} />
                            </TouchableOpacity>
                          </View>
                        </Card>
                      ))}
                    </View>
                  )}

                  <ThemedText type="defaultSemiBold" style={[styles.formLabel, { marginBottom: 8 }]}>
                    {savedDeviceLines.length > 0 ? 'Add another device' : 'Device details'}
                  </ThemedText>

                  {/* Device type: fixed from your selection, or free choice if no queue */}
                  <View style={styles.formGroup}>
                    <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                      Device Type *
                    </ThemedText>
                    {frozenInsureQueue.length > 0 ? (
                      <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                        <Smartphone size={20} color={colors.muted} />
                        <ThemedText style={{ flex: 1, fontSize: 16 }}>
                          {deviceTypeOptions.find((opt) => opt.value === deviceFormData.deviceType)?.label}
                        </ThemedText>
                        <ThemedText style={{ fontSize: 12, color: colors.muted }}>
                          {hasMoreDetailSlots
                            ? `(${savedDeviceLines.length + 1} of ${frozenInsureQueue.length})`
                            : '(optional add-on)'}
                        </ThemedText>
                      </View>
                    ) : (
                      <>
                        <TouchableOpacity
                          onPress={() => setShowDeviceTypeDropdown(!showDeviceTypeDropdown)}
                          activeOpacity={0.7}
                        >
                          <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                            <Smartphone size={20} color={colors.muted} />
                            <ThemedText style={{ flex: 1, fontSize: 16 }}>
                              {deviceTypeOptions.find((opt) => opt.value === deviceFormData.deviceType)?.label}
                            </ThemedText>
                            <ChevronDown size={20} color={colors.muted} />
                          </View>
                        </TouchableOpacity>
                        {showDeviceTypeDropdown && (
                          <Card style={[styles.dropdown, { borderColor: colors.border }]}>
                            {deviceTypeOptions.map((option, index) => (
                              <TouchableOpacity
                                key={option.value}
                                onPress={() => selectDeviceType(option.value)}
                                activeOpacity={0.7}
                              >
                                <View
                                  style={[
                                    styles.dropdownItem,
                                    index !== deviceTypeOptions.length - 1 && {
                                      borderBottomWidth: 1,
                                      borderBottomColor: colors.border,
                                    },
                                  ]}
                                >
                                  <option.icon size={20} color={colors.primary} />
                                  <ThemedText style={{ flex: 1, fontSize: 16 }}>
                                    {option.label}
                                  </ThemedText>
                                  {deviceFormData.deviceType === option.value && (
                                    <Check size={20} color={colors.primary} />
                                  )}
                                </View>
                              </TouchableOpacity>
                            ))}
                          </Card>
                        )}
                      </>
                    )}
                  </View>

                  {/* Device Brand */}
                  <View style={styles.formGroup}>
                    <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                      Device Brand *
                    </ThemedText>
                    <TextInput
                      style={[styles.textInput, { 
                        backgroundColor: colors.card, 
                        borderColor: colors.border,
                        color: colors.text 
                      }]}
                      placeholder="e.g., Apple, Samsung, Dell, HP"
                      placeholderTextColor={colors.muted}
                      value={deviceFormData.brand}
                      onChangeText={(value) => updateDeviceField('brand', value)}
                    />
                  </View>

                  {/* Device Model */}
                  <View style={styles.formGroup}>
                    <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                      Device Model *
                    </ThemedText>
                    <TextInput
                      style={[styles.textInput, { 
                        backgroundColor: colors.card, 
                        borderColor: colors.border,
                        color: colors.text 
                      }]}
                      placeholder="e.g., iPhone 15 Pro, MacBook Pro 14"
                      placeholderTextColor={colors.muted}
                      value={deviceFormData.model}
                      onChangeText={(value) => updateDeviceField('model', value)}
                    />
                  </View>

                  {/* Purchase Date */}
                  <View style={styles.formGroup}>
                    <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                      Purchase Date *
                    </ThemedText>
                    <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                      <Calendar size={20} color={colors.muted} />
                      <TextInput
                        style={[styles.input, { color: colors.text }]}
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor={colors.muted}
                        value={deviceFormData.purchaseDate}
                        onChangeText={(value) => updateDeviceField('purchaseDate', value)}
                      />
                    </View>
                  </View>

                  {/* Device Cost */}
                  <View style={styles.formGroup}>
                    <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                      Device Cost (USD) *
                    </ThemedText>
                    <TextInput
                      style={[styles.textInput, { 
                        backgroundColor: colors.card, 
                        borderColor: colors.border,
                        color: colors.text 
                      }]}
                      placeholder="e.g., 999.99"
                      placeholderTextColor={colors.muted}
                      value={deviceFormData.deviceCost}
                      onChangeText={(value) => updateDeviceField('deviceCost', value)}
                      keyboardType="decimal-pad"
                    />
                  </View>

                  {(deviceFormData.deviceType === 'phone' || deviceFormData.deviceType === 'tablet') && (
                    <View style={styles.formGroup}>
                      <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                        IMEI Number
                      </ThemedText>
                      <ThemedText style={{ fontSize: 12, color: colors.muted, marginBottom: 8 }}>
                        For phones and tablets (optional)
                      </ThemedText>
                      <TextInput
                        style={[styles.textInput, { 
                          backgroundColor: colors.card, 
                          borderColor: colors.border,
                          color: colors.text 
                        }]}
                        placeholder="15-digit IMEI number"
                        placeholderTextColor={colors.muted}
                        value={deviceFormData.imeiNumber}
                        onChangeText={(value) => updateDeviceField('imeiNumber', value)}
                        keyboardType="number-pad"
                        maxLength={15}
                      />
                    </View>
                  )}

                  {/* Serial Number */}
                  <View style={styles.formGroup}>
                    <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                      Serial Number *
                    </ThemedText>
                    <TextInput
                      style={[styles.textInput, { 
                        backgroundColor: colors.card, 
                        borderColor: colors.border,
                        color: colors.text 
                      }]}
                      placeholder="Device serial number"
                      placeholderTextColor={colors.muted}
                      value={deviceFormData.serialNumber}
                      onChangeText={(value) => updateDeviceField('serialNumber', value)}
                    />
                  </View>

                  {/* Warranty Period */}
                  <View style={styles.formGroup}>
                    <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                      Warranty Period (months)
                    </ThemedText>
                    <TextInput
                      style={[styles.textInput, { 
                        backgroundColor: colors.card, 
                        borderColor: colors.border,
                        color: colors.text 
                      }]}
                      placeholder="e.g., 12, 24, 36"
                      placeholderTextColor={colors.muted}
                      value={deviceFormData.warrantyPeriod}
                      onChangeText={(value) => updateDeviceField('warrantyPeriod', value)}
                      keyboardType="number-pad"
                    />
                  </View>

                  {/* Warranty End Date */}
                  <View style={styles.formGroup}>
                    <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                      Warranty End Date
                    </ThemedText>
                    <View style={[styles.inputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
                      <Calendar size={20} color={colors.muted} />
                      <TextInput
                        style={[styles.input, { color: colors.text }]}
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor={colors.muted}
                        value={deviceFormData.warrantyEndDate}
                        onChangeText={(value) => updateDeviceField('warrantyEndDate', value)}
                      />
                    </View>
                  </View>

                  {/* Device Description */}
                  <View style={styles.formGroup}>
                    <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                      Device Description
                    </ThemedText>
                    <ThemedText style={{ fontSize: 12, color: colors.muted, marginBottom: 8 }}>
                      Any additional details about the device
                    </ThemedText>
                    <TextInput
                      style={[styles.textAreaInput, { 
                        backgroundColor: colors.card, 
                        borderColor: colors.border,
                        color: colors.text 
                      }]}
                      placeholder="e.g., Color, storage capacity, condition..."
                      placeholderTextColor={colors.muted}
                      value={deviceFormData.description}
                      onChangeText={(value) => updateDeviceField('description', value)}
                      multiline
                      numberOfLines={4}
                      textAlignVertical="top"
                    />
                  </View>

                  <ThemedText style={{ fontSize: 12, color: colors.muted, marginBottom: 16, fontStyle: 'italic' }}>
                    * Required fields
                  </ThemedText>

                  {/* Action Buttons */}
                  {hasMoreDetailSlots && (
                    <>
                      <Button
                        title="Save device & go to next"
                        onPress={handleAddDeviceToList}
                        variant="outline"
                        style={{ marginBottom: 12 }}
                      />
                      <ThemedText style={{ fontSize: 12, color: colors.muted, marginBottom: 12 }}>
                        Save each item after filling the form. On the last item you can complete purchase without this
                        button if the form is complete.
                      </ThemedText>
                    </>
                  )}
                  {!hasMoreDetailSlots && frozenInsureQueue.length > 0 && (
                    <View style={styles.formGroup}>
                      <ThemedText type="defaultSemiBold" style={styles.formLabel}>
                        Add another device (optional)
                      </ThemedText>
                      <ThemedText style={{ fontSize: 12, color: colors.muted, marginBottom: 10 }}>
                        Tap a type to add it to this policy — you will fill in its details next.
                      </ThemedText>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                        {deviceTypeOptions.map((opt) => (
                          <TouchableOpacity key={`extra-${opt.value}`} onPress={() => appendToFrozenInsureQueue(opt.value)}>
                            <Card style={{ paddingVertical: 8, paddingHorizontal: 12, borderColor: colors.border }}>
                              <ThemedText style={{ fontSize: 13 }}>+ {opt.label}</ThemedText>
                            </Card>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )}
                  {frozenInsureQueue.length === 0 && (
                    <>
                      <Button
                        title="Add device to policy"
                        onPress={handleAddDeviceToList}
                        variant="outline"
                        style={{ marginBottom: 12 }}
                      />
                      <ThemedText style={{ fontSize: 12, color: colors.muted, marginBottom: 12 }}>
                        Saves the form below and lets you enter another item. You can also complete purchase with the
                        current form only (one item) without tapping this.
                      </ThemedText>
                    </>
                  )}
                  <Button
                    title="Complete purchase"
                    onPress={handleCompletePurchase}
                    variant="primary"
                    disabled={!canProceedDeviceDetails()}
                  />
                  <Button
                    title="Back"
                    onPress={() => {
                      if (frozenInsureQueue.length > 0) {
                        setPurchaseStep('devicePick');
                        setFrozenInsureQueue([]);
                        setSavedDeviceLines([]);
                        setDeviceFormData(emptyDeviceForm());
                        return;
                      }
                      if (isSellerUser && isForCustomer) {
                        setPurchaseStep('customerInfo');
                      } else if (isSellerUser) {
                        setPurchaseStep('customer');
                      } else {
                        setPurchaseStep('devicePick');
                      }
                    }}
                    variant="outline"
                    style={{ marginTop: 12 }}
                  />
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  policyCard: {
    marginBottom: 18,
    padding: 20,
  },
  policyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  policyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  policyInfo: {
    flex: 1,
  },
  policyDetails: {
    gap: 12,
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coverageIcons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  coverageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  coverageText: {
    fontSize: 12,
  },
  planCard: {
    marginBottom: 16,
  },
  planHeader: {
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 8,
  },
  planFeatures: {
    gap: 12,
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    flex: 1,
  },
  purchaseButton: {
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  modalBody: {
    gap: 8,
  },
  summaryCard: {
    marginBottom: 8,
  },
  summaryTitle: {
    marginBottom: 16,
    fontSize: 18,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  formGroup: {
    marginBottom: 24,
  },
  formLabel: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    minHeight: 56,
    gap: 14,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    fontWeight: '500',
  },
  textInput: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 56,
    fontWeight: '500',
  },
  textAreaInput: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 110,
    fontWeight: '500',
  },
  dropdown: {
    marginTop: 10,
    borderWidth: 1.5,
    padding: 0,
    borderRadius: 12,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    gap: 14,
  },
  optionCard: {
    marginBottom: 12,
    padding: 16,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedDeviceCard: {
    marginBottom: 10,
    padding: 14,
  },
  savedDeviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
});
