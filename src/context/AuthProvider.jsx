import { useCallback, useMemo, useState } from 'react';
import { AuthContext } from './auth-context';
import { clearSession, getUser, setSession, setUser as persistUser } from '@/utils/storage';

/**
 * Provides authentication state to the app and keeps it in sync with localStorage,
 * so a refresh restores the signed-in user.
 *
 * @param {{ children: React.ReactNode }} props
 */
export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() => getUser());

  /**
   * Store a freshly authenticated session.
   * @param {import('@/api/auth').Session} session
   */
  const login = useCallback(({ user, token, apiKey }) => {
    setSession({ token, apiKey, user });
    setUserState(user);
  }, []);

  /** Clear the session and sign the user out. */
  const logout = useCallback(() => {
    clearSession();
    setUserState(null);
  }, []);

  /**
   * Merge changes into the current user and persist them.
   * @param {object} changes
   */
  const updateUser = useCallback((changes) => {
    setUserState((current) => {
      const next = { ...current, ...changes };
      persistUser(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isVenueManager: Boolean(user?.venueManager),
      login,
      logout,
      updateUser,
    }),
    [user, login, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
