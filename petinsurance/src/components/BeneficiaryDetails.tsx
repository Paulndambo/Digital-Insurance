import React, { useState } from 'react';
import { Users, Plus, Trash2 } from 'lucide-react';
import { Beneficiary } from '../types';

interface BeneficiaryDetailsProps {
  beneficiaries: Beneficiary[];
  onUpdate: (beneficiaries: Beneficiary[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const relationships = [
  'Spouse', 'Son', 'Daughter', 'Father', 'Mother', 'Brother', 'Sister',
  'Uncle', 'Aunt', 'Cousin', 'Friend', 'Other'
];

const BeneficiaryDetails: React.FC<BeneficiaryDetailsProps> = ({ beneficiaries, onUpdate, onNext, onPrev }) => {
  const [beneficiaryList, setBeneficiaryList] = useState<Beneficiary[]>(
    beneficiaries.length > 0 ? beneficiaries : [createEmptyBeneficiary()]
  );
  const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});

  function createEmptyBeneficiary(): Beneficiary {
    return {
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      phone_number: '',
      id_number: '',
      relationship: '',
      percentage: 100,
      date_of_birth: ''
    };
  }

  const addBeneficiary = () => {
    const newBeneficiary = createEmptyBeneficiary();
    // Calculate remaining percentage
    const totalPercentage = beneficiaryList.reduce((sum, b) => sum + b.percentage, 0);
    newBeneficiary.percentage = Math.max(0, 100 - totalPercentage);
    setBeneficiaryList([...beneficiaryList, newBeneficiary]);
  };

  const removeBeneficiary = (index: number) => {
    if (beneficiaryList.length > 1) {
      const newBeneficiaryList = beneficiaryList.filter((_, i) => i !== index);
      setBeneficiaryList(newBeneficiaryList);
      
      // Remove errors for deleted beneficiary
      const newErrors = { ...errors };
      delete newErrors[index];
      setErrors(newErrors);
    }
  };

  const updateBeneficiary = (index: number, field: keyof Beneficiary, value: any) => {
    const newBeneficiaryList = [...beneficiaryList];
    newBeneficiaryList[index] = { ...newBeneficiaryList[index], [field]: value };
    setBeneficiaryList(newBeneficiaryList);

    // Clear error for this field
    if (errors[index]?.[field]) {
      const newErrors = { ...errors };
      delete newErrors[index][field];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors: Record<number, Record<string, string>> = {};

    // Check total percentage
    const totalPercentage = beneficiaryList.reduce((sum, b) => sum + b.percentage, 0);
    
    beneficiaryList.forEach((beneficiary, index) => {
      const beneficiaryErrors: Record<string, string> = {};

      if (!beneficiary.first_name.trim()) beneficiaryErrors.first_name = 'First name is required';
      if (!beneficiary.last_name.trim()) beneficiaryErrors.last_name = 'Last name is required';
      if (!beneficiary.email.trim()) beneficiaryErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(beneficiary.email)) beneficiaryErrors.email = 'Email is invalid';
      if (!beneficiary.phone_number.trim()) beneficiaryErrors.phone_number = 'Phone number is required';
      if (!beneficiary.id_number.trim()) beneficiaryErrors.id_number = 'ID number is required';
      if (!beneficiary.relationship) beneficiaryErrors.relationship = 'Relationship is required';
      if (!beneficiary.gender) beneficiaryErrors.gender = 'Gender is required';
      if (!beneficiary.date_of_birth) beneficiaryErrors.date_of_birth = 'Date of birth is required';
      if (beneficiary.percentage <= 0) beneficiaryErrors.percentage = 'Percentage must be greater than 0';

      if (Object.keys(beneficiaryErrors).length > 0) {
        newErrors[index] = beneficiaryErrors;
      }
    });

    // Add total percentage error to first beneficiary if needed
    if (totalPercentage !== 100) {
      if (!newErrors[0]) newErrors[0] = {};
      newErrors[0].percentage = `Total percentage must equal 100% (currently ${totalPercentage}%)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onUpdate(beneficiaryList);
      onNext();
    }
  };

  const getTotalPercentage = () => {
    return beneficiaryList.reduce((sum, b) => sum + b.percentage, 0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Beneficiary Details</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-lg font-medium ${
              getTotalPercentage() === 100 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              Total: {getTotalPercentage()}%
            </div>
            <button
              onClick={addBeneficiary}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Beneficiary</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800">
              Beneficiaries will receive the insurance payout in case of a claim. The total percentage must equal 100%.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {beneficiaryList.map((beneficiary, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 relative">
              {beneficiaryList.length > 1 && (
                <button
                  onClick={() => removeBeneficiary(index)}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}

              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Beneficiary {index + 1}
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={beneficiary.first_name}
                      onChange={(e) => updateBeneficiary(index, 'first_name', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors[index]?.first_name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter first name"
                    />
                    {errors[index]?.first_name && <p className="text-red-500 text-sm mt-1">{errors[index].first_name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={beneficiary.last_name}
                      onChange={(e) => updateBeneficiary(index, 'last_name', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors[index]?.last_name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter last name"
                    />
                    {errors[index]?.last_name && <p className="text-red-500 text-sm mt-1">{errors[index].last_name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={beneficiary.email}
                      onChange={(e) => updateBeneficiary(index, 'email', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors[index]?.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter email address"
                    />
                    {errors[index]?.email && <p className="text-red-500 text-sm mt-1">{errors[index].email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={beneficiary.phone_number}
                      onChange={(e) => updateBeneficiary(index, 'phone_number', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors[index]?.phone_number ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="0700000000"
                    />
                    {errors[index]?.phone_number && <p className="text-red-500 text-sm mt-1">{errors[index].phone_number}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ID Number *
                    </label>
                    <input
                      type="text"
                      value={beneficiary.id_number}
                      onChange={(e) => updateBeneficiary(index, 'id_number', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors[index]?.id_number ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter ID number"
                    />
                    {errors[index]?.id_number && <p className="text-red-500 text-sm mt-1">{errors[index].id_number}</p>}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      value={beneficiary.gender}
                      onChange={(e) => updateBeneficiary(index, 'gender', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors[index]?.gender ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {errors[index]?.gender && <p className="text-red-500 text-sm mt-1">{errors[index].gender}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={beneficiary.date_of_birth}
                      onChange={(e) => updateBeneficiary(index, 'date_of_birth', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors[index]?.date_of_birth ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[index]?.date_of_birth && <p className="text-red-500 text-sm mt-1">{errors[index].date_of_birth}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relationship *
                    </label>
                    <select
                      value={beneficiary.relationship}
                      onChange={(e) => updateBeneficiary(index, 'relationship', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors[index]?.relationship ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select relationship</option>
                      {relationships.map(relationship => (
                        <option key={relationship} value={relationship}>{relationship}</option>
                      ))}
                    </select>
                    {errors[index]?.relationship && <p className="text-red-500 text-sm mt-1">{errors[index].relationship}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Percentage Share *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={beneficiary.percentage}
                      onChange={(e) => updateBeneficiary(index, 'percentage', parseInt(e.target.value) || 0)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors[index]?.percentage ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter percentage"
                    />
                    {errors[index]?.percentage && <p className="text-red-500 text-sm mt-1">{errors[index].percentage}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onPrev}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Review & Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryDetails;