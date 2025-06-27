import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';

// Layouts
import MainLayout from '../layouts/MainLayout';

// General Placeholders & Content
import { Typography, Box } from '@mui/material';

// User Management Pages
import UserListPage from '../pages/userManagement/UserListPage';
import AddUserPage from '../pages/userManagement/AddUserPage';
import EditUserPage from '../pages/userManagement/EditUserPage';
import ViewUserPage from '../pages/userManagement/ViewUserPage';

// TODO: Import other module pages as they are created
// Example:
// import SubjectListPage from '../pages/academicManagement/subjects/SubjectListPage';


// Placeholder for Dashboard Content
const DashboardContent = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Dashboard</Typography>
    <Typography paragraph>
      Welcome to your Student Management System Dashboard.
      Select a module from the sidebar to get started.
    </Typography>
  </Box>
);

// Placeholder for other pages - to demonstrate routing within MainLayout
const GenericPagePlaceholder = ({ title = "Page" }) => (
  <Box>
    <Typography variant="h4" gutterBottom>{title}</Typography>
    <Typography paragraph>
      This is a placeholder page for {title}. Content will be added later.
    </Typography>
  </Box>
);

// This component will wrap routes that should use MainLayout and require authentication
const ProtectedRoutes = ({ isAuthenticated }) => {
  // TODO: Enhance with role-based access control.
  // For now, just checks if authenticated.
  // const { user } = useAuth(); // Example: Get user role from auth context
  // if (route.roles && !route.roles.includes(user.role)) return <Navigate to="/access-denied" replace />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <MainLayout>
      <Outlet /> {/* Child routes will render here inside MainLayout */}
    </MainLayout>
  );
};

const AppRoutes = () => {
  // Placeholder for authentication status. In a real app, this would come from context/state.
  // For testing the layout, set to true.
  const isAuthenticated = true;
  // const userRole = 'admin'; // Placeholder for role-based routing logic in future

  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication routes do not use MainLayout */}
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />} />
        <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPasswordPage /> : <Navigate to="/dashboard" />} />

        {/* Protected Routes that use MainLayout */}
        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<DashboardContent />} />

          {/* User Management Routes */}
          {/* TODO: Add role checks here, e.g., only for 'admin', 'super_admin' */}
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/add" element={<AddUserPage />} />
          <Route path="/users/edit/:userId" element={<EditUserPage />} />
          <Route path="/users/view/:userId" element={<ViewUserPage />} />

          {/* Placeholder routes for items in SidebarNav - these will be replaced by actual module pages */}
          <Route path="/students" element={<GenericPagePlaceholder title="Student Records" />} />
          <Route path="/subjects" element={<GenericPagePlaceholder title="Subjects" />} />
          <Route path="/grades/entry" element={<GenericPagePlaceholder title="Grade Entry" />} />
          <Route path="/my-grades" element={<GenericPagePlaceholder title="My Grades" />} />
          <Route path="/timetable" element={<GenericPagePlaceholder title="Timetable" />} />
          <Route path="/fees" element={<GenericPagePlaceholder title="Fees Management" />} />
          <Route path="/system-settings" element={<GenericPagePlaceholder title="System Settings" />} />
          {/* Add more protected routes here as modules are built */}
        </Route>

        {/* Fallback route - redirect to login or dashboard based on auth status */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
        />
        <Route
          path="*" // Catch-all for unmatched routes
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace /> // Or a dedicated 404 page within MainLayout
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
