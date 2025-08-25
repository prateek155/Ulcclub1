import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu"; // Changed from AdminMenu to FacultyMenu
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Phone, Mail, Activity, UserCheck, Trash2, Building2, GraduationCap } from "lucide-react";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [communityMembers, setCommunityMembers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const fetchCommunityMembers = async () => {
    try {
      const { data } = await axios.get(
        "https://ulcclub1.onrender.com/api/v1/community/members"
      );
      if (data?.success) {
        setCommunityMembers(data.members);
      }
    } catch (error) {
      console.error("Error fetching community members:", error);
    }
  };

  const deleteMember = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://ulcclub1.onrender.com/delete-member/${id}`
      );
      if (data?.success) {
        setCommunityMembers(communityMembers.filter((member) => member._id !== id));
        toast.success("Member deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const acceptMember = async (id) => {
    try {
      const { data } = await axios.post(
        `https://ulcclub1.onrender.com/api/v1/community/accept-member/${id}`
      );
      if (data?.success) {
        setCommunityMembers(
          communityMembers.filter((member) => member._id !== id)
        );
        toast.success("Member accepted successfully, and email sent!");
      }
    } catch (error) {
      console.error("Error accepting member:", error);
      toast.error("An error occurred while accepting the member.");
    }
  };

  useEffect(() => {
    fetchCommunityMembers();
  }, []);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("https://ulcclub1.onrender.com/api/v1/product/get-product");
      setProducts(data.product);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout tile={"faculty-dashboard"}>
      <div className="faculty-dashboard">
        <div className="dashboard-container">
          {/* Sidebar Section with FacultyMenu */}
          <div className="sidebar-section">
            <AdminMenu />
          </div>
          
          {/* Main Content */}
          <div className="main-content">
            {/* Welcome Card - Institutional Style */}
          <div className="section">
            <div className="welcome-card">
              <div className="welcome-header">
                <div className="welcome-icon">
                  <Building2 size={32} />
                </div>
                <div className="welcome-content">
                  <h1> Admin Portal</h1>
                  <p>Welcome back, {auth?.user?.name}</p>
                  <span className="department-badge">Department Management System</span>
                </div>
              </div>
            </div>

            {/* Stats Cards - Professional Layout */}
            <div className="stats-grid">
              <div className="stat-card primary">
                <div className="stat-header">
                  <div className="stat-icon">
                    <Mail size={20} />
                  </div>
                  <div className="stat-badge">Contact</div>
                </div>
                <div className="stat-content">
                  <h3>Email Address</h3>
                  <p>{auth?.user?.email}</p>
                </div>
              </div>

              <div className="stat-card secondary">
                <div className="stat-header">
                  <div className="stat-icon">
                    <Phone size={20} />
                  </div>
                  <div className="stat-badge">Communication</div>
                </div>
                <div className="stat-content">
                  <h3>Contact Number</h3>
                  <p>{auth?.user?.phone}</p>
                </div>
              </div>

              <div className="stat-card accent">
                <div className="stat-header">
                  <div className="stat-icon">
                    <Activity size={20} />
                  </div>
                  <div className="stat-badge">Events</div>
                </div>
                <div className="stat-content">
                  <h3>Total Events</h3>
                  <p>{products.length}</p>
                </div>
              </div>
            </div>

            {/* Members Section - Institutional Style */}
            <div className="members-section">
              <div className="section-header">
                <div className="header-content">
                  <div className="header-icon">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h2>Membership Requests</h2>
                    <p>Review and manage incoming applications</p>
                  </div>
                </div>
                <div className="header-stats">
                  <span className="members-count">{communityMembers.length}</span>
                  <span className="count-label">Pending Requests</span>
                </div>
              </div>

              <div className="table-container">
                {communityMembers.length > 0 ? (
                  <table className="institutional-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Applicant Information</th>
                        <th>Contact Details</th>
                        <th>Application Summary</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {communityMembers.map((member, index) => (
                        <tr key={member._id} onClick={() => handleRowClick(member)}>
                          <td>
                            <span className="member-id">#{String(index + 1).padStart(3, '0')}</span>
                          </td>
                          <td>
                            <div className="member-info">
                              <div className="member-avatar">
                                {member.Name.charAt(0).toUpperCase()}
                              </div>
                              <div className="member-details">
                                <span className="member-name">{member.Name}</span>
                                <span className="member-status">Pending Review</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="contact-info">
                              <span className="phone-number">{member.phone}</span>
                              {member.email && <span className="email-address">{member.email}</span>}
                            </div>
                          </td>
                          <td>
                            <div className="bio-preview">{member.bio}</div>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn-approve"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  acceptMember(member._id);
                                }}
                                title="Approve Application"
                              >
                                <UserCheck size={14} />
                                Approve
                              </button>
                              <button
                                className="btn-reject"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteMember(member._id);
                                }}
                                title="Reject Application"
                              >
                                <Trash2 size={14} />
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-data">
                    <div className="no-data-icon">
                      <GraduationCap size={48} />
                    </div>
                    <h3>No Pending Applications</h3>
                    <p>All membership applications have been processed. New requests will appear here for review.</p>
                  </div>
                )}
              </div>
            </div>
           </div>       
          </div>
        </div>
      </div>

      {/* Modal for detailed member information */}
      {isModalOpen && selectedMember && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Application Details</h2>
              <span className="application-id">#{selectedMember._id.slice(-6).toUpperCase()}</span>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <label>Full Name:</label>
                <span>{selectedMember.Name}</span>
              </div>
              <div className="detail-row">
                <label>Email Address:</label>
                <span>{selectedMember.email || "Not provided"}</span>
              </div>
              <div className="detail-row">
                <label>Phone Number:</label>
                <span>{selectedMember.phone}</span>
              </div>
              <div className="detail-row full-width">
                <label>Application Statement:</label>
                <div className="bio-content">{selectedMember.bio}</div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-modal-close" onClick={closeModal}>
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .faculty-dashboard {
          background: #f8fafc;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .dashboard-container {
          display: flex;
          min-height: 100vh;
        }

        .sidebar-section {
          flex-shrink: 0;
        }

        .main-content {
          flex: 1;
          background: #f8fafc;
          overflow-y: auto;
        }

        .section {
           padding: 20px;
         }  

        /* Welcome Card - Institutional Style */
        .welcome-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 32px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .welcome-header {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .welcome-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .welcome-content h1 {
          margin: 0 0 4px 0;
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.025em;
        }

        .welcome-content p {
          margin: 0 0 8px 0;
          color: #64748b;
          font-size: 16px;
        }

        .department-badge {
          background: #eff6ff;
          color: #1d4ed8;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        /* Stats Grid - Professional Layout */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          transition: all 0.2s ease;
        }

        .stat-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .stat-card.primary {
          border-left: 4px solid #3b82f6;
        }

        .stat-card.secondary {
          border-left: 4px solid #10b981;
        }

        .stat-card.accent {
          border-left: 4px solid #f59e0b;
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          background: #f1f5f9;
          color: #475569;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-badge {
          background: #f1f5f9;
          color: #475569;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-content h3 {
          margin: 0 0 8px 0;
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
        }

        .stat-content p {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
        }

        /* Members Section - Institutional Style */
        .members-section {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .section-header {
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          padding: 24px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-header h2 {
          margin: 0 0 4px 0;
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
        }

        .section-header p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
        }

        .header-stats {
          text-align: right;
        }

        .members-count {
          display: block;
          font-size: 32px;
          font-weight: 800;
          color: #1e293b;
          line-height: 1;
        }

        .count-label {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        /* Table Styles - Institutional */
        .table-container {
          overflow-x: auto;
        }

        .institutional-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .institutional-table thead th {
          background: #f8fafc;
          color: #475569;
          font-weight: 600;
          padding: 16px 24px;
          text-align: left;
          border-bottom: 2px solid #e2e8f0;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .institutional-table tbody tr {
          border-bottom: 1px solid #f1f5f9;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .institutional-table tbody tr:hover {
          background: #f8fafc;
        }

        .institutional-table tbody td {
          padding: 20px 24px;
          vertical-align: middle;
        }

        .member-id {
          background: #f1f5f9;
          color: #475569;
          padding: 6px 12px;
          border-radius: 6px;
          font-weight: 600;
          font-family: 'Courier New', monospace;
          font-size: 12px;
        }

        .member-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .member-avatar {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: linear-gradient(135deg, #1e293b, #334155);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
        }

        .member-details {
          display: flex;
          flex-direction: column;
        }

        .member-name {
          font-weight: 600;
          color: #1e293b;
          font-size: 14px;
        }

        .member-status {
          font-size: 12px;
          color: #f59e0b;
          font-weight: 500;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .phone-number {
          color: #475569;
          font-family: 'Courier New', monospace;
          background: #f8fafc;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
        }

        .email-address {
          color: #64748b;
          font-size: 12px;
        }

        .bio-preview {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #64748b;
          font-size: 13px;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .action-buttons button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border: 1px solid;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .btn-approve {
          background: #f0fdf4;
          color: #166534;
          border-color: #bbf7d0;
        }

        .btn-approve:hover {
          background: #dcfce7;
          border-color: #86efac;
        }

        .btn-reject {
          background: #fef2f2;
          color: #dc2626;
          border-color: #fecaca;
        }

        .btn-reject:hover {
          background: #fee2e2;
          border-color: #fca5a5;
        }

        /* No Data State */
        .no-data {
          text-align: center;
          padding: 80px 32px;
          color: #64748b;
        }

        .no-data-icon {
          background: #f1f5f9;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          color: #94a3b8;
        }

        .no-data h3 {
          margin: 0 0 8px 0;
          font-size: 20px;
          color: #374151;
          font-weight: 600;
        }

        .no-data p {
          margin: 0;
          font-size: 14px;
          max-width: 400px;
          margin: 0 auto;
          line-height: 1.5;
        }

        /* Modal Styles - Professional */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 23, 42, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          border: 1px solid #e2e8f0;
        }

        .modal-header {
          background: #f8fafc;
          padding: 24px 32px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
        }

        .application-id {
          background: #1e293b;
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          font-family: 'Courier New', monospace;
        }

        .modal-body {
          padding: 32px;
        }

        .detail-row {
          display: flex;
          margin-bottom: 20px;
          align-items: flex-start;
        }

        .detail-row.full-width {
          flex-direction: column;
        }

        .detail-row label {
          font-weight: 600;
          color: #374151;
          width: 140px;
          flex-shrink: 0;
          font-size: 14px;
        }

        .detail-row span {
          color: #1f2937;
          font-size: 14px;
        }

        .bio-content {
          background: #f8fafc;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          white-space: pre-line;
          font-size: 14px;
          line-height: 1.6;
          color: #374151;
          margin-top: 8px;
        }

        .modal-actions {
          background: #f8fafc;
          padding: 20px 32px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: flex-end;
        }

        .btn-modal-close {
          background: #1e293b;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .btn-modal-close:hover {
          background: #334155;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .dashboard-container {
            flex-direction: column;
          }

          .main-content {
            padding: 16px;
          }
        }

        @media (max-width: 768px) {
          .welcome-header {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .section-header {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }

          .institutional-table thead th,
          .institutional-table tbody td {
            padding: 12px 16px;
          }

          .action-buttons {
            flex-direction: column;
          }

          .modal-content {
            margin: 20px;
            width: calc(100% - 40px);
          }

          .modal-header,
          .modal-body,
          .modal-actions {
            padding: 20px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default AdminDashboard;
