import React, { useState } from 'react';
import { ArrowLeft, PawPrint, Calculator, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface QuickQuoteProps {
  onBack: () => void;
  onProceedToPurchase: () => void;
}

const petTypes = [
  { id: 'dog', name: 'Dog', icon: '🐕' },
  { id: 'cat', name: 'Cat', icon: '🐱' },
  { id: 'bird', name: 'Bird', icon: '🦜' },
  { id: 'rabbit', name: 'Rabbit', icon: '🐰' },
  { id: 'other', name: 'Other', icon: '🐾' }
];

const petAges = [
  { id: 'puppy', name: 'Puppy/Kitten (0-1 year)', icon: '🐾' },
  { id: 'young', name: 'Young (1-3 years)', icon: '🐕' },
  { id: 'adult', name: 'Adult (3-7 years)', icon: '🐕' },
  { id: 'senior', name: 'Senior (7+ years)', icon: '🐕' }
];

const coverageTypes = [
  { id: 'basic', name: 'Basic Coverage', description: 'Essential protection', icon: '🛡️' },
  { id: 'comprehensive', name: 'Comprehensive', description: 'Full protection', icon: '🏥' },
  { id: 'premium', name: 'Premium Care', description: 'Complete peace of mind', icon: '👑' }
];

const QuickQuote: React.FC<QuickQuoteProps> = ({ onBack, onProceedToPurchase }) => {
  const [step, setStep] = useState<'quote' | 'contact'>('quote');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [quoteData, setQuoteData] = useState({
    petType: '',
    petAge: '',
    coverage: '',
    petCount: 1,
    contact: {
      name: '',
      phone: '',
      email: ''
    }
  });

  const calculateQuote = () => {
    let basePrice = 0;
    
    // Base price by pet type
    switch (quoteData.petType) {
      case 'dog': basePrice = 2500; break;
      case 'cat': basePrice = 2000; break;
      case 'bird': basePrice = 1500; break;
      case 'rabbit': basePrice = 1800; break;
      case 'other': basePrice = 2000; break;
      default: return 0;
    }
    
    // Age multiplier
    let ageMultiplier = 1;
    switch (quoteData.petAge) {
      case 'puppy': ageMultiplier = 1.2; break;
      case 'young': ageMultiplier = 1.0; break;
      case 'adult': ageMultiplier = 1.1; break;
      case 'senior': ageMultiplier = 1.3; break;
    }
    
    // Coverage multiplier
    let coverageMultiplier = 1;
    switch (quoteData.coverage) {
      case 'basic': coverageMultiplier = 1.0; break;
      case 'comprehensive': coverageMultiplier = 1.5; break;
      case 'premium': coverageMultiplier = 2.0; break;
    }
    
    // Pet count discount
    let petCountDiscount = 1;
    if (quoteData.petCount === 2) petCountDiscount = 0.9;
    else if (quoteData.petCount >= 3) petCountDiscount = 0.85;
    
    return Math.round(basePrice * ageMultiplier * coverageMultiplier * petCountDiscount * quoteData.petCount);
  };

  const handleQuoteSubmit = () => {
    if (quoteData.petType && quoteData.petAge && quoteData.coverage) {
      setStep('contact');
    }
  };

  const validateContactForm = () => {
    const errors: Record<string, string> = {};
    
    if (!quoteData.contact.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!quoteData.contact.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else {
      // Kenyan phone number validation
      const phoneRegex = /^(\+254|0)[17]\d{8}$/;
      if (!phoneRegex.test(quoteData.contact.phone.replace(/\s/g, ''))) {
        errors.phone = 'Please enter a valid Kenyan phone number';
      }
    }
    
    if (!quoteData.contact.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(quoteData.contact.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }
    
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRequestCallback = async () => {
    if (!validateContactForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Submit quote data
    const submissionData = {
      ...quoteData,
      action: 'callback_request',
      estimatedPrice: calculateQuote()
    };
    
    console.log('Quote submission:', submissionData);
    alert('Thank you! We\'ll call you within 2 hours to discuss your quote.');
    
    setIsSubmitting(false);
    onBack();
  };

  const handleProceedToPurchase = async () => {
    if (!validateContactForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Submit quote data
    const submissionData = {
      ...quoteData,
      action: 'proceed_to_purchase',
      estimatedPrice: calculateQuote()
    };
    
    console.log('Quote submission:', submissionData);
    
    setIsSubmitting(false);
    onProceedToPurchase();
  };

  const handleContactFieldChange = (field: string, value: string) => {
    setQuoteData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
    
    // Clear error when user starts typing
    if (contactErrors[field]) {
      setContactErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const estimatedPrice = calculateQuote();

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-orange-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 sm:h-20 space-x-4 sm:space-x-6">
            <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors p-2 rounded-lg hover:bg-orange-50">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-medium text-sm sm:text-base">Back to Home</span>
            </button>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Get Your Quote</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base hidden sm:block">Quick and easy - get your personalized quote in seconds</p>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Need help?</div>
                <div className="text-orange-600 font-medium">1-800-PET-GUARD</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 'contact' ? (
          <div className="animate-fadeIn">
            {/* Quote Summary */}
            <div className="card-pet p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Your Quote Summary</h2>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gradient">KSh {estimatedPrice.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">per month</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{petTypes.find(p => p.id === quoteData.petType)?.icon}</span>
                  <span className="text-gray-700">{petTypes.find(p => p.id === quoteData.petType)?.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🐾</span>
                  <span className="text-gray-700">{petAges.find(p => p.id === quoteData.petAge)?.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{coverageTypes.find(c => c.id === quoteData.coverage)?.icon}</span>
                  <span className="text-gray-700">{coverageTypes.find(c => c.id === quoteData.coverage)?.name}</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-pet p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-pet">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Your Quote</h2>
                <p className="text-gray-600">Enter your contact details to receive your personalized quote</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={quoteData.contact.name}
                      onChange={(e) => handleContactFieldChange('name', e.target.value)}
                      className={`form-input ${contactErrors.name ? 'form-input-error' : ''}`}
                      placeholder="Enter your full name"
                    />
                    {contactErrors.name ? (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                    ) : quoteData.contact.name && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  {contactErrors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{contactErrors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      value={quoteData.contact.phone}
                      onChange={(e) => handleContactFieldChange('phone', e.target.value)}
                      className={`form-input ${contactErrors.phone ? 'form-input-error' : ''}`}
                      placeholder="e.g., +254 700 123 456"
                    />
                    {contactErrors.phone ? (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                    ) : quoteData.contact.phone && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  {contactErrors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{contactErrors.phone}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={quoteData.contact.email}
                      onChange={(e) => handleContactFieldChange('email', e.target.value)}
                      className={`form-input ${contactErrors.email ? 'form-input-error' : ''}`}
                      placeholder="Enter your email address"
                    />
                    {contactErrors.email ? (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                    ) : quoteData.contact.email && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  {contactErrors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{contactErrors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <button
                  onClick={handleRequestCallback}
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      <span>Requesting Callback...</span>
                    </>
                  ) : (
                    <>
                      <Phone className="h-4 w-4" />
                      <span>Request Callback</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleProceedToPurchase}
                  disabled={isSubmitting}
                  className="w-full btn-pet flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Purchase</span>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setStep('quote')}
                  disabled={isSubmitting}
                  className="w-full btn-secondary"
                >
                  Back to Quote
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn">
            {/* Quote Form */}
            <div className="card-pet p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-pet">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Your Quote</h2>
                <p className="text-gray-600">Tell us about your pets and we'll give you a personalized quote</p>
              </div>

              <div className="space-y-8">
                {/* Pet Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    What type of pet do you have? *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {petTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setQuoteData(prev => ({ ...prev, petType: type.id }))}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          quoteData.petType === type.id
                            ? 'border-orange-500 bg-orange-50 shadow-pet'
                            : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                        }`}
                      >
                        <div className="text-3xl mb-2">{type.icon}</div>
                        <div className="text-sm font-medium text-gray-900">{type.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pet Age Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    How old is your pet? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {petAges.map((age) => (
                      <button
                        key={age.id}
                        onClick={() => setQuoteData(prev => ({ ...prev, petAge: age.id }))}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          quoteData.petAge === age.id
                            ? 'border-orange-500 bg-orange-50 shadow-pet'
                            : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                        }`}
                      >
                        <div className="text-2xl mb-2">{age.icon}</div>
                        <div className="text-sm font-medium text-gray-900">{age.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coverage Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    What level of coverage do you need? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {coverageTypes.map((coverage) => (
                      <button
                        key={coverage.id}
                        onClick={() => setQuoteData(prev => ({ ...prev, coverage: coverage.id }))}
                        className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                          quoteData.coverage === coverage.id
                            ? 'border-orange-500 bg-orange-50 shadow-pet'
                            : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                        }`}
                      >
                        <div className="text-3xl mb-3">{coverage.icon}</div>
                        <div className="text-lg font-bold text-gray-900 mb-1">{coverage.name}</div>
                        <div className="text-sm text-gray-600">{coverage.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pet Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    How many pets do you want to insure?
                  </label>
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setQuoteData(prev => ({ ...prev, petCount: Math.max(1, prev.petCount - 1) }))}
                      className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                    >
                      <span className="text-xl font-bold text-gray-600">-</span>
                    </button>
                    <div className="text-2xl font-bold text-gray-900 min-w-[3rem] text-center">
                      {quoteData.petCount}
                    </div>
                    <button
                      onClick={() => setQuoteData(prev => ({ ...prev, petCount: prev.petCount + 1 }))}
                      className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                    >
                      <span className="text-xl font-bold text-gray-600">+</span>
                    </button>
                  </div>
                </div>

                {/* Estimated Price */}
                {estimatedPrice > 0 && (
                  <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-6 text-center border border-orange-200">
                    <div className="text-sm text-gray-600 mb-2">Estimated Monthly Premium</div>
                    <div className="text-4xl font-bold text-gradient">KSh {estimatedPrice.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 mt-1">per month</div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleQuoteSubmit}
                  disabled={!quoteData.petType || !quoteData.petAge || !quoteData.coverage}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Get My Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickQuote;
