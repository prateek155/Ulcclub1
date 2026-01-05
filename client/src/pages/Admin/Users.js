import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2, Search, Users, Shield } from "lucide-react";

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
        return <User size={14} />;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <style>{`
        /* User Management Page Styles */
        :root {
          --primary-color: #4f46e5;
          --primary-dark: #4338ca;
          --secondary-color: #06b6d4;
          --success-color: #10b981;
          --danger-color: #ef4444;
          --warning-color: #f59e0b;
          --text-primary: #1f2937;
          --text-secondary: #6b7280;
          --text-light: #9ca3af;
          --bg-primary: #ffffff;
          --bg-secondary: #f9fafb;
          --bg-hover: #f3f4f6;
          --border-color: #e5e7eb;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          --radius-sm: 6px;
          --radius-md: 8px;
          --radius-lg: 12px;
          --radius-xl: 16px;
        }

        .container-fluid {
          max-width: 1400px;
          margin: 0 auto;
          padding: 24px;
        }

        .main-content {
          width: 100%;
        }

        .header-section {
          margin-bottom: 32px;
        }

        .header-content {
          margin-bottom: 24px;
        }

        .page-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 32px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 8px 0;
        }

        .title-icon {
          width: 32px;
          height: 32px;
          color: var(--primary-color);
        }

        .page-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0;
        }

        .stats-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 24px;
        }

        .stat-card {
          background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .users-icon {
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
          color: white;
        }

        .admin-icon {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          color: white;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 28px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 14px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .content-card {
          background: var(--bg-primary);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          overflow: hidden;
          border: 1px solid var(--border-color);
        }

        .card-header {
          padding: 24px;
          border-bottom: 1px solid var(--border-color);
          background: var(--bg-secondary);
        }

        .search-container {
          position: relative;
          max-width: 500px;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
          width: 20px;
          height: 20px;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 48px;
          border: 2px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 15px;
          color: var(--text-primary);
          background: var(--bg-primary);
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .search-input::placeholder {
          color: var(--text-light);
        }

        .table-container {
          overflow-x: auto;
        }

        .modern-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        .modern-table thead tr {
          background: var(--bg-secondary);
        }

        .modern-table th {
          padding: 16px 24px;
          text-align: left;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid var(--border-color);
        }

        .modern-table tbody tr {
          border-bottom: 1px solid var(--border-color);
          transition: all 0.2s ease;
        }

        .modern-table tbody tr:hover {
          background: var(--bg-hover);
        }

        .modern-table tbody tr:last-child {
          border-bottom: none;
        }

        .modern-table td {
          padding: 20px 24px;
          font-size: 14px;
          color: var(--text-primary);
        }

        .user-cell {
          min-width: 200px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          flex-shrink: 0;
          box-shadow: var(--shadow-sm);
        }

        .user-details {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 15px;
        }

        .email-cell {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-weight: 600;
          width: fit-content;
        }

        .role-badge.role-1 {
          background: rgba(139, 92, 246, 0.1);
          color: #7c3aed;
        }

        .role-badge.role-0 {
          background: rgba(6, 182, 212, 0.1);
          color: #0891b2;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
        }

        .delete-btn {
          color: var(--danger-color);
          background: rgba(239, 68, 68, 0.1);
        }

        .delete-btn:hover {
          background: var(--danger-color);
          color: white;
          transform: scale(1.05);
        }

        .action-btn:active {
          transform: scale(0.95);
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          color: var(--text-secondary);
        }

        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid var(--border-color);
          border-top-color: var(--primary-color);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .empty-state {
          padding: 0 !important;
        }

        .empty-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          text-align: center;
        }

        .empty-icon {
          color: var(--text-light);
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-content h3 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 8px 0;
        }

        .empty-content p {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0;
        }

        @media (max-width: 1024px) {
          .container-fluid {
            padding: 20px;
          }

          .page-title {
            font-size: 28px;
          }

          .stats-cards {
            grid-template-columns: repeat(2, 1fr);
          }

          .modern-table th,
          .modern-table td {
            padding: 16px 16px;
          }
        }

        @media (max-width: 768px) {
          .container-fluid {
            padding: 16px;
          }

          .header-section {
            margin-bottom: 24px;
          }

          .page-title {
            font-size: 24px;
          }

          .title-icon {
            width: 28px;
            height: 28px;
          }

          .page-subtitle {
            font-size: 14px;
          }

          .stats-cards {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .stat-card {
            padding: 20px;
          }

          .stat-icon {
            width: 40px;
            height: 40px;
          }

          .stat-number {
            font-size: 24px;
          }

          .card-header {
            padding: 16px;
          }

          .search-container {
            max-width: 100%;
          }

          .search-input {
            font-size: 14px;
            padding: 10px 12px 10px 44px;
          }

          .table-container {
            overflow: visible;
          }

          .modern-table {
            display: block;
          }

          .modern-table thead {
            display: none;
          }

          .modern-table tbody {
            display: block;
          }

          .modern-table tbody tr {
            display: block;
            margin-bottom: 16px;
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            padding: 16px;
            background: var(--bg-primary);
          }

          .modern-table tbody tr:hover {
            background: var(--bg-primary);
            box-shadow: var(--shadow-md);
          }

          .modern-table td {
            display: block;
            padding: 8px 0;
            border: none;
          }

          .modern-table td::before {
            content: attr(data-label);
            font-weight: 600;
            color: var(--text-secondary);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: block;
            margin-bottom: 4px;
          }

          .user-cell::before {
            content: "User";
          }

          .email-cell::before {
            content: "Email";
          }

          .user-cell {
            min-width: auto;
            padding: 12px 0 !important;
          }

          .user-avatar {
            width: 48px;
            height: 48px;
            font-size: 16px;
          }

          .user-name {
            font-size: 16px;
          }

          .email-cell {
            word-break: break-all;
          }

          .action-buttons {
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid var(--border-color);
          }

          .action-btn {
            width: 40px;
            height: 40px;
          }

          .empty-content {
            padding: 60px 20px;
          }

          .empty-icon {
            width: 40px;
            height: 40px;
          }

          .empty-content h3 {
            font-size: 16px;
          }

          .empty-content p {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .container-fluid {
            padding: 12px;
          }

          .page-title {
            font-size: 20px;
          }

          .stat-card {
            padding: 16px;
          }

          .stat-icon {
            width: 36px;
            height: 36px;
          }

          .stat-number {
            font-size: 20px;
          }

          .stat-label {
            font-size: 12px;
          }

          .card-header {
            padding: 12px;
          }

          .modern-table tbody tr {
            padding: 12px;
          }
        }
      `}</style>

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
                    <User size={20} />
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
    </>
  );
};

export default User;
