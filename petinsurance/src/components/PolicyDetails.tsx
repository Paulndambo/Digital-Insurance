import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Shield, 
  PawPrint, 
  User, 
  Calendar, 
  DollarSign, 
  FileText, 
  Plus,
  Edit,
  Download,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Eye
} from 'lucide-react';

interface PolicyDetailsProps {
  policyId: string;
  onBack: () => void;
}

const PolicyDetails: React.FC<PolicyDetailsProps> = ({ policyId, onBack }) => {
  const [showClaimForm, setShowClaimForm] = useState(false);

  // Mock policy data
  const policy = {
    id: 'POL-001',
    owner: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+254745491093',
      address: 'Nairobi, Kenya'
    },
    pets: [
      {
        name: 'Max',
        type: 'Dog',
        breed: 'Golden Retriever',
        age: 3,
        weight: '25kg',
        status: 'Active'
      },
      {
        name: 'Luna',
        type: 'Cat',
        breed: 'Persian',
        age: 2,
        weight: '4kg',
        status: 'Active'
      },
      {
        name: 'Buddy',
        type: 'Dog',
        breed: 'Labrador',
        age: 1,
        weight: '20kg',
        status: 'Active'
      }
    ],
    plan: {
      name: 'Essential',
      premium: 'KSh 400',
      coverage: 'KSh 300,000',
      deductible: 'KSh 5,000',
      coPayment: '10%'
    },
    dates: {
      start: '2024-01-15',
      end: '2025-01-15',
      renewal: '2025-01-15'
    },
    status: 'Active',
    claims: [
      {
        id: 'CLM-001',
        date: '2024-03-15',
        type: 'Accident',
        amount: 'KSh 15,000',
        status: 'Approved',
        description: 'Emergency surgery after car accident'
      },
      {
        id: 'CLM-002',
        date: '2024-02-20',
        type: 'Illness',
        amount: 'KSh 8,500',
        status: 'Approved',
        description: 'Viral infection treatment'
      },
      {
        id: 'CLM-003',
        date: '2024-01-10',
        type: 'Wellness',
        amount: 'KSh 3,200',
        status: 'Pending',
        description: 'Annual vaccination and checkup'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getClaimStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Policy Header */}
        <div className="card-pet p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">Policy {policy.id}</h1>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(policy.status)}`}>
                  {policy.status}
                </span>
              </div>
              <p className="text-gray-600">
                {policy.plan.name} Plan • {policy.pets.length} Pet{policy.pets.length !== 1 ? 's' : ''} Covered
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {policy.pets.map(pet => pet.name).join(', ')} ({policy.pets.map(pet => pet.type).join(', ')})
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <button
                onClick={() => setShowClaimForm(true)}
                className="btn-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Lodge Claim
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Combined Policy Information and Summary */}
            <div className="card-pet p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-orange-600" />
                Policy Information & Summary
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Plan Type:</span>
                  <span className="font-semibold text-gray-900">{policy.plan.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Monthly Premium:</span>
                  <span className="font-semibold text-gray-900">{policy.plan.premium}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Coverage Limit:</span>
                  <span className="font-semibold text-gray-900">{policy.plan.coverage}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Pets Covered:</span>
                  <span className="font-semibold text-gray-900">{policy.pets.length}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Claims Filed:</span>
                  <span className="font-semibold text-gray-900">{policy.claims.length}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-semibold text-gray-900">{policy.dates.start}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">End Date:</span>
                  <span className="font-semibold text-gray-900">{policy.dates.end}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Renewal Date:</span>
                  <span className="font-semibold text-gray-900">{policy.dates.renewal}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Days Remaining:</span>
                  <span className="font-semibold text-gray-900">285 days</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Status:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(policy.status)}`}>
                    {policy.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Information */}
            <div className="card-pet p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-orange-600" />
                Policy Owner
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{policy.owner.name}</h4>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{policy.owner.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{policy.owner.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{policy.owner.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pet Information - Full Width */}
        <div className="mt-6">
          <div className="card-pet p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <PawPrint className="h-5 w-5 mr-2 text-orange-600" />
              Pet Information
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pet Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Breed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Weight
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {policy.pets.slice(0, 3).map((pet, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {pet.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pet.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pet.breed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pet.age} years
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pet.weight}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(pet.status)}`}>
                          {pet.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Policy Premiums Table - Full Width */}
        <div className="mt-6">
          <div className="card-pet p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-orange-600" />
              Policy Premiums
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    {
                      dueDate: '2024-01-15',
                      amount: 'KSh 400',
                      status: 'Paid',
                      paymentMethod: 'M-Pesa'
                    },
                    {
                      dueDate: '2024-02-15',
                      amount: 'KSh 400',
                      status: 'Paid',
                      paymentMethod: 'M-Pesa'
                    },
                    {
                      dueDate: '2024-03-15',
                      amount: 'KSh 400',
                      status: 'Paid',
                      paymentMethod: 'Bank Transfer'
                    },
                    {
                      dueDate: '2024-04-15',
                      amount: 'KSh 400',
                      status: 'Paid',
                      paymentMethod: 'M-Pesa'
                    },
                    {
                      dueDate: '2024-05-15',
                      amount: 'KSh 400',
                      status: 'Pending',
                      paymentMethod: '-'
                    }
                  ].map((premium, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {premium.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {premium.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          premium.status === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {premium.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {premium.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {premium.status === 'Paid' ? (
                            <>
                              <button className="text-blue-600 hover:text-blue-900">
                                <Download className="h-4 w-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <FileText className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <button className="text-orange-600 hover:text-orange-900">
                              <CreditCard className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Claim Form Modal */}
        {showClaimForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lodge New Claim</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pet
                  </label>
                  <select className="form-input w-full">
                    {policy.pets.map((pet, index) => (
                      <option key={index} value={pet.name}>
                        {pet.name} ({pet.type} - {pet.breed})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Claim Type
                  </label>
                  <select className="form-input w-full">
                    <option>Accident</option>
                    <option>Illness</option>
                    <option>Surgery</option>
                    <option>Wellness</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (KSh)
                  </label>
                  <input type="number" className="form-input w-full" placeholder="Enter amount" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea className="form-input w-full" rows={3} placeholder="Describe the incident or treatment"></textarea>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowClaimForm(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    Submit Claim
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicyDetails;
