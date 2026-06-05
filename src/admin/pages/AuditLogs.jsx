import React, { useEffect, useState } from "react";
import { Search, FilterX } from "lucide-react";
import axios from "axios";
import API_URL from "../../config/api";
import "../styles/AuditLogs.css";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const logsPerPage = 10;

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/audit-logs`);

      setLogs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setActionFilter("all");
    setCurrentPage(1);
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.adminName?.toLowerCase().includes(search.toLowerCase()) ||
      log.target?.toLowerCase().includes(search.toLowerCase()) ||
      log.details?.toLowerCase().includes(search.toLowerCase());

    const matchesAction = actionFilter === "all" || log.action === actionFilter;

    return matchesSearch && matchesAction;
  });

  const indexOfLastLog = currentPage * logsPerPage;

  const indexOfFirstLog = indexOfLastLog - logsPerPage;

  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const getActionClass = (action) => {
    switch (action) {
      case "ADMIN_LOGIN":
        return "login";

      case "USER_CREATED":
        return "created";

      case "USER_DEACTIVATED":
        return "deactivated";

      case "USER_RESTORED":
        return "restored";

      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="audit-logs-page">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="audit-logs-page">
      <div className="audit-header">
        <div>
          <h1>Audit Logs</h1>
          <p>Track all administrator actions</p>
        </div>
      </div>

      <div className="audit-toolbar">
        <div className="audit-search">
          <Search size={16} />

          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select
          className="audit-select"
          value={actionFilter}
          onChange={(e) => {
            setActionFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Actions</option>

          <option value="ADMIN_LOGIN">Admin Login</option>

          <option value="USER_CREATED">User Created</option>

          <option value="USER_DEACTIVATED">User Deactivated</option>

          <option value="USER_RESTORED">User Restored</option>
        </select>

        <button
          className="clear-filter-icon"
          onClick={clearFilters}
          disabled={search === "" && actionFilter === "all"}
          title="Clear Filters"
        >
          <FilterX size={18} />
        </button>
      </div>

      <div className="audit-table-card">
        <table className="audit-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Admin</th>
              <th>Action</th>
              <th>Target</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {currentLogs.length > 0 ? (
              currentLogs.map((log) => (
                <tr key={log._id}>
                  <td>{new Date(log.createdAt).toLocaleString()}</td>

                  <td>{log.adminName}</td>

                  <td>
                    <span
                      className={`action-badge ${getActionClass(log.action)}`}
                    >
                      {log.action}
                    </span>
                  </td>

                  <td>{log.target}</td>

                  <td>{log.details}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No audit logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="audit-pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AuditLogs;
