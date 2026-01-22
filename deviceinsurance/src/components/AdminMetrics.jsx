import React, { useState, useEffect } from 'react';
import { Shield, FileText, DollarSign, TrendingUp, Users, AlertCircle, RefreshCw } from 'lucide-react';
import { formatCurrency } from '../constants/currency';
import { fetchMetrics } from '../utils/api';
import { getStoredAccessToken } from '../utils/storage';

const AdminMetrics = ({ policies, claims }) => {
  const [metricsData, setMetricsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fallback to local calculations if API fails
  const localMetrics = {
    total_policies: policies.length,
    active_policies: policies.filter(p => p.status === 'active').length,
    total_claims: claims.length,
    pending_claims: claims.filter(c => c.status === 'pending' || c.status === 'processing').length,
    monthly_total_premium: policies.reduce((sum, p) => sum + (p.monthlyPremium || 0), 0),
    total_device_value: policies.reduce((sum, p) => sum + (p.deviceValue || 0), 0),
    policy_owners: new Set(policies.map(p => p.email)).size,
    total_amount_claimed: 0
  };

  const loadMetrics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const accessToken = getStoredAccessToken();
      
      if (!accessToken) {
        // No access token, use local data
        setMetricsData(localMetrics);
        setLoading(false);
        return;
      }

      // Fetch from API
      const data = await fetchMetrics(accessToken);
      setMetricsData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading metrics:', err);
      setError(err.message);
      // Fallback to local calculations
      setMetricsData(localMetrics);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, [policies, claims]); // Reload when policies or claims change

  const metrics = metricsData ? [
    {
      label: 'Total Policies',
      value: metricsData.total_policies,
      icon: Shield,
      color: 'text-primary-400',
      bgColor: 'bg-primary-500/20',
      borderColor: 'border-primary-500/30'
    },
    {
      label: 'Active Policies',
      value: metricsData.active_policies,
      icon: Shield,
      color: 'text-security-400',
      bgColor: 'bg-security-500/20',
      borderColor: 'border-security-500/30'
    },
    {
      label: 'Total Claims',
      value: metricsData.total_claims,
      icon: FileText,
      color: 'text-accent-400',
      bgColor: 'bg-accent-500/20',
      borderColor: 'border-accent-500/30'
    },
    {
      label: 'Pending Claims',
      value: metricsData.pending_claims,
      icon: AlertCircle,
      color: 'text-warning-400',
      bgColor: 'bg-warning-500/20',
      borderColor: 'border-warning-500/30'
    },
    {
      label: 'Total Monthly Premium',
      value: formatCurrency(metricsData.monthly_total_premium),
      icon: DollarSign,
      color: 'text-security-400',
      bgColor: 'bg-security-500/20',
      borderColor: 'border-security-500/30'
    },
    {
      label: 'Total Device Value',
      value: formatCurrency(metricsData.total_device_value),
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30'
    },
    {
      label: 'Policy Owners',
      value: metricsData.policy_owners,
      icon: Users,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20',
      borderColor: 'border-cyan-500/30'
    },
    {
      label: 'Total Amount Claimed',
      value: formatCurrency(metricsData.total_amount_claimed),
      icon: DollarSign,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/30'
    },
  ] : [];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Admin Dashboard</span>
          </h1>
          <p className="text-slate-400">Real-time overview of all policies and claims</p>
        </div>
        <button
          onClick={loadMetrics}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-warning-500/10 border border-warning-500/30 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-warning-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-warning-400 mb-1">Using Local Data</div>
            <div className="text-sm text-slate-300">
              Unable to fetch metrics from server. Displaying local calculations.
            </div>
          </div>
        </div>
      )}

      {loading && !metricsData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 animate-pulse"
            >
              <div className="h-4 bg-white/10 rounded w-24 mb-4"></div>
              <div className="h-8 bg-white/10 rounded w-32"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className={`relative overflow-hidden bg-slate-800/60 rounded-xl p-6 backdrop-blur-sm border-2 ${metric.borderColor} hover:bg-slate-800/80 transition-all group`}
              >
                <div className={`absolute inset-0 ${metric.bgColor} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-300 text-sm font-medium">{metric.label}</span>
                    <div className={`p-2.5 rounded-lg ${metric.bgColor} border ${metric.borderColor}`}>
                      <Icon className={`w-5 h-5 ${metric.color}`} />
                    </div>
                  </div>
                  <div className={`text-3xl font-bold ${metric.color}`}>
                    {metric.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Additional Info */}
      <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
        <h3 className="text-lg font-semibold mb-3">Metrics Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-400">
          <div>
            <span className="font-medium text-slate-300">Data Source:</span> 
            {' '}{error ? 'Local Storage (Fallback)' : 'Live API'}
          </div>
          <div>
            <span className="font-medium text-slate-300">Last Updated:</span> 
            {' '}{new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMetrics;
