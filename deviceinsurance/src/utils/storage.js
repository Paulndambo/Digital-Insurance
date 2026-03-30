// Storage utility functions for localStorage and access-token cookie
import {
  ACCESS_TOKEN_COOKIE_NAME,
  STORAGE_KEYS,
  STORAGE_KEYS_LEGACY,
} from '../constants/branding';

/** Access token lifetime in cookies (3 hours), in seconds */
const ACCESS_TOKEN_MAX_AGE_SEC = 3 * 60 * 60;

function setCookie(name, value, maxAgeSec) {
  if (typeof document === 'undefined') return;
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSec}; SameSite=Lax`;
  if (typeof window !== 'undefined' && window.location?.protocol === 'https:') {
    cookie += '; Secure';
  }
  document.cookie = cookie;
}

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const prefix = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split('; ');
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (p.startsWith(prefix)) {
      return decodeURIComponent(p.slice(prefix.length));
    }
  }
  return null;
}

function deleteCookie(name) {
  if (typeof document === 'undefined') return;
  document.cookie = `${encodeURIComponent(name)}=; path=/; max-age=0; SameSite=Lax`;
}

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

/** User + access token must both exist; otherwise clear orphaned profile from storage. */
export const getSessionUserOrClearStale = () => {
  const u = getStoredUser();
  const t = getStoredAccessToken();
  if (u && !t) {
    clearUser();
    return null;
  }
  return u;
};

export const getStoredAccessToken = () => {
  try {
    let v = getCookie(ACCESS_TOKEN_COOKIE_NAME);
    if (v == null) {
      v = localStorage.getItem(STORAGE_KEYS.accessToken);
      if (v == null) {
        v = localStorage.getItem(STORAGE_KEYS_LEGACY.accessToken);
        if (v != null) localStorage.setItem(STORAGE_KEYS.accessToken, v);
      }
      if (v != null) {
        setCookie(ACCESS_TOKEN_COOKIE_NAME, v, ACCESS_TOKEN_MAX_AGE_SEC);
      }
    }
    return v;
  } catch {
    return null;
  }
};

export const saveAccessToken = (token) => {
  try {
    localStorage.setItem(STORAGE_KEYS.accessToken, token);
    setCookie(ACCESS_TOKEN_COOKIE_NAME, token, ACCESS_TOKEN_MAX_AGE_SEC);
  } catch {
    /* ignore */
  }
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
  deleteCookie(ACCESS_TOKEN_COOKIE_NAME);
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.refreshToken);
  localStorage.removeItem(STORAGE_KEYS_LEGACY.accessToken);
  localStorage.removeItem(STORAGE_KEYS_LEGACY.refreshToken);
};
