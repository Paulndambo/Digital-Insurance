import React, { useState } from 'react';
import { CheckCircle, Download, FileText } from 'lucide-react';
import { InsuranceData } from '../types';

interface ReviewAndConfirmProps {
  data: InsuranceData;
  onPrev: () => void;
  onComplete: () => void;
}

const ReviewAndConfirm: React.FC<ReviewAndConfirmProps> = ({ data, onPrev, onComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const downloadPolicy = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pet-insurance-policy.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const getTotalPremium = () => {
    return data.pets.reduce((total, pet) => total + pet.premium, 0);
  };

  const getTotalCoverage = () => {
    return data.pets.reduce((total, pet) => total + pet.cover_amount, 0);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Congratulations! Your Pet Insurance is Active
          </h2>
          
          <p className="text-xl text-gray-600 mb-8">
            Your policy has been successfully processed and is now active. Welcome to PetGuard!
          </p>

          <div className="bg-blue-50 p-6 rounded-xl mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Policy Summary</h3>
            <div className="grid md:grid-cols-2 gap-4 text-blue-800">
              <div className="text-left">
                <p><strong>Policy Start Date:</strong> {data.start_date}</p>
                <p><strong>Total Monthly Premium:</strong> KSh {getTotalPremium().toLocaleString()}</p>
                <p><strong>Total Coverage:</strong> KSh {getTotalCoverage().toLocaleString()}</p>
                <p><strong>Pets Covered:</strong> {data.pets.length}</p>
              </div>
              <div className="text-left">
                <p><strong>Policy Holder:</strong> {data.owner.first_name} {data.owner.last_name}</p>
                <p><strong>Contact:</strong> {data.owner.email}</p>
                <p><strong>Next Payment:</strong> {data.payment_details.debit_order_date} of next month</p>
                <p><strong>Bank:</strong> {data.payment_details.bank_name}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={downloadPolicy}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Download Policy Document</span>
            </button>
            
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="h-5 w-5" />
              <span>Print Policy</span>
            </button>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">What happens next?</h4>
            <ul className="text-sm text-yellow-800 space-y-1 text-left">
              <li>• You'll receive a welcome email with your policy documents within 24 hours</li>
              <li>• Your first premium will be debited on {data.payment_details.debit_order_date} of next month</li>
              <li>• Emergency coverage is effective immediately</li>
              <li>• Illness coverage begins after a 14-day waiting period</li>
              <li>• Download our mobile app to submit claims and manage your policy</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Review & Confirm</h2>
        </div>

        <div className="space-y-8">
          {/* Policy Summary */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Policy Summary</h3>
            <div className="grid md:grid-cols-3 gap-4 text-blue-800">
              <div>
                <p className="font-medium">Coverage Start Date</p>
                <p className="text-lg">{data.start_date}</p>
              </div>
              <div>
                <p className="font-medium">Total Monthly Premium</p>
                <p className="text-2xl font-bold">KSh {getTotalPremium().toLocaleString()}</p>
              </div>
              <div>
                <p className="font-medium">Total Coverage Amount</p>
                <p className="text-2xl font-bold">KSh {getTotalCoverage().toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Policy Holder Information</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p><strong>Name:</strong> {data.owner.first_name} {data.owner.last_name}</p>
                <p><strong>Email:</strong> {data.owner.email}</p>
                <p><strong>Phone:</strong> {data.owner.phone_number}</p>
                <p><strong>ID Number:</strong> {data.owner.id_number}</p>
                <p><strong>Date of Birth:</strong> {data.owner.date_of_birth}</p>
              </div>
              <div>
                <p><strong>Address:</strong> {data.owner.address}</p>
                <p><strong>County:</strong> {data.owner.county}</p>
                <p><strong>Sub County:</strong> {data.owner.sub_county}</p>
                <p><strong>Ward:</strong> {data.owner.ward}</p>
                <p><strong>Occupation:</strong> {data.owner.occupation}</p>
              </div>
            </div>
          </div>

          {/* Pet Information */}
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pet Information</h3>
            <div className="space-y-4">
              {data.pets.map((pet, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">{pet.name}</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Type:</strong> {pet.type}</p>
                      <p><strong>Breed:</strong> {pet.breed}</p>
                      <p><strong>Gender:</strong> {pet.gender}</p>
                      <p><strong>Date of Birth:</strong> {pet.date_of_birth}</p>
                    </div>
                    <div>
                      <p><strong>Cover Type:</strong> {pet.cover_type.replace('_', ' ')}</p>
                      <p><strong>Coverage Amount:</strong> KSh {pet.cover_amount.toLocaleString()}</p>
                      <p><strong>Monthly Premium:</strong> KSh {pet.premium.toLocaleString()}</p>
                      <p><strong>Microchip:</strong> {pet.microchip_number || 'Not provided'}</p>
                    </div>
                    <div>
                      <p><strong>Neutered:</strong> {pet.neutered ? 'Yes' : 'No'}</p>
                      <p><strong>Vaccinated:</strong> {pet.vaccinated ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Information */}
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p><strong>Bank:</strong> {data.payment_details.bank_name}</p>
                <p><strong>Account Type:</strong> {data.payment_details.account_type}</p>
                <p><strong>Account Name:</strong> {data.payment_details.account_name}</p>
                <p><strong>Account Number:</strong> {data.payment_details.account_number}</p>
              </div>
              <div>
                <p><strong>Branch Code:</strong> {data.payment_details.branch_code}</p>
                <p><strong>Debit Order Date:</strong> {data.payment_details.debit_order_date} of each month</p>
                <p><strong>Source of Funds:</strong> {data.payment_details.source_of_funds}</p>
              </div>
            </div>
          </div>

          {/* Beneficiaries */}
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Beneficiaries</h3>
            <div className="space-y-3">
              {data.beneficiaries.map((beneficiary, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Name:</strong> {beneficiary.first_name} {beneficiary.last_name}</p>
                      <p><strong>Email:</strong> {beneficiary.email}</p>
                    </div>
                    <div>
                      <p><strong>Relationship:</strong> {beneficiary.relationship}</p>
                      <p><strong>Phone:</strong> {beneficiary.phone_number}</p>
                    </div>
                    <div>
                      <p><strong>Percentage:</strong> {beneficiary.percentage}%</p>
                      <p><strong>ID Number:</strong> {beneficiary.id_number}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms and Conditions</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <label className="flex items-start space-x-3">
                <input type="checkbox" required className="mt-1" />
                <span>I confirm that all information provided is accurate and complete</span>
              </label>
              <label className="flex items-start space-x-3">
                <input type="checkbox" required className="mt-1" />
                <span>I agree to the terms and conditions of the pet insurance policy</span>
              </label>
              <label className="flex items-start space-x-3">
                <input type="checkbox" required className="mt-1" />
                <span>I authorize PetGuard to debit my account on the specified dates</span>
              </label>
              <label className="flex items-start space-x-3">
                <input type="checkbox" required className="mt-1" />
                <span>I understand the waiting periods and coverage limitations</span>
              </label>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onPrev}
            disabled={isSubmitting}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                <span>Complete Purchase</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndConfirm;