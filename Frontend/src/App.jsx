// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext/ProfileContext';
import { jwtDecode } from 'jwt-decode';

// --- Page Imports ---
// Auth Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PublicHomePage from './pages/PublicHomePage';
// User-Facing Pages
import LandingPage from './pages/LandingPage';
import EventsListPage from './pages/EventsListPage';
import EventDetailPage from './pages/EventDetailPage';
import UniversitiesListPage from './pages/UniversitiesListPage';
import UniversityDetailPage from './pages/UniversityDetailPage';
import CompareDataPage from './pages/CompareDataPage';
import MyBookingsPage from './pages/MyBookingsPage';
import UserProfilePage from './pages/UserProfilePage';
import TestimonialsPage from './pages/TestimonialsPage';
import LatestEventsPage from './pages/LatestEventsPage';
import LatestBookingsPage from './pages/LatestBookingsPage';
import AdminNoticesPages from './pages/AdminNoticesPage';
import UniversityComparativeDataPage from './pages/UniversityComparativeDataPage';
// Not Found Page
import NotFoundPage from './pages/NotFoundPage';
// Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import CreateEventPage from './pages/admin/CreateEventPage';
import AdminCommentsPage from './pages/admin/AdminCommentsPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import AdminBookingsPage from './pages/admin/AdminBookingsPage';
import ConfirmBookingsPage from './pages/admin/ConfirmBookingsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import CreateCategoryPage from './pages/admin/CreateCategoryPage';
import CreateUniversityPage from './pages/admin/CreateUniversityPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminNoticesPage from './pages/admin/AdminNoticesPage';
import AdminUniversitiesPage from './pages/admin/AdminUniversitiesPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import EditEventPage from './pages/admin/EditEventPage';
import EditCategoryPage from './pages/admin/EditCategoryPage';
import EditUniversityPage from './pages/admin/EditUniversityPage';
import ShowBookingPage from './pages/admin/ShowBookingPage';

// --- Layout & Component Imports ---
// User-Facing Components
import UniversityEvents from './components/UniversityEvents';
import UniversityPrograms from './components/UniversityPrograms';
import UniversityFeeStructure from './components/UniversityFeeStructure';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';



// --- Authentication & Routing Logic ---
const getAuth = () => {
  const localtoken = localStorage.getItem('token');
  if (!localtoken) return { isAuthenticated: false, role: null };
  try {
    const decoded = jwtDecode(localtoken);
    return { isAuthenticated: true, role: decoded.role };
  } catch {
    return { isAuthenticated: false, role: null };
  }
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = getAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, role } = getAuth();
  if (!isAuthenticated) return <Navigate to="/login"  />;
  return role === 'Admin' ? children : <Navigate to="/home"  />;
};

const HomeRedirect = () => {
  const { isAuthenticated, role } = getAuth();
  if (!isAuthenticated) return <Navigate to="/login"  />;
  if (role === 'Admin') return <Navigate to="/admin/dashboard"  />;
  return <Navigate to="/home"  />;
};

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, role } = getAuth();
  if (!isAuthenticated) return children;
  if (role === 'Admin') return <Navigate to="/admin/dashboard"  />;
  return <Navigate to="/home"  />;
};


// --- Main App Component ---
function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          {/* === AUTHENTICATION ROUTES === */}
          <Route path="/" element={<PublicOnlyRoute><PublicHomePage /></PublicOnlyRoute>} />
          <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
          <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
          <Route path="/forgot-password" element={<PublicOnlyRoute><ResetPasswordPage /></PublicOnlyRoute>} />
          <Route path="/" element={<HomeRedirect />} />

          {/* === ADMIN PANEL ROUTES === */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<Navigate to="dashboard"  />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="events" element={<AdminEventsPage />} />
            <Route path="events/create" element={<CreateEventPage />} />
            <Route path="events/edit/:eventId" element={<EditEventPage />} />
            <Route path="comments" element={<AdminCommentsPage />} />
            <Route path="profile" element={<AdminProfilePage />} />
            <Route path="bookings" element={<AdminBookingsPage />} />
            <Route path="bookings/confirmed" element={<ConfirmBookingsPage />} />
            <Route path="bookings/show/:bookingId" element={<ShowBookingPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="categories/create" element={<CreateCategoryPage />} />
            <Route path="categories/edit/:categoryId" element={<EditCategoryPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="notices" element={<AdminNoticesPage />} />
            <Route path="universities" element={<AdminUniversitiesPage />} />
            <Route path="universities/create" element={<CreateUniversityPage />} />
            <Route path="universities/edit/:universityId" element={<EditUniversityPage />} />
            <Route path="setting" element={<AdminSettingsPage />} />
          </Route>

          {/* === USER-FACING ROUTES === */}
          <Route path="/home" element={<PrivateRoute> <LandingPage /> </PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute> <UserProfilePage /> </PrivateRoute>} />
          <Route path="/my-bookings" element={<PrivateRoute> <MyBookingsPage /> </PrivateRoute>} />
          <Route path="/notifications" element={<PrivateRoute> <AdminNoticesPages /> </PrivateRoute>} />
          <Route path="/compare-data" element={<PrivateRoute> <UniversityComparativeDataPage /> </PrivateRoute>} />
          <Route path="/events" element={<PrivateRoute> <EventsListPage /> </PrivateRoute>} />
          <Route path="/events/:eventId" element={<PrivateRoute> <EventDetailPage /> </PrivateRoute>} />
          <Route path="/testimonials" element={<PrivateRoute> <TestimonialsPage /> </PrivateRoute>} />
          <Route path="/events/latest" element={<PrivateRoute> <LatestEventsPage /> </PrivateRoute>} />
          <Route path="/bookings/latest" element={<PrivateRoute> <LatestBookingsPage /> </PrivateRoute>} />
          <Route path="/universities" element={<PrivateRoute> <UniversitiesListPage /> </PrivateRoute>} />
          <Route path="/universities/:universityId" element={<PrivateRoute><UniversityDetailPage /></PrivateRoute>}>
            <Route index element={<Navigate to="events"  />} />
            <Route path="events" element={<UniversityEvents />} />
            <Route path="programs" element={<UniversityPrograms />} />
            <Route path="fees" element={<UniversityFeeStructure />} />
          </Route>
          <Route path="/compare-data" element={<PrivateRoute><CompareDataPage /></PrivateRoute>} />
           <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;