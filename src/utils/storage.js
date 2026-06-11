/**
 * Session persistence in localStorage: bearer token, API key and user profile.
 * @module utils/storage
 */

const TOKEN_KEY = 'holidaze:token';
const API_KEY = 'holidaze:apiKey';
const USER_KEY = 'holidaze:user';

/** @returns {string|null} The stored bearer token, if any. */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/** @returns {string|null} The stored Noroff API key, if any. */
export function getApiKey() {
  return localStorage.getItem(API_KEY);
}

/** @returns {object|null} The stored user profile, or null if absent or unparseable. */
export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Persist any subset of the session — only the provided fields are written.
 * @param {{ token?: string, apiKey?: string, user?: object }} session
 */
export function setSession({ token, apiKey, user }) {
  if (token !== undefined) localStorage.setItem(TOKEN_KEY, token);
  if (apiKey !== undefined) localStorage.setItem(API_KEY, apiKey);
  if (user !== undefined) localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Persist the user profile.
 * @param {object} user
 */
export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/** Clear the entire stored session (used on logout). */
export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(API_KEY);
  localStorage.removeItem(USER_KEY);
}
