/**
 * Configuration for the Noroff Holidaze API.
 * @module api/constants
 */

const fallbackBaseUrl = 'https://v2.api.noroff.dev';

/** Base URL for the Noroff API v2 (override with `VITE_API_BASE_URL`). */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? fallbackBaseUrl;

/** Optional static API key. Usually unset — the app creates one at login. */
export const API_KEY = import.meta.env.VITE_API_KEY;

/** Relative paths for the endpoints this app uses. */
export const ENDPOINTS = {
  register: '/auth/register',
  login: '/auth/login',
  createApiKey: '/auth/create-api-key',
  venues: '/holidaze/venues',
  bookings: '/holidaze/bookings',
  profiles: '/holidaze/profiles',
};
