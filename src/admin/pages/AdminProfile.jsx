import React, { useEffect, useState } from "react";
import "../styles/AdminProfile.css";
import axios from "axios";
import API_URL from "../../config/api";

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/profile`);

      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };
  const submitPasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.put(`${API_URL}/admin/change-password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      alert(response.data.message);

      setShowPasswordModal(false);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };
  if (!profile) {
    return <div>Loading...</div>;
  }
  console.log("admin profile data", profile);
  return (
    <div className="admin-profile">
      <div className="profile-card">
        <div className="profile-avatar">{profile.name?.charAt(0)}</div>

        <h2>{profile.name}</h2>

        <p>{profile.email}</p>

        <span>{profile.accountType}</span>
      </div>

      <div className="profile-info">
        <div className="info-card">
          <h3>Account Information</h3>

          <p>
            Last Active:
            {profile.lastActiveDate
              ? new Date(profile.lastActiveDate).toLocaleString()
              : "N/A"}
          </p>

          <p>Account Status: Active</p>
        </div>

        <div className="info-card">
          <h3>Security</h3>

          <button onClick={() => setShowPasswordModal(true)}>
            Change Password
          </button>
        </div>
      </div>
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="password-modal">
            <h3>Change Password</h3>

            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />

            <div className="modal-actions">
              <button onClick={submitPasswordChange} disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </button>

              <button onClick={() => setShowPasswordModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
