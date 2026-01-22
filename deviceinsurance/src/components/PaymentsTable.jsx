import React, { useState, useMemo } from 'react';
import { Search, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency } from '../constants/currency';

const PaymentsTable = ({ policies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('startDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Create payment records from policies
  const payments = useMemo(() => {
    return policies.map(policy => ({
      id: policy.id,
      policyNumber: policy.policyNumber,
      deviceModel: policy.deviceModel,
      deviceType: policy.deviceType,
      ownerName: `${policy.firstName} ${policy.lastName}`,
      email: policy.email,
      phone: policy.phone,
      paymentMethod: 'Mpesa', // Default from policy data
      accountName: policy.paymentAccountName || `${policy.firstName} ${policy.lastName}`,
      mpesaPhone: policy.mpesaPhoneNumber || policy.phone,
      amount: policy.monthlyPremium || 0,
      startDate: policy.startDate,
      status: policy.status
    }));
  }, [policies]);

  // Filter and sort payments
  const filteredAndSortedPayments = useMemo(() => {
    let filtered = payments.filter(payment => {
      const matchesSearch = 
        payment.policyNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.deviceModel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.accountName?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'startDate') {
        aVal = new Date(a.startDate || 0);
        bVal = new Date(b.startDate || 0);
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
  }, [payments, searchTerm, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPayments.length / itemsPerPage);
  const paginatedPayments = filteredAndSortedPayments.slice(
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
  const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalMonthlyPayments = totalPayments;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Payments</h1>
        <p className="text-slate-400">View all payment records and transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Monthly Payments</span>
            <CreditCard className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">{formatCurrency(totalMonthlyPayments)}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Payment Records</span>
            <CreditCard className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400">{payments.length}</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white/5 rounded-xl p-4 mb-6 backdrop-blur-sm border border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by policy number, device, owner, or account name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10 border-b border-white/20">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                  onClick={() => handleSort('policyNumber')}
                >
                  Policy Number <SortIcon field="policyNumber" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Device</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Owner</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Payment Method</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Account Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Phone Number</th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                  onClick={() => handleSort('amount')}
                >
                  Amount <SortIcon field="amount" />
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-white/10"
                  onClick={() => handleSort('startDate')}
                >
                  Payment Date <SortIcon field="startDate" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPayments.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-4 py-12 text-center text-slate-400">
                    <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No payments found</p>
                  </td>
                </tr>
              ) : (
                paginatedPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium">{payment.policyNumber}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="font-medium">{payment.deviceModel}</div>
                      <div className="text-xs text-slate-400">{payment.deviceType}</div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>{payment.ownerName}</div>
                      <div className="text-xs text-slate-400">{payment.email}</div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                        {payment.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{payment.accountName}</td>
                    <td className="px-4 py-3 text-sm text-slate-400">{payment.mpesaPhone || '-'}</td>
                    <td className="px-4 py-3 text-sm text-green-400 font-medium">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {payment.startDate ? new Date(payment.startDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        payment.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {payment.status}
                      </span>
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
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedPayments.length)} of {filteredAndSortedPayments.length} payments
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
    </div>
  );
};

export default PaymentsTable;
