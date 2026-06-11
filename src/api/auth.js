import { apiRequest } from './client';
import { ENDPOINTS } from './constants';
import { setSession } from '@/utils/storage';

/**
 * Log in, then create an API key and look up the Holidaze profile so we know
 * whether the user is a venue manager. Token and key are persisted along the
 * way so each follow-up request is authenticated.
 * Returns the full session: { user, token, apiKey }.
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

/** Register a new customer or venue manager. Does not log the user in. */
export async function register({ name, email, password, venueManager = false, avatarUrl }) {
  const body = { name, email, password, venueManager };
  if (avatarUrl) {
    body.avatar = { url: avatarUrl, alt: `${name}'s avatar` };
  }

  const { data } = await apiRequest(ENDPOINTS.register, { method: 'POST', body });
  return data;
}
