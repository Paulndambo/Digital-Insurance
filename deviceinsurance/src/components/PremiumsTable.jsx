import React, { useState, useMemo, useEffect } from 'react';
import { Search, DollarSign, ChevronDown, ChevronUp, Loader2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../constants/currency';
import { fetchPremiums } from '../utils/api';
import { getStoredAccessToken } from '../utils/storage';

const PremiumsTable = ({ policies }) => {
  const [premiums, setPremiums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('expected_date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch premiums from API
  useEffect(() => {
    const loadPremiums = async () => {
      setLoading(true);
      setError('');
      try {
        const accessToken = getStoredAccessToken();
        if (!accessToken) {
          throw new Error('Authentication required. Please log in.');
        }
        const data = await fetchPremiums(accessToken);
        setPremiums(data.results || []);
      } catch (err) {
        console.error('Error loading premiums:', err);
        setError(err.message || 'Failed to load premiums');
      } finally {
        setLoading(false);
      }
    };

    loadPremiums();
  }, []);

  // Get unique statuses for filter
  const statuses = ['all', ...new Set(premiums.map(p => p.status))];

  // Filter and sort premiums
  const filteredAndSortedPremiums = useMemo(() => {
    let filtered = premiums.filter(premium => {
      const matchesSearch = 
        premium.policy_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        premium.reference?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || premium.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'expected_date' || sortField === 'created_at' || sortField === 'updated_at') {
        aVal = new Date(aVal || 0);
        bVal = new Date(bVal || 0);
      }
      
      if (sortField === 'expected_amount' || sortField === 'balance') {
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
  }, [premiums, searchTerm, statusFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPremiums.length / itemsPerPage);
  const paginatedPremiums = filteredAndSortedPremiums.slice(
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

  // Calculate totals
  const totalExpectedAmount = premiums.reduce((sum, p) => sum + parseFloat(p.expected_amount || 0), 0);
  const totalBalance = premiums.reduce((sum, p) => sum + parseFloat(p.balance || 0), 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Premiums</h1>
        <p className="text-slate-400">View all premium payments and statistics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Expected Amount</span>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">{formatCurrency(totalExpectedAmount)}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Balance</span>
            <DollarSign className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400">{formatCurrency(totalBalance)}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Premiums</span>
            <DollarSign className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-400">
            {premiums.length}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white/5 rounded-xl p-12 backdrop-blur-sm border border-white/10 text-center mb-6">
          <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-400" />
          <p className="text-slate-400">Loading premiums...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 backdrop-blur-sm mb-6 flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Search and Filters */}
      {!loading && !error && (
        <div className="bg-white/5 rounded-xl p-4 mb-6 backdrop-blur-sm border border-white/10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by policy number or reference..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
              />
            </div>
            <div className="flex items-center gap-2">
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
                    onClick={() => handleSort('expected_amount')}
                  >
                    Expected Amount <SortIcon field="expected_amount" />
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                    onClick={() => handleSort('balance')}
                  >
                    Balance <SortIcon field="balance" />
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                    onClick={() => handleSort('expected_date')}
                  >
                    Expected Date <SortIcon field="expected_date" />
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                    onClick={() => handleSort('status')}
                  >
                    Status <SortIcon field="status" />
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
                {paginatedPremiums.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-12 text-center text-slate-400">
                      <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No premiums found</p>
                    </td>
                  </tr>
                ) : (
                  paginatedPremiums.map((premium) => (
                    <tr
                      key={premium.id}
                      className="border-b border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-medium">{premium.policy_number}</td>
                      <td className="px-4 py-3 text-sm text-green-400 font-medium">
                        {formatCurrency(parseFloat(premium.expected_amount || 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-blue-400 font-medium">
                        {formatCurrency(parseFloat(premium.balance || 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">
                        {premium.due_date ? new Date(premium.due_date).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          premium.status === 'Paid' 
                            ? 'bg-green-500/20 text-green-400'
                            : premium.status === 'Future'
                            ? 'bg-blue-500/20 text-blue-400'
                            : premium.status === 'Overdue'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-slate-500/20 text-slate-400'
                        }`}>
                          {premium.status}
                        </span>
                      </td>
                      
                      <td className="px-4 py-3 text-sm text-slate-400">
                        {premium.created_at ? new Date(premium.created_at).toLocaleDateString() : '-'}
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
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedPremiums.length)} of {filteredAndSortedPremiums.length} premiums
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

export default PremiumsTable;