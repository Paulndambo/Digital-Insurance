import { useState, useEffect } from 'react';
import { getStoredPolicies, savePolicy } from '../utils/storage';

export const usePolicies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    setPolicies(getStoredPolicies());
  }, []);

  const addPolicy = (policy) => {
    const updatedPolicies = savePolicy(policy);
    setPolicies(updatedPolicies);
    return updatedPolicies;
  };

  const refreshPolicies = () => {
    setPolicies(getStoredPolicies());
  };

  const getUserPolicies = (userEmail) => {
    return policies.filter(p => p.email === userEmail);
  };

  return { policies, addPolicy, refreshPolicies, getUserPolicies };
};
