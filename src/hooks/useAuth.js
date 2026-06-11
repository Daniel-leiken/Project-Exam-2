import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';

/**
 * Access authentication state and actions.
 *
 * @returns {{ user: object|null, isAuthenticated: boolean, isVenueManager: boolean,
 *   login: Function, logout: Function, updateUser: Function }}
 * @throws {Error} If used outside an {@link AuthProvider}.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
