import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Phone,
  Mail,
  Activity,
  UserCheck,
  Trash2,
  Building2,
  GraduationCap,
  X,
  Menu,
} from "lucide-react";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [communityMembers, setCommunityMembers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* ================= API ================= */

  const fetchCommunityMembers = async () => {
    try {
      const { data } = await axios.get(
        "https://ulcclub1.onrender.com/api/v1/community/members"
      );
      if (data?.success) setCommunityMembers(data.members);
    } catch (err) {
      console.error(err);
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://ulcclub1.onrender.com/api/v1/product/get-product"
      );
      setProducts(data.product || []);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const acceptMember = async (id) => {
    try {
      const { data } = await axios.post(
        `https://ulcclub1.onrender.com/api/v1/community/accept-member/${id}`
      );
      if (data?.success) {
        setCommunityMembers((prev) => prev.filter((m) => m._id !== id));
        toast.success("Member approved");
      }
    } catch {
      toast.error("Error approving member");
    }
  };

  const deleteMember = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://ulcclub1.onrender.com/delete-member/${id}`
      );
      if (data?.success) {
        setCommunityMembers((prev) => prev.filter((m) => m._id !== id));
        toast.success("Member deleted");
      }
    } catch {
      toast.error("Error deleting member");
    }
  };

  useEffect(() => {
    fetchCommunityMembers();
    getAllProducts();
  }, []);

  /* ================= UI ================= */

  return (
    <Layout title="Admin Dashboard">
      <div className="admin-dashboard">
        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={22} />
          Menu
        </button>

        {/* Sidebar */}
        <aside
          className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}
        >
          <div className="sidebar-header">
            <span>
              <Building2 size={18} /> Admin Panel
            </span>
            <button onClick={() => setIsMobileMenuOpen(false)}>
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

        {/* Main Content */}
        <main className="content">
          {/* Welcome */}
          <div className="card">
            <h1>Admin Portal</h1>
            <p>Welcome back, {auth?.user?.name}</p>
          </div>

          {/* Stats */}
          <div className="stats">
            <div className="stat">
              <Mail size={18} />
              <div>
                <small>Email</small>
                <p>{auth?.user?.email}</p>
              </div>
            </div>

            <div className="stat">
              <Phone size={18} />
              <div>
                <small>Phone</small>
                <p>{auth?.user?.phone}</p>
              </div>
            </div>

            <div className="stat">
              <Activity size={18} />
              <div>
                <small>Events</small>
                <p>{products.length}</p>
              </div>
            </div>
          </div>

          {/* Members */}
          <div className="card">
            <h2>Membership Requests</h2>

            {communityMembers.length === 0 ? (
              <p>No pending requests</p>
            ) : (
              communityMembers.map((m, i) => (
                <div key={m._id} className="member">
                  <div>
                    <strong>{m.Name}</strong>
                    <small>{m.phone}</small>
                  </div>
                  <div className="actions">
                    <button onClick={() => acceptMember(m._id)}>
                      <UserCheck size={14} />
                    </button>
                    <button onClick={() => deleteMember(m._id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* ================= STYLES ================= */}
      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .admin-dashboard {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
        }

        /* Sidebar */
        .sidebar {
          width: 260px;
          background: #fff;
          border-right: 1px solid #e5e7eb;
        }



        /* Mobile Sidebar */
        @media (max-width: 1024px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: -260px;
            height: 100vh;
            z-index: 3000;
            transition: left 0.3s ease;
          }

          /* Sidebar scroll */
.sidebar-scroll {
  height: calc(100vh - 56px);   /* subtract header height */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}


          .sidebar.open {
            left: 0;
          }
        }

        .sidebar-header {
  display: none;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  height: 56px;   /* IMPORTANT */
  flex-shrink: 0;
}

        @media (max-width: 1024px) {
          .sidebar-header {
            display: flex;
          }
        }

        /* Overlay */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 2500;
          display: none;
        }

        .overlay.show {
          display: block;
        }

        /* Mobile menu button */
        .mobile-menu-btn {
          display: none;
        }

        @media (max-width: 1024px) {
          .mobile-menu-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            display: flex;
            gap: 6px;
            align-items: center;
            padding: 12px 16px;
            border-radius: 30px;
            border: none;
            background: white;
            z-index: 3500;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          }
        }

        /* Content */
        .content {
          flex: 1;
          padding: 24px;
        }

        .card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }

        .stat {
          background: white;
          padding: 16px;
          border-radius: 10px;
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .member {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .actions button {
          margin-left: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
        }
      `}</style>
    </Layout>
  );
};

export default AdminDashboard;



