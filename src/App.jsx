import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Home from '@/pages/Home';
import Venues from '@/pages/Venues';
import VenueDetail from '@/pages/VenueDetail';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';
import ManagerDashboard from '@/pages/ManagerDashboard';
import CreateVenue from '@/pages/CreateVenue';
import EditVenue from '@/pages/EditVenue';
import VenueBookings from '@/pages/VenueBookings';
import NotFound from '@/pages/NotFound';

/**
 * Application routes. Every page renders inside the shared {@link Layout}.
 * `/profile` requires authentication; `/manager` requires a venue manager.
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
