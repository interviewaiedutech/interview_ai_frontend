import React, { useEffect, useState } from "react";
import { Search, Download, Plus, FilterX } from "lucide-react";
import UserDetailsModal from "../components/UserDetailsModal";
import "../styles/Users.css";
import axios from "axios";
import API_URL from "../../config/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Users = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [providerFilter, setProviderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/users`);

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  console.log("users data in admin", users);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    const matchesProvider =
      providerFilter === "all" || user.provider === providerFilter;

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);

    return matchesSearch && matchesRole && matchesProvider && matchesStatus;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const deactivateUser = async (userId) => {
    const confirmDelete = window.confirm("Deactivate this user?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/admin/users/${userId}`);

      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const restoreUser = async (userId) => {
    try {
      await axios.put(`${API_URL}/admin/users/${userId}/restore`);

      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async () => {
    try {
      await axios.post(`${API_URL}/admin/users`, newUser);
      setShowAddUserModal(false);
      fetchUsers();
      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const exportCSV = () => {
    const csvRows = [];

    const headers = ["Name", "Email", "Provider", "Role", "Status", "Joined"];

    csvRows.push(headers.join(","));

    filteredUsers.forEach((user) => {
      csvRows.push(
        [
          user.name,
          user.email,
          user.provider || "local",
          user.role,
          user.isVerified ? "Verified" : "Pending",
          new Date(user.createdAt).toLocaleDateString(),
        ].join(","),
      );
    });

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("all");
    setProviderFilter("all");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  return (
    <div className="admin-users">
      <div className="users-header">
        <div>
          <h1>Users Management</h1>
          <p>Manage all platform users</p>
        </div>

        <button
          className="add-user-btn"
          onClick={() => setShowAddUserModal(true)}
        >
          <Plus size={16} />
          Add User
        </button>
      </div>

      <div className="users-toolbar">
        <div className="toolbar-search">
          <Search size={16} />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              setCurrentPage(1);
            }}
          />
        </div>
        <select
          className="toolbar-select"
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Roles</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
          <option value="Data Analyst">Data Analyst</option>
          <option value="DevOps Engineer">DevOps Engineer</option>
          <option value="Product Manager">Product Manager</option>
          <option value="Mobile Developer">Mobile Developer</option>
        </select>

        <select
          className="toolbar-select"
          value={providerFilter}
          onChange={(e) => {
            setProviderFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Providers</option>
          <option value="local">Local</option>
          <option value="google">Google</option>
          <option value="github">GitHub</option>
        </select>

        <select
          className="toolbar-select"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Users</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          className="users-clear-filter-btn"
          onClick={clearFilters}
          disabled={
            search === "" &&
            roleFilter === "all" &&
            providerFilter === "all" &&
            statusFilter === "all"
          }
        >
          <FilterX size={18} />
        </button>
        <button className="export-btn" onClick={exportCSV}>
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="users-table-card">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Provider</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.provider || "local"}</td>

                <td>{user.role}</td>

                <td>
                  <span
                    className={`status-badge ${
                      user.isActive ? "active" : "inactive"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                <td>
                  <button
                    className="action-btn"
                    onClick={() => setSelectedUser(user)}
                  >
                    View
                  </button>

                  {user.isActive ? (
                    <button
                      className="action-btn delete"
                      onClick={() => deactivateUser(user._id)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="action-btn restore"
                      onClick={() => restoreUser(user._id)}
                    >
                      Restore
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="users-pagination">
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
      {showAddUserModal && (
        <div className="modal-overlay">
          <div className="add-user-modal">
            <button
              className="modal-close"
              onClick={() => setShowAddUserModal(false)}
            >
              ✕
            </button>

            <h2>Add User</h2>

            <input
              placeholder="Name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  email: e.target.value,
                })
              }
            />
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    password: e.target.value,
                  })
                }
                className="auth-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <input
              placeholder="Role"
              value={newUser.role}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  role: e.target.value,
                })
              }
            />

            <div className="modal-actions">
              <button onClick={() => setShowAddUserModal(false)}>Cancel</button>

              <button onClick={createUser}>Create User</button>
            </div>
          </div>
        </div>
      )}
      {/* User Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
};

export default Users;
