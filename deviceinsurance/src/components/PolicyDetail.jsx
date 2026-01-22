import React, { useState, useEffect } from 'react';
import { Shield, ArrowLeft, Calendar, DollarSign, Hash, Mail, Phone, CheckCircle, AlertCircle, Loader2, Smartphone, FileText, Clock, Download, History, ExternalLink } from 'lucide-react';
import { formatCurrency } from '../constants/currency';
import { claimStatusColors } from '../constants/claimTypes';
import { fetchPolicyDetails } from '../utils/api';
import { getStoredAccessToken } from '../utils/storage';
import PolicyDocument from './PolicyDocument';
import './PolicyDocument.css';

const PolicyDetail = ({ policyId, onBack, onClaimClick }) => {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDocument, setShowDocument] = useState(false);

  useEffect(() => {
    const loadPolicyDetails = async () => {
      if (!policyId) {
        setError('Policy ID is required');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const accessToken = getStoredAccessToken();
        if (!accessToken) {
          throw new Error('Authentication required. Please log in.');
        }
        const data = await fetchPolicyDetails(policyId, accessToken);
        setPolicy(data);
      } catch (err) {
        console.error('Error loading policy details:', err);
        setError(err.message || 'Failed to load policy details');
      } finally {
        setLoading(false);
      }
    };

    loadPolicyDetails();
  }, [policyId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/5 rounded-2xl p-12 backdrop-blur-sm text-center">
          <Loader2 className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-spin" />
          <p className="text-slate-400">Loading policy details...</p>
        </div>
      </div>
    );
  }

  if (error || !policy) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm text-center">
          <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <p className="text-slate-400 mb-4">{error || 'Policy not found'}</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full font-semibold transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'created' || statusLower === 'active') {
      return 'bg-green-500/20 text-green-400';
    } else if (statusLower === 'draft') {
      return 'bg-yellow-500/20 text-yellow-400';
    } else {
      return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{policy.policy_number}</h1>
            <p className="text-slate-400 text-lg">Policy Details</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(policy.status)}`}>
            {policy.status}
          </span>
        </div>

        {/* Policy Owner */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-bold">Policy Owner</h2>
          </div>
          <p className="text-lg font-semibold text-slate-300">{policy.policy_owner_name}</p>
        </div>

        {/* Policy Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold">Policy Information</h2>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-slate-400 text-sm">Policy Number:</span>
                <p className="font-semibold text-lg mt-1">{policy.policy_number}</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Status:</span>
                <p className="font-semibold mt-1 capitalize">{policy.status}</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Start Date:</span>
                <p className="font-semibold mt-1">
                  {policy.start_date ? new Date(policy.start_date).toLocaleDateString() : '-'}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Maturity Date:</span>
                <p className="font-semibold mt-1">
                  {policy.maturity_date ? new Date(policy.maturity_date).toLocaleDateString() : '-'}
                </p>
              </div>
              <div>
                <button
                  onClick={() => setShowDocument(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-blue-400 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  View Policy Document
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold">Pricing</h2>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-slate-400 text-sm">Cover Amount:</span>
                <p className="font-semibold text-lg mt-1">{formatCurrency(parseFloat(policy.cover_amount || 0))}</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Premium:</span>
                <p className="font-semibold text-lg text-blue-400 mt-1">{formatCurrency(parseFloat(policy.premium || 0))}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Gadgets (Devices) */}
      {policy.policy_gadgets && policy.policy_gadgets.length > 0 && (
        <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">Insured Devices</h2>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">
              {policy.policy_gadgets.length}
            </span>
          </div>
          <div className="space-y-4">
            {policy.policy_gadgets.map((gadget) => (
              <div key={gadget.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold mb-4">{gadget.device_brand} {gadget.device_model}</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-slate-400 text-sm">Device Type:</span>
                        <p className="font-semibold capitalize">{gadget.device_type}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Serial Number:</span>
                        <p className="font-semibold font-mono text-sm">{gadget.serial_number}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">IMEI Number:</span>
                        <p className="font-semibold font-mono text-sm">{gadget.imei_number}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Purchase Date:</span>
                        <p className="font-semibold">
                          {gadget.purchase_date ? new Date(gadget.purchase_date).toLocaleDateString() : '-'}
                        </p>
                      </div>
                      {gadget.description && (
                        <div>
                          <span className="text-slate-400 text-sm">Description:</span>
                          <p className="font-semibold text-sm mt-1">{gadget.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-slate-400 text-sm">Device Cost:</span>
                        <p className="font-semibold text-lg">{formatCurrency(parseFloat(gadget.device_cost || 0))}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Premium:</span>
                        <p className="font-semibold text-lg text-blue-400">{formatCurrency(parseFloat(gadget.premium || 0))}</p>
                      </div>
                      {gadget.seller && (
                        <div>
                          <span className="text-slate-400 text-sm">Seller:</span>
                          <p className="font-semibold">{gadget.seller}</p>
                        </div>
                      )}
                      <div className="pt-4 border-t border-white/10">
                        <span className="text-slate-400 text-xs block mb-2">Premium Breakdown:</span>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Seller Share:</span>
                            <span className="font-semibold">{formatCurrency(parseFloat(gadget.seller_share || 0))}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Platform Share:</span>
                            <span className="font-semibold">{formatCurrency(parseFloat(gadget.platform_share || 0))}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Insurer Share:</span>
                            <span className="font-semibold text-green-400">{formatCurrency(parseFloat(gadget.insurer_share || 0))}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Policy Premiums */}
      {policy.policypremiums && policy.policypremiums.length > 0 && (
        <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm mb-6">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold">Premium Schedule</h2>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
              {policy.policypremiums.length}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10 border-b border-white/20">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Policy Number</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Expected Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Due Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Created At</th>
                </tr>
              </thead>
              <tbody>
                {policy.policypremiums.map((premium) => (
                  <tr key={premium.id} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium">{premium.policy_number}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-blue-400">
                      {formatCurrency(parseFloat(premium.expected_amount || 0))}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {premium.due_date ? new Date(premium.due_date).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        premium.status?.toLowerCase() === 'paid'
                          ? 'bg-green-500/20 text-green-400'
                          : premium.status?.toLowerCase() === 'future'
                          ? 'bg-blue-500/20 text-blue-400'
                          : premium.status?.toLowerCase() === 'overdue'
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Policy Claims */}
      {policy.policy_claims && policy.policy_claims.length > 0 && (
        <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm mb-6">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">Policy Claims</h2>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">
              {policy.policy_claims.length}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10 border-b border-white/20">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Claim Number</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Estimated Cost</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Incident Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Submitted</th>
                  {onClaimClick && <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>}
                </tr>
              </thead>
              <tbody>
                {policy.policy_claims.map((claim) => (
                  <tr
                    key={claim.id}
                    className="border-b border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-blue-400">
                      {claim.claim_number}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold capitalize">
                        {claim.claim_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        claimStatusColors[claim.status?.toLowerCase()] || claimStatusColors.pending
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {formatCurrency(parseFloat(claim.estimated_cost || 0))}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {claim.incident_date ? new Date(claim.incident_date).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {claim.created_at ? new Date(claim.created_at).toLocaleDateString() : '-'}
                    </td>
                    {onClaimClick && (
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => onClaimClick(claim.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-blue-400 text-xs font-semibold transition-colors"
                        >
                          View Details
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Policy Status Updates */}
      {policy.policy_status_updates && policy.policy_status_updates.length > 0 && (
        <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm mb-6">
          <div className="flex items-center gap-3 mb-6">
            <History className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold">Status History</h2>
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
              {policy.policy_status_updates.length}
            </span>
          </div>
          <div className="space-y-4">
            {policy.policy_status_updates.map((update, index) => (
              <div key={update.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(update.previous_status)}`}>
                        {update.previous_status}
                      </span>
                      <span className="text-slate-400">→</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(update.next_status)}`}>
                        {update.next_status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">
                      {update.created_at ? new Date(update.created_at).toLocaleString() : '-'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coverage Details */}
      {policy.gadget_pricing && (
        <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-blue-400 mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-lg">Coverage Details</h3>
                {policy.gadget_pricing.cover_type && (
                  <span className="px-3 py-1 bg-blue-500/30 text-blue-300 rounded-full text-sm font-semibold">
                    {policy.gadget_pricing.cover_type}
                  </span>
                )}
                {policy.gadget_pricing.cover_percentage && (
                  <span className="px-3 py-1 bg-blue-500/30 text-blue-300 rounded-full text-sm font-semibold">
                    {policy.gadget_pricing.cover_percentage}% Cover
                  </span>
                )}
              </div>
              {policy.gadget_pricing.pricingcomponents && policy.gadget_pricing.pricingcomponents.length > 0 ? (
                <>
                  <p className="text-slate-300 text-sm mb-3">
                    Your policy includes the following coverage components:
                  </p>
                  <ul className="text-slate-300 text-sm space-y-2">
                    {policy.gadget_pricing.pricingcomponents
                      .filter(component => component.included)
                      .map((component) => (
                        <li key={component.id} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span>{component.name}</span>
                        </li>
                      ))}
                  </ul>
                  {policy.gadget_pricing.pricingcomponents.filter(component => !component.included).length > 0 && (
                    <div className="mt-4 pt-4 border-t border-blue-500/30">
                      <p className="text-slate-400 text-sm mb-2">Not included:</p>
                      <ul className="text-slate-400 text-sm space-y-2">
                        {policy.gadget_pricing.pricingcomponents
                          .filter(component => !component.included)
                          .map((component) => (
                            <li key={component.id} className="flex items-center gap-2">
                              <span className="w-4 h-4 flex-shrink-0">✗</span>
                              <span>{component.name}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-slate-300 text-sm">
                  Coverage details are being processed. Please check back later.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Policy Document Modal */}
      {showDocument && policy && (
        <PolicyDocument
          policy={policy}
          onClose={() => setShowDocument(false)}
        />
      )}
    </div>
  );
};

export default PolicyDetail;
