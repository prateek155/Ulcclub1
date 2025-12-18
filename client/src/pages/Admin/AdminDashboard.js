import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Phone, Mail, Activity, UserCheck, Trash2, Building2, GraduationCap, X, Menu } from "lucide-react";
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
    toast.success("Member approved");
  };

  const deleteMember = async (id) => {
    await axios.delete(`https://ulcclub1.onrender.com/delete-member/${id}`);
    setCommunityMembers(prev => prev.filter(m => m._id !== id));
    toast.success("Member removed");
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="dashboard-root">

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X /> : <Menu />}
          <span>{isMobileMenuOpen ? "Close" : "Menu"}</span>
        </button>

        {/* Sidebar */}
        <aside className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <Building2 size={20} />
            <span>Admin Panel</span>
            <X onClick={() => setIsMobileMenuOpen(false)} />
          </div>

          {/* 🔥 SCROLLABLE AREA */}
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
          <div className="welcome">
            <Building2 size={32} />
            <div>
              <h1>Admin Portal</h1>
              <p>Welcome, {auth?.user?.name}</p>
            </div>
          </div>

          <div className="stats">
            <div><Mail /> {auth?.user?.email}</div>
            <div><Phone /> {auth?.user?.phone}</div>
            <div><Activity /> Events: {products.length}</div>
          </div>

          <h2>Membership Requests</h2>

          {communityMembers.map((m, i) => (
            <div key={m._id} className="member-card">
              <strong>{m.Name}</strong>
              <p>{m.bio}</p>
              <div className="actions">
                <button onClick={() => acceptMember(m._id)}><UserCheck /> Accept</button>
                <button onClick={() => deleteMember(m._id)}><Trash2 /> Reject</button>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* STYLES */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .dashboard-root {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
        }

        /* ===== SIDEBAR ===== */
        .sidebar {
          width: 280px;
          background: #fff;
          border-right: 1px solid #e5e7eb;
        }

        .sidebar-header {
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
        }

        .sidebar-scroll {
          height: calc(100vh - 60px);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        /* ===== MAIN ===== */
        .main {
          flex: 1;
          padding: 24px;
        }

        .welcome {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
          gap: 12px;
          margin-bottom: 24px;
        }

        .member-card {
          background: white;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 12px;
          border: 1px solid #e5e7eb;
        }

        .actions {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }

        /* ===== MOBILE ===== */
        .mobile-menu-btn {
          display: none;
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 3000;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 30px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .overlay {
          display: none;
        }

        @media (max-width: 1024px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: -280px;
            height: 100vh;
            z-index: 3001;
            transition: left 0.3s ease;
          }

          .sidebar.open {
            left: 0;
          }

          .overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.4);
            z-index: 3000;
            display: none;
          }

          .overlay.show {
            display: block;
          }

          .mobile-menu-btn {
            display: flex;
          }
        }
      `}</style>
    </Layout>
  );
};

export default AdminDashboard;
