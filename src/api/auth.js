import { apiRequest } from './client';
import { ENDPOINTS } from './constants';
import { setSession } from '@/utils/storage';

/**
 * @typedef {object} Session
 * @property {object} user - Profile basics plus a `venueManager` flag.
 * @property {string} token - Bearer access token.
 * @property {string} apiKey - Noroff API key created for this session.
 */

/**
 * Log in, then create an API key and load the Holidaze profile to learn whether
 * the user is a venue manager. The token and key are persisted as we go so each
 * follow-up request is authenticated.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<Session>}
 */
export async function login({ email, password }) {
  const { data } = await apiRequest(ENDPOINTS.login, {
    method: 'POST',
    body: { email, password },
  });

  const { accessToken, ...profile } = data;
  setSession({ token: accessToken });

  const { data: keyData } = await apiRequest(ENDPOINTS.createApiKey, {
    method: 'POST',
    auth: true,
    body: { name: 'Holidaze' },
  });
  setSession({ apiKey: keyData.key });

  const { data: holidazeProfile } = await apiRequest(`${ENDPOINTS.profiles}/${profile.name}`, {
    auth: true,
  });

  const user = { ...profile, venueManager: Boolean(holidazeProfile.venueManager) };
  return { user, token: accessToken, apiKey: keyData.key };
}

/**
 * Register a new customer or venue manager. Does not log the user in.
 *
 * @param {object} details
 * @param {string} details.name - Username (letters, numbers, underscores).
 * @param {string} details.email - A stud.noroff.no email address.
 * @param {string} details.password - At least 8 characters.
 * @param {boolean} [details.venueManager] - Register as a venue manager.
 * @param {string} [details.avatarUrl] - Optional avatar image URL.
 * @returns {Promise<object>} The created profile.
 */
export async function register({ name, email, password, venueManager = false, avatarUrl }) {
  const body = { name, email, password, venueManager };
  if (avatarUrl) {
    body.avatar = { url: avatarUrl, alt: `${name}'s avatar` };
  }

  const { data } = await apiRequest(ENDPOINTS.register, { method: 'POST', body });
  return data;
}
