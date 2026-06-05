import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../config/api";
import "../styles/AIAnalytics.css";

const AIAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalRequests: 0,
    groqRequests: 0,
    geminiRequests: 0,
    githubRequests: 0,
    successRate: 0,
    failureRate: 0,
    avgResponseTime: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/ai-analytics`);
      console.log(response.data);
      setAnalytics(response.data);
    } catch (error) {
      console.error("Analytics Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="ai-analytics">
        <h2>Loading...</h2>
      </div>
    );
  }

  const totalRequests = analytics?.totalRequests || 0;

  const geminiPercentage =
    totalRequests > 0
      ? ((analytics.geminiRequests / totalRequests) * 100).toFixed(0)
      : 0;

  const groqPercentage =
    totalRequests > 0
      ? ((analytics.groqRequests / totalRequests) * 100).toFixed(0)
      : 0;

  const githubPercentage =
    totalRequests > 0
      ? ((analytics.githubRequests / totalRequests) * 100).toFixed(0)
      : 0;

  const stats = [
    {
      title: "Total Requests",
      value: analytics.totalRequests,
    },
    {
      title: "Gemini Requests",
      value: analytics.geminiRequests,
    },
    {
      title: "Groq Requests",
      value: analytics.groqRequests,
    },
    {
      title: "GitHub Models",
      value: analytics.githubRequests,
    },
  ];

  return (
    <div className="ai-analytics">
      <div className="page-header">
        <h1>AI Analytics</h1>

        <p>Monitor AI provider usage and performance</p>
      </div>

      <div className="analytics-grid">
        {stats.map((item) => (
          <div key={item.title} className="analytics-card">
            <h3>{item.title}</h3>

            <h2>{item.value}</h2>
          </div>
        ))}
      </div>

      <div className="analytics-row">
        <div className="analytics-panel">
          <h3>Provider Usage</h3>

          <div className="usage-item">
            <span>Gemini ({geminiPercentage}%)</span>

            <div className="ai-progress">
              <div
                className="fill"
                style={{
                  width: `${geminiPercentage}%`,
                }}
              />
            </div>
          </div>

          <div className="usage-item">
            <span>Groq ({groqPercentage}%)</span>

            <div className="ai-progress">
              <div
                className="fill"
                style={{
                  width: `${groqPercentage}%`,
                }}
              />
            </div>
          </div>

          <div className="usage-item">
            <span>GitHub ({githubPercentage}%)</span>

            <div className="ai-progress">
              <div
                className="fill"
                style={{
                  width: `${githubPercentage}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="analytics-panel">
          <h3>System Health</h3>

          <ul>
            <li>Success Rate: {analytics.successRate}%</li>

            <li>Failed Requests: {analytics.failureRate}%</li>

            <li>
              Avg Response Time: {(analytics.avgResponseTime / 1000).toFixed(2)}
              s
            </li>

            <li>Total Requests: {analytics.totalRequests}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIAnalytics;
