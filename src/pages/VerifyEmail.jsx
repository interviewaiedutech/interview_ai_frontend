import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import API_URL from "../config/api";

const VerifyEmail = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying email...");

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/verify-email/${token}`);

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login?verified=true");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Verification failed");

      setTimeout(() => {
        navigate("/login?verified=expired");
      }, 2000);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        fontWeight: "600",
      }}
    >
      {message}
    </div>
  );
};

export default VerifyEmail;
