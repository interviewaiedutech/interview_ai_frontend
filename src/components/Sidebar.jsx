import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

const NAV_ITEMS = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    to: "/practice-hub",
    label: "Practice Hub",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  // {
  //   to: "/mock-interview",
  //   label: "Mock Interview",
  //   icon: (
  //     <svg
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //     >
  //       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  //     </svg>
  //   ),
  // },
  {
    to: "/leaderboard",
    label: "Leaderboard",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M6 3h12v8a6 6 0 0 1-12 0V3z" />
      </svg>
    ),
  },
  {
    to: "/progress",
    label: "Progress",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    to: "/resources",
    label: "Resources",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
];

const Sidebar = ({ isOpen, onClose, onLogout, user }) => {
  const location = useLocation();

  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        {/* <Link to="/dashboard" className="sidebar-logo" onClick={onClose}>
          Interview<span>AI</span>
        </Link> */}
        <button
          className="sidebar-close"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* User card */}
      <div className="sidebar-user">
        <div className="sidebar-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="sidebar-user-info">
          <p className="sidebar-user-name">{user?.name}</p>
          <p className="sidebar-user-email">{user?.email}</p>
        </div>
      </div>

      <div className="sidebar-divider" />

      {/* Nav items */}
      <nav className="sidebar-nav">
        <p className="sidebar-section-label">Menu</p>
        {NAV_ITEMS.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-item ${active ? "sidebar-item--active" : ""}`}
              onClick={onClose}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
              {active && <span className="sidebar-active-dot" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout at bottom */}
      <div className="sidebar-footer">
        <div className="sidebar-divider" />
        <button className="sidebar-logout" onClick={onLogout}>
          <span className="sidebar-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
