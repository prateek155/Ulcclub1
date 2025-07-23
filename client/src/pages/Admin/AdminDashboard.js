import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Phone, Mail, User, Activity, UserCheck, Trash2 } from "lucide-react";

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
        "http://localhost:8080/api/v1/community/members"
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

  const acceptMember = async (id) => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/community/accept-member/${id}`
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
      const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product");
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
    <Layout tile={"admin-dashboard"}>
      <div className="admin-dashboard">
        <div className="dashboard-container">
          <div className="sidebar-section">
            <AdminMenu />
          </div>
          <div className="main-content">
            {/* Welcome Card */}
            <div className="welcome-card">
              <div className="welcome-icon">
                <User size={40} />
              </div>
              <div className="welcome-content">
                <h1>Welcome back, {auth?.user?.name}!</h1>
                <p>Here's what's happening in your community</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon email-icon">
                  <Mail size={24} />
                </div>
                <div className="stat-content">
                  <h3>Email Address</h3>
                  <p>{auth?.user?.email}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon phone-icon">
                  <Phone size={24} />
                </div>
                <div className="stat-content">
                  <h3>Contact</h3>
                  <p>{auth?.user?.phone}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon activity-icon">
                  <Activity size={24} />
                </div>
                <div className="stat-content">
                  <h3>Total event's</h3>
                  <p>{products.length}</p>
                </div>
              </div>
            </div>

            {/* Members Table */}
            <div className="members-section">
              <div className="section-header">
                <h2>Joining US Requests</h2>
                <span className="members-count">{communityMembers.length} Total</span>
              </div>

              <div className="table-container">
                {communityMembers.length > 0 ? (
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Bio</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {communityMembers.map((member, index) => (
                        <tr key={member._id} onClick={() => handleRowClick(member)} style={{ cursor: "pointer" }}>
                          <td>
                            <span className="row-number">{index + 1}</span>
                          </td>
                          <td>
                            <div className="member-name">
                              <div className="member-avatar">
                                {member.Name.charAt(0).toUpperCase()}
                              </div>
                              <span>{member.Name}</span>
                            </div>
                          </td>
                          <td>
                            <span className="phone-number">{member.phone}</span>
                          </td>
                          <td>
                            <div className="bio-text">{member.bio}</div>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn-accept"
                                onClick={() => acceptMember(member._id)}
                                title="Accept Member"
                              >
                                <UserCheck size={16} />
                                Accept
                              </button>
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
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-data">
                    <div className="no-data-icon">
                      <User size={48} />
                    </div>
                    <h3>No community requests found</h3>
                    <p>When new members request to join, they'll appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for showing full member info */}
      {isModalOpen && selectedMember && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Member Details</h2>
            <p><strong>Name:</strong> {selectedMember.Name}</p>
            <p><strong>Email:</strong> {selectedMember.email || "N/A"}</p>
            <p><strong>Phone:</strong> {selectedMember.phone}</p>
            <p><strong>Bio:</strong></p>
            <p style={{ whiteSpace: "pre-line", maxHeight: "200px", overflowY: "auto" }}>
              {selectedMember.bio}
            </p>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .admin-dashboard {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
        }

        .dashboard-container {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 30px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .sidebar-section {
          position: sticky;
          top: 20px;
          height: fit-content;
        }

        .main-content {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        /* Welcome Card */
        .welcome-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 30px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .welcome-icon {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          width: 80px;
          height: 80px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .welcome-content h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #2d3748;
        }

        .welcome-content p {
          margin: 0;
          color: #718096;
          font-size: 16px;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .email-icon {
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .phone-icon {
          background: linear-gradient(135deg, #48bb78, #38a169);
        }

        .activity-icon {
          background: linear-gradient(135deg, #ed8936, #dd6b20);
        }

        .stat-content h3 {
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: 600;
          color: #4a5568;
        }

        .stat-content p {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #2d3748;
        }

        /* Members Section */
        .members-section {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .section-header {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 25px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .section-header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
        }

        .members-count {
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
        }

        // table style
        .table-container {
          overflow-x: auto;
        }

        .modern-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .modern-table thead th {
          background: #f8fafc;
          color: #4a5568;
          font-weight: 600;
          padding: 20px;
          text-align: left;
          border-bottom: 2px solid #e2e8f0;
          position: sticky;
          top: 0;
        }

        .modern-table tbody tr {
          transition: all 0.3s ease;
          border-bottom: 1px solid #e2e8f0;
        }

        .modern-table tbody tr:hover {
          background: #f8fafc;
          transform: scale(1.01);
        }

        .modern-table tbody td {
          padding: 20px;
          vertical-align: middle;
        }

        .row-number {
          background: #e2e8f0;
          color: #4a5568;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 12px;
        }

        .member-name {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .member-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
        }

        .phone-number {
          color: #4a5568;
          font-family: 'Courier New', monospace;
          background: #f1f5f9;
          padding: 6px 12px;
          border-radius: 8px;
        }

        .bio-text {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #6b7280;
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

        .btn-accept {
          background: #dcfce7;
          color: #166534;
        }

        .btn-accept:hover {
          background: #bbf7d0;
          transform: translateY(-2px);
        }

        .btn-delete {
          background: #fecaca;
          color: #dc2626;
        }

        .btn-delete:hover {
          background: #fca5a5;
          transform: translateY(-2px);
        }

        /* No Data State */
        .no-data {
          text-align: center;
          padding: 60px 30px;
          color: #6b7280;
        }

        .no-data-icon {
          background: #f3f4f6;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .no-data h3 {
          margin: 0 0 10px 0;
          font-size: 20px;
          color: #374151;
        }

        .no-data p {
          margin: 0;
          font-size: 16px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .dashboard-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .sidebar-section {
            position: relative;
          }
        }

        @media (max-width: 768px) {
          .admin-dashboard {
            padding: 15px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .welcome-card {
            flex-direction: column;
            text-align: center;
            padding: 25px;
          }

          .section-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .modern-table {
            font-size: 12px;
          }

          .modern-table thead th,
          .modern-table tbody td {
            padding: 15px 10px;
          }

          .action-buttons {
            flex-direction: column;
          }
        }
          .modal-overlay {
              position: fixed;
                top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close-btn {
  background: #dc2626;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  margin-top: 20px;
  cursor: pointer;
  font-weight: bold;
}

      `}</style>
    </Layout>
  );
};

export default AdminDashboard;