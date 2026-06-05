import React, { useEffect, useState } from "react";
import SessionDetailsModal from "../components/SessionDetailsModal";
import "../styles/Sessions.css";
import API_URL from "../../config/api";
import axios from "axios";
import { FilterX, Search } from "lucide-react";

const Sessions = () => {
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessions, setSessions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const sessionsPerPage = 10;
  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/sessions`);

      setSessions(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const openSession = async (sessionId) => {
    try {
      const response = await axios.get(
        `${API_URL}/admin/sessions/${sessionId}`,
      );

      setSelectedSession(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.user?.toLowerCase().includes(search.toLowerCase()) ||
      session.module?.toLowerCase().includes(search.toLowerCase());

    const matchesModule =
      moduleFilter === "all" || session.module === moduleFilter;

    const matchesStatus =
      statusFilter === "all" ||
      session.status.toLowerCase() === statusFilter.toLowerCase();

    const sessionDate = new Date(session.date);

    const matchesFromDate = !fromDate || sessionDate >= new Date(fromDate);

    const matchesToDate =
      !toDate || sessionDate <= new Date(`${toDate}T23:59:59`);

    return (
      matchesSearch &&
      matchesModule &&
      matchesStatus &&
      matchesFromDate &&
      matchesToDate
    );
  });

  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = filteredSessions.slice(
    indexOfFirstSession,
    indexOfLastSession,
  );
  const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);

  const clearFilters = () => {
    setSearch("");
    setModuleFilter("all");
    setStatusFilter("all");
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
  };

  return (
    <div className="admin-sessions">
      <div className="sessions-header">
        <div>
          <h1>Sessions</h1>
          <p>Track all interview sessions</p>
        </div>
      </div>

      <div className="sessions-toolbar">
        <div className="sessions-search">
          <Search size={16} />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select
          className="sessions-select"
          value={moduleFilter}
          onChange={(e) => {
            setModuleFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Modules</option>
          <option value="Technical Interview">Technical Interview</option>
          <option value="Aptitude">Aptitude</option>
          <option value="JD Prep">JD Prep</option>
          <option value="Communication">Communication</option>
          <option value="Email">Email</option>
        </select>

        <select
          className="sessions-select"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Status</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
        </select>

        <input
          type="date"
          className="sessions-date-input"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          className="sessions-date-input"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <button
          className="clear-filter-btn"
          onClick={clearFilters}
          disabled={
            search === "" &&
            moduleFilter === "all" &&
            statusFilter === "all" &&
            fromDate === "" &&
            toDate === ""
          }
        >
          <FilterX size={18} />
        </button>
      </div>

      <div className="sessions-table-card">
        <table className="sessions-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Module</th>
              <th>Score</th>
              <th>Questions</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentSessions.map((session) => (
              <tr key={session._id}>
                <td>{session.user}</td>

                <td>{session.module}</td>

                <td>{session.score}</td>

                <td>{session.questions}</td>

                <td>
                  <span
                    className={`session-status ${
                      session.status.toLowerCase().includes("progress")
                        ? "in-progress"
                        : "completed"
                    }`}
                  >
                    {session.status}
                  </span>
                </td>

                <td>{new Date(session.date).toLocaleString()}</td>

                <td>
                  <button
                    className="view-btn"
                    onClick={() => openSession(session._id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="session-pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
      <SessionDetailsModal
        session={selectedSession}
        onClose={() => setSelectedSession(null)}
      />
    </div>
  );
};

export default Sessions;
