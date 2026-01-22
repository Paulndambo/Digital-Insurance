import React, { useState, useEffect } from 'react';
import { Shield, FileText, FileCheck, FileX, PlusCircle, Loader2, AlertCircle, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react';
import { claimStatusColors } from '../constants/claimTypes';
import { formatCurrency } from '../constants/currency';
import { fetchPolicies, fetchClaims } from '../utils/api';
import { getStoredAccessToken } from '../utils/storage';

const SalesAgentDashboard = ({ 
  user, 
  onPurchaseClick, 
  onClaimClick
}) => {
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch policies and claims from backend API
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      setLoading(true);
      setError('');
      try {
        const accessToken = getStoredAccessToken();
        if (!accessToken) {
          throw new Error('Authentication required. Please log in.');
        }

        // Fetch policies and claims in parallel
        const [policiesData, claimsData] = await Promise.all([
          fetchPolicies(accessToken),
          fetchClaims(accessToken)
        ]);

        // Sales agents see all policies and claims they've created
        const allPolicies = policiesData.results || [];
        const allClaims = claimsData.results || [];

        setPolicies(allPolicies);
        setClaims(allClaims);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Calculate metrics
  const totalClaims = claims.length;
  const claimsPaid = claims.filter(c => c.status?.toLowerCase() === 'approved').length;
  const claimsPending = claims.filter(c => 
    c.status?.toLowerCase() === 'pending' || 
    c.status?.toLowerCase() === 'processing'
  ).length;
  const claimsDeclined = claims.filter(c => c.status?.toLowerCase() === 'declined').length;
  const totalPolicies = policies.length;
  const activePolicies = policies.filter(p => 
    p.status?.toLowerCase() === 'active' || 
    p.status?.toLowerCase() === 'created'
  ).length;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="bg-white/5 rounded-2xl p-12 backdrop-blur-sm text-center">
          <Loader2 className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-spin" />
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-8 backdrop-blur-sm text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Sales Agent Dashboard</h1>
        <p className="text-sm sm:text-base text-slate-400">Welcome back, {user.name || user.username || user.email}!</p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
        <button
          onClick={onPurchaseClick}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:scale-105 transition-transform shadow-lg"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Create New Policy</span>
        </button>
        <button
          onClick={onClaimClick}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:scale-105 transition-transform shadow-lg"
        >
          <FileCheck className="w-5 h-5" />
          <span>Lodge a Claim</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {/* Policies Metrics */}
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 backdrop-blur-sm border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-slate-400 text-xs sm:text-sm mb-1">Total Policies</p>
              <p className="text-3xl sm:text-4xl font-bold">{totalPolicies}</p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-400">
            <TrendingUp className="w-4 h-4" />
            <span>{activePolicies} Active</span>
          </div>
        </div>

        {/* Total Claims */}
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 backdrop-blur-sm border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-slate-400 text-xs sm:text-sm mb-1">Total Claims</p>
              <p className="text-3xl sm:text-4xl font-bold">{totalClaims}</p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
            </div>
          </div>
          <div className="text-xs sm:text-sm text-purple-400">
            All claims filed
          </div>
        </div>

        {/* Claims Paid */}
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 backdrop-blur-sm border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-slate-400 text-xs sm:text-sm mb-1">Claims Paid</p>
              <p className="text-3xl sm:text-4xl font-bold">{claimsPaid}</p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-green-400" />
            </div>
          </div>
          <div className="text-xs sm:text-sm text-green-400">
            Approved & processed
          </div>
        </div>

        {/* Claims Pending */}
        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 backdrop-blur-sm border border-orange-500/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-slate-400 text-xs sm:text-sm mb-1">Claims Pending</p>
              <p className="text-3xl sm:text-4xl font-bold">{claimsPending}</p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-orange-400" />
            </div>
          </div>
          <div className="text-xs sm:text-sm text-orange-400">
            Awaiting review
          </div>
        </div>

        {/* Claims Declined */}
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 backdrop-blur-sm border border-red-500/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-slate-400 text-xs sm:text-sm mb-1">Claims Declined</p>
              <p className="text-3xl sm:text-4xl font-bold">{claimsDeclined}</p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-red-500/20 flex items-center justify-center">
              <XCircle className="w-6 h-6 sm:w-7 sm:h-7 text-red-400" />
            </div>
          </div>
          <div className="text-xs sm:text-sm text-red-400">
            Not approved
          </div>
        </div>

        {/* Empty slot for visual balance on larger screens */}
        <div className="hidden lg:block"></div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Recent Policies */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-400" />
            Recent Policies
          </h2>
          {policies.length === 0 ? (
            <div className="bg-white/5 rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center backdrop-blur-sm">
              <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400 mx-auto mb-4 opacity-50" />
              <p className="text-sm sm:text-base text-slate-400">No policies created yet</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {policies.slice(0, 5).map((policy) => (
                <div
                  key={policy.id}
                  className="bg-white/5 rounded-lg sm:rounded-xl p-4 sm:p-5 backdrop-blur-sm hover:bg-white/10 transition-all border border-white/10"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{policy.policy_number}</h3>
                      <p className="text-xs sm:text-sm text-slate-400">{policy.policy_owner_name}</p>
                    </div>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                      policy.status?.toLowerCase() === 'active' || policy.status?.toLowerCase() === 'created'
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-slate-500/20 text-slate-400'
                    }`}>
                      {policy.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-400">Cover Amount:</span>
                    <span className="font-medium">{formatCurrency(parseFloat(policy.cover_amount || 0))}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Claims */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-orange-400" />
            Recent Claims
          </h2>
          {claims.length === 0 ? (
            <div className="bg-white/5 rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center backdrop-blur-sm">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400 mx-auto mb-4 opacity-50" />
              <p className="text-sm sm:text-base text-slate-400">No claims filed yet</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {claims.slice(0, 5).map((claim) => {
                const policy = policies.find(p => p.id === claim.policy);
                return (
                  <div
                    key={claim.id}
                    className="bg-white/5 rounded-lg sm:rounded-xl p-4 sm:p-5 backdrop-blur-sm hover:bg-white/10 transition-all border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm sm:text-base">Claim #{claim.claim_number}</h3>
                        <p className="text-xs sm:text-sm text-slate-400 truncate">{claim.claim_type}</p>
                      </div>
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                        claimStatusColors[claim.status?.toLowerCase()] || claimStatusColors.pending
                      }`}>
                        {claim.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-400">Estimated Cost:</span>
                      <span className="font-medium">{formatCurrency(parseFloat(claim.estimated_cost || 0))}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesAgentDashboard;
