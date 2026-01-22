import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { PaymentDetails as PaymentDetailsType } from '../types';

interface PaymentDetailsProps {
  paymentDetails: PaymentDetailsType;
  onUpdate: (paymentDetails: PaymentDetailsType) => void;
  onNext: () => void;
  onPrev: () => void;
}

const banks = [
  'Equity Bank Kenya', 'KCB Bank Kenya', 'Cooperative Bank of Kenya', 'ABSA Bank Kenya',
  'Standard Chartered Bank Kenya', 'NCBA Bank Kenya', 'DTB Kenya', 'I&M Bank Kenya',
  'Family Bank', 'Diamond Trust Bank', 'Other'
];

const accountTypes = ['Savings', 'Current', 'Fixed Deposit'];
const debitOrderDates = ['1', '3', '5', '10', '15', '20', '25', '28'];
const sourceOfFunds = ['Employment', 'Business', 'Investment', 'Pension', 'Other'];

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ paymentDetails, onUpdate, onNext, onPrev }) => {
  const [formData, setFormData] = useState<PaymentDetailsType>({
    ...paymentDetails,
    payment_method: paymentDetails.payment_method || 'bank'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof PaymentDetailsType, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.bank_name) newErrors.bank_name = 'Bank name is required';
    if (!formData.account_type) newErrors.account_type = 'Account type is required';
    if (!formData.account_name.trim()) newErrors.account_name = 'Account name is required';
    if (!formData.account_number.trim()) newErrors.account_number = 'Account number is required';
    if (!formData.branch_code.trim()) newErrors.branch_code = 'Branch code is required';
    if (!formData.debit_order_date) newErrors.debit_order_date = 'Debit order date is required';
    if (!formData.source_of_funds) newErrors.source_of_funds = 'Source of funds is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onUpdate(formData);
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <CreditCard className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
        </div>

        <div className="mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Payment Method</h3>
            <p className="text-blue-800">
              We use secure debit order payments directly from your bank account for your convenience and security.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bank Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name *
                </label>
                <select
                  value={formData.bank_name}
                  onChange={(e) => handleChange('bank_name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.bank_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select your bank</option>
                  {banks.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
                {errors.bank_name && <p className="text-red-500 text-sm mt-1">{errors.bank_name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type *
                </label>
                <select
                  value={formData.account_type}
                  onChange={(e) => handleChange('account_type', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.account_type ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select account type</option>
                  {accountTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.account_type && <p className="text-red-500 text-sm mt-1">{errors.account_type}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Name *
                </label>
                <input
                  type="text"
                  value={formData.account_name}
                  onChange={(e) => handleChange('account_name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.account_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter account holder name"
                />
                {errors.account_name && <p className="text-red-500 text-sm mt-1">{errors.account_name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number *
                </label>
                <input
                  type="text"
                  value={formData.account_number}
                  onChange={(e) => handleChange('account_number', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.account_number ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter account number"
                />
                {errors.account_number && <p className="text-red-500 text-sm mt-1">{errors.account_number}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch Code *
                </label>
                <input
                  type="text"
                  value={formData.branch_code}
                  onChange={(e) => handleChange('branch_code', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.branch_code ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter branch code"
                />
                {errors.branch_code && <p className="text-red-500 text-sm mt-1">{errors.branch_code}</p>}
              </div>
            </div>
          </div>

          {/* Payment Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Preferences</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Debit Order Date *
                </label>
                <select
                  value={formData.debit_order_date}
                  onChange={(e) => handleChange('debit_order_date', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.debit_order_date ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select debit order date</option>
                  {debitOrderDates.map(date => (
                    <option key={date} value={date}>
                      {date}{date === '1' ? 'st' : date === '3' ? 'rd' : 'th'} of each month
                    </option>
                  ))}
                </select>
                {errors.debit_order_date && <p className="text-red-500 text-sm mt-1">{errors.debit_order_date}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source of Funds *
                </label>
                <select
                  value={formData.source_of_funds}
                  onChange={(e) => handleChange('source_of_funds', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.source_of_funds ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select source of funds</option>
                  {sourceOfFunds.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
                {errors.source_of_funds && <p className="text-red-500 text-sm mt-1">{errors.source_of_funds}</p>}
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-yellow-900 mb-2">Important Notes:</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Your first premium will be debited on the selected date after policy activation</li>
                <li>• Ensure sufficient funds are available on the debit order date</li>
                <li>• Failed debit orders may result in policy suspension</li>
                <li>• You can change your debit order date by contacting customer service</li>
              </ul>
            </div>
          </div>
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
            Continue to Beneficiaries
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;