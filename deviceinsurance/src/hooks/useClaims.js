import { useState, useEffect } from 'react';
import { getStoredClaims, saveClaim } from '../utils/storage';

export const useClaims = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    setClaims(getStoredClaims());
  }, []);

  const addClaim = (claim) => {
    const updatedClaims = saveClaim(claim);
    setClaims(updatedClaims);
    return updatedClaims;
  };

  const refreshClaims = () => {
    setClaims(getStoredClaims());
  };

  const getUserClaims = (policies = [], userEmail) => {
    if (!userEmail) return [];
    return claims.filter(c => {
      const policy = policies.find(p => p.id === c.policyId);
      return policy && policy.email === userEmail;
    });
  };

  return { claims, addClaim, refreshClaims, getUserClaims };
};
