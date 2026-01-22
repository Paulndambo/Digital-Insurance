import React, { useState, useEffect } from 'react';
import { AlertTriangle, ChevronRight, DollarSign, Store, Loader2 } from 'lucide-react';
import InputField from './InputField';
import { claimTypes } from '../constants/claimTypes';
import { formatCurrency } from '../constants/currency';
import { fetchDeviceOutlets, fetchPolicies } from '../utils/api';
import { getStoredAccessToken } from '../utils/storage';

const ClaimFlow = ({ 
  claimStep, 
  claimFormData, 
  user, 
  onStepChange, 
  onInputChange, 
  onSubmit, 
  onPurchaseClick,
  loading = false,
  error = ''
}) => {
  const [deviceOutlets, setDeviceOutlets] = useState([]);
  const [loadingOutlets, setLoadingOutlets] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [loadingPolicies, setLoadingPolicies] = useState(false);
  const [policiesError, setPoliciesError] = useState('');

  // Fetch policies from backend API
  useEffect(() => {
    const loadPolicies = async () => {
      if (claimStep === 1) {
        setLoadingPolicies(true);
        setPoliciesError('');
        try {
          const accessToken = getStoredAccessToken();
          if (!accessToken) {
            throw new Error('Authentication required. Please log in.');
          }
          const data = await fetchPolicies(accessToken);
          // Filter policies for the current user based on policy_owner_name matching user name
          // or if user is admin/sales_agent, show all active/created policies
          let filteredPolicies = data.results || [];
          if (user && (user.role === 'policy_owner')) {
            // For policy owners, filter by policy_owner_name matching user name
            filteredPolicies = filteredPolicies.filter(p => 
              p.policy_owner_name?.toLowerCase() === user.name?.toLowerCase() ||
              p.policy_owner_name?.toLowerCase() === user.username?.toLowerCase()
            );
          }
          // Filter for active/created status
          filteredPolicies = filteredPolicies.filter(p => 
            p.status?.toLowerCase() === 'active' || 
            p.status?.toLowerCase() === 'created'
          );
          setPolicies(filteredPolicies);
        } catch (err) {
          console.error('Error loading policies:', err);
          setPoliciesError(err.message || 'Failed to load policies');
        } finally {
          setLoadingPolicies(false);
        }
      }
    };

    loadPolicies();
  }, [claimStep, user]);

  // Fetch device outlets when component mounts
  useEffect(() => {
    const loadDeviceOutlets = async () => {
      if (claimStep === 2) {
        setLoadingOutlets(true);
        try {
          const accessToken = getStoredAccessToken();
          if (accessToken) {
            const data = await fetchDeviceOutlets(accessToken);
            setDeviceOutlets(data.results || []);
          }
        } catch (error) {
          console.error('Error loading device outlets:', error);
        } finally {
          setLoadingOutlets(false);
        }
      }
    };

    loadDeviceOutlets();
  }, [claimStep]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">File a Claim</h1>
      
      {claimStep === 1 && (
        <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-6">Select Policy</h2>
          
          {loadingPolicies ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-400" />
              <p className="text-slate-400">Loading policies...</p>
            </div>
          ) : policiesError ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">{policiesError}</p>
            </div>
          ) : policies.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">You need an active policy to file a claim</p>
              {onPurchaseClick && (
                <button 
                  onClick={onPurchaseClick} 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
                >
                  Purchase Policy
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {policies.map((policy) => (
                <button
                  key={policy.id}
                  onClick={() => {
                    onInputChange({ target: { name: 'policyId', value: policy.id } });
                    onStepChange(2);
                  }}
                  className="w-full text-left bg-white/5 hover:bg-white/10 rounded-xl p-6 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{policy.policy_number}</h3>
                      <p className="text-sm text-slate-400">Owner: {policy.policy_owner_name}</p>
                      <p className="text-sm text-slate-400">Cover Amount: {formatCurrency(parseFloat(policy.cover_amount || 0))}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {claimStep === 2 && (
        <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm space-y-6">
          <h2 className="text-2xl font-bold mb-6">Claim Details</h2>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-2">Claim Type</label>
            <select
              name="claimType"
              value={claimFormData.claimType || ''}
              onChange={onInputChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ colorScheme: 'dark' }}
            >
              <option value="" className="bg-slate-800 text-white">Select claim type</option>
              {claimTypes.map(type => (
                <option key={type.value} value={type.value} className="bg-slate-800 text-white">{type.label}</option>
              ))}
            </select>
          </div>

          <InputField
            label="Incident Date"
            name="incidentDate"
            type="date"
            formData={claimFormData}
            errors={{}}
            touched={{}}
            handleInputChange={onInputChange}
            handleBlur={() => {}}
            required
          />

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={claimFormData.description || ''}
              onChange={onInputChange}
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Please describe what happened to your device..."
              required
            />
          </div>

          <InputField
            label="Estimated Repair/Replacement Cost"
            name="estimatedCost"
            type="number"
            placeholder="0.00"
            icon={DollarSign}
            formData={claimFormData}
            errors={{}}
            touched={{}}
            handleInputChange={onInputChange}
            handleBlur={() => {}}
            required
          />

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Store className="w-4 h-4 text-slate-400" />
              Device Outlet
            </label>
            {loadingOutlets ? (
              <div className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                <span className="text-slate-400">Loading device outlets...</span>
              </div>
            ) : (
              <select
                name="deviceOutlet"
                value={claimFormData.deviceOutlet || ''}
                onChange={onInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ colorScheme: 'dark' }}
                required
              >
                <option value="" className="bg-slate-800 text-white">Select device outlet</option>
                {deviceOutlets.map(outlet => (
                  <option key={outlet.id} value={outlet.id} className="bg-slate-800 text-white">
                    {outlet.name} - {outlet.location}
                  </option>
                ))}
              </select>
            )}
            {deviceOutlets.length === 0 && !loadingOutlets && (
              <p className="text-xs text-slate-400 mt-1">No device outlets available</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => onStepChange(1)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition-colors"
            >
              Back
            </button>
            <button
              onClick={onSubmit}
              disabled={loading || !claimFormData.claimType || !claimFormData.incidentDate || !claimFormData.description || !claimFormData.estimatedCost || !claimFormData.deviceOutlet}
              className={`flex-1 px-6 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 ${
                !loading && claimFormData.claimType && claimFormData.incidentDate && claimFormData.description && claimFormData.estimatedCost && claimFormData.deviceOutlet
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 shadow-xl'
                  : 'bg-white/20 text-white/50 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Claim'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimFlow;
