import { useCallback, useMemo, useState } from 'react';
import { AuthContext } from './auth-context';
import { clearSession, getUser, setSession, setUser as persistUser } from '@/utils/storage';

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() => getUser());

  const login = useCallback(({ user, token, apiKey }) => {
    setSession({ token, apiKey, user });
    setUserState(user);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUserState(null);
  }, []);

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
