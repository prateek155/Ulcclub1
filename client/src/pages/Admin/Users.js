import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit2, Trash2, Search, Users, Shield, User as UserIcon } from "lucide-react";
import { useAuth } from '../../context/auth';
import "../../styles/Users.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ role: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();

  // Fetch users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/users");
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
        `http://localhost:8080/api/v1/users/${userId}`
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

  // Handle edit
  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({ role: user.role.toString() });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update user role
const handleUpdate = async () => {
  try {
    console.log("Updating user:", editUser); // Log the user being edited
    console.log("New role to be set:", formData.role); // Log the new role being sent

    const { data } = await axios.put(
      `http://localhost:8080/api/v1/users/${editUser._id}`,
      { role: parseInt(formData.role) }
    );

    console.log("Response from backend:", data); // Log response

    if (data?.success) {
      toast.success("User updated successfully");
      fetchUsers();
      setEditUser(null);
    } else {
      toast.error("Failed to update user");
    }
  } catch (error) {
    console.error("Error updating user:", error.response || error); // Log full error
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
          <div className="col-md-3">
            <AdminMenu />
          </div>
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
                              className="action-btn edit-btn"
                              onClick={() => handleEdit(user)}
                              title="Edit user"
                            >
                              <Edit2 size={16} />
                            </button>
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

          {/* Modal for editing user role */}
          {editUser && (
            <div className="modal-overlay" onClick={() => setEditUser(null)}>
              <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2 className="modal-title">Edit User Role</h2>
                  <button
                    className="modal-close"
                    onClick={() => setEditUser(null)}
                  >
                    ×
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="user-preview">
                    <div className="user-avatar small">
                      {getInitials(editUser.name)}
                    </div>
                    <div>
                      <h4>{editUser.name}</h4>
                      <p>{editUser.email}</p>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Select Role</label>
                    <select
                      className="form-select"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="">Select a role</option>
                      <option value="0">👤 User</option>
                      <option value="1">🛡️ Admin</option>
                    </select>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setEditUser(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleUpdate}
                    disabled={!formData.role}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
