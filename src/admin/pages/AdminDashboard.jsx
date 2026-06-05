import React, { useEffect, useState } from "react";

import { Users, FileText, Activity, User } from "lucide-react";

import "../styles/AdminDashboard.css";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import API_URL from "../../config/api";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/dashboard`);

        setDashboardData(response.data);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);
  const stats = [
    {
      title: "Total Users",
      value: dashboardData?.stats?.totalUsers || 0,
      icon: <Users size={26} />,
    },

    {
      title: "Total Admins",
      value: dashboardData?.stats?.totalAdmins || 0,
      icon: <User size={26} />,
    },

    {
      title: "Total Sessions",
      value: dashboardData?.stats?.totalSessions || 0,
      icon: <FileText size={26} />,
    },

    {
      title: "Active Users",
      value: dashboardData?.stats?.activeUsers || 0,
      icon: <Activity size={26} />,
    },
  ];
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const aiUsageData = dashboardData?.aiUsage || [];

  const userGrowthData = dashboardData?.userGrowth || [];
  console.log("admin dashboard data", dashboardData);
  return (
    <div className="admin-dashboard">
      {/* Header */}

      <div className="admin-page-header">
        <div>
          <h1>Admin Dashboard</h1>

          <p>Monitor users, interviews, analytics, and AI activity</p>
        </div>
      </div>

      {/* Analytics Cards */}

      <div className="admin-stats-grid">
        {stats.map((item) => (
          <div className="admin-stat-card" key={item.title}>
            <div className="admin-stat-top">
              <div className="admin-stat-icon">{item.icon}</div>

              {/* <span className="admin-stat-change">{item.change}</span> */}
            </div>

            <h2>{item.value}</h2>

            <p>{item.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}

      <div className="admin-chart-grid">
        <div className="admin-chart-card large">
          <div className="admin-card-header">
            <h3>Weekly User Growth</h3>
          </div>

          <div className="chart-placeholder">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={userGrowthData}>
                <CartesianGrid
                  vertical={false}
                  stroke="#E5E7EB"
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="week" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="users"
                  fill="#00E5FF"
                  radius={[8, 8, 0, 0]}
                  barSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-chart-card">
          <div className="admin-card-header">
            <h3>AI Usage</h3>
          </div>

          <div className="chart-placeholder">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={aiUsageData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  <Cell fill="#00E5FF" />
                  <Cell fill="#7C5CFC" />
                  <Cell fill="#10B981" />
                </Pie>

                <Tooltip />

                <Legend formatter={(value) => value} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}

      <div className="admin-table-card">
        <div className="admin-card-header">
          <h3> Recent Sessions</h3>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Module</th>
              <th>Score</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {dashboardData?.recentSessions?.map((session) => (
              <tr key={session._id}>
                <td>{session.user}</td>

                <td>{session.module}</td>

                <td>{session.score || 0}</td>

                <td>
                  <span
                    className={
                      session.status === "Completed"
                        ? "status success"
                        : "status progress"
                    }
                  >
                    {session.status}
                  </span>
                </td>

                <td>{new Date(session.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <div className="admin-table-card">
        <div className="admin-card-header">
          <h3>Top Performing Users</h3>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Avg Score</th>
              <th>Sessions</th>
            </tr>
          </thead>

          <tbody>
            {dashboardData?.topUsers?.map((user, index) => (
              <tr key={user.name}>
                <td>
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : `#${index + 1}`}
                </td>

                <td>{user.name}</td>

                <td>{user.averageScore}%</td>

                <td>{user.totalSessions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
