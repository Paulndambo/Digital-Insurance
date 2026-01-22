import React, { useState, useEffect } from 'react';
import { Shield, DollarSign, FileText, TrendingUp, PlusCircle, FileCheck, Loader2, AlertCircle } from 'lucide-react';
import { claimStatusColors } from '../constants/claimTypes';
import { formatCurrency } from '../constants/currency';
import { fetchPolicies, fetchClaims } from '../utils/api';
import { getStoredAccessToken } from '../utils/storage';

const Dashboard = ({ 
  user, 
  onPurchaseClick, 
  onClaimClick,
  onPolicyClick,
  onClaimDetailClick
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

        let filteredPolicies = policiesData.results || [];
        let filteredClaims = claimsData.results || [];

        // Filter policies based on user role
        if (user.role === 'policy_owner') {
          // For policy owners, filter by policy_owner_name matching user name
          filteredPolicies = filteredPolicies.filter(p => 
            p.policy_owner_name?.toLowerCase() === user.name?.toLowerCase() ||
            p.policy_owner_name?.toLowerCase() === user.username?.toLowerCase()
          );
          // Filter claims for this user's policies
          const userPolicyIds = filteredPolicies.map(p => p.id);
          filteredClaims = filteredClaims.filter(c => userPolicyIds.includes(c.policy));
        }
        // For sales_agent, show all policies and claims (no filtering needed)

        setPolicies(filteredPolicies);
        setClaims(filteredClaims);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Calculate metrics from backend data
  const activePolicies = policies.filter(p => 
    p.status?.toLowerCase() === 'active' || 
    p.status?.toLowerCase() === 'created'
  ).length;
  
  const totalMonthlyPremium = policies.reduce((sum, p) => 
    sum + parseFloat(p.premium || 0), 0
  );
  
  const pendingClaims = claims.filter(c => 
    c.status?.toLowerCase() === 'pending' || 
    c.status?.toLowerCase() === 'processing'
  ).length;
  
  const totalDeviceValue = policies.reduce((sum, p) => 
    sum + parseFloat(p.cover_amount || 0), 0
  );

  // Filter active/created policies for display
  const displayPolicies = policies.filter(p => 
    p.status?.toLowerCase() === 'active' || 
    p.status?.toLowerCase() === 'created'
  );

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
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-slate-400">Welcome back, {user.name || user.username || user.email}!</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs sm:text-sm">Active Policies</span>
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold break-words">{activePolicies}</div>
        </div>
        <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs sm:text-sm">Monthly Premium</span>
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold break-words">{formatCurrency(totalMonthlyPremium)}</div>
        </div>
        <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs sm:text-sm">Pending Claims</span>
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold break-words">{pendingClaims}</div>
        </div>
        <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs sm:text-sm">Total Device Value</span>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold break-words">{formatCurrency(totalDeviceValue)}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
        <button
          onClick={onPurchaseClick}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:scale-105 transition-transform"
        >
          <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Purchase New Policy</span>
        </button>
        <button
          onClick={onClaimClick}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:scale-105 transition-transform"
        >
          <FileCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>File a Claim</span>
        </button>
      </div>

      {/* Policies List */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Your Policies</h2>
        {displayPolicies.length === 0 ? (
          <div className="bg-white/5 rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center backdrop-blur-sm">
            <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400 mx-auto mb-4 opacity-50" />
            <p className="text-sm sm:text-base text-slate-400 mb-4">You don't have any policies yet</p>
            {onPurchaseClick && (
              <button 
                onClick={onPurchaseClick} 
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:scale-105 transition-transform"
              >
                Get Protected Now
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {displayPolicies.map((policy) => (
              <button
                key={policy.id}
                onClick={() => onPolicyClick(policy.id)}
                className="text-left bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer w-full"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg sm:text-xl font-bold mb-1 truncate">{policy.policy_number}</h3>
                    <p className="text-xs sm:text-sm text-slate-400">{policy.policy_owner_name}</p>
                  </div>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap self-start sm:self-auto ${
                    policy.status?.toLowerCase() === 'active' || policy.status?.toLowerCase() === 'created'
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-slate-500/20 text-slate-400'
                  }`}>
                    {policy.status}
                  </span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm mb-4">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-slate-400">Policy Number:</span>
                    <span className="font-medium text-right break-all">{policy.policy_number}</span>
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-slate-400">Cover Amount:</span>
                    <span className="font-medium text-right">{formatCurrency(parseFloat(policy.cover_amount || 0))}</span>
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-slate-400">Premium:</span>
                    <span className="font-medium text-blue-400 text-right">{formatCurrency(parseFloat(policy.premium || 0))}</span>
                  </div>
                </div>
                <div className="text-xs text-blue-400 mt-2">Click to view details →</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Claims List */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Your Claims</h2>
        {claims.length === 0 ? (
          <div className="bg-white/5 rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center backdrop-blur-sm">
            <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400 mx-auto mb-4 opacity-50" />
            <p className="text-sm sm:text-base text-slate-400">No claims filed yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {claims.map((claim) => {
              const policy = policies.find(p => p.id === claim.policy);
              return (
                <button
                  key={claim.id}
                  onClick={() => onClaimDetailClick(claim.id)}
                  className="w-full text-left bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-bold mb-1">Claim #{claim.claim_number}</h3>
                      <p className="text-xs sm:text-sm text-slate-400 break-words">
                        {claim.claim_type} - {policy?.policy_number || 'N/A'}
                      </p>
                    </div>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap self-start sm:self-auto ${
                      claimStatusColors[claim.status?.toLowerCase()] || claimStatusColors.pending
                    }`}>
                      {claim.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm mb-4">
                    <div>
                      <span className="text-slate-400">Incident Date:</span>
                      <p className="font-medium">
                        {claim.incident_date ? new Date(claim.incident_date).toLocaleDateString() : '-'}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400">Estimated Cost:</span>
                      <p className="font-medium">{formatCurrency(parseFloat(claim.estimated_cost || 0))}</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mb-2 line-clamp-2 sm:line-clamp-none">{claim.description}</p>
                  <div className="text-xs text-blue-400 mt-2">Click to view details →</div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
