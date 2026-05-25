import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>Redirecting to home page in 3 seconds...</p>

        <button onClick={() => navigate("/")} className="home-btn">
          Go To Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
