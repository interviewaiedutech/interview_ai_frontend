import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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

// import IELTSHub from "./pages/IELTSHub";
// import IELTSReading from "./pages/IELTSReading";

// Protect routes that require login
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
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

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* SidebarProvider wraps everything so state persists across route changes */}
        <SidebarProvider>
          <Navbar />
          <ScrollToSection />
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
              {/* 14-05-2025 */}
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
              {/* <Route
                path="/ielts"
                element={
                  <PrivateRoute>
                    <IELTSHub />
                  </PrivateRoute>
                }
              /> */}
              {/* 18-05-2026 */}
              {/* <Route
                path="/ielts-reading"
                element={
                  <PrivateRoute>
                    <IELTSReading />
                  </PrivateRoute>
                }
              /> */}
            </Routes>
          </AppLayout>
        </SidebarProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
