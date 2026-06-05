import React, { useEffect, useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminData = localStorage.getItem("admin");

    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
  }, []);
  return (
    <header className="admin-navbar">
      <div className="admin-navbar-left">
        <button
          className="admin-menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={20} />
        </button>

        {/* <div className="admin-search">
          <Search size={18} />

          <input type="text" placeholder="Search..." />
        </div> */}
      </div>

      <div className="admin-navbar-right">
        <button className="admin-icon-btn">
          <Bell size={20} />
        </button>

        <div
          className="admin-dashboard-profile"
          onClick={() => navigate("/admin/profile")}
        >
          <div>
            <p>{admin?.name || "Admin"}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
