import React, { useMemo, useState } from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  FileCheck,
  Shield,
  FileText,
  Users,
  DollarSign,
  CreditCard,
  Store,
  Smartphone,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { usePolicies } from './hooks/usePolicies';
import { useClaims } from './hooks/useClaims';
import { validateEmail, validateCardNumber, validatePhone } from './utils/validation';
import { formatPhoneNumber, formatCardNumber, formatExpiryDate, formatPrice } from './utils/formatters';
import { getStoredPolicies, getStoredClaims, getStoredAccessToken } from './utils/storage';
import { devices } from './constants/devices';
import { fetchPricingPlans, createPolicy, login as apiLogin, createClaim } from './utils/api';
import { buildGadgetPolicyPurchasePayload } from './utils/gadgetPolicyPayload';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SalesAgentDashboard from './components/SalesAgentDashboard';
import AdminDashboard from './components/AdminDashboard';
import PurchaseFlow from './components/PurchaseFlow';
import ClaimFlow from './components/ClaimFlow';
import LandingPage from './components/LandingPage';
import PolicyDetail from './components/PolicyDetail';
import ClaimDetail from './components/ClaimDetail';
import PurchaseSuccess from './components/PurchaseSuccess';
import AppShell from './components/AppShell';

export default function DeviceInsurance() {
  // View states: 'landing' | 'login' | 'dashboard' | 'purchase' | 'claim' | 'policy-detail' | 'claim-detail'
  const [currentView, setCurrentView] = useState('landing');
  const [selectedPolicyId, setSelectedPolicyId] = useState(null);
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  const { user, login, logout } = useAuth();
  const { policies, addPolicy, refreshPolicies, getUserPolicies } = usePolicies();
  const { claims, addClaim, refreshClaims, getUserClaims } = useClaims();
  
  const [showFlow, setShowFlow] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    idNumber: '',
    deviceModel: '',
    deviceBrand: '',
    deviceDescription: '',
    purchaseDate: '',
    serialNumber: '',
    imeiNumber: '',
    devicePrice: '',
    warrantyPeriod: '',
    warrantyEndDate: '',
    paymentMethod: 'mpesa',
    paymentAccountName: '',
    mpesaPhoneNumber: '',
    bankName: '',
    bankAccountName: '',
    bankAccountNumber: '',
    bankBranch: '',
    beneficiaryFirstName: '',
    beneficiaryLastName: '',
    beneficiaryRelationship: '',
    beneficiaryGender: '',
    beneficiaryPhone: '',
    beneficiaryEmail: '',
    preferredCommunicationChannel: 'all',
    purchasedViaAgent: 'no',
    agentIdNumber: ''
  });

  // Claim form state
  const [claimFormData, setClaimFormData] = useState({
    policyId: '',
    claimType: '',
    incidentDate: '',
    description: '',
    estimatedCost: '',
    deviceOutlet: ''
  });
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimError, setClaimError] = useState('');
  const [claimStep, setClaimStep] = useState(1);
  const [policySaved, setPolicySaved] = useState(false);
  
  // Pricing plans state
  const [pricingPlans, setPricingPlans] = useState([]);
  const [selectedPricingPlan, setSelectedPricingPlan] = useState(null);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [purchaseSuccessSummary, setPurchaseSuccessSummary] = useState(null);
  const [adminActiveTab, setAdminActiveTab] = useState('metrics');

  // Format and validate handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format inputs based on field type
    if (name === 'phone' || name === 'mpesaPhoneNumber' || name === 'beneficiaryPhone') {
      formattedValue = formatPhoneNumber(value);
    } else if (name === 'devicePrice') {
      formattedValue = formatPrice(value);
    }

    let updates = { [name]: formattedValue };
    if (name === 'purchasedViaAgent' && value === 'no') {
      updates.agentIdNumber = '';
    }

    // Auto-fill warrantyEndDate when warrantyPeriod or purchaseDate changes
    if (name === 'warrantyPeriod' && value && !isNaN(parseInt(value))) {
      const years = parseInt(value);
      const baseDate = formData.purchaseDate ? new Date(formData.purchaseDate) : new Date();
      if (!isNaN(baseDate.getTime())) {
        baseDate.setFullYear(baseDate.getFullYear() + years);
        updates.warrantyEndDate = baseDate.toISOString().split('T')[0];
      }
    } else if (name === 'purchaseDate' && value) {
      if (formData.warrantyPeriod && !isNaN(parseInt(formData.warrantyPeriod))) {
        const years = parseInt(formData.warrantyPeriod);
        const baseDate = new Date(value);
        if (!isNaN(baseDate.getTime())) {
          baseDate.setFullYear(baseDate.getFullYear() + years);
          updates.warrantyEndDate = baseDate.toISOString().split('T')[0];
        }
      }
    }

    setFormData(prev => ({ ...prev, ...updates }));

    if (name === 'purchasedViaAgent' && value === 'no') {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.agentIdNumber;
        return next;
      });
    }

    if (name === 'paymentMethod') {
      setErrors((prev) => {
        const next = { ...prev };
        [
          'paymentMethod', 'paymentAccountName', 'mpesaPhoneNumber',
          'bankName', 'bankAccountName', 'bankAccountNumber', 'bankBranch',
        ].forEach((k) => { delete next[k]; });
        return next;
      });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    const optionalOnBlur = ['serialNumber', 'imeiNumber', 'warrantyPeriod', 'warrantyEndDate', 'bankBranch', 'beneficiaryEmail'];

    // Validate on blur
    let error = '';
    if (!value.trim()) {
      if (optionalOnBlur.includes(name) || (name === 'agentIdNumber' && formData.purchasedViaAgent !== 'yes')) {
        error = '';
      } else {
        error = 'This field is required';
      }
    } else if (name === 'email' && !validateEmail(value)) {
      error = 'Please enter a valid email address';
    } else if ((name === 'phone' || name === 'mpesaPhoneNumber' || name === 'beneficiaryPhone') && !validatePhone(value)) {
      error = 'Please enter a valid 10-digit phone number';
    } else if (name === 'devicePrice' && value.trim() && (!/^\d+(\.\d{1,2})?$/.test(value) || parseFloat(value) <= 0)) {
      error = 'Please enter a valid price (e.g., 999.99)';
    }

    if (error) {
      setErrors({ ...errors, [name]: error });
    }
  };

  const validateStep = (stepNum) => {
    const newErrors = {};

    if (stepNum === 2) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
      if (!formData.gender.trim()) newErrors.gender = 'Gender is required';
      if (!formData.idNumber.trim()) newErrors.idNumber = 'ID number or passport number is required';
    } else if (stepNum === 3) {
      if (!formData.deviceModel.trim()) newErrors.deviceModel = 'Item model is required';
      if (!formData.deviceBrand.trim()) newErrors.deviceBrand = 'Item brand is required';
      if (!formData.deviceDescription.trim()) newErrors.deviceDescription = 'Item description is required';
      if (!formData.purchaseDate) newErrors.purchaseDate = 'Purchase date is required';
      if ((selectedDevice === 'phone' || selectedDevice === 'tablet') && formData.imeiNumber && formData.imeiNumber.trim()) {
        if (!/^\d{15}$/.test(formData.imeiNumber.trim())) {
          newErrors.imeiNumber = 'IMEI must be a 15-digit number';
        }
      }
      if (!formData.devicePrice.trim()) {
        newErrors.devicePrice = 'Item value is required';
      } else if (!/^\d+(\.\d{1,2})?$/.test(formData.devicePrice) || parseFloat(formData.devicePrice) <= 0) {
        newErrors.devicePrice = 'Please enter a valid value (e.g., 85000)';
      }
    } else if (stepNum === 4) {
      if (!selectedPricingPlan) {
        newErrors.pricingPlan = 'Please select a pricing plan';
      }
    } else if (stepNum === 5) {
      if (!formData.beneficiaryFirstName.trim()) {
        newErrors.beneficiaryFirstName = 'First name is required';
      }
      if (!formData.beneficiaryLastName.trim()) {
        newErrors.beneficiaryLastName = 'Last name is required';
      }
      if (!formData.beneficiaryRelationship.trim()) {
        newErrors.beneficiaryRelationship = 'Relationship is required';
      }
      if (!formData.beneficiaryGender.trim()) {
        newErrors.beneficiaryGender = 'Gender is required';
      }
      if (!formData.beneficiaryPhone.trim()) {
        newErrors.beneficiaryPhone = 'Phone number is required';
      } else if (!validatePhone(formData.beneficiaryPhone)) {
        newErrors.beneficiaryPhone = 'Please enter a valid 10-digit phone number';
      }
      if (formData.beneficiaryEmail.trim() && !validateEmail(formData.beneficiaryEmail)) {
        newErrors.beneficiaryEmail = 'Please enter a valid email address';
      }
    } else if (stepNum === 6) {
      const method = formData.paymentMethod || 'mpesa';
      if (!['mpesa', 'bank_debit', 'card'].includes(method)) {
        newErrors.paymentMethod = 'Please select a payment method';
      } else if (method === 'mpesa') {
        if (!formData.paymentAccountName.trim()) {
          newErrors.paymentAccountName = 'M-Pesa account name is required';
        }
        if (!formData.mpesaPhoneNumber.trim()) {
          newErrors.mpesaPhoneNumber = 'M-Pesa phone number is required';
        } else if (!validatePhone(formData.mpesaPhoneNumber)) {
          newErrors.mpesaPhoneNumber = 'Please enter a valid 10-digit phone number';
        }
      } else if (method === 'bank_debit') {
        if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
        if (!formData.bankAccountName.trim()) {
          newErrors.bankAccountName = 'Account holder name is required';
        }
        if (!formData.bankAccountNumber.trim()) {
          newErrors.bankAccountNumber = 'Account number is required';
        }
      }
      const ch = formData.preferredCommunicationChannel;
      if (!ch || !['all', 'sms', 'email', 'whatsapp'].includes(ch)) {
        newErrors.preferredCommunicationChannel = 'Please select a communication preference';
      }
      if (!['yes', 'no'].includes(formData.purchasedViaAgent)) {
        newErrors.purchasedViaAgent = 'Please select an option';
      } else if (formData.purchasedViaAgent === 'yes' && !formData.agentIdNumber.trim()) {
        newErrors.agentIdNumber = 'Agent number or ID is required';
      }
    }

    return {
      valid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    };
  };

  const applyStepValidation = (stepNum) => {
    const { valid, errors: nextErrors } = validateStep(stepNum);
    if (!valid) {
      setErrors(nextErrors);
      setTouched((prev) => {
        const merged = { ...prev };
        Object.keys(nextErrors).forEach((key) => {
          merged[key] = true;
        });
        return merged;
      });
    }
    return valid;
  };

  const handleStepChange = (newStep) => {
    // Allow going backwards without validation
    if (newStep < step) {
      setStep(newStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // For forward navigation, validate the CURRENT step before proceeding
    if (newStep > step) {
      // Fetch pricing plans when moving from step 3 to step 4
      if (step === 3 && newStep === 4) {
        if (!applyStepValidation(step)) {
          return;
        }
        // Fetch pricing plans
        setLoadingPlans(true);
        fetchPricingPlans()
          .then((data) => {
            setPricingPlans(data.results || []);
            setLoadingPlans(false);
            setStep(4);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          })
          .catch((error) => {
            console.error('Error fetching pricing plans:', error);
            setPricingPlans([]);
            setLoadingPlans(false);
            setErrors({ pricingPlan: 'Failed to load pricing plans. Please check your connection and try again.' });
            // Still advance to Step 4 so the user can see the error and retry
            setStep(4);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        return; // Don't change step in the default handler, let the promise handle it
      }
      
      // Validate other steps
      if (step === 2 || step === 3 || step === 4 || step === 5 || step === 6) {
        if (!applyStepValidation(step)) {
          return;
        }
      }
    }

    setLoading(true);
    setTimeout(() => {
      setStep(newStep);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const startFlow = () => {
    setPurchaseSuccessSummary(null);
    setCurrentView('purchase');
    setShowFlow(true);
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = async (username, password) => {
    setLoginLoading(true);
    setLoginError('');
    try {
      const loginResponse = await apiLogin(username, password);
      // Use the login hook to save user data and tokens
      const userData = login(loginResponse);
      refreshPolicies();
      refreshClaims();
      setCurrentView('dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.message || 'Invalid username or password. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setPurchaseSuccessSummary(null);
    logout();
    setCurrentView('landing');
  };

  const handlePurchaseComplete = async () => {
    if (!formData.email || !formData.deviceModel || !selectedPricingPlan) {
      setErrors({ submit: 'Please complete all required fields.' });
      return;
    }

    const payCheck = validateStep(6);
    if (!payCheck.valid) {
      setErrors((prev) => ({ ...prev, ...payCheck.errors, submit: '' }));
      setTouched((prev) => {
        const merged = { ...prev };
        Object.keys(payCheck.errors).forEach((key) => { merged[key] = true; });
        return merged;
      });
      setStep(6);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const startDate = new Date().toISOString().split('T')[0];
    const policyData = buildGadgetPolicyPurchasePayload({
      formData,
      selectedDevice,
      selectedPricingPlan,
      startDate,
    });

    const deviceValue = policyData.cover_amount;
    const premium = policyData.premium;
    const payment_details = policyData.payment_details;
    const additional_information = policyData.additional_information || {};
    const method = formData.paymentMethod || 'mpesa';
    const prefCommLabel = additional_information.preferred_communication_channel;

    // Send to backend API
    setLoading(true);
    setErrors({}); // Clear previous errors
    
    // Get access token for authenticated request
    const accessToken = getStoredAccessToken();
    
    try {
      const response = await createPolicy(policyData, accessToken);
      console.log('Policy created successfully:', response);
      
      // Also save to localStorage for local display
      const policyNumber = response.policy_number || 'DS-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      const localPolicy = {
        id: response.id?.toString() || Date.now().toString(),
        policyNumber,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        gender: formData.gender,
        idNumber: formData.idNumber,
        deviceType: devices.find(d => d.id === selectedDevice)?.name,
        deviceBrand: formData.deviceBrand,
        deviceModel: formData.deviceModel,
        deviceDescription: formData.deviceDescription,
        deviceValue,
        purchaseDate: formData.purchaseDate,
        serialNumber: formData.serialNumber,
        imeiNumber: formData.imeiNumber || undefined,
        warrantyPeriod: formData.warrantyPeriod || undefined,
        warrantyEndDate: formData.warrantyEndDate || undefined,
        monthlyPremium: premium,
        coverPercentage: selectedPricingPlan.cover_percentage,
        coverType: selectedPricingPlan.cover_type,
        pricingPlanId: selectedPricingPlan.id,
        startDate: new Date().toISOString(),
        status: 'active',
        paymentMethod: payment_details.payment_method,
        paymentAccountName: method === 'mpesa' ? formData.paymentAccountName : formData.bankAccountName,
        mpesaPhone: method === 'mpesa' ? formData.mpesaPhoneNumber : undefined,
        bankName: method === 'bank_debit' ? formData.bankName : undefined,
        preferredCommunicationChannel: prefCommLabel,
        preferredCommunicationChannelCode: additional_information.preferred_communication_channel_code,
        beneficiaryName: `${formData.beneficiaryFirstName} ${formData.beneficiaryLastName}`.trim(),
        beneficiaryRelationship: formData.beneficiaryRelationship,
        purchasedViaAgent: formData.purchasedViaAgent === 'yes',
        agentIdNumber: formData.purchasedViaAgent === 'yes' ? formData.agentIdNumber.trim() : undefined,
      };

      addPolicy(localPolicy);
      setPolicySaved(true);

      const deviceTypeName = devices.find((d) => d.id === selectedDevice)?.name || 'Device';
      const deviceLabel = `${deviceTypeName} — ${formData.deviceBrand} ${formData.deviceModel}`.replace(/\s+/g, ' ').trim();

      setPurchaseSuccessSummary({
        policyNumber,
        firstName: formData.firstName,
        coverType: selectedPricingPlan.cover_type,
        monthlyPremium: premium,
        deviceLabel,
        email: formData.email,
        paymentMethod: payment_details.payment_method,
        policyId: localPolicy.id,
      });

      setShowFlow(false);
      setStep(1);
      setSelectedDevice('');
      setPolicySaved(false);
      setSelectedPricingPlan(null);
      setPricingPlans([]);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', gender: '', idNumber: '',
        deviceModel: '', deviceBrand: '', deviceDescription: '', purchaseDate: '',
        serialNumber: '', imeiNumber: '', devicePrice: '',
        warrantyPeriod: '', warrantyEndDate: '',
        paymentMethod: 'mpesa',
        paymentAccountName: '', mpesaPhoneNumber: '',
        bankName: '', bankAccountName: '', bankAccountNumber: '', bankBranch: '',
        beneficiaryFirstName: '', beneficiaryLastName: '', beneficiaryRelationship: '',
        beneficiaryGender: '', beneficiaryPhone: '', beneficiaryEmail: '',
        preferredCommunicationChannel: 'all',
        purchasedViaAgent: 'no',
        agentIdNumber: ''
      });
      setCurrentView('purchase-success');

      if (user) {
        refreshPolicies();
      }
    } catch (error) {
      console.error('Error creating policy:', error);
      setErrors({ submit: error.message || 'Failed to create policy. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClaimInputChange = (e) => {
    setClaimFormData({ ...claimFormData, [e.target.name]: e.target.value });
  };

  const handleClaimSubmit = async () => {
    // Validate required fields
    if (!claimFormData.policyId || !claimFormData.claimType || !claimFormData.incidentDate || 
        !claimFormData.description || !claimFormData.estimatedCost || !claimFormData.deviceOutlet) {
      setClaimError('Please fill in all required fields');
      return;
    }

    setClaimLoading(true);
    setClaimError('');

    try {
      // Generate claim number in format: CLM_02/002/2026
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const randomNum = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
      const claimNumber = `CLM_${month}/${randomNum}/${year}`;

      const accessToken = getStoredAccessToken();
      if (!accessToken) {
        throw new Error('Authentication required. Please log in.');
      }

      // Prepare claim data for backend
      const claimData = {
        claim_number: claimNumber,
        description: claimFormData.description,
        claim_type: claimFormData.claimType,
        incident_date: claimFormData.incidentDate,
        estimated_cost: parseFloat(claimFormData.estimatedCost),
        policy: parseInt(claimFormData.policyId),
        device_outlet: parseInt(claimFormData.deviceOutlet)
      };

      const response = await createClaim(claimData, accessToken);
      console.log('Claim created successfully:', response);

      // Reset form
      setClaimFormData({
        policyId: '',
        claimType: '',
        incidentDate: '',
        description: '',
        estimatedCost: '',
        deviceOutlet: ''
      });
      setClaimStep(1);
      setCurrentView('dashboard');
      
      // Refresh claims if user is logged in
      if (user) {
        refreshClaims();
      }
    } catch (error) {
      console.error('Error creating claim:', error);
      setClaimError(error.message || 'Failed to create claim. Please try again.');
    } finally {
      setClaimLoading(false);
    }
  };

  // Filter policies and claims by current user
  const userPolicies = user ? getUserPolicies(user.email) : [];
  const userClaims = user ? getUserClaims(policies, user.email) : [];

  // Navigation handlers
  const handleHomeClick = () => {
    setPurchaseSuccessSummary(null);
    setCurrentView('landing');
    setShowFlow(false);
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDashboardClick = () => {
    setPurchaseSuccessSummary(null);
    setSelectedPolicyId(null);
    setSelectedClaimId(null);
    setCurrentView('dashboard');
    refreshPolicies();
    refreshClaims();
  };

  const handlePurchaseSuccessToDashboard = () => {
    setPurchaseSuccessSummary(null);
    setCurrentView('dashboard');
    refreshPolicies();
    refreshClaims();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePurchaseSuccessOpenPolicy = (policyId) => {
    setPurchaseSuccessSummary(null);
    setSelectedPolicyId(policyId);
    setCurrentView('policy-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackClick = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePolicyClick = (policyId) => {
    setSelectedPolicyId(policyId);
    setCurrentView('policy-detail');
  };

  const handleClaimDetailClick = (claimId) => {
    setSelectedClaimId(claimId);
    setCurrentView('claim-detail');
  };

  const handleBackToDashboard = () => {
    setSelectedPolicyId(null);
    setSelectedClaimId(null);
    setCurrentView('dashboard');
    refreshPolicies();
    refreshClaims();
  };

  const handleCreateClaim = () => {
    setPurchaseSuccessSummary(null);
    setClaimFormData({
      policyId: '',
      claimType: '',
      incidentDate: '',
      description: '',
      estimatedCost: '',
      deviceOutlet: ''
    });
    setClaimStep(1);
    setCurrentView('claim');
  };

  const goAdminTab = (tab) => {
    setPurchaseSuccessSummary(null);
    setSelectedPolicyId(null);
    setSelectedClaimId(null);
    setAdminActiveTab(tab);
    setCurrentView('dashboard');
    refreshPolicies();
    refreshClaims();
  };

  const showAppShell = Boolean(
    user && currentView !== 'landing' && currentView !== 'login'
  );

  const shellPageMeta = useMemo(() => {
    if (!user) return { title: null, subtitle: null };
    const name = user.name || user.username || user.email || '';
    switch (currentView) {
      case 'dashboard':
        if (user.role === 'Policy Owner') {
          return { title: 'My dashboard', subtitle: `Welcome back, ${name}.` };
        }
        if (user.role === 'Sales Agent') {
          return { title: 'Sales workspace', subtitle: `Welcome back, ${name}.` };
        }
        return { title: null, subtitle: null };
      case 'claim':
        return {
          title: 'File a claim',
          subtitle: 'Provide incident details and submit for review.',
        };
      case 'purchase':
        return {
          title: 'New policy',
          subtitle: `Step ${step} of 6 — guided device protection setup.`,
        };
      case 'purchase-success':
        return {
          title: "You're covered",
          subtitle: 'Save your policy number for your records.',
        };
      case 'policy-detail':
      case 'claim-detail':
        return { title: null, subtitle: null };
      default:
        return { title: null, subtitle: null };
    }
  }, [user, currentView, step]);

  const shellSidebarTitle =
    user?.role === 'Policy Owner'
      ? 'Member'
      : user?.role === 'Sales Agent'
        ? 'Sales'
        : 'Admin';

  const shellSidebarItems =
    !user
      ? []
      : user.role === 'Policy Owner' || user.role === 'Sales Agent'
        ? [
            {
              id: 'overview',
              label: 'Overview',
              icon: LayoutDashboard,
              active: currentView === 'dashboard',
              onClick: handleDashboardClick,
            },
            {
              id: 'purchase',
              label: 'New policy',
              icon: PlusCircle,
              active: currentView === 'purchase',
              onClick: startFlow,
            },
            {
              id: 'claim',
              label: 'File a claim',
              icon: FileCheck,
              active: currentView === 'claim',
              onClick: handleCreateClaim,
            },
          ]
        : [
            {
              id: 'metrics',
              label: 'Metrics',
              icon: LayoutDashboard,
              active: currentView === 'dashboard' && adminActiveTab === 'metrics',
              onClick: () => goAdminTab('metrics'),
            },
            {
              id: 'policies',
              label: 'Policies',
              icon: Shield,
              active: currentView === 'dashboard' && adminActiveTab === 'policies',
              onClick: () => goAdminTab('policies'),
            },
            {
              id: 'claims',
              label: 'Claims',
              icon: FileText,
              active: currentView === 'dashboard' && adminActiveTab === 'claims',
              onClick: () => goAdminTab('claims'),
            },
            {
              id: 'policy-owners',
              label: 'Policy owners',
              icon: Users,
              active: currentView === 'dashboard' && adminActiveTab === 'policy-owners',
              onClick: () => goAdminTab('policy-owners'),
            },
            {
              id: 'premiums',
              label: 'Premiums',
              icon: DollarSign,
              active: currentView === 'dashboard' && adminActiveTab === 'premiums',
              onClick: () => goAdminTab('premiums'),
            },
            {
              id: 'payments',
              label: 'Payments',
              icon: CreditCard,
              active: currentView === 'dashboard' && adminActiveTab === 'payments',
              onClick: () => goAdminTab('payments'),
            },
            {
              id: 'device-outlets',
              label: 'Device outlets',
              icon: Store,
              active: currentView === 'dashboard' && adminActiveTab === 'device-outlets',
              onClick: () => goAdminTab('device-outlets'),
            },
            {
              id: 'insured-devices',
              label: 'Insured devices',
              icon: Smartphone,
              active: currentView === 'dashboard' && adminActiveTab === 'insured-devices',
              onClick: () => goAdminTab('insured-devices'),
            },
          ];

  const purchaseShellToolbar =
    currentView === 'purchase' && showFlow && step > 1 && step < 5 ? (
      <button
        type="button"
        onClick={handleBackClick}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>
    ) : null;

  const authenticatedMain = (
    <>
      {currentView === 'dashboard' && user && (
        <>
          {user.role === 'Policy Owner' ? (
            <Dashboard
              user={user}
              onPurchaseClick={startFlow}
              onClaimClick={handleCreateClaim}
              onPolicyClick={handlePolicyClick}
              onClaimDetailClick={handleClaimDetailClick}
            />
          ) : user.role === 'Sales Agent' ? (
            <SalesAgentDashboard
              user={user}
              onPurchaseClick={startFlow}
              onClaimClick={handleCreateClaim}
            />
          ) : (
            <AdminDashboard
              policies={policies}
              claims={getStoredClaims()}
              onPolicyClick={handlePolicyClick}
              onClaimDetailClick={handleClaimDetailClick}
              onCreateClaim={handleCreateClaim}
              activeTab={adminActiveTab}
            />
          )}
        </>
      )}

      {currentView === 'policy-detail' && user && (
        <PolicyDetail
          policyId={selectedPolicyId}
          onBack={handleBackToDashboard}
          onClaimClick={handleClaimDetailClick}
        />
      )}

      {currentView === 'claim-detail' && user && (
        <ClaimDetail
          claimId={selectedClaimId}
          onBack={handleBackToDashboard}
          onPolicyClick={handlePolicyClick}
        />
      )}

      {currentView === 'claim' && user && (
        <ClaimFlow
          claimStep={claimStep}
          claimFormData={claimFormData}
          user={user}
          onStepChange={setClaimStep}
          onInputChange={handleClaimInputChange}
          onSubmit={handleClaimSubmit}
          onPurchaseClick={startFlow}
          loading={claimLoading}
          error={claimError}
        />
      )}

      {currentView === 'purchase-success' && purchaseSuccessSummary && (
        <PurchaseSuccess
          summary={purchaseSuccessSummary}
          user={user}
          onGoToDashboard={handlePurchaseSuccessToDashboard}
          onOpenPolicy={user ? handlePurchaseSuccessOpenPolicy : undefined}
          onGoHome={handleHomeClick}
        />
      )}

      {currentView === 'purchase' && showFlow && (
        <PurchaseFlow
          step={step}
          selectedDevice={selectedDevice}
          formData={formData}
          errors={errors}
          touched={touched}
          loading={loading}
          loadingPlans={loadingPlans}
          pricingPlans={pricingPlans}
          selectedPricingPlan={selectedPricingPlan}
          onDeviceSelect={setSelectedDevice}
          onInputChange={handleInputChange}
          onBlur={handleBlur}
          onStepChange={handleStepChange}
          onPricingPlanSelect={setSelectedPricingPlan}
          onComplete={handlePurchaseComplete}
        />
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white">
      {!showAppShell && (
        <Header
          currentView={currentView}
          user={user}
          showFlow={showFlow}
          step={step}
          onHomeClick={handleHomeClick}
          onLoginClick={() => setCurrentView('login')}
          onLogout={handleLogout}
          onDashboardClick={handleDashboardClick}
          onBackClick={handleBackClick}
        />
      )}

      {currentView === 'login' && (
        <Login
          onLogin={handleLogin}
          onBack={() => {
            setCurrentView('landing');
            setLoginError('');
          }}
          loading={loginLoading}
          error={loginError}
        />
      )}

      {showAppShell && user && (
        <AppShell
          user={user}
          sidebarTitle={shellSidebarTitle}
          sidebarItems={shellSidebarItems}
          pageTitle={shellPageMeta.title}
          pageSubtitle={shellPageMeta.subtitle}
          toolbar={purchaseShellToolbar}
          onLogout={handleLogout}
          onBrandClick={handleDashboardClick}
        >
          {authenticatedMain}
        </AppShell>
      )}

      {!user && currentView === 'purchase' && showFlow && (
        <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8 sm:py-10">
          <PurchaseFlow
            step={step}
            selectedDevice={selectedDevice}
            formData={formData}
            errors={errors}
            touched={touched}
            loading={loading}
            loadingPlans={loadingPlans}
            pricingPlans={pricingPlans}
            selectedPricingPlan={selectedPricingPlan}
            onDeviceSelect={setSelectedDevice}
            onInputChange={handleInputChange}
            onBlur={handleBlur}
            onStepChange={handleStepChange}
            onPricingPlanSelect={setSelectedPricingPlan}
            onComplete={handlePurchaseComplete}
          />
        </div>
      )}

      {!user && currentView === 'purchase-success' && purchaseSuccessSummary && (
        <PurchaseSuccess
          summary={purchaseSuccessSummary}
          user={null}
          onGoToDashboard={handlePurchaseSuccessToDashboard}
          onOpenPolicy={undefined}
          onGoHome={handleHomeClick}
        />
      )}

      {currentView === 'landing' && !showFlow && (
        <LandingPage onGetStarted={startFlow} />
      )}

      {!showAppShell && <Footer />}
    </div>
  );
}
