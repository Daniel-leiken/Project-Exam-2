import { createContext } from 'react';

/**
 * Authentication context. Value:
 * `{ user, isAuthenticated, isVenueManager, login, logout, updateUser }`.
 * Consume it via the {@link useAuth} hook rather than directly.
 * @type {React.Context<object|null>}
 */
export const AuthContext = createContext(null);
