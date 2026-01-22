import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, MoreHorizontal } from 'lucide-react';

interface Policy {
  id: string;
  owner: string;
  pet: string;
  plan: string;
  startDate: string;
  endDate: string;
  premium: string;
  status: 'Active' | 'Pending' | 'Expired' | 'Cancelled';
}

interface PoliciesListProps {
  onViewPolicy: (policyId: string) => void;
}

const PoliciesList: React.FC<PoliciesListProps> = ({ onViewPolicy }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const policies: Policy[] = [
    {
      id: 'POL-001',
      owner: 'John Doe',
      pet: 'Max (Dog)',
      plan: 'Essential',
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      premium: 'KSh 400',
      status: 'Active'
    },
    {
      id: 'POL-002',
      owner: 'Jane Smith',
      pet: 'Luna (Cat)',
      plan: 'Comprehensive',
      startDate: '2024-02-01',
      endDate: '2025-02-01',
      premium: 'KSh 600',
      status: 'Active'
    },
    {
      id: 'POL-003',
      owner: 'Mike Johnson',
      pet: 'Buddy (Dog)',
      plan: 'Accident Only',
      startDate: '2024-03-10',
      endDate: '2025-03-10',
      premium: 'KSh 250',
      status: 'Pending'
    },
    {
      id: 'POL-004',
      owner: 'Sarah Wilson',
      pet: 'Whiskers (Cat)',
      plan: 'Essential',
      startDate: '2023-12-01',
      endDate: '2024-12-01',
      premium: 'KSh 400',
      status: 'Expired'
    },
    {
      id: 'POL-005',
      owner: 'David Brown',
      pet: 'Rocky (Dog)',
      plan: 'Comprehensive',
      startDate: '2024-01-20',
      endDate: '2025-01-20',
      premium: 'KSh 600',
      status: 'Active'
    }
  ];

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.pet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || policy.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Policies</h2>
          <p className="text-gray-600">Manage all pet insurance policies</p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0">
          Add New Policy
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
                placeholder="Search policies..."
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
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Expired">Expired</option>
              <option value="Cancelled">Cancelled</option>
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
                  Policy ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Premium
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
              {filteredPolicies.map((policy) => (
                <tr key={policy.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{policy.id}</div>
                    <div className="text-sm text-gray-500">
                      {policy.startDate} - {policy.endDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{policy.owner}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{policy.pet}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{policy.plan}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{policy.premium}</div>
                    <div className="text-sm text-gray-500">per month</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(policy.status)}`}>
                      {policy.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => onViewPolicy(policy.id)}
                        className="text-orange-600 hover:text-orange-900"
                      >
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
          <span className="font-medium">{filteredPolicies.length}</span> results
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

export default PoliciesList;
