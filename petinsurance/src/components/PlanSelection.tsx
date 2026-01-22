import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, Shield, Heart, Star, Calculator, Info } from 'lucide-react';

interface PlanSelectionProps {
  onNext: () => void;
  onUpdateStartDate: (date: string) => void;
  selectedPlanId?: string;
}

const plans = [
  {
    id: 'accident_only',
    name: 'Accident Only',
    price: 250,
    description: 'Basic protection for unexpected accidents',
    features: [
      'Accident coverage up to KSh 150,000',
      'Emergency vet visits',
      'X-rays & diagnostics',
      'Surgery for accidents',
      '24/7 emergency hotline'
    ],
    exclusions: [
      'Illness treatment',
      'Routine checkups',
      'Vaccinations',
      'Dental care'
    ]
  },
  {
    id: 'essential',
    name: 'Essential',
    price: 400,
    description: 'Complete care for most health issues',
    features: [
      'Everything in Accident Only',
      'Illness coverage up to KSh 300,000',
      'Prescription medications',
      'Specialist consultations',
      'Lab tests & diagnostics',
      'Chronic condition management'
    ],
    exclusions: [
      'Routine checkups',
      'Vaccinations',
      'Dental care',
      'Behavioral therapy'
    ],
    popular: true
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive',
    price: 600,
    description: 'Complete protection including wellness',
    features: [
      'Everything in Essential',
      'Coverage up to KSh 500,000',
      'Routine checkups & vaccinations',
      'Dental care',
      'Behavioral therapy',
      'Alternative treatments',
      'Pet boarding during hospitalization'
    ],
    exclusions: [
      'Pre-existing conditions',
      'Cosmetic procedures',
      'Breeding-related expenses'
    ]
  }
];

const PlanSelection: React.FC<PlanSelectionProps> = ({ onNext, onUpdateStartDate, selectedPlanId }) => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [startDate, setStartDate] = useState('');

  // Pre-select plan if selectedPlanId is provided
  useEffect(() => {
    if (selectedPlanId && plans.some(plan => plan.id === selectedPlanId)) {
      setSelectedPlan(selectedPlanId);
    }
  }, [selectedPlanId]);

  const handleNext = () => {
    if (selectedPlan && startDate) {
      onUpdateStartDate(startDate);
      onNext();
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
        <p className="text-gray-600">Select the perfect coverage for your pet's needs</p>
      </div>

      {/* Plan Selection */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative card-pet p-6 cursor-pointer transition-all ${
              selectedPlan === plan.id
                ? 'ring-2 ring-orange-400 shadow-xl scale-105'
                : 'hover:shadow-lg hover:border-orange-300'
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-pet flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>Most Popular</span>
                </span>
              </div>
            )}
            
            <div className="text-center">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                selectedPlan === plan.id ? 'bg-gradient-to-r from-orange-500 to-pink-500' : 'bg-gray-100'
              }`}>
                <Shield className={`h-8 w-8 ${selectedPlan === plan.id ? 'text-white' : 'text-gray-600'}`} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-gradient">KSh {plan.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 text-left">What's Included:</h4>
                <ul className="space-y-2 text-sm text-gray-600 text-left">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <h4 className="font-semibold text-gray-900 text-left mt-4">Not Covered:</h4>
                <ul className="space-y-2 text-sm text-gray-500 text-left">
                  {plan.exclusions.map((exclusion, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                      </div>
                      <span>{exclusion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Start Date Selection */}
      <div className="card-pet p-6 mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="h-6 w-6 text-orange-600" />
          <h3 className="text-xl font-semibold text-gray-900">Coverage Start Date</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Start Date
            </label>
            <input
              type="date"
              min={today}
              max={maxDateString}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="flex items-center">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-orange-800">
                  <p className="font-semibold mb-1">Coverage Timeline:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Emergency coverage: Immediate</li>
                    <li>• Illness coverage: 14-day waiting period</li>
                    <li>• Wellness benefits: 30-day waiting period</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!selectedPlan || !startDate}
          className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
            selectedPlan && startDate
              ? 'btn-primary'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Owner Details
        </button>
      </div>
    </div>
  );
};

export default PlanSelection;