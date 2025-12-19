import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import {
  Phone,
  Mail,
  Activity,
  UserCheck,
  Trash2,
  Building2,
  X,
  Menu,
  Users,
} from "lucide-react";
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
    axios
      .get("https://ulcclub1.onrender.com/api/v1/community/members")
      .then((res) => res.data?.success && setCommunityMembers(res.data.members))
      .catch(() => {});
  }, []);

  useEffect(() => {
    axios
      .get("https://ulcclub1.onrender.com/api/v1/product/get-product")
      .then((res) => setProducts(res.data.product || []))
      .catch(() => toast.error("Error loading events"));
  }, []);

  const acceptMember = async (id) => {
    await axios.post(
      `https://ulcclub1.onrender.com/api/v1/community/accept-member/${id}`
    );
    setCommunityMembers((prev) => prev.filter((m) => m._id !== id));
    setSelectedMember(null);
    toast.success("Member approved");
  };

  const deleteMember = async (id) => {
    await axios.delete(`https://ulcclub1.onrender.com/delete-member/${id}`);
    setCommunityMembers((prev) => prev.filter((m) => m._id !== id));
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

        {/* Sidebar */}
        <aside className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <Building2 size={22} />
              <span>Admin Panel</span>
            </div>
            <button
              className="sidebar-close"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="sidebar-scroll">
            <AdminMenu />
          </div>
        </aside>

        {/* Overlay */}
        <div
          className={`overlay ${isMobileMenuOpen ? "show" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Main */}
        <main className="main">
          <div className="welcome-section">
            <Building2 size={36} />
            <div>
              <h1>Admin Portal</h1>
              <p>Welcome back, {auth?.user?.name}</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <Mail /> {auth?.user?.email}
            </div>
            <div className="stat-card">
              <Phone /> {auth?.user?.phone}
            </div>
            <div className="stat-card">
              <Activity /> Events: {products.length}
            </div>
          </div>

          <h2 className="section-title">Membership Requests</h2>

          <div className="members-list">
            {communityMembers.map((m) => (
              <div
                key={m._id}
                className="member-card"
                onClick={() => setSelectedMember(m)}
              >
                <strong>{m.Name}</strong>
                <p>{m.bio}</p>

                <div className="member-actions">
                  <button
                    className="btn-accept"
                    onClick={(e) => {
                      e.stopPropagation();
                      acceptMember(m._id);
                    }}
                  >
                    <UserCheck size={16} /> Accept
                  </button>
                  <button
                    className="btn-reject"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMember(m._id);
                    }}
                  >
                    <Trash2 size={16} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          {communityMembers.length === 0 && (
            <div className="empty-state">
              <Users size={48} />
              <p>No pending requests</p>
            </div>
          )}
        </main>
      </div>

      {/* STYLES */}
      <style>{`
        :root {
          --app-header-height: 64px;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .dashboard-root {
          display: flex;
          min-height: 100vh;
          background: #f5f7fa;
        }

        /* SIDEBAR */
        .sidebar {
          width: 280px;
          background: #fff;
          position: fixed;
          top: var(--app-header-height);
          left: 0;
          height: calc(100dvh - var(--app-header-height));
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          z-index: 3001;
          transition: left 0.3s ease;
        }

        .sidebar-header {
          height: 64px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          flex-shrink: 0;
        }

        .sidebar-scroll {
          flex: 1;
          overflow-y: auto;
        }

        .sidebar-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        /* MAIN */
        .main {
          margin-left: 280px;
          padding: 24px;
          width: calc(100% - 280px);
        }

        .welcome-section {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          align-items: center;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .stat-card {
          background: white;
          padding: 12px;
          border-radius: 8px;
          display: flex;
          gap: 8px;
          align-items: center;
          border: 1px solid #e5e7eb;
        }

        .member-card {
          background: white;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          margin-bottom: 12px;
        }

        .member-actions {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }

        .btn-accept {
          background: #16a34a;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
        }

        .btn-reject {
          background: #dc2626;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
        }

        .empty-state {
          text-align: center;
          margin-top: 40px;
          color: #64748b;
        }

        /* MOBILE */
        .mobile-menu-btn {
          display: none;
        }

        .overlay {
          display: none;
        }

        @media (max-width: 1024px) {
          .sidebar {
            left: -280px;
          }

          .sidebar.open {
            left: 0;
          }

          .main {
            margin-left: 0;
            width: 100%;
          }

          .mobile-menu-btn {
            display: flex;
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 3002;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 999px;
            padding: 12px 16px;
            gap: 6px;
            align-items: center;
          }

          .overlay {
            position: fixed;
            top: var(--app-header-height);
            left: 0;
            right: 0;
            height: calc(100dvh - var(--app-header-height));
            background: rgba(0,0,0,0.4);
            z-index: 3000;
          }

          .overlay.show {
            display: block;
          }
        }
      `}</style>
    </Layout>
  );
};

export default AdminDashboard;
