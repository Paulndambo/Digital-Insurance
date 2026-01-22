import React, { useState } from 'react';
import { ArrowLeft, Check, Shield, User, PawPrint, CreditCard, Users, FileText } from 'lucide-react';
import PlanSelection from './PlanSelection';
import OwnerDetails from './OwnerDetails';
import PetDetails from './PetDetails';
import PaymentDetails from './PaymentDetails';
import BeneficiaryDetails from './BeneficiaryDetails';
import ReviewAndConfirm from './ReviewAndConfirm';
import { InsuranceData, Pet, Beneficiary, PaymentDetails as PaymentDetailsType } from '../types';

interface PurchaseFlowProps {
  onBack: () => void;
  selectedPlanId?: string;
  onBackToPlans?: () => void;
}

const steps = [
  { id: 'plan', name: 'Plan Selection', icon: Shield, description: 'Choose your coverage' },
  { id: 'owner', name: 'Owner Details', icon: User, description: 'Your information' },
  { id: 'pet', name: 'Pet Details', icon: PawPrint, description: 'Pet information' },
  { id: 'payment', name: 'Payment', icon: CreditCard, description: 'Payment method' },
  { id: 'beneficiaries', name: 'Beneficiaries', icon: Users, description: 'Beneficiary details' },
  { id: 'review', name: 'Review', icon: FileText, description: 'Final review' }
];

const PurchaseFlow: React.FC<PurchaseFlowProps> = ({ onBack, selectedPlanId, onBackToPlans }) => {
  const [currentStep, setCurrentStep] = useState(0); // Always start from step 0
  const [insuranceData, setInsuranceData] = useState<InsuranceData>({
    product: 'Pet Insurance',
    product_type: 'pet_insurance',
    start_date: '',
    owner: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      id_number: '',
      date_of_birth: '',
      address: '',
      county: '',
      sub_county: '',
      ward: '',
      gender: '',
      occupation: '',
      country: 'Kenya',
      scanned_id_card: '',
      passport_photo: ''
    },
    pets: [],
    payment_details: {
      payment_method: '',
      bank_name: '',
      account_type: '',
      account_name: '',
      account_number: '',
      branch_code: '',
      debit_order_date: '',
      source_of_funds: ''
    },
    beneficiaries: []
  });

  const updateOwnerDetails = (owner: any) => {
    setInsuranceData(prev => ({ ...prev, owner }));
  };

  const updatePets = (pets: Pet[]) => {
    setInsuranceData(prev => ({ ...prev, pets }));
  };

  const updatePaymentDetails = (payment_details: PaymentDetailsType) => {
    setInsuranceData(prev => ({ ...prev, payment_details }));
  };

  const updateBeneficiaries = (beneficiaries: Beneficiary[]) => {
    setInsuranceData(prev => ({ ...prev, beneficiaries }));
  };

  const updateStartDate = (start_date: string) => {
    setInsuranceData(prev => ({ ...prev, start_date }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PlanSelection onNext={nextStep} onUpdateStartDate={updateStartDate} selectedPlanId={selectedPlanId} />;
      case 1:
        return <OwnerDetails owner={insuranceData.owner} onUpdate={updateOwnerDetails} onNext={nextStep} onPrev={prevStep} />;
      case 2:
        return <PetDetails pets={insuranceData.pets} onUpdate={updatePets} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <PaymentDetails paymentDetails={insuranceData.payment_details} onUpdate={updatePaymentDetails} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <BeneficiaryDetails beneficiaries={insuranceData.beneficiaries} onUpdate={updateBeneficiaries} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <ReviewAndConfirm data={insuranceData} onPrev={prevStep} onComplete={() => {}} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-orange-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 sm:h-20 space-x-4 sm:space-x-6">
            <button 
              onClick={currentStep === 0 ? onBack : prevStep}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors p-2 rounded-lg hover:bg-orange-50"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-medium text-sm sm:text-base">Back</span>
            </button>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Get Your Pet Insurance</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base hidden sm:block">Complete your application in just a few steps</p>
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

      {/* Back to Plans Link */}
      {onBackToPlans && (
        <div className="bg-gradient-to-r from-orange-50 to-pink-50 border-b border-orange-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
            <button
              onClick={onBackToPlans}
              className="text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center space-x-1 transition-colors"
            >
              <Shield className="h-4 w-4" />
              <span>← Back to Plans</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Progress Bar */}
      <div className="hidden md:block bg-white border-b border-orange-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              const isUpcoming = index > currentStep;
              
              return (
                <div key={index} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                        : isCurrent 
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg ring-4 ring-orange-100' 
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" />
                      )}
                    </div>
                    
                    <div className="mt-3 text-center">
                      <div className={`text-sm font-medium transition-colors ${
                        isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.name}
                      </div>
                      <div className={`text-xs transition-colors ${
                        isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </div>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                      isCompleted ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Progress */}
      <div className="md:hidden bg-white border-b border-orange-200 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep > 0 ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
            }`}>
              {currentStep > 0 ? <Check className="h-4 w-4" /> : <span className="text-sm font-medium">{currentStep + 1}</span>}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-gray-900 truncate">{steps[currentStep].name}</div>
              <div className="text-xs text-gray-500">Step {currentStep + 1} of {steps.length}</div>
            </div>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        {/* Mobile Step Navigation */}
        <div className="mt-3 flex justify-between text-xs text-gray-500">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`text-center flex-1 ${index <= currentStep ? 'text-orange-600 font-medium' : ''}`}
            >
              <div className="hidden sm:block">{step.name}</div>
              <div className="sm:hidden">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="animate-fadeIn">
          {renderStep()}
        </div>
      </div>

      {/* Mobile Floating Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-orange-200 p-4 z-40">
        <div className="flex items-center justify-between">
          <button
            onClick={currentStep === 0 ? onBack : prevStep}
            className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors px-4 py-2 rounded-lg hover:bg-orange-50"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">
              {currentStep === 0 ? 'Back' : 'Previous'}
            </span>
          </button>
          
          <div className="text-center">
            <div className="text-xs text-gray-500">Step {currentStep + 1} of {steps.length}</div>
            <div className="text-sm font-medium text-gray-900">{steps[currentStep].name}</div>
          </div>
          
          {currentStep < steps.length - 1 && (
            <button
              onClick={nextStep}
              className="btn-primary px-4 py-2 text-sm font-medium"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Floating Help - Mobile Adjusted */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 sm:p-4 rounded-full shadow-pet hover:shadow-xl transition-all duration-200 hover:scale-110">
          <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
            <span className="text-base sm:text-lg">?</span>
          </div>
        </button>
      </div>

      {/* Mobile Bottom Spacing */}
      <div className="md:hidden h-20"></div>
    </div>
  );
};

export default PurchaseFlow;