import Cookies from 'js-cookie';

const AUTH_URL =
  'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin';
const REFERRALS_URL =
  'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals';

export const COOKIE_NAME = 'jwt_token';

export async function signIn(email, password) {
  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  let responseJson = {};
  try {
    responseJson = await response.json();
  } catch (e) {
    console.log(e);
  }

  if (response.ok) {
    const token = responseJson?.data?.token;
    return { success: true, token };
  }

  const message = responseJson?.message || 'Invalid email or password';
  return { success: false, message };
}

function buildReferralsUrl({ id, search, sort } = {}) {
  const url = new URL(REFERRALS_URL);
  if (id !== undefined && id !== null) {
    url.searchParams.set('id', id);
  }
  if (search) {
    url.searchParams.set('search', search);
  }
  if (sort) {
    url.searchParams.set('sort', sort);
  }
  return url.toString();
}

export async function fetchReferrals({ search, sort } = {}) {
  const token = Cookies.get(COOKIE_NAME);
  const url = buildReferralsUrl({ search, sort });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let responseJson = {};
  try {
    responseJson = await response.json();
  } catch (e) {
    console.log(e);
  }

  if (!response.ok) {
    const message = responseJson?.message || 'Failed to load referrals';
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return normalizeData(responseJson);
}

export async function fetchReferralById(id) {
  const token = Cookies.get(COOKIE_NAME);
  const url = buildReferralsUrl({ id });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let responseJson = {};
  try {
    responseJson = await response.json();
  } catch (e) {
    console.log(e);
  }

  if (!response.ok) {
    const message = responseJson?.message || 'Referral not found';
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  const normalized = normalizeData(responseJson);

  const dataField = responseJson?.data;
  if (
    dataField &&
    typeof dataField === 'object' &&
    !Array.isArray(dataField) &&
    (dataField.id !== undefined || dataField.name !== undefined)
  ) {
    const looksLikeRow =
      dataField.name !== undefined ||
      dataField.serviceName !== undefined ||
      dataField.profit !== undefined;
    if (looksLikeRow) {
      return dataField;
    }
  }

  if (normalized.referrals && normalized.referrals.length > 0) {
    const match = normalized.referrals.find(
      (r) => String(r.id) === String(id)
    );
    if (match) return match;
    if (normalized.referrals.length === 1) {
      return normalized.referrals[0];
    }
  }

  return null;
}

// Normalizes the API response shape. Handles both:
// { success, data: { metrics, serviceSummary, referral, referrals } }
// and metrics/serviceSummary/referral/referrals sitting beside `data`.
function normalizeData(responseJson) {
  const data = responseJson?.data;
  const base =
    data && typeof data === 'object' && !Array.isArray(data)
      ? data
      : responseJson;

  return {
    metrics: base?.metrics || [],
    serviceSummary: base?.serviceSummary || null,
    referral: base?.referral || null,
    referrals: base?.referrals || (Array.isArray(data) ? data : []),
  };
}
