import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  PlusCircle,
  MessageSquare,
  BookOpen,
  Settings,
  ChevronRight,
  Building2
} from "lucide-react";

const AdminMenu = () => {
  const [activeItem, setActiveItem] = useState("/dashboard/admin");

  const menuSections = [
    {
      title: "Overview",
      items: [
        {
          path: "/dashboard",
          icon: <LayoutDashboard />,
          title: "Dashboard",
          description: "Main control center",
        }
      ]
    },
    {
      title: "Acadmin",
      items: [
        {
          path: "/dashboard/admin/Dsocsa",
          icon: <LayoutDashboard />,
          title: "Socsa",
          description: "Every thing Related to Acadmin",
        }
      ]
    },
    {
      title: "Creation System",
      items: [
        {
          path: "/dashboard/admin/create-product",
          icon: <PlusCircle />,
          title: "Create New Event",
          description: "Create New Only Approved Event's",
        },
        {
          path: "/dashboard/admin/product",
          icon: <Package />,
          title: "All Event's",
          description: "Those Events who are already Approved",
        },
      ]
    },
    {
      title: "Management",
      items: [
        {
          path: "/dashboard/admin/community-member",
          icon: <Users />,
          title: "Community Member",
          description: "Thode member who want to join our association",
        },
        {
          path: "/dashboard/admin/feedback-management",
          icon: <MessageSquare />,
          title: "Feedback System",
          description: "Check and Solve the Problem Of student's",
        },
      ]
    },
    {
      title: "Communications & Development",
      items: [
        {
          path: "/dashboard/admin/skills",
          icon: <BookOpen />,
          title: "Student Skills",
          description: "List of the skills which is fill by student's",
        },
        {
          path: "/dashboard/admin/sponser",
          icon: <BookOpen />,
          title: "All Sponser's",
          description: "All Approved Sponsers Data",
        },
        {
          path: "/dashboard/admin/all-registrations",
          icon: <Building2 />,
          title: "All Registration",
          description: "Registration for Indivisual and Grop Event's",
        },
        {
          path: "/dashboard/admin/response",
          icon: <Building2 />,
          title: "Response's",
          description: "department funds Approved by Treasurer",
        },
        {
          path: "/dashboard/admin/participent",
          icon: <Building2 />,
          title: "Participent",
          description: "Data of Privious Participent",
        },
      ]
    },
  ];

  const handleItemClick = (path) => {
    setActiveItem(path);
  };

  return (
    <>
      <style>{`
        .institutional-menu {
          width: 100%;
          height: 100%;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow: hidden;
        }

        .menu-content {
          flex: 1;
          padding: 0;
          overflow: visible;
          background: #ffffff;
        }

        .menu-content::-webkit-scrollbar {
          width: 6px;
        }

        .menu-content::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .menu-content::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .menu-section {
          margin-bottom: 4px;
        }

        .section-header {
          padding: 16px 20px 10px 20px;
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: #f8fafc;
          margin: 0;
        }

        .section-items {
          background: white;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 14px 20px;
          text-decoration: none;
          color: #475569;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
          position: relative;
          cursor: pointer;
        }

        .nav-item:hover {
          background: #f8fafc;
          color: #1e293b;
          border-left-color: #e2e8f0;
        }

        .nav-item.active {
          background: #eff6ff;
          color: #1d4ed8;
          border-left-color: #3b82f6;
          font-weight: 600;
        }

        .nav-item.active::after {
          content: '';
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 4px;
          background: #3b82f6;
          border-radius: 50%;
        }

        .nav-icon {
          width: 18px;
          height: 18px;
          margin-right: 14px;
          flex-shrink: 0;
        }

        .nav-content {
          flex: 1;
          min-width: 0;
        }

        .nav-title {
          font-size: 14px;
          font-weight: 500;
          margin: 0 0 2px 0;
          line-height: 1.4;
        }

        .nav-description {
          font-size: 12px;
          color: #64748b;
          margin: 0;
          line-height: 1.3;
        }

        .nav-item.active .nav-description {
          color: #3730a3;
        }

        .nav-arrow {
          width: 16px;
          height: 16px;
          color: #cbd5e1;
          transition: all 0.2s ease;
          opacity: 0;
        }

        .nav-item:hover .nav-arrow {
          opacity: 1;
          color: #64748b;
          transform: translateX(2px);
        }

        .nav-item.active .nav-arrow {
          opacity: 1;
          color: #3b82f6;
        }
      `}</style>

      <div className="institutional-menu">
        {/* Navigation Sections */}
        <div className="menu-content">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="menu-section">
              <div className="section-header">
                {section.title}
              </div>
              <div className="section-items">
                {section.items.map((item, itemIndex) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-item ${isActive ? 'active' : ''}`
                    }
                    onClick={() => handleItemClick(item.path)}
                  >
                    <div className="nav-icon">
                      {item.icon}
                    </div>
                    <div className="nav-content">
                      <div className="nav-title">{item.title}</div>
                      <div className="nav-description">{item.description}</div>
                    </div>
                    <ChevronRight className="nav-arrow" />
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
