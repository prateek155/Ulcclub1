import Layout from "../../components/Layout/Layout";
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import { Phone, Mail, User} from "lucide-react";
import React, { useEffect } from "react";

const Dashboard = () => {
  const [auth] = useAuth();
  useEffect(() => {
  }, []);

  return (
    <Layout title={"Dashboard"}>
      <div className="admin-dashboard">
        <div className="dashboard-container">
          <div className="sidebar-section">
            <UserMenu />
          </div>
          <div className="main-content">
            {/* Welcome Card */}
            <div className="welcome-card">
              <div className="welcome-icon">
                <User size={32} />
              </div>
              <div className="welcome-content">
                <h1>Welcome back, {auth?.user?.name}!</h1>
                <p>Manage your community and sponsors efficiently</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon email-icon">
                  <Mail size={20} />
                </div>
                <div className="stat-content">
                  <h3>Email Address</h3>
                  <p>{auth?.user?.email}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon phone-icon">
                  <Phone size={20} />
                </div>
                <div className="stat-content">
                  <h3>Contact</h3>
                  <p>{auth?.user?.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-dashboard {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .admin-dashboard::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
          pointer-events: none;
        }

        .dashboard-container {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .sidebar-section {
          position: sticky;
          top: 16px;
          height: fit-content;
        }

        .main-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Welcome Card */
        .welcome-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .welcome-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
        }

        .welcome-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .welcome-icon {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .welcome-content {
          flex: 1;
        }

        .welcome-content h1 {
          margin: 0 0 4px 0;
          font-size: 24px;
          font-weight: 700;
          color: #2d3748;
          line-height: 1.2;
        }

        .welcome-content p {
          margin: 0;
          color: #718096;
          font-size: 14px;
          line-height: 1.4;
        }

        .welcome-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          flex-shrink: 0;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .email-icon {
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .phone-icon {
          background: linear-gradient(135deg, #48bb78, #38a169);
        }

        .sponsors-icon {
          background: linear-gradient(135deg, #ed8936, #dd6b20);
        }

        .stat-content h3 {
          margin: 0 0 4px 0;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-content p {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          color: #2d3748;
          line-height: 1.2;
        }

        /* Sponsors Section */
        .sponsors-section {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .section-header {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-content h2 {
          margin: 0 0 4px 0;
          font-size: 20px;
          font-weight: 700;
        }

        .header-content p {
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
        }

        .sponsor-count {
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        /* Loading State */
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
          color: #6b7280;
        }

        .spinner {
          margin-bottom: 16px;
        }

        .spinner-ring {
          width: 32px;
          height: 32px;
          border: 3px solid #f3f4f6;
          border-top: 3px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Sponsors Grid */
        .sponsors-grid {
          padding: 24px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }

        .sponsor-card {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.4s ease;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .sponsor-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .card-image-container {
          position: relative;
          height: 160px;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .sponsor-card:hover .card-image {
          transform: scale(1.05);
        }

        .image-fallback {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #f7fafc, #edf2f7);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #a0aec0;
        }

        .image-fallback span {
          font-size: 12px;
          font-weight: 500;
        }

        .card-overlay {
          position: absolute;
          top: 12px;
          right: 12px;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease;
        }

        .sponsor-card:hover .card-overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .overlay-content {
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 6px 10px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .card-content {
          padding: 16px;
        }

        .card-title {
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: 700;
          color: #2d3748;
          line-height: 1.3;
        }

        .card-description {
          margin: 0 0 12px 0;
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sponsor-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
        }

        /* No Sponsors State */
        .no-sponsors {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 24px;
          color: #6b7280;
        }

        .no-data-icon {
          background: linear-gradient(135deg, #f7fafc, #edf2f7);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #a0aec0;
        }

        .no-sponsors h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
          color: #374151;
          font-weight: 600;
        }

        .no-sponsors p {
          margin: 0;
          font-size: 14px;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .sponsors-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          }
        }

        @media (max-width: 1024px) {
          .dashboard-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .sidebar-section {
            position: relative;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .admin-dashboard {
            padding: 12px;
          }

          .welcome-card {
            flex-direction: column;
            text-align: center;
            gap: 16px;
            padding: 20px;
          }

          .welcome-badge {
            align-self: center;
          }

          .section-header {
            flex-direction: column;
            gap: 12px;
            text-align: center;
            padding: 20px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .sponsors-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 16px;
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .sponsors-grid {
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 16px;
          }

          .card-image-container {
            height: 140px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Dashboard;
