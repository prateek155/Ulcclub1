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
  Settings,
  Shield,
  X,
  Lock
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
      title: "Overview",
      items: [
        {
          path: "/dashboard/admin",
          icon: <LayoutDashboard />,
          title: "Dashboard",
          description: "Main control center",
        }
      ]
    },
    {
      title: "Department Management",
      items: [
        {
          path: "/association",
          icon: <PlusCircle />,
          title: "Association ",
          description: "Detail All Association Member's",
        },
        {
          path: "/dashboard/admin/Cr",
          icon: <Package />,
          title: "CR/LR",
          description: "Detail Of All Cr and Lr",
        },
        {
          path: "/dashboard/admin/faculty",
          icon: <ClipboardList />,
          title: "Faculty",
          description: "Faculty Detail's",
        }
      ]
    },
    {
      title: "Event Management",
      items: [
        {
          path: "/dashboard/admin/users",
          icon: <Users />,
          title: "Event Approval's",
          description: "Approved Events ",
        },
        {
          path: "/dashboard/admin/volunteer",
          icon: <Users />,
          title: "Volunteer",
          description: "Volunteer's Detail's",
        },
      ]
    },
    {
      title: "Communications",
      items: [
        {
          path: "/dashboard/admin/users",
          icon: <MessageSquare />,
          title: "User's Data",
          description: "All Registered Users Data",
        },
        {
          path: "/dashboard/admin/report",
          icon: <ClipboardList />,
          title: "Generate Report",
          description: "Generate Meeting Report Weekly & Other",
        },
        {
          path: "/dashboard/admin/latterhead",
          icon: <BookOpen />,
          title: "Latterhead",
          description: "Create Different Type of Latterhead Accoding To your Demand",
        }
      ]
    },
    {
      title: "Resources",
      items: [
        {
          path: "/dashboard/admin/action",
          icon: <BookOpen />,
          title: "Action's",
          description: "Take action of any student",
        },
        {
          path: "/dashboard/admin/confidential",
          icon: <Lock />,
          title: "Confidential Files",
          description: "OTP protected access",
        }
      ]
    }
  ];

  return (
    <>
      <style>{`
        .institutional-menu {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
        }

        .institutional-header {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-icon {
          color: #4f46e5;
          width: 3rem;
          height: 3rem;
        }

        .header-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .header-subtitle {
          color: #6b7280;
          margin: 0.25rem 0 0 0;
        }

        .menu-content {
          display: grid;
          gap: 2rem;
        }

        .menu-section {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }

        .section-header {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          padding: 1rem 2rem;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .section-items {
          padding: 1rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 8px;
          text-decoration: none;
          color: #374151;
          transition: all 0.3s ease;
          margin-bottom: 0.5rem;
        }

        .nav-item:hover {
          background: #f3f4f6;
          transform: translateX(4px);
        }

        .nav-item.active {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
        }

        .nav-icon {
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #f3f4f6;
          flex-shrink: 0;
        }

        .nav-item.active .nav-icon {
          background: rgba(255,255,255,0.2);
        }

        .nav-content {
          flex: 1;
        }

        .nav-title {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .nav-description {
          font-size: 0.875rem;
          opacity: 0.7;
        }

        .nav-arrow {
          width: 1.25rem;
          height: 1.25rem;
          opacity: 0.5;
        }

        .footer-section {
          margin-top: 2rem;
          background: white;
          border-radius: 12px;
          padding: 1.5rem 2rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }

        .footer-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #6b7280;
          font-weight: 500;
        }

        .footer-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        /* Enhanced Modal Styles */
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
        }
      `}</style>

      <div className="institutional-menu">
        {/* Header */}
        <div className="institutional-header">
          <div className="header-content">
            <Building2 className="header-icon" />
            <div>
              <h2 className="header-title">Administration</h2>
              <p className="header-subtitle">System Management Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="menu-content">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="menu-section">
              <div className="section-header">{section.title}</div>
              <div className="section-items">
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
                    <div className="nav-content">
                      <div className="nav-title">{item.title}</div>
                      <div className="nav-description">
                        {item.description}
                      </div>
                    </div>
                    <ChevronRight className="nav-arrow" />
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="footer-section">
          <div className="footer-item">
            <Settings className="footer-icon" />
            <span>System Configuration</span>
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
                <Lock size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
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
