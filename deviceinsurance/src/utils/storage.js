// Storage utility functions for localStorage operations

export const getStoredPolicies = () => {
  try {
    const stored = localStorage.getItem('deviceShield_policies');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const savePolicy = (policy) => {
  const policies = getStoredPolicies();
  policies.push(policy);
  localStorage.setItem('deviceShield_policies', JSON.stringify(policies));
  return policies;
};

export const getStoredClaims = () => {
  try {
    const stored = localStorage.getItem('deviceShield_claims');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveClaim = (claim) => {
  const claims = getStoredClaims();
  claims.push(claim);
  localStorage.setItem('deviceShield_claims', JSON.stringify(claims));
  return claims;
};

export const getStoredUser = () => {
  try {
    const stored = localStorage.getItem('deviceShield_user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const saveUser = (user) => {
  localStorage.setItem('deviceShield_user', JSON.stringify(user));
  return user;
};

export const clearUser = () => {
  localStorage.removeItem('deviceShield_user');
};

export const getStoredAccessToken = () => {
  try {
    return localStorage.getItem('deviceShield_accessToken');
  } catch {
    return null;
  }
};

export const saveAccessToken = (token) => {
  localStorage.setItem('deviceShield_accessToken', token);
  return token;
};

export const getStoredRefreshToken = () => {
  try {
    return localStorage.getItem('deviceShield_refreshToken');
  } catch {
    return null;
  }
};

export const saveRefreshToken = (token) => {
  localStorage.setItem('deviceShield_refreshToken', token);
  return token;
};

export const clearTokens = () => {
  localStorage.removeItem('deviceShield_accessToken');
  localStorage.removeItem('deviceShield_refreshToken');
};
