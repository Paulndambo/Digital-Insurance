// Storage utility functions for localStorage operations
import { STORAGE_KEYS, STORAGE_KEYS_LEGACY } from '../constants/branding';

function readMigrated(key, legacyKey) {
  try {
    let raw = localStorage.getItem(key);
    if (raw == null && legacyKey) {
      raw = localStorage.getItem(legacyKey);
      if (raw != null) {
        localStorage.setItem(key, raw);
      }
    }
    return raw;
  } catch {
    return null;
  }
}

export const getStoredPolicies = () => {
  try {
    const stored = readMigrated(STORAGE_KEYS.policies, STORAGE_KEYS_LEGACY.policies);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const savePolicy = (policy) => {
  const policies = getStoredPolicies();
  policies.push(policy);
  localStorage.setItem(STORAGE_KEYS.policies, JSON.stringify(policies));
  return policies;
};

export const getStoredClaims = () => {
  try {
    const stored = readMigrated(STORAGE_KEYS.claims, STORAGE_KEYS_LEGACY.claims);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveClaim = (claim) => {
  const claims = getStoredClaims();
  claims.push(claim);
  localStorage.setItem(STORAGE_KEYS.claims, JSON.stringify(claims));
  return claims;
};

export const getStoredUser = () => {
  try {
    const stored = readMigrated(STORAGE_KEYS.user, STORAGE_KEYS_LEGACY.user);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const saveUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  return user;
};

export const clearUser = () => {
  localStorage.removeItem(STORAGE_KEYS.user);
  localStorage.removeItem(STORAGE_KEYS_LEGACY.user);
};

export const getStoredAccessToken = () => {
  try {
    let v = localStorage.getItem(STORAGE_KEYS.accessToken);
    if (v == null) {
      v = localStorage.getItem(STORAGE_KEYS_LEGACY.accessToken);
      if (v != null) localStorage.setItem(STORAGE_KEYS.accessToken, v);
    }
    return v;
  } catch {
    return null;
  }
};

export const saveAccessToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.accessToken, token);
  return token;
};

export const getStoredRefreshToken = () => {
  try {
    let v = localStorage.getItem(STORAGE_KEYS.refreshToken);
    if (v == null) {
      v = localStorage.getItem(STORAGE_KEYS_LEGACY.refreshToken);
      if (v != null) localStorage.setItem(STORAGE_KEYS.refreshToken, v);
    }
    return v;
  } catch {
    return null;
  }
};

export const saveRefreshToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.refreshToken, token);
  return token;
};

export const clearTokens = () => {
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.refreshToken);
  localStorage.removeItem(STORAGE_KEYS_LEGACY.accessToken);
  localStorage.removeItem(STORAGE_KEYS_LEGACY.refreshToken);
};
