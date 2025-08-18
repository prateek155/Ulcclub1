import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  FolderPlus,
  PlusCircle,
  MessageSquare,
  ClipboardList,
  Landmark,
  BookOpen
} from "lucide-react";

const AdminMenu = () => {
  const menuItems = [
    {
      path: "/dashboard/admin",
      icon: <FolderPlus />,
      title: "Dashboard",
    },
    {
      path: "/dashboard/admin/Dsocsa",
      icon: <Landmark />,
      title: "Dsocsa",
    },
    {
      path: "/dashboard/admin/create-product",
      icon: <PlusCircle />,
      title: "Create New Event",
    },
    {
      path: "/dashboard/admin/product",
      icon: <Package />,
      title: "All Events",
    },
    {
      path: "/dashboard/admin/users",
      icon: <Users />,
      title: "Users detail",
    },
    {
      path: "/dashboard/admin/community-member",
      icon: <Users />,
      title: "Community Members",
    },
    {
      path: "/dashboard/admin/feedback-management",
      icon: <MessageSquare />,
      title: "Feedback Management",
    },
    {
      path: "/dashboard/admin/sponser",
      icon: <MessageSquare />,
      title: "All Sponser's",
    },
    {
      path: "/dashboard/admin/all-registrations",
      icon: <ClipboardList />,
      title: "All Registration's",
    },
    {
      path: "/dashboard/admin/response",
      icon: <ClipboardList />,
      title: "responses"
    },
    {
      path: "/dashboard/admin/skills",
      icon: <BookOpen />,
      title: "skills"

    },
    {
      path: "/dashboard/admin/participent",
      icon: <BookOpen />,
      title:"participent's"
    }
  ];

  return (
    <>
      <style>{`
        .admin-menu {
          width: 280px;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .admin-menu::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          backdrop-filter: blur(10px);
          z-index: 0;
        }

        .admin-menu > * {
          position: relative;
          z-index: 1;
        }

        .admin-header {
          padding: 32px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
        }

        .admin-header-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-header svg {
          width: 28px;
          height: 28px;
          color: white;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        .admin-header h2 {
          font-size: 22px;
          font-weight: 700;
          color: white;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          letter-spacing: -0.5px;
        }

        .admin-nav {
          flex: 1;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow-y: auto;
        }

        .admin-nav::-webkit-scrollbar {
          width: 4px;
        }

        .admin-nav::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        .admin-nav::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          border-radius: 16px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          font-size: 15px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .nav-link:hover::before {
          left: 100%;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .nav-link.active {
          background: rgba(255, 255, 255, 0.25);
          color: white;
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          font-weight: 600;
        }

        .nav-link svg {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }

        @media (max-width: 768px) {
          .admin-menu {
            width: 100%;
            height: auto;
            border-radius: 0;
          }
          
          .admin-header {
            padding: 20px 16px;
          }
          
          .admin-nav {
            padding: 16px 12px;
          }
          
          .nav-link {
            padding: 14px 16px;
            font-size: 14px;
          }
        }
      `}</style>

      <div className="admin-menu">
        {/* Header */}
        <div className="admin-header">
          <div className="admin-header-content">
            <LayoutDashboard />
            <h2>Admin Panel</h2>
          </div>
        </div>

        {/* Navigation */}
        <nav className="admin-nav">
          {menuItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default AdminMenu;
