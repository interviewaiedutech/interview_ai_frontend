import React, { useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api";
import "../styles/AuthPages.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <main className="auth-form-side">
        <div className="auth-form-box">
          <div className="auth-form-header">
            <h1 className="auth-form-title">Forgot Password</h1>

            <p className="auth-form-subtitle">
              Enter your email to receive a password reset link.
            </p>
          </div>

          {message && (
            <div
              className="auth-success"
              style={{
                background: "#dcfce7",
                color: "#166534",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              {message}
            </div>
          )}

          {error && (
            <div className="auth-error">
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-field-label">Email</label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="auth-submit-btn"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <Link to="/login" className="back-to-login">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
