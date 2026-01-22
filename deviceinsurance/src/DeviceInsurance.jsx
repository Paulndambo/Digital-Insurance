import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { usePolicies } from './hooks/usePolicies';
import { useClaims } from './hooks/useClaims';
import { validateEmail, validateCardNumber, validatePhone } from './utils/validation';
import { formatPhoneNumber, formatCardNumber, formatExpiryDate, formatPrice } from './utils/formatters';
import { getStoredPolicies, getStoredClaims, getStoredAccessToken } from './utils/storage';
import { devices } from './constants/devices';
import { fetchPricingPlans, createPolicy, login as apiLogin, createClaim } from './utils/api';
import { mapDeviceTypeToBackend } from './utils/deviceMapper';
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
    paymentAccountName: '',
    mpesaPhoneNumber: ''
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

  // Format and validate handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format inputs based on field type
    if (name === 'phone' || name === 'mpesaPhoneNumber') {
      formattedValue = formatPhoneNumber(value);
    } else if (name === 'devicePrice') {
      formattedValue = formatPrice(value);
    }

    setFormData({ ...formData, [name]: formattedValue });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    // Validate on blur
    let error = '';
    if (!value.trim()) {
      error = 'This field is required';
    } else if (name === 'email' && !validateEmail(value)) {
      error = 'Please enter a valid email address';
    } else if ((name === 'phone' || name === 'mpesaPhoneNumber') && !validatePhone(value)) {
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
      if (!formData.deviceModel.trim()) newErrors.deviceModel = 'Device model is required';
      if (!formData.deviceBrand.trim()) newErrors.deviceBrand = 'Device brand is required';
      if (!formData.deviceDescription.trim()) newErrors.deviceDescription = 'Device description is required';
      if (!formData.purchaseDate) newErrors.purchaseDate = 'Purchase date is required';
      if (!formData.serialNumber.trim()) newErrors.serialNumber = 'Serial number is required';
      if (!formData.imeiNumber.trim()) newErrors.imeiNumber = 'IMEI number is required';
      if (!formData.devicePrice.trim()) {
        newErrors.devicePrice = 'Device price is required';
      } else if (!/^\d+(\.\d{1,2})?$/.test(formData.devicePrice) || parseFloat(formData.devicePrice) <= 0) {
        newErrors.devicePrice = 'Please enter a valid price (e.g., 999.99)';
      }
    } else if (stepNum === 4) {
      // Plan selection - validated via selectedPricingPlan state
      if (!selectedPricingPlan) {
        newErrors.pricingPlan = 'Please select a pricing plan';
      }
    } else if (stepNum === 5) {
      // Payment - Mpesa details only
      if (!formData.paymentAccountName.trim()) {
        newErrors.paymentAccountName = 'Mpesa account name is required';
      }
      if (!formData.mpesaPhoneNumber.trim()) {
        newErrors.mpesaPhoneNumber = 'Mpesa phone number is required';
      } else if (!validatePhone(formData.mpesaPhoneNumber)) {
        newErrors.mpesaPhoneNumber = 'Please enter a valid 10-digit phone number';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
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
        const isValid = validateStep(step);
        if (!isValid) {
          return;
        }
        // Fetch pricing plans
        setLoadingPlans(true);
        fetchPricingPlans()
          .then((data) => {
            setPricingPlans(data.results || []);
            setLoadingPlans(false);
            // Now advance to step 4 after plans are loaded
            setLoading(true);
            setTimeout(() => {
              setStep(4);
              setLoading(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 300);
          })
          .catch((error) => {
            console.error('Error fetching pricing plans:', error);
            setLoadingPlans(false);
            setErrors({ pricingPlan: 'Failed to load pricing plans. Please try again.' });
          });
        return; // Don't change step in the default handler, let the promise handle it
      }
      
      // Validate other steps
      if (step === 2 || step === 3 || step === 4 || step === 5) {
        const isValid = validateStep(step);
        if (!isValid) {
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
    logout();
    setCurrentView('landing');
  };

  const handlePurchaseComplete = async () => {
    // Validate that we have all required data
    if (!formData.email || !formData.deviceModel || !selectedPricingPlan) {
      setErrors({ submit: 'Please complete all required fields.' });
      return;
    }

    const deviceValue = parseFloat(formData.devicePrice);
    const coverPercentage = selectedPricingPlan.cover_percentage / 100; // Convert to decimal
    const premium = Math.round(deviceValue * coverPercentage);
    
    // Format date for backend (YYYY-MM-DD)
    const startDate = new Date().toISOString().split('T')[0];
    const purchaseDateFormatted = formData.purchaseDate;
    
    // Prepare policy data for backend
    const policyData = {
      start_date: startDate,
      premium: premium,
      pricing: selectedPricingPlan.id,
      cover_amount: deviceValue,
      cover_type: selectedPricingPlan.cover_type,
      policy_owner: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phone.replace(/\D/g, ''), // Remove formatting
        id_number: formData.idNumber,
        gender: formData.gender
      },
      devices: [
        {
          device_type: mapDeviceTypeToBackend(selectedDevice),
          device_brand: formData.deviceBrand,
          device_model: formData.deviceModel,
          purchase_date: purchaseDateFormatted,
          device_cost: deviceValue,
          description: formData.deviceDescription,
          imei_number: formData.imeiNumber,
          serial_number: formData.serialNumber
        }
      ],
      payment_details: {
        payment_method: "Mpesa",
        account_name: formData.paymentAccountName || `${formData.firstName} ${formData.lastName}`,
        phone_number: formData.mpesaPhoneNumber.replace(/\D/g, '') || formData.phone.replace(/\D/g, '')
      }
    };

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
        deviceModel: formData.deviceModel,
        deviceDescription: formData.deviceDescription,
        deviceValue,
        purchaseDate: formData.purchaseDate,
        serialNumber: formData.serialNumber,
        monthlyPremium: premium,
        coverPercentage: selectedPricingPlan.cover_percentage,
        coverType: selectedPricingPlan.cover_type,
        pricingPlanId: selectedPricingPlan.id,
        startDate: new Date().toISOString(),
        status: 'active'
      };

      addPolicy(localPolicy);
      setPolicySaved(true);
      
      // Refresh policies if user is logged in
      if (user) {
        refreshPolicies();
      }
      
      // Reset form and navigate to dashboard
      setShowFlow(false);
      setStep(1);
      setSelectedDevice('');
      setPolicySaved(false);
      setSelectedPricingPlan(null);
      setPricingPlans([]);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', gender: '', idNumber: '',
        deviceModel: '', deviceBrand: '', deviceDescription: '', purchaseDate: '', serialNumber: '', imeiNumber: '', devicePrice: '',
        paymentAccountName: '', mpesaPhoneNumber: ''
      });
      setCurrentView('dashboard');
      refreshPolicies();
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
    setCurrentView('landing');
    setShowFlow(false);
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDashboardClick = () => {
    setCurrentView('dashboard');
    refreshPolicies();
    refreshClaims();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-slate-900 to-neutral-900 text-white">
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

      {currentView === 'dashboard' && user && (
        <>
          {user.role === 'Policy Owner' ? (
            <Dashboard
              user={user}
              onPurchaseClick={startFlow}
              onClaimClick={() => {
                setClaimFormData({
                  policyId: '',
                  claimType: '',
                  incidentDate: '',
                  description: '',
                  estimatedCost: '',
                  deviceOutlet: ''
                });
                setCurrentView('claim');
                setClaimStep(1);
              }}
              onPolicyClick={handlePolicyClick}
              onClaimDetailClick={handleClaimDetailClick}
            />
          ) : user.role === 'Sales Agent' ? (
            <SalesAgentDashboard
              user={user}
              onPurchaseClick={startFlow}
              onClaimClick={() => {
                setClaimFormData({
                  policyId: '',
                  claimType: '',
                  incidentDate: '',
                  description: '',
                  estimatedCost: '',
                  deviceOutlet: ''
                });
                setCurrentView('claim');
                setClaimStep(1);
              }}
            />
          ) : (
            <AdminDashboard
              user={user}
              policies={policies}
              claims={getStoredClaims()}
              onPolicyClick={handlePolicyClick}
              onClaimDetailClick={handleClaimDetailClick}
              onCreateClaim={handleCreateClaim}
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

      {currentView === 'landing' && !showFlow && (
        <LandingPage onGetStarted={startFlow} />
      )}

      <Footer />
    </div>
  );
}
