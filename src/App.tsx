// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Outlet } from 'react-router-dom'; // Import Outlet
import LoginPage from './pages/LoginPage';
import UserListPage from './pages/UserListPage';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';


// Simple Navigate component for routing within a non-component context
interface NavigateProps {
  to: string;
  replace?: boolean;
}

const Navigate: React.FC<NavigateProps> = ({ to, replace }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace });
  }, [to, replace, navigate]);
  return null;
};

// Component to wrap routes that need AuthLayout
const AuthLayoutRoute: React.FC = () => {
  return (
    <AuthLayout>
      {/* Outlet renders the matched child route component */}
      <Outlet />
    </AuthLayout>
  );
};

// Component to wrap routes that need MainLayout and are authenticated
const MainLayoutRoute: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  return (
    <MainLayout>
      {/* Outlet renders the matched child route component */}
      <Outlet />
    </MainLayout>
  );
};

const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        {/*
          Nested Route for AuthLayout:
          Any child routes within this <Route> will be rendered inside AuthLayout.
        */}
        <Route element={<AuthLayoutRoute />}>
          <Route path="/login" element={<LoginPage />} />
          {/* Add other auth-related pages here if any, e.g., /register, /forgot-password */}
        </Route>

        {/*
          Nested Route for MainLayout:
          This route itself includes the authentication check.
          Any child routes within this <Route> will be rendered inside MainLayout,
          but only if the user is authenticated.
        */}
        <Route element={<MainLayoutRoute />}>
          <Route path="/users" element={<UserListPage />} />
          {/* Add other main app pages here, e.g., /dashboard, /settings */}
        </Route>

        {/*
          Default route: redirects to login if not authenticated, or to users if authenticated.
          This handles initial load and any unmatched routes.
        */}
        <Route
          path="*"
          element={isAuthenticated ? <Navigate to="/users" replace /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
