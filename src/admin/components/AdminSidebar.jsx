import React from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Brain,
  Settings,
  LogOut,
  BarChart3,
  User,
  Shield,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("admin");
    logout();

    navigate("/admin-control/login");
  };
  const handleNavClick = () => {
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin-control/dashboard",
    },

    {
      title: "Users",
      icon: <Users size={20} />,
      path: "/admin-control/users",
    },

    {
      title: "Sessions",
      icon: <FileText size={20} />,
      path: "/admin-control/sessions",
    },

    {
      title: "AI Analytics",
      icon: <Brain size={20} />,
      path: "/admin-control/ai-analytics",
    },
    {
      title: "Reports",
      path: "/admin-control/reports",
      icon: <BarChart3 size={20} />,
    },
    {
      title: "Audit Logs",
      path: "/admin-control/audit-logs",
      icon: <Shield size={20} />,
    },
    {
      title: "Profile",
      path: "/admin-control/profile",
      icon: <User size={20} />,
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/admin-control/settings",
    },
  ];

  return (
    <aside className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div className="admin-logo">InterviewAI</div>

      <nav className="admin-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className="admin-nav-item"
            onClick={handleNavClick}
          >
            {item.icon}

            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <button className="admin-logout-btn" onClick={handleLogout}>
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default AdminSidebar;
