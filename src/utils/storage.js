const TOKEN_KEY = 'holidaze:token';
const API_KEY = 'holidaze:apiKey';
const USER_KEY = 'holidaze:user';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getApiKey() {
  return localStorage.getItem(API_KEY);
}

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession({ token, apiKey, user }) {
  if (token !== undefined) localStorage.setItem(TOKEN_KEY, token);
  if (apiKey !== undefined) localStorage.setItem(API_KEY, apiKey);
  if (user !== undefined) localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(API_KEY);
  localStorage.removeItem(USER_KEY);
}
