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

  /* 🔥 LOCK HEADER & FOOTER WHEN SIDEBAR OPENS */
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("admin-sidebar-open");
    } else {
      document.body.classList.remove("admin-sidebar-open");
    }

    return () => {
      document.body.classList.remove("admin-sidebar-open");
    };
  }, [isMobileMenuOpen]);

  /* ===== API ===== */
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
    await axios.delete(
      `https://ulcclub1.onrender.com/delete-member/${id}`
    );
    setCommunityMembers((prev) => prev.filter((m) => m._id !== id));
    setSelectedMember(null);
    toast.success("Member removed");
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="dashboard-root">
        {/* MOBILE MENU BUTTON */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={18} />
          <span>Menu</span>
        </button>

        {/* SIDEBAR */}
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
              <X size={20} />
            </button>
          </div>

          <div className="sidebar-scroll">
            <AdminMenu />
          </div>
        </aside>

        {/* OVERLAY */}
        <div
          className={`overlay ${isMobileMenuOpen ? "show" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* MAIN */}
        <main className="main">
          <div className="welcome-section">
            <h2>Welcome back, {auth?.user?.name}</h2>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <Mail size={18} />
              <span>{auth?.user?.email}</span>
            </div>
            <div className="stat-card">
              <Phone size={18} />
              <span>{auth?.user?.phone}</span>
            </div>
            <div className="stat-card">
              <Activity size={18} />
              <span>Events: {products.length}</span>
            </div>
          </div>

          <h3 className="section-title">Membership Requests</h3>

          {communityMembers.length === 0 ? (
            <div className="empty-state">
              <Users size={48} />
              <p>No pending requests</p>
            </div>
          ) : (
            communityMembers.map((m) => (
              <div key={m._id} className="member-card">
                <h4>{m.Name}</h4>
                <div className="member-actions">
                  <button onClick={() => acceptMember(m._id)}>
                    <UserCheck size={16} /> Accept
                  </button>
                  <button onClick={() => deleteMember(m._id)}>
                    <Trash2 size={16} /> Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </main>
      </div>

      {/* ===== STYLES ===== */}
      <style>{`
        /* LOCK BACKGROUND WHEN SIDEBAR OPEN */
        .admin-sidebar-open {
          overflow: hidden;
        }

        .admin-sidebar-open header,
        .admin-sidebar-open footer {
          display: none;
        }

        .dashboard-root {
          min-height: 100vh;
        }

        /* SIDEBAR */
        .sidebar {
          position: fixed;
          top: 0;
          left: -280px;
          width: 280px;
          height: 100vh;
          background: #fff;
          z-index: 10001;
          display: flex;
          flex-direction: column;
          transition: left 0.3s ease;
        }

        .sidebar.open {
          left: 0;
        }

        .sidebar-header {
          height: 64px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #fff;
        }

        .sidebar-scroll {
          flex: 1;
          overflow-y: auto;
        }

        /* OVERLAY */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          z-index: 10000;
          display: none;
        }

        .overlay.show {
          display: block;
        }

        /* MOBILE MENU BUTTON */
        .mobile-menu-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 12px 18px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* MAIN */
        .main {
          padding: 16px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .stat-card {
          background: #fff;
          padding: 14px;
          border-radius: 10px;
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .member-card {
          background: #fff;
          padding: 14px;
          border-radius: 10px;
          margin-top: 12px;
        }

        .member-actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .member-actions button {
          flex: 1;
        }

        .empty-state {
          text-align: center;
          margin-top: 40px;
        }
      `}</style>
    </Layout>
  );
};

export default AdminDashboard;
