import { apiRequest } from './client';
import { ENDPOINTS } from './constants';

/**
 * Update fields on a profile (avatar, banner, bio, venueManager…).
 *
 * @param {string} name - The profile (user) name.
 * @param {object} data - Profile fields to update.
 * @returns {Promise<object>} The updated profile.
 */
export async function updateProfile(name, data) {
  const { data: profile } = await apiRequest(`${ENDPOINTS.profiles}/${name}`, {
    method: 'PUT',
    auth: true,
    body: data,
  });
  return profile;
}

/**
 * Update a profile's avatar.
 *
 * @param {string} name - The profile (user) name.
 * @param {{ url: string, alt: string }} avatar - New avatar image and alt text.
 * @returns {Promise<object>} The updated profile.
 */
export async function updateAvatar(name, { url, alt }) {
  return updateProfile(name, { avatar: { url, alt } });
}
