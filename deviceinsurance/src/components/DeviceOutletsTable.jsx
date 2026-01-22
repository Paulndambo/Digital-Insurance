import React, { useState, useMemo, useEffect } from 'react';
import { Search, Store, ChevronDown, ChevronUp, Loader2, AlertCircle } from 'lucide-react';
import { fetchDeviceOutlets } from '../utils/api';
import { getStoredAccessToken } from '../utils/storage';

const DeviceOutletsTable = () => {
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch device outlets from API
  useEffect(() => {
    const loadOutlets = async () => {
      setLoading(true);
      setError('');
      try {
        const accessToken = getStoredAccessToken();
        if (!accessToken) {
          throw new Error('Authentication required. Please log in.');
        }
        const data = await fetchDeviceOutlets(accessToken);
        setOutlets(data.results || []);
      } catch (err) {
        console.error('Error loading device outlets:', err);
        setError(err.message || 'Failed to load device outlets');
      } finally {
        setLoading(false);
      }
    };

    loadOutlets();
  }, []);

  // Filter and sort
  const filteredAndSortedOutlets = useMemo(() => {
    let filtered = outlets.filter(outlet => {
      const matchesSearch = 
        outlet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        outlet.outlet_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        outlet.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        outlet.phone_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        outlet.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        outlet.city?.toLowerCase().includes(searchTerm.toLowerCase());
      
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
  }, [outlets, searchTerm, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedOutlets.length / itemsPerPage);
  const paginatedOutlets = filteredAndSortedOutlets.slice(
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
        <h1 className="text-3xl font-bold mb-2">Device Outlets</h1>
        <p className="text-slate-400">View all device outlets and sellers</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white/5 rounded-xl p-12 backdrop-blur-sm border border-white/10 text-center mb-6">
          <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-400" />
          <p className="text-slate-400">Loading device outlets...</p>
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
              placeholder="Search by name, outlet number, email, phone, location, or city..."
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
                    onClick={() => handleSort('outlet_number')}
                  >
                    Outlet Number <SortIcon field="outlet_number" />
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                    onClick={() => handleSort('name')}
                  >
                    Name <SortIcon field="name" />
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                    onClick={() => handleSort('agent_type')}
                  >
                    Agent Type <SortIcon field="agent_type" />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Contact</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Website</th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                    onClick={() => handleSort('created_at')}
                  >
                    Created At <SortIcon field="created_at" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedOutlets.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-12 text-center text-slate-400">
                      <Store className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No device outlets found</p>
                    </td>
                  </tr>
                ) : (
                  paginatedOutlets.map((outlet) => (
                    <tr
                      key={outlet.id}
                      className="border-b border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-blue-400">
                        {outlet.outlet_number}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">{outlet.name}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                          {outlet.agent_type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="text-slate-300">{outlet.email}</div>
                        <div className="text-xs text-slate-400">{outlet.phone_number}</div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="text-slate-300">{outlet.location}</div>
                        <div className="text-xs text-slate-400">{outlet.city}, {outlet.country}</div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {outlet.website ? (
                          <a 
                            href={outlet.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline"
                          >
                            {outlet.website}
                          </a>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">
                        {outlet.created_at ? new Date(outlet.created_at).toLocaleDateString() : '-'}
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
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedOutlets.length)} of {filteredAndSortedOutlets.length} outlets
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

export default DeviceOutletsTable;
