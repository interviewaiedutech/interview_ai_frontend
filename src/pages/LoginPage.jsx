import React, { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loginillustration from "./Loginillustration";
import "../styles/AuthPages.css";
import API_URL from "../config/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const verified = searchParams.get("verified");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      {/* Left side - Image Panel */}
      <aside className="auth-panel">
        <div className="auth-panel-image">
          {/* <img src="./login.png" alt="Interview Illustration" /> */}
          <div className="svg-wrapper">
            <Loginillustration />
          </div>
          <div className="auth-panel-overlay">
            {/* <Link to="/" className="auth-panel-logo">
              Interview<span>AI</span>
            </Link>
            <div className="auth-panel-quote">
              <p>"Your journey to interview success starts here"</p>
            </div> */}
          </div>
        </div>
      </aside>

      {/* Right side - Form */}
      <main className="auth-form-side">
        <div className="auth-form-box">
          <div className="auth-form-header">
            <h1 className="auth-form-title">Welcome Back</h1>
            <p className="auth-form-subtitle">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <span>⚠</span> {error}
            </div>
          )}
          {verified === "true" && (
            <div
              style={{
                background: "#dcfce7",
                color: "#166534",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontWeight: "500",
              }}
            >
              ✅ Email verified successfully. Please login.
            </div>
          )}

          {verified === "already" && (
            <div
              style={{
                background: "#dbeafe",
                color: "#1d4ed8",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontWeight: "500",
              }}
            >
              ℹ️ Email already verified.
            </div>
          )}

          {verified === "expired" && (
            <div
              style={{
                background: "#fee2e2",
                color: "#991b1b",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontWeight: "500",
              }}
            >
              ❌ Verification link expired or invalid.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="auth-fields">
              {/* Email */}
              <div className="auth-field">
                <label className="auth-field-label">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                  placeholder="Enter your Email here"
                />
              </div>

              {/* Password */}
              <div className="auth-field">
                <label className="auth-field-label">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                  placeholder="Enter your Password here"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="auth-submit-btn"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <div className="auth-social-buttons">
              <button
                type="button"
                className="auth-social-btn google"
                onClick={() => {
                  window.location.href = `${API_URL}/auth/google`;
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>
              <button
                type="button"
                className="auth-social-btn github"
                onClick={() => {
                  window.location.href = `${API_URL}/auth/github`;
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    fill="#333"
                    d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.48 0-.24-.01-.88-.01-1.73-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.83-2.33 4.69-4.56 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"
                  />
                </svg>
                Sign in with GitHub
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
