import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Phone, Mail, Activity, UserCheck, Trash2, Building2, X, Menu, Users } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [communityMembers, setCommunityMembers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    axios.get("https://ulcclub1.onrender.com/api/v1/community/members")
      .then(res => res.data?.success && setCommunityMembers(res.data.members))
      .catch(() => {});
  }, []);

  useEffect(() => {
    axios.get("https://ulcclub1.onrender.com/api/v1/product/get-product")
      .then(res => setProducts(res.data.product || []))
      .catch(() => toast.error("Error loading events"));
  }, []);

  const acceptMember = async (id) => {
    await axios.post(`https://ulcclub1.onrender.com/api/v1/community/accept-member/${id}`);
    setCommunityMembers(prev => prev.filter(m => m._id !== id));
    setSelectedMember(null);
    toast.success("Member approved");
  };

  const deleteMember = async (id) => {
    await axios.delete(`https://ulcclub1.onrender.com/delete-member/${id}`);
    setCommunityMembers(prev => prev.filter(m => m._id !== id));
    setSelectedMember(null);
    toast.success("Member removed");
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="dashboard-root">

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          <span>{isMobileMenuOpen ? "Close" : "Menu"}</span>
        </button>

        {/* Sidebar - Now Always Visible */}
        <aside className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <Building2 size={24} />
              <span>Admin Panel</span>
            </div>
            <button className="sidebar-close" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* 🔥 SCROLLABLE MENU AREA */}
          <div className="sidebar-scroll">
            <AdminMenu />
          </div>
        </aside>

        {/* Overlay */}
        <div
          className={`overlay ${isMobileMenuOpen ? "show" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content */}
        <main className="main">
          <div className="welcome-section">
            <div className="welcome-content">
              <div className="welcome-icon">
                <Building2 size={40} />
              </div>
              <div className="welcome-text">
                <h1>Admin Portal</h1>
                <p>Welcome back, {auth?.user?.name}</p>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon email">
                <Mail size={20} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Email</p>
                <p className="stat-value">{auth?.user?.email}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon phone">
                <Phone size={20} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Phone</p>
                <p className="stat-value">{auth?.user?.phone}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon events">
                <Activity size={20} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Events</p>
                <p className="stat-value">{products.length}</p>
              </div>
            </div>
          </div>

          <div className="section-header">
            <h2>Membership Requests</h2>
            <span className="badge">{communityMembers.length} Pending</span>
          </div>

          <div className="members-list">
            {communityMembers.map((m) => (
              <div key={m._id} className="member-card" onClick={() => setSelectedMember(m)}>
                <div className="member-header">
                  <div className="member-avatar">
                    {m.Name.charAt(0).toUpperCase()}
                  </div>
                  <div className="member-info">
                    <h3>{m.Name}</h3>
                    <p className="member-bio">{m.bio}</p>
                  </div>
                </div>
                <div className="member-actions desktop-only">
                  <button className="btn btn-accept" onClick={(e) => { e.stopPropagation(); acceptMember(m._id); }}>
                    <UserCheck size={16} />
                    <span>Accept</span>
                  </button>
                  <button className="btn btn-reject" onClick={(e) => { e.stopPropagation(); deleteMember(m._id); }}>
                    <Trash2 size={16} />
                    <span>Reject</span>
                  </button>
                </div>
                <div className="member-actions mobile-only">
                  <button className="btn btn-accept" onClick={(e) => { e.stopPropagation(); acceptMember(m._id); }}>
                    <UserCheck size={16} />
                  </button>
                  <button className="btn btn-reject" onClick={(e) => { e.stopPropagation(); deleteMember(m._id); }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {communityMembers.length === 0 && (
            <div className="empty-state">
              <Users size={48} />
              <h3>No Pending Requests</h3>
              <p>All membership requests have been processed</p>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Detail Modal */}
      {selectedMember && (
        <>
          <div className="modal-overlay" onClick={() => setSelectedMember(null)} />
          <div className="modal-content">
            <button className="modal-close" onClick={() => setSelectedMember(null)}>
              <X size={20} />
            </button>
            
            <div className="modal-header">
              <div className="modal-avatar">
                {selectedMember.Name.charAt(0).toUpperCase()}
              </div>
              <h3>{selectedMember.Name}</h3>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <p className="modal-label">Bio</p>
                <p className="modal-text">{selectedMember.bio}</p>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-accept" onClick={() => acceptMember(selectedMember._id)}>
                <UserCheck size={16} />
                <span>Accept Member</span>
              </button>
              <button className="btn btn-reject" onClick={() => deleteMember(selectedMember._id)}>
                <Trash2 size={16} />
                <span>Reject Member</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* STYLES - SIDEBAR ALWAYS VISIBLE ON ALL SCREENS */}
      <style>{`
        * { 
          box-sizing: border-box; 
          margin: 0; 
          padding: 0; 
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .dashboard-root {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
        }

        /* ===== SIDEBAR - ALWAYS VISIBLE ===== */
        .sidebar {
          width: 280px;
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          height: 100dvh;
          z-index: 1000;
        }

        .sidebar-header {
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          border-bottom: 1px solid #e2e8f0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          flex-shrink: 0;
          min-height: 80px;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 18px;
          letter-spacing: -0.5px;
        }

        .sidebar-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: background 0.2s;
          display: none;
        }

        .sidebar-close:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* 🔥 FIXED: Sidebar scroll - Works on all screen sizes */
        .sidebar-scroll {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          padding: 16px 0;
          min-height: 0;
        }

        .sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* ===== MAIN - ADJUSTED FOR SIDEBAR ===== */
        .main {
          flex: 1;
          margin-left: 280px;
          padding: 32px;
          overflow-y: auto;
          width: calc(100% - 280px);
        }

        .welcome-section {
          background: white;
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 28px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          border: 1px solid #e2e8f0;
        }

        .welcome-content {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .welcome-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .welcome-text h1 {
          font-size: 28px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
          letter-spacing: -0.5px;
        }

        .welcome-text p {
          font-size: 15px;
          color: #64748b;
          font-weight: 500;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          transition: all 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-icon.email {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .stat-icon.phone {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .stat-icon.events {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .stat-content {
          flex: 1;
        }

        .stat-label {
          font-size: 13px;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }

        .stat-value {
          font-size: 16px;
          color: #1e293b;
          font-weight: 600;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .section-header h2 {
          font-size: 22px;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.5px;
        }

        .badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .members-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .member-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          transition: all 0.3s;
        }

        .member-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e1;
        }

        .member-header {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }

        .member-avatar {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .member-info {
          flex: 1;
        }

        .member-info h3 {
          font-size: 17px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 6px;
        }

        .member-bio {
          font-size: 14px;
          color: #64748b;
          line-height: 1.5;
        }

        .member-actions {
          display: flex;
          gap: 10px;
        }

        .desktop-only {
          display: flex;
        }

        .mobile-only {
          display: none;
        }

        .btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-accept {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }

        .btn-accept:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .btn-reject {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        }

        .btn-reject:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        .empty-state {
          background: white;
          border-radius: 12px;
          padding: 60px 20px;
          text-align: center;
          border: 2px dashed #e2e8f0;
          color: #94a3b8;
        }

        .empty-state h3 {
          margin: 16px 0 8px;
          color: #64748b;
          font-size: 18px;
        }

        .empty-state p {
          color: #94a3b8;
          font-size: 14px;
        }

        /* ===== MODAL ===== */
        .modal-overlay {
          display: none;
        }

        .modal-content {
          display: none;
        }

        /* ===== MOBILE MENU BUTTON - HIDDEN BY DEFAULT ===== */
        .mobile-menu-btn {
          display: none;
        }

        .overlay {
          display: none;
        }

        /* ===== RESPONSIVE - MOBILE VIEW ===== */
        @media (max-width: 1024px) {
          /* Sidebar slides in from left on mobile */
          .sidebar {
            left: -280px;
            z-index: 3001;
            transition: left 0.3s ease;
          }

          .sidebar.open {
            left: 0;
          }

          .sidebar-close {
            display: block;
          }

          /* Main content takes full width on mobile */
          .main {
            margin-left: 0;
            width: 100%;
            padding: 20px;
          }

          .overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            z-index: 3000;
            display: none;
          }

          .overlay.show {
            display: block;
          }

          .mobile-menu-btn {
            display: flex;
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 2999;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 50px;
            padding: 14px 20px;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
            transition: all 0.3s;
          }

          .mobile-menu-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .welcome-text h1 {
            font-size: 24px;
          }

          .desktop-only {
            display: none;
          }

          .mobile-only {
            display: flex;
            gap: 10px;
          }

          .member-card {
            cursor: pointer;
          }

          .member-bio {
            display: none;
          }

          /* Modal Styles for Mobile */
          .modal-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            z-index: 4000;
            animation: fadeIn 0.2s ease;
          }

          .modal-content {
            display: block;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            border-radius: 24px 24px 0 0;
            padding: 24px;
            z-index: 4001;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease;
            box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.15);
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }

          .modal-close {
            position: absolute;
            top: 16px;
            right: 16px;
            background: #f1f5f9;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #64748b;
            transition: all 0.2s;
          }

          .modal-close:hover {
            background: #e2e8f0;
            color: #1e293b;
          }

          .modal-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #e2e8f0;
            margin-bottom: 20px;
          }

          .modal-avatar {
            width: 72px;
            height: 72px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 12px;
          }

          .modal-header h3 {
            font-size: 22px;
            font-weight: 700;
            color: #1e293b;
          }

          .modal-body {
            padding: 8px 0 20px;
          }

          .modal-section {
            margin-bottom: 20px;
          }

          .modal-label {
            font-size: 12px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }

          .modal-text {
            font-size: 15px;
            color: #1e293b;
            line-height: 1.6;
          }

          .modal-actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding-top: 12px;
          }

          .modal-actions .btn {
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .welcome-content {
            flex-direction: column;
            text-align: center;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .member-header {
            align-items: center;
          }
        }
      `}</style>
    </Layout>
  );
};

export default AdminDashboard;
