import { API_BASE_URL, API_KEY } from './constants';
import { getApiKey, getToken } from '@/utils/storage';

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

/**
 * Thin wrapper around fetch for the Noroff API.
 * Set `auth: true` to attach the bearer token and API key for protected endpoints.
 * Returns the parsed JSON body ({ data, meta }), or null for empty responses.
 */
export async function apiRequest(endpoint, { method = 'GET', body, auth = false, headers = {} } = {}) {
  const config = {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
  };

  if (auth) {
    const token = getToken();
    // Prefer the key generated at login; fall back to a static env key if provided.
    const apiKey = getApiKey() ?? API_KEY;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (apiKey) config.headers['X-Noroff-API-Key'] = apiKey;
  }

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (response.status === 204) {
    return null;
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.errors?.[0]?.message ?? 'Something went wrong. Please try again.';
    throw new ApiError(message, response.status, payload?.errors);
  }

  return payload;
}
