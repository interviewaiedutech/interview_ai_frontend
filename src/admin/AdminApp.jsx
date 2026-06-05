import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import Sessions from "./pages/Sessions";
import AIAnalytics from "./pages/AIAnalytics";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import AdminProfile from "./pages/AdminProfile";
import AuditLogs from "./pages/AuditLogs";

const AdminApp = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="ai-analytics" element={<AIAnalytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="audit-logs" element={<AuditLogs />} />
      </Route>
    </Routes>
  );
};

export default AdminApp;
