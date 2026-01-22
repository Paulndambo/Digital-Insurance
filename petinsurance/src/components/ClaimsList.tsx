import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, MoreHorizontal } from 'lucide-react';

interface Claim {
  id: string;
  policyId: string;
  pet: string;
  owner: string;
  amount: string;
  date: string;
  type: string;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Paid';
  description: string;
}

const ClaimsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const claims: Claim[] = [
    {
      id: 'CLM-001',
      policyId: 'POL-001',
      pet: 'Max (Dog)',
      owner: 'John Doe',
      amount: 'KSh 15,000',
      date: '2024-03-15',
      type: 'Accident',
      status: 'Approved',
      description: 'Emergency surgery after car accident'
    },
    {
      id: 'CLM-002',
      policyId: 'POL-002',
      pet: 'Luna (Cat)',
      owner: 'Jane Smith',
      amount: 'KSh 8,500',
      date: '2024-03-14',
      type: 'Illness',
      status: 'Pending',
      description: 'Treatment for respiratory infection'
    },
    {
      id: 'CLM-003',
      policyId: 'POL-003',
      pet: 'Buddy (Dog)',
      owner: 'Mike Johnson',
      amount: 'KSh 22,000',
      date: '2024-03-13',
      type: 'Surgery',
      status: 'Under Review',
      description: 'Hip dysplasia surgery'
    },
    {
      id: 'CLM-004',
      policyId: 'POL-004',
      pet: 'Whiskers (Cat)',
      owner: 'Sarah Wilson',
      amount: 'KSh 5,000',
      date: '2024-03-12',
      type: 'Wellness',
      status: 'Paid',
      description: 'Annual vaccination and checkup'
    },
    {
      id: 'CLM-005',
      policyId: 'POL-005',
      pet: 'Rocky (Dog)',
      owner: 'David Brown',
      amount: 'KSh 12,000',
      date: '2024-03-11',
      type: 'Accident',
      status: 'Rejected',
      description: 'Broken leg from fall'
    }
  ];

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.pet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Paid': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Accident': return '🚗';
      case 'Illness': return '🏥';
      case 'Surgery': return '⚕️';
      case 'Wellness': return '💉';
      default: return '📋';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Claims</h2>
          <p className="text-gray-600">Manage all insurance claims</p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0">
          New Claim
        </button>
      </div>

      {/* Filters */}
      <div className="card-pet p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search claims..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 w-full"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input w-full"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card-pet overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Claim ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Policy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pet & Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{claim.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{claim.policyId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{claim.pet}</div>
                    <div className="text-sm text-gray-500">{claim.owner}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getTypeIcon(claim.type)}</span>
                      <span className="text-sm text-gray-900">{claim.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{claim.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{claim.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-orange-600 hover:text-orange-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
          <span className="font-medium">{filteredClaims.length}</span> results
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 text-sm text-white bg-orange-600 border border-orange-600 rounded-md">
            1
          </button>
          <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimsList;
