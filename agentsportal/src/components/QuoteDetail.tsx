import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, Calendar, DollarSign, CheckCircle, XCircle } from 'lucide-react';

const QuoteDetail: React.FC = () => {
  const { id } = useParams();

  // Mock data - in real app, this would be fetched based on ID
  const quote = {
    id: id,
    quoteNumber: 'QTE-2024-001',
    clientName: 'Jennifer Martinez',
    clientEmail: 'jennifer.martinez@email.com',
    clientPhone: '+1 (555) 987-6543',
    type: 'Life Insurance',
    estimatedPremium: 2800,
    status: 'pending',
    createdDate: '2024-03-15',
    expiryDate: '2024-04-15',
    coverage: {
      deathBenefit: '$500,000',
      termLength: '20 years',
      premiumType: 'Level Premium',
      riders: ['Accidental Death', 'Waiver of Premium']
    },
    clientInfo: {
      age: 35,
      occupation: 'Software Engineer',
      healthStatus: 'Excellent',
      smoker: 'No'
    },
    notes: 'Client is interested in additional riders. Requested competitive pricing comparison.',
    agent: 'John Smith'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = () => {
    // In real app, this would make an API call
    alert('Quote approved successfully!');
  };

  const handleDecline = () => {
    // In real app, this would make an API call
    alert('Quote declined.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/quotes"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Quotes</span>
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{quote.quoteNumber}</h1>
            <p className="text-gray-600 mt-2">{quote.type} Quote Details</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(quote.status)}`}>
              {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
            </span>
            {quote.status === 'pending' && (
              <div className="flex space-x-2">
                <button
                  onClick={handleApprove}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={handleDecline}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Decline</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Client Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{quote.clientName}</p>
                    <p className="text-sm text-gray-500">{quote.clientEmail}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{quote.clientPhone}</p>
                    <p className="text-sm text-gray-500">Primary Contact</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Age</p>
                  <p className="text-sm text-gray-600">{quote.clientInfo.age} years old</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Occupation</p>
                  <p className="text-sm text-gray-600">{quote.clientInfo.occupation}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Health Status</p>
                  <p className="text-sm text-gray-600">{quote.clientInfo.healthStatus}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Smoker</p>
                  <p className="text-sm text-gray-600">{quote.clientInfo.smoker}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coverage Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Coverage Details</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Death Benefit</p>
                  <p className="text-sm text-gray-600">{quote.coverage.deathBenefit}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Term Length</p>
                  <p className="text-sm text-gray-600">{quote.coverage.termLength}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Premium Type</p>
                  <p className="text-sm text-gray-600">{quote.coverage.premiumType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Additional Riders</p>
                  <div className="space-y-1">
                    {quote.coverage.riders.map((rider, index) => (
                      <p key={index} className="text-sm text-gray-600">• {rider}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600">{quote.notes}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quote Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quote Summary</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Estimated Premium</span>
                <span className="text-lg font-bold text-gray-900">${quote.estimatedPremium.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-500 text-center">per year</div>
              <hr />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Quote Created</span>
                <span className="text-sm font-medium text-gray-900">{new Date(quote.createdDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Expires</span>
                <span className="text-sm font-medium text-gray-900">{new Date(quote.expiryDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Agent</span>
                <span className="text-sm font-medium text-gray-900">{quote.agent}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Send to Client
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Generate PDF
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Schedule Follow-up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetail;