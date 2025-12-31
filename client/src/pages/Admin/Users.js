import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2, Search, Users, Shield, User as UserIcon } from "lucide-react";

const User = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("https://ulcclub1.onrender.com/api/v1/users");
      if (data?.success) {
        setUsers(data.users);
        setFilteredUsers(data.users);
      } else {
        toast.error("Failed to load users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    try {
      const { data } = await axios.delete(
        `https://ulcclub1.onrender.com/api/v1/users/${userId}`
      );
      if (data?.success) {
        toast.success("User deleted successfully");
        fetchUsers();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Something went wrong");
    }
  };

  // Search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        mapRole(user.role).toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  // Get user initials
  const getInitials = (name = "") => {
    const words = name.trim().split(" ");
    return words.length > 1
      ? words[0][0] + words[1][0]
      : words[0][0].toUpperCase();
  };

  // Map numeric role to string
  const mapRole = (role) => {
    switch (role) {
      case 1:
        return "Admin";
      default:
        return "User";
    }
  };

  // Class for role icons
  const getRoleIcon = (role) => {
    switch (role) {
      case 1:
        return <Shield size={14} />;
      default:
        return <UserIcon size={14} />;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout title="Dashboard - All Users">
      <div className="container-fluid py-4">
              <ToastContainer />
        <div className="row">
          <div className="main-content">
          <div className="header-section">
            <div className="header-content">
              <h1 className="page-title">
                <Users className="title-icon" />
                User Management
              </h1>
              <p className="page-subtitle">Manage and organize your system users</p>
            </div>
            
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-icon users-icon">
                  <UserIcon size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-number">{users.filter(u => u.role === 0).length}</span>
                  <span className="stat-label">Users</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon admin-icon">
                  <Shield size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-number">{users.filter(u => u.role === 1).length}</span>
                  <span className="stat-label">Admins</span>
                </div>
              </div>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or role..."
                  className="search-input"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="table-container">
              {loading ? (
                <div className="loading-state">
                  <div className="loading-spinner"></div>
                  <p>Loading users...</p>
                </div>
              ) : (
                <table className="modern-table">
                  <thead>
                    <tr className="action-table">
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="table-row">
                        <td className="user-cell">
                          <div className="user-info">
                            <div className="user-avatar">
                              {getInitials(user.name)}
                            </div>
                            <div className="user-details">
                              <span className="user-name">{user.name}</span>
                            </div>
                          </div>
                        </td>
                        <td className="email-cell">{user.email}</td>
                        <td>
                          <div className={`role-badge role-${user.role}`}>
                            {getRoleIcon(user.role)}
                            <span>{mapRole(user.role)}</span>
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="action-btn delete-btn"
                              onClick={() => handleDelete(user._id)}
                              title="Delete user"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && !loading && (
                      <tr>
                        <td colSpan="4" className="empty-state">
                          <div className="empty-content">
                            <Users size={48} className="empty-icon" />
                            <h3>No users found</h3>
                            <p>Try adjusting your search criteria</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
