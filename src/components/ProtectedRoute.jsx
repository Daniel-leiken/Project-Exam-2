import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

/**
 * Route guard for authenticated areas. Unauthenticated users are redirected to
 * `/login` (remembering where they came from); when `requireManager` is set,
 * non-managers are sent home. Renders the matched child route via `<Outlet>`.
 *
 * @param {object} props
 * @param {boolean} [props.requireManager=false] - Restrict to venue managers.
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
