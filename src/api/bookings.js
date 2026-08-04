import { apiRequest } from './client';
import { ENDPOINTS } from './constants';

/**
 * Create a booking at a venue.
 *
 * @param {object} booking
 * @param {string} booking.venueId
 * @param {string} booking.dateFrom - ISO date string.
 * @param {string} booking.dateTo - ISO date string.
 * @param {number} booking.guests
 * @returns {Promise<{ data: object }>}
 */
export async function createBooking({ venueId, dateFrom, dateTo, guests }) {
  return apiRequest(ENDPOINTS.bookings, {
    method: 'POST',
    auth: true,
    body: { venueId, dateFrom, dateTo, guests },
  });
}

/**
 * Fetch the signed-in user's bookings, each with its venue, soonest first.
 *
 * @param {string} name - The profile (user) name.
 * @returns {Promise<{ data: object[], meta: object }>}
 */
export async function getMyBookings(name) {
  const query = '?_venue=true&sort=dateFrom&sortOrder=asc';
  return apiRequest(`${ENDPOINTS.profiles}/${name}/bookings${query}`, { auth: true });
}
