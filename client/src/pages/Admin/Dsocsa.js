import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LayoutDashboard,
  Users,
  Package,
  ClipboardList,
  PlusCircle,
  MessageSquare,
  BookOpen,
  ChevronRight,
  Building2,
  Shield,
  X,
  Lock,
} from "lucide-react";

const Dsocsa = () => {
  const [activeItem, setActiveItem] = useState("/dashboard/admin");
  const [showVerify, setShowVerify] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = async (path, e) => {
    setActiveItem(path);

    if (path === "/dashboard/admin/confidential") {
      e.preventDefault();

      try {
        await axios.post("https://ulcclub1.onrender.com/api/v1/secure/send-otp");
        alert("Verification code sent to your email");
        setPendingPath(path);
        setShowVerify(true);
      } catch (err) {
        alert("Error sending verification code");
      }
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const { data } = await axios.post(
        "https://ulcclub1.onrender.com/api/v1/secure/verify-otp",
        { code }
      );
      if (data.success) {
        setShowVerify(false);
        setCode("");
        navigate(pendingPath);
      } else {
        alert("Invalid verification code");
      }
    } catch {
      alert("Verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCloseModal = () => {
    setShowVerify(false);
    setCode("");
    setPendingPath(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && code.trim()) {
      handleVerify();
    }
  };

  const menuSections = [
    {
      title: "OVERVIEW",
      items: [
        {
          path: "/dashboard/admin",
          icon: <LayoutDashboard size={20} />,
          title: "Dashboard",
          description: "Main control center",
        }
      ]
    },
    {
      title: "DEPARTMENT MANAGEMENT",
      items: [
        {
          path: "/association",
          icon: <PlusCircle size={20} />,
          title: "Association",
          description: "Detail All Association Member's",
        },
        {
          path: "/dashboard/admin/Cr",
          icon: <Package size={20} />,
          title: "CR/LR",
          description: "Detail Of All Cr and Lr",
        },
        {
          path: "/dashboard/admin/faculty",
          icon: <ClipboardList size={20} />,
          title: "Faculty",
          description: "Faculty Detail's",
        }
      ]
    },
    {
      title: "EVENT MANAGEMENT",
      items: [
        {
          path: "/dashboard/admin/users",
          icon: <Users size={20} />,
          title: "Event Approval's",
          description: "Approved Events",
        },
        {
          path: "/dashboard/admin/volunteer",
          icon: <Users size={20} />,
          title: "Volunteer",
          description: "Volunteer's Detail's",
        },
      ]
    },
    {
      title: "COMMUNICATIONS",
      items: [
        {
          path: "/dashboard/admin/users",
          icon: <MessageSquare size={20} />,
          title: "User's Data",
          description: "All Registered Users Data",
        },
        {
          path: "/dashboard/admin/report",
          icon: <ClipboardList size={20} />,
          title: "Generate Report",
          description: "Generate Meeting Report Weekly & Other",
        },
        {
          path: "/dashboard/admin/latterhead",
          icon: <BookOpen size={20} />,
          title: "Latterhead",
          description: "Create Different Type of Latterhead According To your Demand",
        }
      ]
    },
    {
      title: "RESOURCES",
      items: [
        {
          path: "/dashboard/admin/action",
          icon: <BookOpen size={20} />,
          title: "Action's",
          description: "Take action of any student",
        },
        {
          path: "/dashboard/admin/confidential",
          icon: <Lock size={20} />,
          title: "Confidential Files",
          description: "OTP protected access",
        }
      ]
    }
  ];

  return (
    <>
      <style>{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
        }

        .sidebar {
          width: 280px;
          background: #1e293b;
          color: white;
          overflow-y: auto;
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
        }

        .sidebar-header {
          padding: 1.5rem;
          border-bottom: 1px solid #334155;
          background: #0f172a;
        }

        .sidebar-header-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .sidebar-header-icon {
          width: 2rem;
          height: 2rem;
          background: #3b82f6;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .sidebar-title {
          font-size: 1.125rem;
          font-weight: 700;
          margin: 0;
          color: white;
        }

        .sidebar-subtitle {
          font-size: 0.75rem;
          color: #94a3b8;
          margin: 0;
        }

        .sidebar-content {
          padding: 1rem 0;
        }

        .menu-section {
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0 1rem;
          margin-bottom: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: #cbd5e1;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
          border-left: 3px solid transparent;
        }

        .nav-item:hover {
          background: #334155;
          color: white;
          border-left-color: #3b82f6;
        }

        .nav-item.active {
          background: #1e40af;
          color: white;
          border-left-color: #60a5fa;
        }

        .nav-icon {
          flex-shrink: 0;
          opacity: 0.8;
        }

        .nav-text {
          flex: 1;
        }

        .nav-title {
          font-size: 0.875rem;
          font-weight: 500;
          margin: 0;
        }

        .nav-description {
          font-size: 0.75rem;
          opacity: 0.7;
          margin: 0;
          line-height: 1.2;
        }

        .nav-arrow {
          width: 1rem;
          height: 1rem;
          opacity: 0.5;
        }

        .main-content {
          flex: 1;
          margin-left: 280px;
          padding: 2rem;
        }

        .life-quote-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          padding: 2rem;
          color: white;
          text-align: center;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }

        .quote-icon {
          width: 4rem;
          height: 4rem;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }

        .quote-text {
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.6;
          margin: 0 0 1rem 0;
          font-style: italic;
        }

        .quote-author {
          font-size: 0.875rem;
          opacity: 0.9;
          margin: 0;
        }

        .empty-state {
          text-align: center;
          color: #6b7280;
          padding: 3rem;
        }

        .empty-icon {
          width: 4rem;
          height: 4rem;
          margin: 0 auto 1rem;
          opacity: 0.3;
        }

        .empty-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }

        .empty-description {
          margin: 0;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(8px);
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translate(-50%, -60%) scale(0.9);
          }
          to { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .modal-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 16px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          width: 90%;
          max-width: 420px;
          overflow: hidden;
          animation: slideIn 0.3s ease-out;
        }

        .modal-header {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          padding: 2rem;
          text-align: center;
          position: relative;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: background 0.2s;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .modal-icon {
          width: 4rem;
          height: 4rem;
          margin: 0 auto 1rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }

        .modal-subtitle {
          opacity: 0.9;
          font-size: 0.875rem;
          margin: 0;
        }

        .modal-body {
          padding: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s;
          text-align: center;
          letter-spacing: 0.1em;
          font-weight: 600;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .verify-button {
          width: 100%;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .verify-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
        }

        .verify-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          width: 1rem;
          height: 1rem;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .security-notice {
          background: #f3f4f6;
          border-radius: 8px;
          padding: 1rem;
          margin-top: 1rem;
          font-size: 0.875rem;
          color: #6b7280;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            position: relative;
            height: auto;
          }
          
          .main-content {
            margin-left: 0;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="dashboard-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-header-content">
              <div className="sidebar-header-icon">
                <Building2 size={20} />
              </div>
              <div>
                <h2 className="sidebar-title">Administration</h2>
                <p className="sidebar-subtitle">System Management Portal</p>
              </div>
            </div>
          </div>

          <div className="sidebar-content">
            {menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="menu-section">
                <div className="section-title">{section.title}</div>
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-item ${isActive ? "active" : ""}`
                    }
                    onClick={(e) => handleItemClick(item.path, e)}
                  >
                    <div className="nav-icon">{item.icon}</div>
                    <div className="nav-text">
                      <div className="nav-title">{item.title}</div>
                      <div className="nav-description">{item.description}</div>
                    </div>
                    <ChevronRight className="nav-arrow" />
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
        

          {/* Life Quote Section */}
          <div className="life-quote-section">
            <div className="quote-icon">
              <BookOpen size={24} />
            </div>
            <p className="quote-text">
              "Education is the most powerful weapon which you can use to change the world. 
              Every student who enters our halls carries within them the potential to transform 
              not just their own life, but the lives of countless others."
            </p>
            <p className="quote-author">
              — Inspired by Nelson Mandela
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Verification Modal */}
      {showVerify && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <button 
                className="modal-close" 
                onClick={handleCloseModal}
                disabled={isVerifying}
              >
                <X size={20} />
              </button>
              <div className="modal-icon">
                <Shield size={32} />
              </div>
              <h2 className="modal-title">Security Verification</h2>
              <p className="modal-subtitle">
                Enter the verification code sent to your email
              </p>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Verification Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="form-input"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  disabled={isVerifying}
                  autoFocus
                />
              </div>
              
              <button
                onClick={handleVerify}
                disabled={!code.trim() || isVerifying}
                className="verify-button"
              >
                {isVerifying ? (
                  <>
                    <div className="spinner"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield size={16} />
                    Verify & Continue
                  </>
                )}
              </button>
              
              <div className="security-notice">
                <Lock size={14} />
                This is a secure area. Your access is being monitored.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dsocsa;
