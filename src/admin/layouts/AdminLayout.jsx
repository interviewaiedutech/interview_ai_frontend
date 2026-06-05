import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/AdminLayout.css";

const AdminLayout = () => {
  const isMobile = () => window.innerWidth <= 768;

  // Start closed on mobile, open on desktop
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile());

  // On resize: auto-close on mobile, auto-open on desktop
  useEffect(() => {
    const handleResize = () => {
      if (isMobile()) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="admin-layout">
      {/* Backdrop: only visible on mobile when sidebar is open */}
      {sidebarOpen && isMobile() && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="admin-main">
        <AdminNavbar
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
