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
