import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../config/api";
import "../styles/AuthPages.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successful. Redirecting...");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
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
            <h1 className="auth-form-title">Reset Password</h1>

            <p className="auth-form-subtitle">Enter your new password below.</p>
          </div>

          {message && (
            <div
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
              <label className="auth-field-label">New Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-field-label">Confirm Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="auth-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="auth-submit-btn"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
