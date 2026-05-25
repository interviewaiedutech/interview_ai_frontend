import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSidebar } from "../contexts/SidebarContext";
import Sidebar from "./Sidebar";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isOpen, toggle, close } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Close mobile public menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    close();
    navigate("/");
  };

  // ── AUTHENTICATED LAYOUT ──────────────────────────────────────────────────
  if (user) {
    return (
      <>
        <header className="auth-topbar">
          <button
            className="sidebar-toggle"
            onClick={toggle}
            aria-label="Toggle sidebar"
          >
            <span className={`hamburger ${isOpen ? "open" : ""}`}>
              <span />
              <span />
              <span />
            </span>
          </button>

          <Link to="/dashboard" className="topbar-logo">
            Interview<span>AI</span>
          </Link>

          {/* <div className="topbar-right">
            <div className="topbar-avatar">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <span className="topbar-name">{user.name}</span>
          </div> */}
          <div className="topbar-right" ref={dropdownRef}>
            <div
              className="topbar-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="topbar-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="topbar-name">{user.name}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              >
                <path
                  d="M6 9L12 15L18 9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-user-info">
                  <div className="dropdown-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="dropdown-details">
                    <div className="dropdown-name">{user.name}</div>
                    <div className="dropdown-email">{user.email}</div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-logout">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                      strokeLinecap="round"
                    />
                    <path d="M16 17L21 12L16 7" strokeLinecap="round" />
                    <path d="M21 12H9" strokeLinecap="round" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <Sidebar
          isOpen={isOpen}
          onClose={close}
          onLogout={handleLogout}
          user={user}
        />

        {/* Overlay — mobile drawer backdrop only */}
        {isOpen && <div className="sidebar-overlay" onClick={close} />}
      </>
    );
  }

  // ── PUBLIC LAYOUT ─────────────────────────────────────────────────────────
  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" className="logo-text">
            Interview<span>AI</span>
          </Link>
        </div>

        {/* Desktop links */}
        <div className="nav-menu">
          {/* <a href="#home" className="nav-link">
            Home
          </a> */}
          <Link to="/#home" className="nav-link">
            Home
          </Link>
          <Link to="/#features" className="nav-link">
            Features
          </Link>
          <Link to="/#how-it-works" className="nav-link">
            How it Works
          </Link>
          <Link to="/#testimonials" className="nav-link">
            Testimonials
          </Link>
          <div className="nav-buttons">
            <Link to="/login" className="nav-login">
              Login
            </Link>
            <Link to="/register" className="nav-signup">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? "open" : ""}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`mobile-menu ${mobileMenuOpen ? "mobile-menu--open" : ""}`}
      >
        <a href="#home" className="mobile-link">
          Home
        </a>
        <a href="#features" className="mobile-link">
          Features
        </a>
        <a href="#how-it-works" className="mobile-link">
          How it Works
        </a>
        <a href="#testimonials" className="mobile-link">
          Testimonials
        </a>
        <div className="mobile-auth-btns">
          <Link to="/login" className="nav-login">
            Login
          </Link>
          <Link to="/register" className="nav-signup">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
