import React, { useState, useMemo, useEffect } from 'react';
import { Search, Users, ChevronDown, ChevronUp, Loader2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../constants/currency';
import { fetchPolicyOwners } from '../utils/api';
import { getStoredAccessToken } from '../utils/storage';

const PolicyOwnersTable = ({ policies }) => {
  const [policyOwners, setPolicyOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch policy owners from API
  useEffect(() => {
    const loadPolicyOwners = async () => {
      setLoading(true);
      setError('');
      try {
        const accessToken = getStoredAccessToken();
        if (!accessToken) {
          throw new Error('Authentication required. Please log in.');
        }
        const data = await fetchPolicyOwners(accessToken);
        setPolicyOwners(data.results || []);
      } catch (err) {
        console.error('Error loading policy owners:', err);
        setError(err.message || 'Failed to load policy owners');
      } finally {
        setLoading(false);
      }
    };

    loadPolicyOwners();
  }, []);

  // Filter and sort
  const filteredAndSortedOwners = useMemo(() => {
    let filtered = policyOwners.filter(owner => {
      const matchesSearch = 
        owner.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.policy_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.phone_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.id_number?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'created_at' || sortField === 'updated_at') {
        aVal = new Date(aVal || 0);
        bVal = new Date(bVal || 0);
      }
      
      if (sortField === 'total_premium' || sortField === 'main_member_premium' || 
          sortField === 'dependent_premium' || sortField === 'total_cover_amount' ||
          sortField === 'main_member_cover_amount' || sortField === 'dependent_cover_amount') {
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
  }, [policyOwners, searchTerm, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedOwners.length / itemsPerPage);
  const paginatedOwners = filteredAndSortedOwners.slice(
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
        <h1 className="text-3xl font-bold mb-2">Policy Owners</h1>
        <p className="text-slate-400">View all policy owners and their membership details</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white/5 rounded-xl p-12 backdrop-blur-sm border border-white/10 text-center mb-6">
          <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-400" />
          <p className="text-slate-400">Loading policy owners...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 backdrop-blur-sm mb-6 flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Search */}
      {!loading && !error && (
        <div className="bg-white/5 rounded-xl p-4 mb-6 backdrop-blur-sm border border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, policy number, phone, or ID number..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
            />
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
                    onClick={() => handleSort('name')}
                  >
                    Name <SortIcon field="name" />
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                    onClick={() => handleSort('policy_number')}
                  >
                    Policy Number <SortIcon field="policy_number" />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">ID Number</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Gender</th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                    onClick={() => handleSort('total_premium')}
                  >
                    Total Premium <SortIcon field="total_premium" />
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                    onClick={() => handleSort('total_cover_amount')}
                  >
                    Total Cover Amount <SortIcon field="total_cover_amount" />
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                    onClick={() => handleSort('created_at')}
                  >
                    Created At <SortIcon field="created_at" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedOwners.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center text-slate-400">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No policy owners found</p>
                    </td>
                  </tr>
                ) : (
                  paginatedOwners.map((owner) => (
                    <tr
                      key={owner.id}
                      className="border-b border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-medium">{owner.name}</td>
                      <td className="px-4 py-3 text-sm font-medium text-blue-400">{owner.policy_number}</td>
                      <td className="px-4 py-3 text-sm text-slate-400">{owner.phone_number || '-'}</td>
                      <td className="px-4 py-3 text-sm text-slate-400">{owner.id_number || '-'}</td>
                      <td className="px-4 py-3 text-sm text-slate-400">{owner.gender || '-'}</td>
                      <td className="px-4 py-3 text-sm text-green-400 font-medium">
                        {formatCurrency(parseFloat(owner.total_premium || 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-blue-400 font-medium">
                        {formatCurrency(parseFloat(owner.total_cover_amount || 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">
                        {owner.created_at ? new Date(owner.created_at).toLocaleDateString() : '-'}
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
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedOwners.length)} of {filteredAndSortedOwners.length} owners
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

export default PolicyOwnersTable;
