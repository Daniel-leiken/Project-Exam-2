import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Lazy-load pages so each route is its own chunk (keeps the initial bundle small
// and defers heavy dependencies like the booking calendar until they're needed).
const Home = lazy(() => import('@/pages/Home'));
const Venues = lazy(() => import('@/pages/Venues'));
const VenueDetail = lazy(() => import('@/pages/VenueDetail'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Profile = lazy(() => import('@/pages/Profile'));
const ManagerDashboard = lazy(() => import('@/pages/ManagerDashboard'));
const CreateVenue = lazy(() => import('@/pages/CreateVenue'));
const EditVenue = lazy(() => import('@/pages/EditVenue'));
const VenueBookings = lazy(() => import('@/pages/VenueBookings'));
const NotFound = lazy(() => import('@/pages/NotFound'));

/**
 * Application routes. Every page renders inside the shared {@link Layout}.
 * `/profile` requires authentication; the `/manager` routes require a venue manager.
 */
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="venues" element={<Venues />} />
        <Route path="venues/:id" element={<VenueDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoute requireManager />}>
          <Route path="manager" element={<ManagerDashboard />} />
          <Route path="manager/venues/new" element={<CreateVenue />} />
          <Route path="manager/venues/:id/edit" element={<EditVenue />} />
          <Route path="manager/venues/:id/bookings" element={<VenueBookings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
