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
  Settings
} from "lucide-react";

const Dsocsa = () => {
  const [activeItem, setActiveItem] = useState("/dashboard/admin");
  const [showVerify, setShowVerify] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  // ✅ Only one handleItemClick function (with OTP logic for confidential)
  const handleItemClick = async (path, e) => {
    setActiveItem(path);

    if (path === "/dashboard/admin/confidential") {
      e.preventDefault(); // stop normal navigation

      try {
        await axios.post("http://localhost:8080/api/v1/secure/send-otp");
        alert("Verification code sent to your email");
        setPendingPath(path);
        setShowVerify(true);
      } catch (err) {
        alert("Error sending verification code");
      }
    }
  };

  const handleVerify = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/secure/verify-otp",
        { code }
      );
      if (data.success) {
        setShowVerify(false);
        navigate(pendingPath); // go to confidential after OTP success
      } else {
        alert("Invalid verification code");
      }
    } catch {
      alert("Verification failed");
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
          icon: <BookOpen />,
          title: "Confidential Files",
          description: "OTP protected access",
        }
      ]
    }
  ];

  return (
    <>
      <style>{`
        /* ✅ your CSS stays same, not touching */
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
                    onClick={(e) => handleItemClick(item.path, e)} // ✅ pass event
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

      {/* Verification Modal */}
      {showVerify && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Enter Verification Code</h2>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="Enter code"
            />
            <button
              onClick={handleVerify}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Verify & Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Dsocsa;
