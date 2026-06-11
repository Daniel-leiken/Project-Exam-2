import { apiRequest } from './client';
import { ENDPOINTS } from './constants';

/**
 * Update a profile's avatar.
 *
 * @param {string} name - The profile (user) name.
 * @param {{ url: string, alt: string }} avatar - New avatar image and alt text.
 * @returns {Promise<object>} The updated profile.
 */
export async function updateAvatar(name, { url, alt }) {
  const { data } = await apiRequest(`${ENDPOINTS.profiles}/${name}`, {
    method: 'PUT',
    auth: true,
    body: { avatar: { url, alt } },
  });
  return data;
}
