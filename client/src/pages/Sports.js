import React, { useState, useEffect } from "react";
import {
  Play,
  Users,
  Trophy,
  Target,
  Zap,
  Heart,
  MessageCircle,
  UserPlus,
  ChevronRight,
} from "lucide-react";

const DPortSportsPage = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % sportsData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const sportsData = [
    {
      id: 1,
      name: "Football",
      icon: "⚽",
      description:
        "The beautiful game that unites millions worldwide. Experience the thrill of teamwork, strategy, and skill on the pitch.",
      participants: "22 players",
      difficulty: "Medium",
      gradient: "linear-gradient(to right, #34d399, #3b82f6)",
    },
    {
      id: 2,
      name: "Basketball",
      icon: "🏀",
      description:
        "Fast-paced action and incredible athleticism. Shoot for the stars and dominate the court with precision and teamwork.",
      participants: "10 players",
      difficulty: "Medium",
      gradient: "linear-gradient(to right, #fb923c, #ef4444)",
    },
    {
      id: 3,
      name: "Tennis",
      icon: "🎾",
      description:
        "Elegance meets power in this classic sport. Master your serve, perfect your backhand, and rule the court.",
      participants: "2-4 players",
      difficulty: "Hard",
      gradient: "linear-gradient(to right, #facc15, #22c55e)",
    },
    {
      id: 4,
      name: "Swimming",
      icon: "🏊",
      description:
        "Dive into excellence with every stroke. Build endurance, strength, and grace in the water.",
      participants: "Individual",
      difficulty: "Medium",
      gradient: "linear-gradient(to right, #3b82f6, #06b6d4)",
    },
    {
      id: 5,
      name: "Cricket",
      icon: "🏏",
      description:
        "A gentleman's game of strategy and skill. Experience the excitement of batting, bowling, and fielding.",
      participants: "22 players",
      difficulty: "Hard",
      gradient: "linear-gradient(to right, #f87171, #ec4899)",
    },
    {
      id: 6,
      name: "Athletics",
      icon: "🏃",
      description:
        "Push your limits and break barriers. Run faster, jump higher, and throw further than ever before.",
      participants: "Individual",
      difficulty: "Hard",
      gradient: "linear-gradient(to right, #8b5cf6, #6366f1)",
    },
  ];

  const handleWhatsAppJoin = () => {
    window.open(
      "https://wa.me/1234567890?text=Hi! I want to join DPort sports community",
      "_blank"
    );
  };

  const handleRegistration = () => {
    alert("Registration form would open here!");
  };

  return (
    <div className="page">
      {/* Background Bubbles */}
      <div className="bg-bubble purple"></div>
      <div className="bg-bubble cyan"></div>
      <div className="bg-bubble pink"></div>

      {/* Header */}
      <header className={`header ${isVisible ? "visible" : ""}`}>
        <div className="logo-circle">
          <Trophy className="icon" />
        </div>
        <h1 className="title">DPort</h1>
        <p className="subtitle">
          Where Champions Are Born. Join the ultimate sports community and
          unleash your potential.
        </p>
      </header>

      {/* Sports Cards */}
      <section className="sports-section">
        <div className="sports-grid">
          {sportsData.map((sport, index) => (
            <div
              key={sport.id}
              className={`card ${activeCard === index ? "active" : ""} ${
                isVisible ? "visible" : ""
              }`}
              style={{
                backgroundImage: sport.gradient,
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="card-content">
                <div className="card-top">
                  <span className="sport-icon">{sport.icon}</span>
                  <span className="tag">{sport.difficulty}</span>
                </div>
                <h3 className="card-title">{sport.name}</h3>
                <p className="card-text">{sport.description}</p>
                <div className="card-bottom">
                  <span className="participants">
                    <Users size={16} /> {sport.participants}
                  </span>
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat">
          <div className="stat-icon blue">
            <Users size={28} />
          </div>
          <h3 className="stat-number">10K+</h3>
          <p className="stat-label">Active Members</p>
        </div>
        <div className="stat">
          <div className="stat-icon green">
            <Trophy size={28} />
          </div>
          <h3 className="stat-number">500+</h3>
          <p className="stat-label">Tournaments</p>
        </div>
        <div className="stat">
          <div className="stat-icon pink">
            <Heart size={28} />
          </div>
          <h3 className="stat-number">99%</h3>
          <p className="stat-label">Satisfaction Rate</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2 className="cta-title">Ready to Join the Action?</h2>
        <p className="cta-subtitle">
          Connect with athletes, join tournaments, and be part of something
          amazing.
        </p>
        <div className="cta-buttons">
          <button className="btn whatsapp" onClick={handleWhatsAppJoin}>
            <MessageCircle size={20} /> Join WhatsApp Community
          </button>
          <button className="btn register" onClick={handleRegistration}>
            <UserPlus size={20} /> Register Now <Zap size={20} />
          </button>
        </div>
      </section>

      <footer className="footer">
        © 2024 DPort Sports Community. Empowering athletes worldwide.
      </footer>

      {/* CSS */}
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }
        .page {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e293b, #4c1d95, #1e293b);
          color: white;
          position: relative;
          overflow: hidden;
        }
        .bg-bubble {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.2;
          animation: float 6s infinite alternate;
        }
        .bg-bubble.purple {
          top: -100px; right: -100px;
          width: 200px; height: 200px;
          background: purple;
        }
        .bg-bubble.cyan {
          bottom: -100px; left: -100px;
          width: 200px; height: 200px;
          background: cyan;
        }
        .bg-bubble.pink {
          top: 50%; left: 50%;
          width: 150px; height: 150px;
          background: pink;
        }
        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(30px); }
        }

        .header {
          text-align: center;
          padding: 100px 20px 50px;
          opacity: 0;
          transform: translateY(-20px);
          transition: 1s ease;
        }
        .header.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .logo-circle {
          width: 80px; height: 80px;
          background: linear-gradient(to right, purple, pink);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 20px;
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0); }
          to { transform: rotate(360deg); }
        }
        .title {
          font-size: 3rem;
          background: linear-gradient(to right, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          color: transparent;
          margin-bottom: 10px;
        }
        .subtitle {
          color: #d1d5db;
          max-width: 600px;
          margin: 0 auto;
        }

        .sports-section {
          padding: 50px 20px;
        }
        .sports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .card {
          position: relative;
          background: rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 20px;
          transition: 0.5s;
          border: 1px solid rgba(255,255,255,0.2);
          opacity: 0;
          transform: translateY(20px);
        }
        .card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .card.active {
          box-shadow: 0 0 20px rgba(168,85,247,0.6);
        }
        .card-content {
          position: relative;
          z-index: 2;
        }
        .card-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }
        .sport-icon {
          font-size: 2rem;
        }
        .tag {
          background: rgba(255,255,255,0.2);
          padding: 5px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
        }
        .card-title {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }
        .card-text {
          color: #d1d5db;
          font-size: 0.9rem;
          margin-bottom: 15px;
        }
        .card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: #9ca3af;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          text-align: center;
          padding: 50px 20px;
        }
        .stat-icon {
          width: 60px; height: 60px;
          border-radius: 50%;
          display: flex; justify-content: center; align-items: center;
          margin: 0 auto 15px;
          transition: transform 0.3s;
        }
        .stat-icon.blue { background: linear-gradient(to right, blue, purple); }
        .stat-icon.green { background: linear-gradient(to right, green, blue); }
        .stat-icon.pink { background: linear-gradient(to right, pink, red); }
        .stat:hover .stat-icon { transform: scale(1.1); }
        .stat-number {
          font-size: 2rem;
          margin-bottom: 5px;
        }
        .stat-label {
          color: #9ca3af;
        }

        .cta {
          text-align: center;
          padding: 50px 20px;
        }
        .cta-title {
          font-size: 2rem;
          margin-bottom: 10px;
          background: linear-gradient(to right, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          color: transparent;
        }
        .cta-subtitle {
          margin-bottom: 30px;
          color: #d1d5db;
        }
        .cta-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }
        .btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: 30px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          color: white;
          transition: 0.3s;
        }
        .btn.whatsapp { background: linear-gradient(to right, #22c55e, #16a34a); }
        .btn.whatsapp:hover { transform: scale(1.05); }
        .btn.register { background: linear-gradient(to right, #a855f7, #ec4899); }
        .btn.register:hover { transform: scale(1.05); }

        .footer {
          text-align: center;
          padding: 20px;
          border-top: 1px solid rgba(255,255,255,0.2);
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default DPortSportsPage;
