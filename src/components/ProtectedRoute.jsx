import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

/**
 * Gate for authenticated routes. Pass `requireManager` for venue-manager-only areas.
 * Unauthenticated users are sent to /login, remembering where they came from.
 */
function ProtectedRoute({ requireManager = false }) {
  const { isAuthenticated, isVenueManager } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requireManager && !isVenueManager) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export { ProtectedRoute };
