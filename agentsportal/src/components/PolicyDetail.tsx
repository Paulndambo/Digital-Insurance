import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, Calendar, DollarSign } from 'lucide-react';

const PolicyDetail: React.FC = () => {
  const { id } = useParams();

  // Mock data - in real app, this would be fetched based on ID
  const policy = {
    id: id,
    policyNumber: 'POL-2024-001',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah.johnson@email.com',
    clientPhone: '+1 (555) 123-4567',
    type: 'Auto Insurance',
    product: 'Comprehensive Auto Plus',
    premium: 1200,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    paymentHistory: [
      { date: '2024-01-15', amount: 1200, status: 'paid' },
      { date: '2023-01-15', amount: 1150, status: 'paid' },
      { date: '2022-01-15', amount: 1100, status: 'paid' }
    ],
    statusLog: [
      { date: '2024-01-15', status: 'active', description: 'Policy renewed for 2024' },
      { date: '2023-12-01', status: 'pending', description: 'Renewal notice sent' },
      { date: '2023-01-15', status: 'active', description: 'Policy renewed for 2023' },
      { date: '2022-12-01', status: 'pending', description: 'Renewal notice sent' },
      { date: '2022-01-15', status: 'active', description: 'Policy started' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/policies"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Policies</span>
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{policy.policyNumber}</h1>
            <p className="text-gray-600 mt-2">{policy.type} Policy</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(policy.status)}`}>
            {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Policy Owner Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Policy Owner</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{policy.clientName}</p>
                    <p className="text-sm text-gray-500">Policy Owner</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{policy.clientPhone}</p>
                    <p className="text-sm text-gray-500">Primary Contact</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{policy.clientEmail}</p>
                    <p className="text-sm text-gray-500">Email Address</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Policy Details</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Annual Premium</p>
                    <p className="text-lg font-bold text-gray-900">${policy.premium.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Policy Period</p>
                    <p className="text-sm text-gray-600">
                      {new Date(policy.startDate).toLocaleDateString()} - {new Date(policy.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Policy Type</p>
                  <p className="text-sm text-gray-600">{policy.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Insurance Product</p>
                  <p className="text-sm text-gray-600">{policy.product}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Policy Status Log */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Policy Status Log</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {policy.statusLog.map((log, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">{new Date(log.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600">{log.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Premiums Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Premiums</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {policy.paymentHistory.slice(0, 3).map((payment, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetail;