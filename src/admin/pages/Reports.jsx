import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import "../styles/Reports.css";
import axios from "axios";
import API_URL from "../../config/api";

const Reports = () => {
  const [report, setReport] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/reports`, {
        params: {
          startDate,
          endDate,
        },
      });

      setReport(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  if (!report) {
    return <div className="reports-page">Loading...</div>;
  }

  const moduleUsageData = [
    {
      name: "Technical",
      value: report?.moduleUsage?.technical || 0,
    },
    {
      name: "JD Prep",
      value: report?.moduleUsage?.jdPrep || 0,
    },
    {
      name: "Communication",
      value: report?.moduleUsage?.communication || 0,
    },
    {
      name: "Email",
      value: report?.moduleUsage?.email || 0,
    },
    {
      name: "Aptitude",
      value: report?.moduleUsage?.aptitude || 0,
    },
  ];
  const userGrowthData = report?.userGrowth || [];
  const COLORS = ["#00E5FF", "#7C5CFC", "#10B981", "#F59E0B", "#EF4444"];

  const exportReport = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/reports/export`, {
        params: {
          startDate,
          endDate,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.download = "InterviewAI_Report.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      alert("Report exported successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const clearFilters = async () => {
    setStartDate("");
    setEndDate("");

    try {
      const response = await axios.get(`${API_URL}/admin/reports`);

      setReport(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h1>Reports & Insights</h1>

        <button onClick={exportReport}>Export Report</button>
      </div>
      <div className="report-filters">
        <div className="filter-group">
          <label>From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button className="apply-btn" onClick={fetchReports}>
          Apply Filter
        </button>

        <button className="clear-btn" onClick={clearFilters}>
          Clear Filter
        </button>
      </div>

      <div className="report-cards">
        <div className="report-card">
          <h2>{report.monthlyNewUsers}</h2>
          <p>New Users This Month</p>
        </div>

        <div className="report-card">
          <h2>{report.avgSessionsPerUser}</h2>
          <p>Sessions / User</p>
        </div>

        <div className="report-card">
          <h2>{report.mostUsedModule}</h2>
          <p>Most Used Module</p>
        </div>

        <div className="report-card">
          <h2>{report.overallAverageScore}%</h2>
          <p>Average User Score</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-box">
          <h3>User Growth</h3>

          {userGrowthData.length < 2 ? (
            <div className="empty-chart">Not enough user data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={userGrowthData}>
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#2563eb"
                  fill="#93c5fd"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="chart-box">
          <h3>Module Usage</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={moduleUsageData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {moduleUsageData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
