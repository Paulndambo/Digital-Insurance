import React, { useState, useMemo, useEffect } from 'react';
import { Search, Smartphone, ChevronDown, ChevronUp, Loader2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../constants/currency';
import { fetchInsuredDevices } from '../utils/api';
import { getStoredAccessToken } from '../utils/storage';

const InsuredDevicesTable = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch insured devices from API
  useEffect(() => {
    const loadDevices = async () => {
      setLoading(true);
      setError('');
      try {
        const accessToken = getStoredAccessToken();
        if (!accessToken) {
          throw new Error('Authentication required. Please log in.');
        }
        const data = await fetchInsuredDevices(accessToken);
        setDevices(data.results || []);
      } catch (err) {
        console.error('Error loading insured devices:', err);
        setError(err.message || 'Failed to load insured devices');
      } finally {
        setLoading(false);
      }
    };

    loadDevices();
  }, []);

  // Filter and sort
  const filteredAndSortedDevices = useMemo(() => {
    let filtered = devices.filter(device => {
      const matchesSearch = 
        device.device_brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.device_model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.device_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.serial_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.imei_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.seller?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'created_at' || sortField === 'updated_at' || sortField === 'purchase_date') {
        aVal = new Date(aVal || 0);
        bVal = new Date(bVal || 0);
      }
      
      if (sortField === 'device_cost' || sortField === 'premium' || 
          sortField === 'seller_share' || sortField === 'platform_share' || 
          sortField === 'insurer_share') {
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
  }, [devices, searchTerm, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedDevices.length / itemsPerPage);
  const paginatedDevices = filteredAndSortedDevices.slice(
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
  const totalDeviceCost = devices.reduce((sum, d) => sum + parseFloat(d.device_cost || 0), 0);
  const totalPremium = devices.reduce((sum, d) => sum + parseFloat(d.premium || 0), 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Insured Devices</h1>
        <p className="text-slate-400">View all insured devices and their details</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Devices</span>
            <Smartphone className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400">{devices.length}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Device Value</span>
            <Smartphone className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">{formatCurrency(totalDeviceCost)}</div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white/5 rounded-xl p-12 backdrop-blur-sm border border-white/10 text-center mb-6">
          <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-400" />
          <p className="text-slate-400">Loading insured devices...</p>
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
              placeholder="Search by brand, model, type, serial number, IMEI, seller, or description..."
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
                    onClick={() => handleSort('device_brand')}
                  >
                    Brand <SortIcon field="device_brand" />
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                    onClick={() => handleSort('device_model')}
                  >
                    Model <SortIcon field="device_model" />
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                    onClick={() => handleSort('device_type')}
                  >
                    Type <SortIcon field="device_type" />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Serial/IMEI</th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                    onClick={() => handleSort('device_cost')}
                  >
                    Device Cost <SortIcon field="device_cost" />
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                    onClick={() => handleSort('premium')}
                  >
                    Premium <SortIcon field="premium" />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Seller</th>
                  <th 
                    className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                    onClick={() => handleSort('purchase_date')}
                  >
                    Purchase Date <SortIcon field="purchase_date" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedDevices.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center text-slate-400">
                      <Smartphone className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No insured devices found</p>
                    </td>
                  </tr>
                ) : (
                  paginatedDevices.map((device) => (
                    <tr
                      key={device.id}
                      className="border-b border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-medium">{device.device_brand}</td>
                      <td className="px-4 py-3 text-sm font-medium">{device.device_model}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold capitalize">
                          {device.device_type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="text-xs text-slate-400">SN: {device.serial_number}</div>
                        <div className="text-xs text-slate-400">IMEI: {device.imei_number}</div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {formatCurrency(parseFloat(device.device_cost || 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-blue-400 font-medium">
                        {formatCurrency(parseFloat(device.premium || 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300">{device.seller}</td>
                      <td className="px-4 py-3 text-sm text-slate-400">
                        {device.purchase_date ? new Date(device.purchase_date).toLocaleDateString() : '-'}
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
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedDevices.length)} of {filteredAndSortedDevices.length} devices
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

export default InsuredDevicesTable;
