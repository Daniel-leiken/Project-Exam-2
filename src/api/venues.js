import { apiRequest } from './client';
import { ENDPOINTS } from './constants';

// Always include the owner and existing bookings so detail pages can show the
// host and block already-booked dates.
const RELATIONS = '_owner=true&_bookings=true';

/**
 * Fetch a page of venues.
 *
 * @param {object} [options]
 * @param {number} [options.page=1]
 * @param {number} [options.limit=12]
 * @param {string} [options.sort='created']
 * @param {'asc'|'desc'} [options.sortOrder='desc']
 * @returns {Promise<{ data: object[], meta: object }>}
 */
export async function getVenues({
  page = 1,
  limit = 12,
  sort = 'created',
  sortOrder = 'desc',
} = {}) {
  const query = `?${RELATIONS}&limit=${limit}&page=${page}&sort=${sort}&sortOrder=${sortOrder}`;
  return apiRequest(`${ENDPOINTS.venues}${query}`);
}

/**
 * Search venues by name/description.
 *
 * @param {object} options
 * @param {string} options.q - Search query.
 * @param {number} [options.page=1]
 * @param {number} [options.limit=12]
 * @returns {Promise<{ data: object[], meta: object }>}
 */
export async function searchVenues({ q, page = 1, limit = 12 }) {
  const query = `?q=${encodeURIComponent(q)}&${RELATIONS}&limit=${limit}&page=${page}`;
  return apiRequest(`${ENDPOINTS.venues}/search${query}`);
}

/**
 * Fetch a single venue by id, including its owner and bookings.
 *
 * @param {string} id
 * @returns {Promise<{ data: object }>}
 */
export async function getVenue(id) {
  return apiRequest(`${ENDPOINTS.venues}/${id}?${RELATIONS}`);
}

/**
 * Create a new venue (venue managers only).
 *
 * @param {object} venue - Venue payload (name, price, maxGuests, media, meta, location…).
 * @returns {Promise<{ data: object }>}
 */
export async function createVenue(venue) {
  return apiRequest(ENDPOINTS.venues, { method: 'POST', auth: true, body: venue });
}

/**
 * Update a venue you manage.
 *
 * @param {string} id
 * @param {object} venue - Updated venue payload.
 * @returns {Promise<{ data: object }>}
 */
export async function updateVenue(id, venue) {
  return apiRequest(`${ENDPOINTS.venues}/${id}`, { method: 'PUT', auth: true, body: venue });
}

/**
 * Delete a venue you manage.
 *
 * @param {string} id
 * @returns {Promise<null>}
 */
export async function deleteVenue(id) {
  return apiRequest(`${ENDPOINTS.venues}/${id}`, { method: 'DELETE', auth: true });
}

/**
 * Fetch the venues owned by a profile, each with its bookings.
 *
 * @param {string} name - The manager's profile name.
 * @returns {Promise<{ data: object[], meta: object }>}
 */
export async function getManagerVenues(name) {
  const query = '?_bookings=true&sort=created&sortOrder=desc';
  return apiRequest(`${ENDPOINTS.profiles}/${name}/venues${query}`, { auth: true });
}
