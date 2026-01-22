import React, { useState, useEffect } from 'react';
import { AlertTriangle, ChevronRight, DollarSign, Store, Loader2, Search } from 'lucide-react';
import InputField from './InputField';
import { claimTypes } from '../constants/claimTypes';
import { formatCurrency } from '../constants/currency';
import { fetchDeviceOutlets, fetchPolicies, searchPolicies } from '../utils/api';
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
  
  // Search state for sales agents
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch policies from backend API (for policy owners only)
  useEffect(() => {
    const loadPolicies = async () => {
      // Only load policies automatically for policy owners
      if (claimStep === 1 && user && user.role === 'policy_owner') {
        setLoadingPolicies(true);
        setPoliciesError('');
        try {
          const accessToken = getStoredAccessToken();
          if (!accessToken) {
            throw new Error('Authentication required. Please log in.');
          }
          const data = await fetchPolicies(accessToken);
          // Filter policies for the current user based on policy_owner_name matching user name
          let filteredPolicies = data.results || [];
          filteredPolicies = filteredPolicies.filter(p => 
            p.policy_owner_name?.toLowerCase() === user.name?.toLowerCase() ||
            p.policy_owner_name?.toLowerCase() === user.username?.toLowerCase()
          );
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

  // Search policies function for sales agents
  const handleSearchPolicy = async () => {
    if (!searchQuery.trim()) {
      setSearchError('Please enter a policy number or ID number');
      return;
    }

    setSearching(true);
    setSearchError('');
    setHasSearched(true);
    setSearchResults([]);

    try {
      const accessToken = getStoredAccessToken();
      if (!accessToken) {
        throw new Error('Authentication required. Please log in.');
      }

      // Use the dedicated search API endpoint
      const results = await searchPolicies(searchQuery, accessToken);

      // Filter for active/created status
      const activeResults = results.filter(p => 
        p.status?.toLowerCase() === 'active' || 
        p.status?.toLowerCase() === 'created'
      );

      if (activeResults.length === 0) {
        if (results.length > 0) {
          setSearchError('Policy found but it is not active. Only active policies can have claims filed.');
        } else {
          setSearchError('No policies found matching your search. Please check the policy number or ID number and try again.');
        }
      } else {
        setSearchResults(activeResults);
      }
    } catch (err) {
      console.error('Error searching policies:', err);
      setSearchError(err.message || 'Failed to search policies');
    } finally {
      setSearching(false);
    }
  };

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

  const isSalesAgent = user && user.role === 'Sales Agent';
  const displayPolicies = isSalesAgent ? searchResults : policies;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">File a Claim</h1>
      
      {claimStep === 1 && (
        <div className="bg-white/5 rounded-xl sm:rounded-2xl p-5 sm:p-8 backdrop-blur-sm">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            {isSalesAgent ? 'Search for Policy' : 'Select Policy'}
          </h2>
          
          {/* Search UI for Sales Agents */}
          {isSalesAgent && (
            <div className="mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Search by Policy Number or ID Number
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setSearchError('');
                          if (!e.target.value.trim()) {
                            setHasSearched(false);
                            setSearchResults([]);
                          }
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSearchPolicy();
                          }
                        }}
                        placeholder="Enter policy number or ID number..."
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      />
                    </div>
                    <button
                      onClick={handleSearchPolicy}
                      disabled={searching || !searchQuery.trim()}
                      className={`px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                        searching || !searchQuery.trim()
                          ? 'bg-white/20 text-white/50 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:scale-105'
                      }`}
                    >
                      {searching ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="hidden sm:inline">Searching...</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4" />
                          <span className="hidden sm:inline">Search</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {searchError && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm">{searchError}</p>
                  </div>
                )}
              </div>

              {hasSearched && searchResults.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Search Results ({searchResults.length})</h3>
                </div>
              )}
            </div>
          )}
          
          {/* Loading state */}
          {loadingPolicies && !isSalesAgent ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-400" />
              <p className="text-slate-400">Loading policies...</p>
            </div>
          ) : policiesError && !isSalesAgent ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">{policiesError}</p>
            </div>
          ) : displayPolicies.length === 0 && (!isSalesAgent || hasSearched) ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">
                {isSalesAgent 
                  ? 'No results found. Try searching with a different policy number or ID number.' 
                  : 'You need an active policy to file a claim'}
              </p>
              {!isSalesAgent && onPurchaseClick && (
                <button 
                  onClick={onPurchaseClick} 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
                >
                  Purchase Policy
                </button>
              )}
            </div>
          ) : displayPolicies.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {displayPolicies.map((policy) => {
                // Get the first gadget if available (for search results)
                const gadget = policy.policy_gadgets && policy.policy_gadgets.length > 0 
                  ? policy.policy_gadgets[0] 
                  : null;
                
                return (
                  <button
                    key={policy.id}
                    onClick={() => {
                      onInputChange({ target: { name: 'policyId', value: policy.id } });
                      onStepChange(2);
                    }}
                    className="w-full text-left bg-white/5 hover:bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all border border-white/10 hover:border-white/20"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1 space-y-1">
                        <h3 className="font-bold text-base sm:text-lg truncate">{policy.policy_number}</h3>
                        <p className="text-xs sm:text-sm text-slate-400">Owner: {policy.policy_owner_name}</p>
                        {gadget && (
                          <p className="text-xs sm:text-sm text-blue-400">
                            Device: {gadget.device_brand} {gadget.device_model}
                          </p>
                        )}
                        <div className="flex items-center gap-4 flex-wrap">
                          <p className="text-xs sm:text-sm text-slate-400">
                            Cover: {formatCurrency(parseFloat(policy.cover_amount || 0))}
                          </p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            policy.status?.toLowerCase() === 'active' || policy.status?.toLowerCase() === 'created'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                          }`}>
                            {policy.status}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    </div>
                  </button>
                );
              })}
            </div>
          ) : isSalesAgent && !hasSearched ? (
            <div className="text-center py-12 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Search className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mx-auto mb-4" />
              <p className="text-sm sm:text-base text-slate-300 mb-2">Enter a policy number or ID number to search</p>
              <p className="text-xs sm:text-sm text-slate-400">You can search for any active policy in the system</p>
            </div>
          ) : null}
        </div>
      )}

      {claimStep === 2 && (
        <div className="bg-white/5 rounded-xl sm:rounded-2xl p-5 sm:p-8 backdrop-blur-sm space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Claim Details</h2>
          
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

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <button
              onClick={() => {
                onStepChange(1);
                if (isSalesAgent) {
                  setSearchQuery('');
                  setSearchResults([]);
                  setSearchError('');
                  setHasSearched(false);
                }
              }}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition-colors order-2 sm:order-1"
            >
              Back
            </button>
            <button
              onClick={onSubmit}
              disabled={loading || !claimFormData.claimType || !claimFormData.incidentDate || !claimFormData.description || !claimFormData.estimatedCost || !claimFormData.deviceOutlet}
              className={`flex-1 px-6 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 order-1 sm:order-2 ${
                !loading && claimFormData.claimType && claimFormData.incidentDate && claimFormData.description && claimFormData.estimatedCost && claimFormData.deviceOutlet
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 shadow-xl'
                  : 'bg-white/20 text-white/50 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span className="text-sm sm:text-base">Submitting...</span>
                </>
              ) : (
                <span className="text-sm sm:text-base">Submit Claim</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimFlow;
