import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserAlt, FaUsers, FaSearch } from "react-icons/fa";
import { Trash2 } from "lucide-react";

const CommunityMember = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [communityMembers, setCommunityMembers] = useState([]);
  

  const deleteMember = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/community/delete-member/${id}`
      );
      if (data?.success) {
        setCommunityMembers(communityMembers.filter((member) => member._id !== id));
        toast.success("Member deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };


  // Fetch Accepted Members
  const fetchAcceptedMembers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/community/accepted-members"
      );
      if (data?.success) {
        setMembers(data.members);
      } else {
        toast.error("Failed to fetch accepted members.");
      }
    } catch (error) {
      console.error("Error fetching accepted members:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAcceptedMembers();
  }, []);

  // Filter members based on search term
  const filteredMembers = members.filter(member =>
    member.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm) ||
    member.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title={"All Community Members"}>
      <div className="community-container">
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        
        <div className="main-wrapper">
          {/* Admin Menu */}
            <AdminMenu />

          {/* Main Content */}
          <div className="content-area">
            {/* Header Section */}
            <div className="page-header">
              <div className="header-content">
                <div className="title-section">
                  <FaUsers className="header-icon" />
                  <h1 className="page-title">Community Members</h1>
                  <p className="page-subtitle">Manage and view all accepted community members</p>
                </div>
                <div className="stats-badge">
                  <span className="stats-number">{members.length}</span>
                  <span className="stats-label">Total Members</span>
                </div>
              </div>
            </div>

            {/* Search Section */}
            <div className="search-section">
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search members by name, phone, or bio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Members Table Card */}
            <div className="members-card">
              <div className="card-header">
                <h2 className="card-title">Accepted Members</h2>
                <div className="member-count">
                  {filteredMembers.length} of {members.length} members
                </div>
              </div>
              
              <div className="card-body">
                {loading ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading members...</p>
                  </div>
                ) : (
                  <div className="table-container">
                    <table className="members-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Member</th>
                          <th>Phone</th>
                          <th>Bio</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMembers.length > 0 ? (
                          filteredMembers.map((member, index) => (
                            <tr key={member._id} className="member-row">
                              <td className="serial-cell">
                                <span className="serial-number">{index + 1}</span>
                              </td>
                              <td className="member-cell">
                                <div className="member-info">
                                  <div className="member-avatar">
                                    <FaUserAlt />
                                  </div>
                                  <div className="member-details">
                                    <span className="member-name">{member.Name}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="phone-cell">
                                <span className="phone-number">{member.phone}</span>
                              </td>
                              <td className="bio-cell">
                                <p className="bio-text" title={member.bio}>
                                  {member.bio}
                                </p>
                              </td>
                              <td>
                                <div className="action-buttons">
                                  <button
                                    className="btn-delete"
                                onClick={() => deleteMember(member._id)}
                                title="Delete Member"
                              >
                                <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr className="empty-row">
                            <td colSpan="4">
                              <div className="empty-state">
                                <FaUsers className="empty-icon" />
                                <h3>No members found</h3>
                                <p>
                                  {searchTerm 
                                    ? `No members match "${searchTerm}"`
                                    : "No accepted members available at the moment."
                                  }
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .community-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .main-wrapper {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 30px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .sidebar {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 20px;
          height: fit-content;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .content-area {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .page-header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 40px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .title-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .header-icon {
          font-size: 2.5rem;
          color: #6366f1;
          margin-bottom: 10px;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-subtitle {
          font-size: 1.1rem;
          color: #64748b;
          margin: 0;
        }

        .stats-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        }

        .stats-number {
          font-size: 2.5rem;
          font-weight: 800;
        }

        .stats-label {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .search-section {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .search-container {
          position: relative;
          max-width: 500px;
        }

        .search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 1.1rem;
        }

        .search-input {
          width: 100%;
          padding: 16px 20px 16px 50px;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          font-size: 1rem;
          background: white;
          transition: all 0.3s ease;
          outline: none;
        }

        .search-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
          transform: translateY(-1px);
        }

        .members-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .card-header {
          background: linear-gradient(135deg, #1e293b, #334155);
          color: white;
          padding: 30px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
        }

        .member-count {
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 0.9rem;
        }

        .card-body {
          padding: 0;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px;
          color: #64748b;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .table-container {
          overflow-x: auto;
        }

        .members-table {
          width: 100%;
          border-collapse: collapse;
        }

        .members-table thead {
          background: #f8fafc;
        }

        .members-table th {
          padding: 20px 25px;
          text-align: left;
          font-weight: 600;
          color: #374151;
          font-size: 0.95rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .member-row {
          transition: all 0.3s ease;
          border-bottom: 1px solid #f1f5f9;
        }

        .member-row:hover {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .members-table td {
          padding: 20px 25px;
          vertical-align: middle;
        }

        .serial-cell {
          width: 80px;
        }

        .serial-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border-radius: 50%;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .member-cell {
          min-width: 200px;
        }

        .member-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .member-avatar {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.1rem;
        }

        .member-name {
          font-weight: 600;
          color: #1e293b;
          font-size: 1rem;
        }

        .phone-cell {
          min-width: 150px;
        }

        .phone-number {
          background: #f1f5f9;
          padding: 8px 12px;
          border-radius: 8px;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 0.9rem;
          color: #374151;
        }

        .bio-cell {
          max-width: 300px;
        }

        .bio-text {
          margin: 0;
          color: #64748b;
          line-height: 1.5;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          cursor: help;
        }

        .empty-row td {
          padding: 0;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 40px;
          color: #64748b;
          text-align: center;
        }

        .empty-icon {
          font-size: 4rem;
          color: #d1d5db;
          margin-bottom: 20px;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          color: #374151;
          margin: 0 0 10px 0;
          font-weight: 600;
        }

        .empty-state p {
          margin: 0;
          font-size: 1rem;
          max-width: 400px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .main-wrapper {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .sidebar {
            order: 2;
          }

          .content-area {
            order: 1;
          }

          .header-content {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
        }

        @media (max-width: 768px) {
          .community-container {
            padding: 15px;
          }

          .page-header {
            padding: 25px;
          }

          .page-title {
            font-size: 2rem;
          }

          .search-section {
            padding: 20px;
          }

          .card-header {
            padding: 20px;
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .members-table th,
          .members-table td {
            padding: 15px 10px;
          }

          .member-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .bio-cell {
            max-width: 200px;
          }
        }

        @media (max-width: 640px) {
          .table-container {
            overflow-x: scroll;
          }

          .members-table {
            min-width: 600px;
          }
        }

         .action-buttons {
          display: flex;
          gap: 8px;
        }

        .action-buttons button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-delete {
          background: #fecaca;
          color: #dc2626;
        }

        .btn-delete:hover {
          background: #fca5a5;
          transform: translateY(-2px);
        }
      `}</style>
    </Layout>
  );
};

export default CommunityMember;