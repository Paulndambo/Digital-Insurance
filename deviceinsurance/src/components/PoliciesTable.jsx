import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Shield, ChevronDown, ChevronUp, Loader2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../constants/currency';
import { fetchPolicies } from '../utils/api';
import { getStoredAccessToken } from '../utils/storage';

const PoliciesTable = ({ onPolicyClick }) => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('start_date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch policies from API
  useEffect(() => {
    const loadPolicies = async () => {
      setLoading(true);
      setError('');
      try {
        const accessToken = getStoredAccessToken();
        if (!accessToken) {
          throw new Error('Authentication required. Please log in.');
        }
        const data = await fetchPolicies(accessToken);
        setPolicies(data.results || []);
      } catch (err) {
        console.error('Error loading policies:', err);
        setError(err.message || 'Failed to load policies');
      } finally {
        setLoading(false);
      }
    };

    loadPolicies();
  }, []);

  // Get unique statuses for filter
  const statuses = ['all', ...new Set(policies.map(p => p.status))];

  // Filter and sort policies
  const filteredAndSortedPolicies = useMemo(() => {
    let filtered = policies.filter(policy => {
      const matchesSearch = 
        policy.policy_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.policy_owner_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.cover_amount?.toString().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || policy.status?.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'start_date' || sortField === 'maturity_date' || sortField === 'created_at' || sortField === 'updated_at') {
        aVal = new Date(aVal || 0);
        bVal = new Date(bVal || 0);
      }
      
      if (sortField === 'premium' || sortField === 'cover_amount') {
        aVal = parseFloat(aVal || 0);
        bVal = parseFloat(bVal || 0);
      }
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [policies, searchTerm, statusFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPolicies.length / itemsPerPage);
  const paginatedPolicies = filteredAndSortedPolicies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 inline ml-1" /> : 
      <ChevronDown className="w-4 h-4 inline ml-1" />;
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Policies</h1>
        <p className="text-slate-400">Manage all insurance policies</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white/5 rounded-xl p-12 backdrop-blur-sm border border-white/10 text-center mb-6">
          <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-400" />
          <p className="text-slate-400">Loading policies...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 backdrop-blur-sm mb-6 flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Filters and Search */}
      {!loading && !error && (
        <div className="bg-white/5 rounded-xl p-4 mb-6 backdrop-blur-sm border border-white/10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by policy number, owner name, or cover amount..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              {statuses.map(status => (
                <option key={status} value={status} className="bg-slate-800">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10 border-b border-white/20">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                  onClick={() => handleSort('policy_number')}
                >
                  Policy Number <SortIcon field="policy_number" />
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                  onClick={() => handleSort('policy_owner_name')}
                >
                  Policy Owner <SortIcon field="policy_owner_name" />
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                  onClick={() => handleSort('cover_amount')}
                >
                  Cover Amount <SortIcon field="cover_amount" />
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                  onClick={() => handleSort('premium')}
                >
                  Premium <SortIcon field="premium" />
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                  onClick={() => handleSort('status')}
                >
                  Status <SortIcon field="status" />
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                  onClick={() => handleSort('start_date')}
                >
                  Start Date <SortIcon field="start_date" />
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                  onClick={() => handleSort('maturity_date')}
                >
                  Maturity Date <SortIcon field="maturity_date" />
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedPolicies.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center text-slate-400">
                    <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No policies found</p>
                  </td>
                </tr>
              ) : (
                paginatedPolicies.map((policy) => (
                  <tr
                    key={policy.id}
                    onClick={() => onPolicyClick && onPolicyClick(policy.id)}
                    className={`border-b border-white/10 transition-colors ${
                      onPolicyClick ? 'hover:bg-white/10 cursor-pointer' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-blue-400">
                      {policy.policy_number}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {policy.policy_owner_name}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {formatCurrency(parseFloat(policy.cover_amount || 0))}
                    </td>
                    <td className="px-4 py-3 text-sm text-blue-400 font-medium">
                      {formatCurrency(parseFloat(policy.premium || 0))}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        policy.status?.toLowerCase() === 'created' 
                          ? 'bg-green-500/20 text-green-400'
                          : policy.status?.toLowerCase() === 'active'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {policy.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {policy.start_date ? new Date(policy.start_date).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {policy.maturity_date ? new Date(policy.maturity_date).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-4 border-t border-white/10 flex items-center justify-between">
            <div className="text-sm text-slate-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedPolicies.length)} of {filteredAndSortedPolicies.length} policies
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
        </div>
      )}
    </div>
  );
};

export default PoliciesTable;
