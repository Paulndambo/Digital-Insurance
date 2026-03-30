/**
 * Product identity — gadget & device insurance (web app).
 * Update legal entity / contact here to keep the UI consistent.
 */
export const BRAND_NAME = 'CoverKit';
export const BRAND_NAME_LEGAL = 'CoverKit Insurance';
export const BRAND_TAGLINE = 'Coverage for the tech you carry';

export const BRAND_EMAIL = 'support@coverkit.co.ke';
export const BRAND_APP_USER_AGENT = 'CoverKit/1.0';

/** localStorage keys (current) */
export const STORAGE_KEYS = {
  policies: 'coverkit_policies',
  claims: 'coverkit_claims',
  user: 'coverkit_user',
  accessToken: 'coverkit_accessToken',
  refreshToken: 'coverkit_refreshToken',
};

/** Cookie name for JWT access token (3h expiry in storage layer) */
export const ACCESS_TOKEN_COOKIE_NAME = 'coverkit_access_token';

/** Previous prefix — read once and migrate to STORAGE_KEYS */
export const STORAGE_KEYS_LEGACY = {
  policies: 'deviceShield_policies',
  claims: 'deviceShield_claims',
  user: 'deviceShield_user',
  accessToken: 'deviceShield_accessToken',
  refreshToken: 'deviceShield_refreshToken',
};
