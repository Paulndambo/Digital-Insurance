import React, { useState, useMemo } from 'react';
import { ArrowLeft, Shield, CheckCircle, XCircle, Star, Calculator, Info, Calendar, Heart, PawPrint, Users, Clock, Award, Zap, Phone, Mail, MapPin, Menu } from 'lucide-react';

interface PlanDetailsProps {
  planId: string;
  onBack: () => void;
  onBuyNow: (planId: string) => void;
}

const plans = [
  {
    id: 'accident_only',
    name: 'Accident Only',
    price: 250,
    description: 'Basic protection for unexpected accidents',
    icon: '🛡️',
    color: 'orange',
    features: [
      'Accident coverage up to KSh 150,000',
      'Emergency vet visits',
      'X-rays & diagnostics',
      'Surgery for accidents',
      '24/7 emergency hotline',
      'Ambulance services',
      'Hospitalization for accidents'
    ],
    exclusions: [
      'Illness treatment',
      'Routine checkups',
      'Vaccinations',
      'Dental care',
      'Pre-existing conditions',
      'Cosmetic procedures'
    ],
    waitingPeriods: {
      accidents: 'Immediate',
      illnesses: 'Not covered',
      wellness: 'Not covered'
    },
    coverageLimit: 'KSh 150,000',
    deductible: 'KSh 5,000',
    coPayment: '10%'
  },
  {
    id: 'essential',
    name: 'Essential',
    price: 400,
    description: 'Complete care for most health issues',
    icon: '🏥',
    color: 'purple',
    features: [
      'Everything in Accident Only',
      'Illness coverage up to KSh 300,000',
      'Prescription medications',
      'Specialist consultations',
      'Lab tests & diagnostics',
      'Chronic condition management',
      'Cancer treatment',
      'Alternative therapies',
      'Physical therapy'
    ],
    exclusions: [
      'Routine checkups',
      'Vaccinations',
      'Dental care',
      'Behavioral therapy',
      'Pre-existing conditions',
      'Breeding-related expenses'
    ],
    waitingPeriods: {
      accidents: 'Immediate',
      illnesses: '14 days',
      wellness: 'Not covered'
    },
    coverageLimit: 'KSh 300,000',
    deductible: 'KSh 5,000',
    coPayment: '10%',
    popular: true
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive',
    price: 600,
    description: 'Complete protection including wellness',
    icon: '👑',
    color: 'pink',
    features: [
      'Everything in Essential',
      'Coverage up to KSh 500,000',
      'Routine checkups & vaccinations',
      'Dental care',
      'Behavioral therapy',
      'Alternative treatments',
      'Pet boarding during hospitalization',
      'Lost pet advertising',
      'Pet theft coverage',
      'Third-party liability',
      'Travel coverage'
    ],
    exclusions: [
      'Pre-existing conditions',
      'Cosmetic procedures',
      'Breeding-related expenses',
      'Experimental treatments'
    ],
    waitingPeriods: {
      accidents: 'Immediate',
      illnesses: '14 days',
      wellness: '30 days'
    },
    coverageLimit: 'KSh 500,000',
    deductible: 'KSh 5,000',
    coPayment: '10%'
  }
];

const PlanDetails: React.FC<PlanDetailsProps> = ({ planId, onBack, onBuyNow }) => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [petCount, setPetCount] = useState(1);
  const [petAge, setPetAge] = useState(2);
  const [petType, setPetType] = useState('dog');
  const [activeTab, setActiveTab] = useState<'overview' | 'coverage' | 'exclusions' | 'waiting'>('overview');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const plan = plans.find(p => p.id === planId);

  const calculatedPrice = useMemo(() => {
    if (!plan) return 0;
    let multiplier = 1;
    
    // Age factor
    if (petAge > 8) multiplier *= 1.5;
    else if (petAge > 5) multiplier *= 1.2;
    
    // Pet type factor
    if (petType === 'cat') multiplier *= 0.8;
    
    // Multiple pets discount
    if (petCount > 1) multiplier *= (0.9 + (petCount - 1) * 0.05);
    
    return Math.round(plan.price * multiplier * petCount);
  }, [plan, petCount, petAge, petType]);

  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-pet">
            <PawPrint className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan Not Found</h2>
          <button
            onClick={onBack}
            className="btn-primary"
          >
            Go Back to Plans
          </button>
        </div>
      </div>
    );
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'orange': return 'from-orange-500 to-orange-600';
      case 'purple': return 'from-purple-500 to-purple-600';
      case 'pink': return 'from-pink-500 to-pink-600';
      default: return 'from-orange-500 to-pink-600';
    }
  };

  const getColorClassesLight = (color: string) => {
    switch (color) {
      case 'orange': return 'from-orange-50 to-orange-100';
      case 'purple': return 'from-purple-50 to-purple-100';
      case 'pink': return 'from-pink-50 to-pink-100';
      default: return 'from-orange-50 to-pink-100';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'coverage', label: 'Coverage', icon: CheckCircle },
    { id: 'exclusions', label: 'Exclusions', icon: XCircle },
    { id: 'waiting', label: 'Waiting Periods', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 sm:h-20 space-x-4">
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors p-2 rounded-lg hover:bg-orange-50"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-medium text-sm sm:text-base hidden sm:inline">Back to Plans</span>
              <span className="font-medium text-sm sm:hidden">Back</span>
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Plan Details</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base hidden sm:block">Learn more about your chosen coverage</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Need help?</div>
                <div className="text-orange-600 font-medium">+254745491093</div>
              </div>
            </div>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-orange-200 py-4">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">Need help?</div>
                <div className="text-orange-600 font-medium text-lg">+254745491093</div>
                <div className="text-xs text-gray-500 mt-1">24/7 Support Available</div>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Hero Section */}
        <div className="card-pet p-4 sm:p-8 mb-6 sm:mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br opacity-10" style={{ background: `linear-gradient(135deg, ${plan.color === 'orange' ? '#f97316' : plan.color === 'purple' ? '#a855f7' : '#ec4899'}, ${plan.color === 'orange' ? '#ea580c' : plan.color === 'purple' ? '#9333ea' : '#db2777'})` }}></div>
          <div className="relative">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${getColorClasses(plan.color)} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-pet`}>
                    <span className="text-2xl sm:text-3xl">{plan.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                      {plan.popular && (
                        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-pet flex items-center space-x-1 w-fit">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>Most Popular</span>
                        </span>
                      )}
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{plan.name}</h1>
                    </div>
                    <p className="text-base sm:text-xl text-gray-600">{plan.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="text-center p-3 sm:p-4 bg-white/80 rounded-lg sm:rounded-xl backdrop-blur-sm">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-1 sm:mb-2">KSh {plan.price}</div>
                    <div className="text-sm sm:text-base text-gray-600">per month</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-white/80 rounded-lg sm:rounded-xl backdrop-blur-sm">
                    <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{plan.coverageLimit}</div>
                    <div className="text-sm sm:text-base text-gray-600">Coverage Limit</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-white/80 rounded-lg sm:rounded-xl backdrop-blur-sm">
                    <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">24/7</div>
                    <div className="text-sm sm:text-base text-gray-600">Support</div>
                  </div>
                </div>
              </div>
              
              
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Mobile Tab Navigation */}
            <div className="lg:hidden bg-white rounded-lg shadow-lg p-2 mb-6">
              <div className="flex space-x-1 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-md font-medium transition-all duration-200 text-sm ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${getColorClasses(plan.color)} text-white shadow-pet`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Tab Navigation */}
            <div className="hidden lg:block bg-white rounded-xl shadow-lg p-2 mb-8">
              <div className="flex space-x-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${getColorClasses(plan.color)} text-white shadow-pet`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="animate-fadeIn">
              {activeTab === 'overview' && (
                <div className="space-y-6 sm:space-y-8">
                  {/* Plan Highlights */}
                  <div className="card-pet p-4 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center space-x-3">
                      <Award className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                      <span>Plan Highlights</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Comprehensive Coverage</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">Protection for accidents, illnesses, and wellness care</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Fast Claims Processing</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">Quick and hassle-free claims within 48 hours</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Network of Vets</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">Access to over 200+ veterinary clinics across Kenya</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-pink-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Pet Wellness</h3>
                          <p className="text-gray-600 text-xs sm:text-sm">Preventive care and routine checkups included</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coverage Summary */}
                  <div className="card-pet p-4 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center space-x-3">
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                      <span>Coverage Summary</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {plan.features.slice(0, 6).map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {plan.features.length > 6 && (
                      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-orange-200">
                        <button className="text-orange-600 hover:text-orange-700 font-medium text-sm sm:text-base">
                          View all {plan.features.length} features →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'coverage' && (
                <div className="card-pet p-4 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    <span>What's Covered</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 sm:p-4 bg-white/50 rounded-lg">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'exclusions' && (
                <div className="card-pet p-4 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center space-x-3">
                    <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                    <span>What's Not Covered</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {plan.exclusions.map((exclusion, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 sm:p-4 bg-white/50 rounded-lg">
                        <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">{exclusion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'waiting' && (
                <div className="card-pet p-4 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center space-x-3">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    <span>Waiting Periods</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg sm:rounded-xl border border-green-200">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="text-sm sm:text-lg font-semibold text-green-900 mb-1 sm:mb-2">Accidents</div>
                      <div className="text-lg sm:text-2xl font-bold text-green-600">{plan.waitingPeriods.accidents}</div>
                      <p className="text-xs sm:text-sm text-green-700 mt-1 sm:mt-2">Coverage starts immediately</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl border border-blue-200">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="text-sm sm:text-lg font-semibold text-blue-900 mb-1 sm:mb-2">Illnesses</div>
                      <div className="text-lg sm:text-2xl font-bold text-blue-600">{plan.waitingPeriods.illnesses}</div>
                      <p className="text-xs sm:text-sm text-blue-700 mt-1 sm:mt-2">Standard waiting period</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg sm:rounded-xl border border-purple-200">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Award className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="text-sm sm:text-lg font-semibold text-purple-900 mb-1 sm:mb-2">Wellness</div>
                      <div className="text-lg sm:text-2xl font-bold text-purple-600">{plan.waitingPeriods.wellness}</div>
                      <p className="text-xs sm:text-sm text-purple-700 mt-1 sm:mt-2">Preventive care benefits</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Pricing Calculator */}
            <div className="card-pet p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Calculator className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                  <span>Price Calculator</span>
                </h3>
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  className="text-orange-600 hover:text-orange-700 text-xs sm:text-sm font-medium"
                >
                  {showCalculator ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showCalculator && (
                <div className="space-y-3 sm:space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Number of Pets</label>
                    <select
                      value={petCount}
                      onChange={(e) => setPetCount(Number(e.target.value))}
                      className="form-input text-sm"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Pet' : 'Pets'}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Pet Type</label>
                    <select
                      value={petType}
                      onChange={(e) => setPetType(e.target.value)}
                      className="form-input text-sm"
                    >
                      <option value="dog">🐕 Dog</option>
                      <option value="cat">🐱 Cat</option>
                      <option value="bird">🦜 Bird</option>
                      <option value="rabbit">🐰 Rabbit</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Average Age</label>
                    <select
                      value={petAge}
                      onChange={(e) => setPetAge(Number(e.target.value))}
                      className="form-input text-sm"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(age => (
                        <option key={age} value={age}>{age} {age === 1 ? 'Year' : 'Years'}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="pt-3 sm:pt-4 border-t border-orange-200">
                    <div className="text-xs sm:text-sm text-gray-600 mb-1">Estimated Monthly Cost</div>
                    <div className="text-lg sm:text-2xl font-bold text-gradient">
                      KSh {calculatedPrice.toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Plan Details */}
            <div className="card-pet p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
                <Info className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                <span>Plan Details</span>
              </h3>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
                <div className="flex justify-between items-center p-2 sm:p-3 bg-white/50 rounded-lg">
                  <span>Coverage Limit:</span>
                  <span className="font-semibold text-gray-900">{plan.coverageLimit}</span>
                </div>
                <div className="flex justify-between items-center p-2 sm:p-3 bg-white/50 rounded-lg">
                  <span>Deductible:</span>
                  <span className="font-semibold text-gray-900">{plan.deductible}</span>
                </div>
                <div className="flex justify-between items-center p-2 sm:p-3 bg-white/50 rounded-lg">
                  <span>Co-payment:</span>
                  <span className="font-semibold text-gray-900">{plan.coPayment}</span>
                </div>
                <div className="flex justify-between items-center p-2 sm:p-3 bg-white/50 rounded-lg">
                  <span>Renewal:</span>
                  <span className="font-semibold text-gray-900">Annual</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="card-pet p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                <span>Need Help?</span>
              </h3>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex items-center space-x-3 p-2 sm:p-3 bg-white/50 rounded-lg">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                  <div>
                    <div className="font-semibold text-gray-900">+254745491093</div>
                    <div className="text-gray-600">24/7 Support</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 sm:p-3 bg-white/50 rounded-lg">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                  <div>
                    <div className="font-semibold text-gray-900">hello@petguard.co.ke</div>
                    <div className="text-gray-600">Email Support</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 sm:p-3 bg-white/50 rounded-lg">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Nairobi, Kenya</div>
                    <div className="text-gray-600">Head Office</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className={`bg-gradient-to-br ${getColorClassesLight(plan.color)} rounded-lg sm:rounded-xl p-4 sm:p-6 text-center border border-orange-200`}>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-pet">
                <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Ready to Protect Your Pet?</h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">Join thousands of pet owners who trust PetGuard</p>
              <button
                onClick={() => onBuyNow(plan.id)}
                className={`w-full bg-gradient-to-r ${getColorClasses(plan.color)} text-white py-2 sm:py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 shadow-pet text-sm sm:text-base`}
              >
                Get Started - KSh {plan.price}/month
              </button>
              <p className="text-xs text-gray-500 mt-2">✓ No commitment • ✓ Cancel anytime • ✓ 30-day money back</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default PlanDetails;
