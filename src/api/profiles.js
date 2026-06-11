import { apiRequest } from './client';
import { ENDPOINTS } from './constants';

/** Update a profile's avatar. Returns the updated profile. */
export async function updateAvatar(name, { url, alt }) {
  const { data } = await apiRequest(`${ENDPOINTS.profiles}/${name}`, {
    method: 'PUT',
    auth: true,
    body: { avatar: { url, alt } },
  });
  return data;
}
