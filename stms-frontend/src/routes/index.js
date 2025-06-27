import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import MainLayout from '../layouts/MainLayout';
import { Typography, Box } from '@mui/material';

// User Management Pages
import UserListPage from '../pages/userManagement/UserListPage';
import AddUserPage from '../pages/userManagement/AddUserPage';
import EditUserPage from '../pages/userManagement/EditUserPage';
import ViewUserPage from '../pages/userManagement/ViewUserPage';

// Academic Management - Subjects Pages
import SubjectListPage from '../pages/academicManagement/subjects/SubjectListPage';
import AddSubjectPage from '../pages/academicManagement/subjects/AddSubjectPage';
import EditSubjectPage from '../pages/academicManagement/subjects/EditSubjectPage';

// Academic Management - Grades Pages
import GradeEntryPage from '../pages/academicManagement/grades/GradeEntryPage';
import MyGradesPage from '../pages/academicManagement/grades/MyGradesPage';


// Placeholder for Dashboard Content
const DashboardContent = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Dashboard</Typography>
    <Typography paragraph>
      Welcome to your Student Management System Dashboard.
      From here you can navigate to various modules using the sidebar.
    </Typography>
  </Box>
);

// Placeholder for other pages
const GenericPagePlaceholder = ({ title }) => (
  <Box>
    <Typography variant="h4" gutterBottom>{title}</Typography>
    <Typography paragraph>
      This is a placeholder page for {title}. Content will be added later.
    </Typography>
  </Box>
);

// Wraps routes that should use MainLayout and require authentication
const ProtectedRoutes = ({ isAuthenticated }) => {
  // TODO: Enhance with role-based access control
  // const { user } = useAuth(); // Assuming a useAuth hook that provides user role
  // if (!isAuthenticated) return <Navigate to="/login" replace />;
  // if (route.roles && !route.roles.includes(user.role)) return <Navigate to="/access-denied" replace />

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};


const AppRoutes = () => {
  // Placeholder for authentication status - SET TO true FOR TESTING MainLayout
  const isAuthenticated = true; // TODO: Replace with actual auth state
  // const userRole = 'student'; // Example role, replace with actual role from auth state

  return (
    <Router>
      <Routes>
        {/* Auth Routes - do not use MainLayout */}
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />} />
        <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPasswordPage /> : <Navigate to="/dashboard" />} />

        {/* Protected Routes - use MainLayout */}
        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<DashboardContent />} />

          {/* User Management Routes (Example: Admin only) */}
          {/* if (userRole === 'admin' || userRole === 'super_admin') */}
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/add" element={<AddUserPage />} />
          <Route path="/users/edit/:userId" element={<EditUserPage />} />
          <Route path="/users/view/:userId" element={<ViewUserPage />} />

          {/* Academic Management Routes */}
          {/* Subjects (Example: Admin, Teacher) */}
          <Route path="/subjects" element={<SubjectListPage />} />
          <Route path="/subjects/add" element={<AddSubjectPage />} />
          <Route path="/subjects/edit/:subjectId" element={<EditSubjectPage />} />

          {/* Grades (Example: GradeEntry for Teacher/Admin, MyGrades for Student/Parent) */}
          <Route path="/grades/entry" element={<GradeEntryPage />} /> {/* Teacher/Admin */}
          <Route path="/my-grades" element={<MyGradesPage />} /> {/* Student/Parent */}
          {/* TODO: Add routes for Attendance, etc. */}

          {/* Placeholder routes for other modules */}
          <Route path="/students" element={<GenericPagePlaceholder title="Students" />} />
          <Route path="/timetable" element={<GenericPagePlaceholder title="Timetable" />} />
          <Route path="/fees" element={<GenericPagePlaceholder title="Fees Management" />} />
          <Route path="/system-settings" element={<GenericPagePlaceholder title="System Settings" />} />
          {/* Add more protected routes here */}
        </Route>

        {/* Fallback routes */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
        />
        <Route
          path="*"
          element={
            isAuthenticated ?
            <Navigate to="/dashboard" replace /> : // Or a 404 page within MainLayout
            <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
