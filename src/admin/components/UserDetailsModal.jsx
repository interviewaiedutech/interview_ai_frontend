import React from "react";
import "../styles/UserDetailsModal.css";

const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="user-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>User Details</h2>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="user-profile">
          <div className="user-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="user-info-grid">
          <div>
            <span>Provider</span>
            <strong>{user.provider}</strong>
          </div>

          <div>
            <span>Role</span>
            <strong>{user.role}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>{user.status}</strong>
          </div>

          <div>
            <span>Joined</span>
            <strong>{user.joined}</strong>
          </div>
        </div>

        <div className="user-stats">
          <div className="stat-box">
            <h4>{user.totalSessions}</h4>
            <p>Sessions</p>
          </div>

          <div className="stat-box">
            <h4>{user.averageScore}%</h4>
            <p>Avg Score</p>
          </div>

          <div className="stat-box">
            <h4>{user.currentStreak}</h4>
            <p>Current Streak</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
