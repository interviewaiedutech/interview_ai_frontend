import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";
import { useAuth } from "../../contexts/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(formData.email, formData.password);

    if (!result.success) {
      alert(result.error);
      return;
    }

    if (result.user.accountType !== "admin") {
      alert("Access denied. Admin account required.");
      return;
    }

    localStorage.setItem(
      "admin",
      JSON.stringify({
        _id: result.user._id,
        name: result.user.name,
        email: result.user.email,
        accountType: result.user.accountType,
        profilePicture: result.user.profilePicture || "",
      }),
    );

    navigate("/admin-control/dashboard");
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>

        <p>Sign in to access the admin dashboard</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="admin-login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
