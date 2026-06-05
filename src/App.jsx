import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SidebarProvider, useSidebar } from "./contexts/SidebarContext";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OAuthSuccess from "./pages/OAuthSuccess";
import Dashboard from "./pages/Dashboard";
import MockInterviewPage from "./pages/MockInterviewPage";
import ProgressPage from "./pages/ProgressPage";
import ResourcesPage from "./pages/ResourcesPage";
import PracticeHub from "./pages/PracticeHub";
import AptitudePractice from "./pages/AptitudePractice";
import EmailPractice from "./pages/EmailPractice";
import CommunicationPractice from "./pages/CommunicationPractice";
import JDInterviewPrep from "./pages/JDInterviewPrep";
import NotFound from "./pages/NotFound";
import ScrollToSection from "./components/ScrollToSection";
import CheckEmail from "./pages/CheckEmail";
import VerifyEmail from "./pages/VerifyEmail";

import AdminApp from "./admin/AdminApp";
import PublicLayout from "./layouts/PublicLayout";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminRoute from "./admin/routes/AdminRoute";
import AdminLanding from "./admin/pages/AdminLanding";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// import IELTSHub from "./pages/IELTSHub";
// import IELTSReading from "./pages/IELTSReading";

// Protect routes that require login
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.accountType !== "user") {
    return <Navigate to="/admin-control/dashboard" replace />;
  }

  return children;
};

// Layout wrapper — reads sidebar state to apply correct left margin
const AppLayout = ({ children }) => {
  const { user } = useAuth();
  const { isOpen } = useSidebar();

  if (user) {
    return (
      // auth-layout--open adds margin-left: 260px on desktop via CSS
      <div className={`auth-layout ${isOpen ? "auth-layout--open" : ""}`}>
        {children}
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      {children}
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin-control");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <ScrollToSection />

      {isAdminRoute ? (
        <Routes>
          <Route path="/admin-control" element={<AdminLanding />} />
          <Route path="/admin-control/login" element={<AdminLogin />} />
          <Route
            path="/admin-control/*"
            element={
              <AdminRoute>
                <AdminApp />
              </AdminRoute>
            }
          />
        </Routes>
      ) : (
        <AppLayout>
          <Routes>
            {/* Public Routes */}

            <Route path="*" element={<NotFound />} />

            <Route path="/" element={<LandingPage />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/register" element={<RegisterPage />} />

            <Route path="/oauth-success" element={<OAuthSuccess />} />

            <Route path="/check-email" element={<CheckEmail />} />

            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Protected Routes */}

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/technical/mock-interview"
              element={
                <PrivateRoute>
                  <MockInterviewPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/jd-specific-preparation"
              element={
                <PrivateRoute>
                  <JDInterviewPrep />
                </PrivateRoute>
              }
            />

            <Route
              path="/progress"
              element={
                <PrivateRoute>
                  <ProgressPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/resources"
              element={
                <PrivateRoute>
                  <ResourcesPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/practice-hub"
              element={
                <PrivateRoute>
                  <PracticeHub />
                </PrivateRoute>
              }
            />

            <Route
              path="/aptitude-practice"
              element={
                <PrivateRoute>
                  <AptitudePractice />
                </PrivateRoute>
              }
            />

            <Route
              path="/email-writing"
              element={
                <PrivateRoute>
                  <EmailPractice />
                </PrivateRoute>
              }
            />

            <Route
              path="/communication-practice"
              element={
                <PrivateRoute>
                  <CommunicationPractice />
                </PrivateRoute>
              }
            />
          </Routes>
        </AppLayout>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
          <AppContent />
        </SidebarProvider>
      </AuthProvider>
    </Router>
  );
}
export default App;
