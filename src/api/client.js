import { API_BASE_URL, API_KEY } from './constants';
import { getApiKey, getToken } from '@/utils/storage';

/** Error thrown when the API responds with a non-2xx status. */
export class ApiError extends Error {
  /**
   * @param {string} message - Human-readable message (from the API when available).
   * @param {number} status - HTTP status code.
   * @param {Array<{message: string}>} [errors] - Raw error list from the API.
   */
  constructor(message, status, errors) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

/**
 * Thin wrapper around `fetch` for the Noroff API.
 *
 * @param {string} endpoint - Path appended to the API base URL (e.g. `/holidaze/venues`).
 * @param {object} [options]
 * @param {string} [options.method] - HTTP method. Defaults to `GET`.
 * @param {unknown} [options.body] - Request body; JSON-stringified automatically.
 * @param {boolean} [options.auth] - Attach the bearer token and API key for protected endpoints.
 * @param {Record<string, string>} [options.headers] - Extra headers to merge in.
 * @returns {Promise<object|null>} Parsed JSON body (`{ data, meta }`), or `null` for empty responses.
 * @throws {ApiError} When the response status is not ok.
 */
export async function apiRequest(
  endpoint,
  { method = 'GET', body, auth = false, headers = {} } = {}
) {
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

  // 204 No Content (e.g. DELETE) has no body to parse.
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
