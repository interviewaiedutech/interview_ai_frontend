import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import axios from "axios";

import API_URL from "../config/api";

const CheckEmail = () => {
  const location = useLocation();

  const email = location.state?.email;

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [cooldown, setCooldown] = useState(30);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const resendEmail = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/auth/resend-verification`,

        { email },
      );

      setMessage(response.data.message);

      setCooldown(30);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to resend email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1>Verify Your Email</h1>

        <p
          style={{
            marginTop: "20px",
          }}
        >
          Verification email sent to:
        </p>

        <h3
          style={{
            color: "#4f46e5",
          }}
        >
          {email}
        </h3>

        <p
          style={{
            marginTop: "20px",
            color: "#666",
          }}
        >
          Check inbox and spam folder.
        </p>

        {message && (
          <p
            style={{
              marginTop: "15px",
              color: "#16a34a",
            }}
          >
            {message}
          </p>
        )}

        <button
          onClick={resendEmail}
          disabled={cooldown > 0 || loading}
          style={{
            marginTop: "30px",

            padding: "12px 20px",

            background: cooldown > 0 ? "#9ca3af" : "#4f46e5",

            color: "#fff",

            border: "none",

            borderRadius: "6px",

            cursor: "pointer",
          }}
        >
          {loading
            ? "Sending..."
            : cooldown > 0
              ? `Resend in ${cooldown}s`
              : "Resend Verification Email"}
        </button>
      </div>
    </div>
  );
};

export default CheckEmail;
