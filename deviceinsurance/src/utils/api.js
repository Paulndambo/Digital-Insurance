// API utility functions for backend communication
import { BRAND_APP_USER_AGENT } from '../constants/branding';

// API Base URL - Update this to match your backend server
// For Create React App, you can use: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
// For Vite, you can use: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const API_BASE_URL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_BASE_URL) 
  ? process.env.REACT_APP_API_BASE_URL 
  : 'http://127.0.0.1:8000';

function parseApiErrorPayload(response, bodyText) {
  try {
    const err = JSON.parse(bodyText);
    if (typeof err === 'string') return err;
    if (err?.error) return err.error;
    if (err?.detail) return typeof err.detail === 'string' ? err.detail : JSON.stringify(err.detail);
    const firstField = Object.values(err).find(
      (v) => typeof v === 'string' || (Array.isArray(v) && v.length)
    );
    if (Array.isArray(firstField)) return String(firstField[0]);
    if (typeof firstField === 'string') return firstField;
  } catch {
    /* ignore */
  }
  return bodyText || `Request failed (${response.status})`;
}

/** 400 + DRF non_field_errors when account exists but is inactive */
function messageForInactiveLoginAccount(status, bodyText) {
  if (status !== 400 || !bodyText) return null;
  try {
    const err = JSON.parse(bodyText);
    const nfe = err.non_field_errors;
    if (!Array.isArray(nfe)) return null;
    const joined = nfe.filter(Boolean).join(' ');
    if (/not active|activate your account/i.test(joined)) {
      return 'Check your mailbox (including spam) for an account activation link. Open the link to activate your account, then sign in again.';
    }
  } catch {
    /* ignore */
  }
  return null;
}

export const fetchPricingPlans = async () => {
  try {
    const headersList = {
      "Accept": "*/*",
      "User-Agent": BRAND_APP_USER_AGENT
    };

    const response = await fetch(`${API_BASE_URL}/pricing/gadget-pricing/`, {
      method: "GET",
      headers: headersList
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json",
      "User-Agent": BRAND_APP_USER_AGENT
    };

    const bodyContent = JSON.stringify({
      username,
      password
    });

    const response = await fetch(`${API_BASE_URL}/users/login/`, {
      method: "POST",
      headers: headersList,
      body: bodyContent
    });

    if (!response.ok) {
      const errorText = await response.text();
      const inactiveMsg = messageForInactiveLoginAccount(response.status, errorText);
      if (inactiveMsg) {
        throw new Error(inactiveMsg);
      }
      throw new Error(parseApiErrorPayload(response, errorText));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const activateAccount = async ({ token, password, confirmPassword }) => {
  const headersList = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': BRAND_APP_USER_AGENT,
  };

  const bodyContent = JSON.stringify({
    token,
    password,
    confirm_password: confirmPassword,
  });

  const response = await fetch(`${API_BASE_URL}/users/activate/`, {
    method: 'POST',
    headers: headersList,
    body: bodyContent,
  });

  const text = await response.text();

  if (!response.ok) {
    const message = parseApiErrorPayload(response, text);
    throw new Error(message);
  }

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
};

export const createPolicy = async (policyData, accessToken = null) => {
  try {
    const headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json",
      "User-Agent": BRAND_APP_USER_AGENT
    };

    // Add Authorization header with Bearer token if provided
    if (accessToken) {
      headersList["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}/sales/gadget-policy-purchase/`, {
      method: "POST",
      headers: headersList,
      body: JSON.stringify(policyData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating policy:', error);
    throw error;
  }
};

export const fetchPremiums = async (accessToken) => {
  try {
    const headersList = {
      "Accept": "*/*",
      "User-Agent": BRAND_APP_USER_AGENT
    };

    // Add Authorization header with Bearer token
    if (accessToken) {
      headersList["Authorization"] = `Bearer ${accessToken}`;
    } else {
      throw new Error('Access token is required to fetch premiums');
    }

    const response = await fetch(`${API_BASE_URL}/payments/premiums`, {
      method: "GET",
      headers: headersList
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching premiums:', error);
    throw error;
  }
};

export const fetchPolicyOwners = async (accessToken) => {
  try {
    const headersList = {
      "Accept": "*/*",
      "User-Agent": BRAND_APP_USER_AGENT
    };

    // Add Authorization header with Bearer token
    if (accessToken) {
      headersList["Authorization"] = `Bearer ${accessToken}`;
    } else {
      throw new Error('Access token is required to fetch policy owners');
    }

    const response = await fetch(`${API_BASE_URL}/users/memberships`, {
      method: "GET",
      headers: headersList
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching policy owners:', error);
    throw error;
  }
};

export const fetchDeviceOutlets = async (accessToken) => {
  try {
    const headersList = {
      "Accept": "*/*",
      "User-Agent": BRAND_APP_USER_AGENT
    };

    // Add Authorization header with Bearer token
    if (accessToken) {
      headersList["Authorization"] = `Bearer ${accessToken}`;
    } else {
      throw new Error('Access token is required to fetch device outlets');
    }

    const response = await fetch(`${API_BASE_URL}/gadgets/device-outlets/`, {
      method: "GET",
      headers: headersList
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching device outlets:', error);
    throw error;
  }
};

export const createDeviceOutlet = async (payload, accessToken) => {
  try {
    const headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": BRAND_APP_USER_AGENT,
    };

    if (accessToken) {
      headersList.Authorization = `Bearer ${accessToken}`;
    } else {
      throw new Error("Access token is required to register a device outlet");
    }

    const response = await fetch(`${API_BASE_URL}/gadgets/device-outlets/`, {
      method: "POST",
      headers: headersList,
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!response.ok) {
      const detail =
        typeof data === "object" && data !== null
          ? JSON.stringify(data)
          : String(data || response.statusText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${detail}`);
    }

    return data;
  } catch (error) {
    console.error("Error creating device outlet:", error);
    throw error;
  }
};

/** Public onboarding: creates Sales Agent user + device outlet (no auth). */
export const submitDeviceOutletOnboarding = async (payload) => {
  try {
    const headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": BRAND_APP_USER_AGENT,
    };

    const response = await fetch(`${API_BASE_URL}/gadgets/device-outlets/onboarding/`, {
      method: "POST",
      headers: headersList,
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!response.ok) {
      let message =
        typeof data === "object" && data !== null
          ? data.detail || JSON.stringify(data)
          : String(data || response.statusText);
      if (typeof message === "string" && message.length > 400) {
        message = `${message.slice(0, 400)}…`;
      }
      throw new Error(message || `Request failed (${response.status})`);
    }

    return data;
  } catch (error) {
    console.error("Error submitting device outlet onboarding:", error);
    throw error;
  }
};

export const fetchInsuredDevices = async (accessToken) => {
  try {
    const headersList = {
      "Accept": "*/*",
      "User-Agent": BRAND_APP_USER_AGENT
    };

    // Add Authorization header with Bearer token
    if (accessToken) {
      headersList["Authorization"] = `Bearer ${accessToken}`;
    } else {
      throw new Error('Access token is required to fetch insured devices');
    }

    const response = await fetch(`${API_BASE_URL}/gadgets`, {
      method: "GET",
      headers: headersList
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching insured devices:', error);
    throw error;
  }
};

export const fetchPolicies = async (accessToken) => {
  try {
    const headersList = {
      "Accept": "*/*",
      "User-Agent": BRAND_APP_USER_AGENT
    };

    // Add Authorization header with Bearer token
    if (accessToken) {
      headersList["Authorization"] = `Bearer ${accessToken}`;
    } else {
      throw new Error('Access token is required to fetch policies');
    }

    const response = await fetch(`${API_BASE_URL}/policies/`, {
      method: "GET",
      headers: headersList
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching policies:', error);
    throw error;
  }
};

export const searchPolicies = async (searchQuery, accessToken) => {
  try {
    const headersList = {
      "Accept": "*/*",
      "User-Agent": BRAND_APP_USER_AGENT
    };

    // Add Authorization header with Bearer token
    if (accessToken) {
      headersList["Authorization"] = `Bearer ${accessToken}`;
    } else {
      throw new Error('Access token is required to search policies');
    }

    if (!searchQuery || !searchQuery.trim()) {
      throw new Error('Search query is required');
    }

    const response = await fetch(`${API_BASE_URL}/policies/policies-search/?search=${encodeURIComponent(searchQuery.trim())}`, {
      method: "GET",
      headers: headersList
    });

    if (!response.ok) {
      // Check if it's a 404 with specific error message
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        if (errorData.detail === "Policies not found.") {
          // Return empty array for not found
          return [];
        }
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // The API returns an array directly
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error searching policies:', error);
    throw error;
  }
};

export const fetchPolicyDetails = async (policyId, accessToken) => {
  try {
    const headersList = {
      "Accept": "*/*",
      "User-Agent": BRAND_APP_USER_AGENT
    };

    // Add Authorization header with Bearer token
    if (accessToken) {
      headersList["Authorization"] = `Bearer ${accessToken}`;
    } else {
      throw new Error('Access token is required to fetch policy details');
    }

    const response = await fetch(`${API_BASE_URL}/policies/${policyId}/details`, {
      method: "GET",
      headers: headersList
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching policy details:', error);
    throw error;
  }
};

export const fetchClaims = async (accessToken) => {
  try {
    const headersList = {
      "Accept": "*/*",
      "User-Agent": BRAND_APP_USER_AGENT
    };

    // Add Authorization header with Bearer token
    if (accessToken) {
      headersList["Authorization"] = `Bearer ${accessToken}`;
    } else {
      throw new Error('Access token is required to fetch claims');
    }

    const response = await fetch(`${API_BASE_URL}/claims`, {
      method: "GET",
      headers: headersList
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching claims:', error);
    throw error;
  }
};

export const fetchClaimDetails = async (claimId, accessToken) => {
  try {
    const headersList = {
      "Accept": "*/*",
      "User-Agent": BRAND_APP_USER_AGENT
    };

    // Add Authorization header with Bearer token
    if (accessToken) {
      headersList["Authorization"] = `Bearer ${accessToken}`;
    } else {
      throw new Error('Access token is required to fetch claim details');
    }

    const response = await fetch(`${API_BASE_URL}/claims/${claimId}/details/`, {
      method: "GET",
      headers: headersList
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching claim details:', error);
    throw error;
  }
};

export const createClaim = async (claimData, accessToken) => {
  try {
    const headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json",
      "User-Agent": BRAND_APP_USER_AGENT
    };

    // Add Authorization header with Bearer token
    if (accessToken) {
      headersList["Authorization"] = `Bearer ${accessToken}`;
    } else {
      throw new Error('Access token is required to create a claim');
    }

    const response = await fetch(`${API_BASE_URL}/claims/`, {
      method: "POST",
      headers: headersList,
      body: JSON.stringify(claimData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating claim:', error);
    throw error;
  }
};

export const uploadClaimDocument = async (documentData, accessToken) => {
  try {
    const headersList = {
      "Accept": "*/*",
      "User-Agent": BRAND_APP_USER_AGENT
    };

    // Add Authorization header with Bearer token
    if (accessToken) {
      headersList["Authorization"] = `Bearer ${accessToken}`;
    } else {
      throw new Error('Access token is required to upload claim document');
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('document_name', documentData.document_name);
    formData.append('document_file', documentData.document_file);
    formData.append('claim', documentData.claim);

    const response = await fetch(`${API_BASE_URL}/claims/claim-documents/`, {
      method: "POST",
      headers: headersList,
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading claim document:', error);
    throw error;
  }
};

export const fetchMetrics = async (accessToken) => {
  try {
    const headersList = {
      "Accept": "*/*",
      "User-Agent": BRAND_APP_USER_AGENT
    };

    // Add Authorization header with Bearer token
    if (accessToken) {
      headersList["Authorization"] = `Bearer ${accessToken}`;
    } else {
      throw new Error('Access token is required to fetch metrics');
    }

    const response = await fetch(`${API_BASE_URL}/core/metrics`, {
      method: "GET",
      headers: headersList
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
};
