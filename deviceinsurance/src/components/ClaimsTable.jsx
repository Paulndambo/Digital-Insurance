import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, FileText, ChevronDown, ChevronUp, Loader2, AlertCircle, Plus } from 'lucide-react';
import { formatCurrency } from '../constants/currency';
import { claimStatusColors } from '../constants/claimTypes';
import { fetchClaims } from '../utils/api';
import { getStoredAccessToken } from '../utils/storage';

const ClaimsTable = ({ onClaimDetailClick, onCreateClaim }) => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch claims from API
  useEffect(() => {
    const loadClaims = async () => {
      setLoading(true);
      setError('');
      try {
        const accessToken = getStoredAccessToken();
        if (!accessToken) {
          throw new Error('Authentication required. Please log in.');
        }
        const data = await fetchClaims(accessToken);
        setClaims(data.results || []);
      } catch (err) {
        console.error('Error loading claims:', err);
        setError(err.message || 'Failed to load claims');
      } finally {
        setLoading(false);
      }
    };

    loadClaims();
  }, []);

  // Get unique statuses for filter
  const statuses = ['all', ...new Set(claims.map(c => c.status))];

  // Filter and sort claims
  const filteredAndSortedClaims = useMemo(() => {
    let filtered = claims.filter(claim => {
      const matchesSearch = 
        claim.claim_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.claim_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.policy_number?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || claim.status?.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'created_at' || sortField === 'updated_at' || sortField === 'incident_date') {
        aVal = new Date(aVal || 0);
        bVal = new Date(bVal || 0);
      }
      
      if (sortField === 'estimated_cost') {
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
  }, [claims, searchTerm, statusFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedClaims.length / itemsPerPage);
  const paginatedClaims = filteredAndSortedClaims.slice(
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Claims</h1>
          <p className="text-slate-400">Manage all insurance claims</p>
        </div>
        {onCreateClaim && (
          <button
            onClick={onCreateClaim}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 shadow-xl rounded-full font-semibold transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Claim
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white/5 rounded-xl p-12 backdrop-blur-sm border border-white/10 text-center mb-6">
          <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-400" />
          <p className="text-slate-400">Loading claims...</p>
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
              placeholder="Search by claim number, type, policy number, or description..."
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
                  onClick={() => handleSort('claim_number')}
                >
                  Claim Number <SortIcon field="claim_number" />
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                  onClick={() => handleSort('claim_type')}
                >
                  Type <SortIcon field="claim_type" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Policy Number</th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                  onClick={() => handleSort('estimated_cost')}
                >
                  Estimated Cost <SortIcon field="estimated_cost" />
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                  onClick={() => handleSort('status')}
                >
                  Status <SortIcon field="status" />
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                  onClick={() => handleSort('incident_date')}
                >
                  Incident Date <SortIcon field="incident_date" />
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                  onClick={() => handleSort('created_at')}
                >
                  Submitted <SortIcon field="created_at" />
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedClaims.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center text-slate-400">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No claims found</p>
                  </td>
                </tr>
              ) : (
                paginatedClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    onClick={() => onClaimDetailClick && onClaimDetailClick(claim.id)}
                    className={`border-b border-white/10 transition-colors ${
                      onClaimDetailClick ? 'hover:bg-white/10 cursor-pointer' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-blue-400">
                      {claim.claim_number}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold capitalize">
                        {claim.claim_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {claim.policy_number}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {formatCurrency(parseFloat(claim.estimated_cost || 0))}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        claimStatusColors[claim.status?.toLowerCase()] || claimStatusColors.pending
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {claim.incident_date ? new Date(claim.incident_date).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {claim.created_at ? new Date(claim.created_at).toLocaleDateString() : '-'}
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
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedClaims.length)} of {filteredAndSortedClaims.length} claims
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

export default ClaimsTable;
