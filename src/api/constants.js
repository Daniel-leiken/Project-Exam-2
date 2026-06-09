const fallbackBaseUrl = 'https://v2.api.noroff.dev';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? fallbackBaseUrl;
export const API_KEY = import.meta.env.VITE_API_KEY;

export const ENDPOINTS = {
  register: '/auth/register',
  login: '/auth/login',
  createApiKey: '/auth/create-api-key',
  venues: '/holidaze/venues',
  bookings: '/holidaze/bookings',
  profiles: '/holidaze/profiles',
};
