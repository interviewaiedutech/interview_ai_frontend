import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/api";
import "../styles/Leaderboard.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [search, setSearch] = useState("");
  const [userRank, setUserRank] = useState(null);
  const [percentile, setPercentile] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/progress/leaderboard/technical`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setLeaderboard(response.data.leaderboard || []);
      setUserRank(response.data.currentUserRank);
      setPercentile(response.data.percentile);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = leaderboard.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;

  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const topThree = leaderboard.slice(0, 3);

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-header">
        <h1>🏆 Technical Leaderboard</h1>
        <p>Compete with other learners</p>
      </div>

      <div className="leaderboard-stats">
        <div className="leaderboard-stat-card">
          <h2>#{userRank || "-"}</h2>
          <p>Your Rank</p>
        </div>

        <div className="leaderboard-stat-card">
          <h2>{percentile}%</h2>
          <p>Top Percentile</p>
        </div>
      </div>

      <div className="leaderboard-podium">
        {topThree.map((user, index) => (
          <div className={`podium-card podium-${index + 1}`} key={user._id}>
            <div className="podium-medal">
              {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
            </div>

            <h3>{user.name}</h3>

            <p>{user.averageScore}%</p>
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="leaderboard-search"
      />

      <div className="leaderboard-table">
        <div className="leaderboard-table-header">
          <span>Rank</span>
          <span>Name</span>
          <span>Score</span>
          <span>Sessions</span>
        </div>

        {currentUsers.map((user) => (
          <div
            key={user._id}
            className={`leaderboard-row ${
              user.rank === userRank ? "current-user" : ""
            }`}
          >
            <span>#{user.rank}</span>
            <span>{user.name}</span>
            <span>{user.averageScore}%</span>
            <span>{user.totalSessions}</span>
          </div>
        ))}
      </div>
      <div className="leaderboard-pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="pagination-btn"
        >
          Previous
        </button>

        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
