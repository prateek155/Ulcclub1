import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/auth";

const MAX_ATTEMPTS = 3;
const LOCK_DURATION = 30 * 1000; // 30 seconds

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [auth, setAuth] = useAuth();
  const [isLocked, setIsLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [digitalRain, setDigitalRain] = useState([]);
  const [securityElements, setSecurityElements] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Generate digital rain effect & security elements
  useEffect(() => {
    const generateRainDrops = () => {
      const characters = "0123456789ABCDEF";
      const drops = [];
      for (let i = 0; i < 50; i++) {
        drops.push({
          id: i,
          char: characters[Math.floor(Math.random() * characters.length)],
          x: Math.random() * 100,
          animationDuration: Math.random() * 3 + 2,
          animationDelay: Math.random() * 2,
        });
      }
      setDigitalRain(drops);
    };

   

    generateRainDrops();
    const interval = setInterval(() => generateRainDrops(), 3000);
    return () => clearInterval(interval);
  }, []);

  // Lock/attempt logic from localStorage
  useEffect(() => {
    const lockTime = localStorage.getItem("lockTime");
    if (lockTime) {
      const timeLeft = parseInt(lockTime) - Date.now();
      if (timeLeft > 0) {
        setIsLocked(true);
        setRemainingTime(Math.floor(timeLeft / 1000));
        const interval = setInterval(() => {
          const newTimeLeft = parseInt(lockTime) - Date.now();
          if (newTimeLeft <= 0) {
            clearInterval(interval);
            setIsLocked(false);
            localStorage.removeItem("lockTime");
            localStorage.removeItem("failedAttempts");
          } else {
            setRemainingTime(Math.floor(newTimeLeft / 1000));
          }
        }, 1000);
        return () => clearInterval(interval);
      } else {
        localStorage.removeItem("lockTime");
        localStorage.removeItem("failedAttempts");
      }
    }
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) {
      toast.error("You are currently locked out. Please wait.");
      return;
    }
    const failedAttempts = parseInt(localStorage.getItem("failedAttempts")) || 0;
    try {
      const res = await axios.post(`https://ulcclub1.onrender.com/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        localStorage.removeItem("failedAttempts");
        localStorage.removeItem("lockTime");
        navigate(location.state || "/");
      } else {
        const newAttempts = failedAttempts + 1;
        localStorage.setItem("failedAttempts", newAttempts);
        toast.error(res.data.message);
        if (newAttempts >= MAX_ATTEMPTS) {
          const lockUntil = Date.now() + LOCK_DURATION;
          localStorage.setItem("lockTime", lockUntil.toString());
          setIsLocked(true);
          setRemainingTime(Math.floor(LOCK_DURATION / 1000));
          toast.error("Too many failed attempts. You are locked out for 30 seconds.");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {/* ---------- Page-level CSS: safe header + sticky footer + full-bleed ---------- */}
      <style>{`
        /* Reset & full-bleed roots */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; background: #0a0a0a; color: #fff; }
        body { overflow-x: hidden; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }

        /* Expose safe-area variables & header/footer sizes (fallbacks included) */
        :root{
          --safe-area-top: env(safe-area-inset-top, 18px);
          --header-visual: 56px;
          --header-total: calc(var(--header-visual) + var(--safe-area-top));
          --footer-height: 64px; /* adjust to match your Layout footer */
        }

        /* If your Layout uses different header selectors, these ensure safety */
        header, .header, .site-header, .main-header, .navbar, .topbar {
          padding-top: env(safe-area-inset-top, 18px);
          padding-top: constant(safe-area-inset-top, 18px);
          height: calc(var(--header-visual) + env(safe-area-inset-top, 18px));
          min-height: calc(var(--header-visual) + env(safe-area-inset-top, 18px));
          box-sizing: border-box;
          z-index: 9999;
        }

        /* Reserve space so header doesn't overlap content */
        .page-safe-area {
          padding-top: var(--header-total);
          padding-bottom: var(--footer-height);
          min-height: calc(100vh - var(--header-total));
          width: 100%;
          box-sizing: border-box;
        }

        /* Make footer sticky but non-intrusive (overridden by Layout footer if exists) */
        footer, .footer, .site-footer {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          height: var(--footer-height);
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #0f172a, #0b1220);
          color: #dbeafe;
          z-index: 9998;
          border-top: 1px solid rgba(255,255,255,0.03);
        }

        /* Login page container (centered panel) */
        .cybersecurity-login-container {
          min-height: calc(100vh - var(--header-total));
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        /* Digital rain + security elements */
        .digital-rain-container,
        .security-elements-container,
        .circuit-overlay,
        .hooded-figure {
          pointer-events: none;
        }

        .rain-drop {
          position: absolute;
          color: #00ff88;
          font-size: 18px;
          font-weight: 700;
          opacity: 0.75;
          text-shadow: 0 0 8px #00ff88;
          animation: rainFall linear infinite;
          z-index: 2;
        }

        @keyframes rainFall {
          0% { transform: translateY(-120vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(120vh); opacity: 0; }
        }

        .security-element.lock { animation: lockFloat 8s ease-in-out infinite; z-index: 3; color: #ffaa00; }
        .security-element.number { animation: numberFloat 6s ease-in-out infinite; z-index: 3; color: #00ff88; }
        @keyframes lockFloat { 0%,100%{transform:translateY(0);opacity:0.6;}50%{transform:translateY(-20px);opacity:1;} }
        @keyframes numberFloat { 0%,100%{transform:translateY(0);opacity:0.6;}50%{transform:translateY(-12px);opacity:0.95;} }

        .circuit-overlay{ position:absolute; inset:0; background-size:120px 120px; z-index:3; opacity:0.25; }
        .hooded-figure{ position:absolute; bottom:-50px; left:50%; transform:translateX(-50%); width:360px; height:420px; z-index:4; opacity:0.55; }

        /* Panel */
        .cyber-login-panel {
          width: 520px;
          max-width: 92vw;
          background: rgba(2,6,23,0.85);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(0,255,136,0.18);
          border-radius: 12px;
          position: relative;
          padding: 36px;
          z-index: 10;
          box-shadow:
            0 10px 40px rgba(2,8,20,0.6),
            inset 0 0 40px rgba(0, 255, 136, 0.02);
          transition: transform 0.18s ease;
        }

        .cyber-login-panel:focus-within { transform: translateY(-2px); }

        /* Header inside panel */
        .cyber-login-header { text-align: center; margin-bottom: 22px; }
        .cyber-title { font-size: 24px; color: #00ff88; letter-spacing: 3px; margin-bottom: 6px; font-weight:700; }
        .cyber-subtitle { font-size: 12px; color: #ffaa00; opacity:0.9; }

        .security-status { display:flex; justify-content:space-between; gap:12px; margin-bottom: 18px; color:#00ff88; font-size:12px; }

        .cyber-form { display:flex; flex-direction:column; gap:18px; }

        .cyber-input-field {
          width:100%;
          padding:12px 14px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(0,255,136,0.14);
          border-radius:6px;
          color:#d1ffd8;
          font-family: 'Courier New', monospace;
          transition: box-shadow .18s ease, border-color .18s ease;
        }
        .cyber-input-field:focus { outline:none; border-color: #00ff88; box-shadow: 0 0 18px rgba(0,255,136,0.08); background: rgba(0,255,136,0.02); }

        .password-input-wrapper{ position:relative; display:flex; align-items:center; }
        .password-toggle { position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; color:#00ff88; cursor:pointer; }

        .lockout-warning { background: rgba(255,68,68,0.08); border:1px solid #ff4444; padding:12px; border-radius:8px; color:#ff9b9b; font-weight:700; text-align:center; }

        .cyber-btn { padding:14px 16px; border-radius:8px; border:2px solid rgba(0,255,136,0.15); font-weight:700; letter-spacing:1.5px; cursor:pointer; background:transparent; color:#d1ffd8; }
        .cyber-btn-primary { border-color: #00ff88; background: linear-gradient(90deg, rgba(0,255,136,0.06), rgba(255,170,0,0.03)); }
        .cyber-btn:disabled { opacity:0.55; cursor:not-allowed; transform:none; box-shadow:none; }

        .warning-message { position: absolute; bottom: calc(var(--footer-height) + 18px); left: 50%; transform: translateX(-50%); font-size:11px; color:#ffb3b3; z-index: 15; }

        /* Responsive tweaks */
        @media (max-width: 600px) {
          .cyber-login-panel { padding: 22px; border-radius: 10px; width: 92vw; }
          .cyber-title { font-size: 20px; }
        }

        /* Small devices: ensure nothing is hidden under footer */
        @media (max-height: 720px) {
          .cyber-login-panel { max-height: calc(100vh - var(--header-total) - var(--footer-height) - 40px); overflow:auto; }
        }
      `}</style>

      {/* The Layout wrapper — page-safe-area class ensures content is below header + above footer */}
      <Layout title="Secure Login - M-Group Portal">
        <div className="page-safe-area">
          <div className="cybersecurity-login-container">
            {/* Background visual layers */}
            <div className="digital-rain-container">
              {digitalRain.map((drop) => (
                <div
                  key={drop.id}
                  className="rain-drop"
                  style={{
                    left: `${drop.x}%`,
                    animationDuration: `${drop.animationDuration}s`,
                    animationDelay: `${drop.animationDelay}s`,
                  }}
                >
                  {drop.char}
                </div>
              ))}
            </div>

            <div className="security-elements-container">
              {securityElements.map((element) => (
                <div
                  key={element.id}
                  className={`security-element ${element.type}`}
                  style={{
                    left: `${element.x}%`,
                    top: `${element.y}%`,
                    animationDelay: `${element.animationDelay}s`,
                    fontSize: element.fontSize ? `${element.fontSize}px` : undefined,
                  }}
                >
                  {element.content}
                </div>
              ))}
            </div>

            <div className="circuit-overlay" />
            <div className="hooded-figure" />

            {/* Login panel */}
            <div className="cyber-login-panel" role="main" aria-label="Secure Login Panel">
              {/* Panel corners */}
              <div className="panel-corner top-left" style={{ position: "absolute", top: -10, left: -10, width: 28, height: 28, border: "3px solid #ffaa00", borderRight: "none", borderBottom: "none" }} />
              <div className="panel-corner top-right" style={{ position: "absolute", top: -10, right: -10, width: 28, height: 28, border: "3px solid #ffaa00", borderLeft: "none", borderBottom: "none" }} />
              <div className="panel-corner bottom-left" style={{ position: "absolute", bottom: -10, left: -10, width: 28, height: 28, border: "3px solid #ffaa00", borderRight: "none", borderTop: "none" }} />
              <div className="panel-corner bottom-right" style={{ position: "absolute", bottom: -10, right: -10, width: 28, height: 28, border: "3px solid #ffaa00", borderLeft: "none", borderTop: "none" }} />

              {/* scan line */}
              <div style={{ position: "absolute", inset: "0 0 auto 0", height: 2, background: "linear-gradient(90deg, transparent, #00ff88, transparent)", animation: "scanMove 4s linear infinite", zIndex: 5 }} />

              <ToastContainer position="top-right" />

              <div className="cyber-login-header">
                <h1 className="cyber-title">SECURE ACCESS</h1>
                <p className="cyber-subtitle">M-GROUP SECURITY PORTAL v4.2</p>
              </div>

              <div className="security-status" aria-hidden>
                <div className="status-item"><div className="status-dot" style={{ width: 8, height: 8, borderRadius: 8, background: "#00ff88" }} /> <span>ENCRYPTED</span></div>
                <div className="status-item"><div className="status-dot" style={{ width: 8, height: 8, borderRadius: 8, background: "#00ff88" }} /> <span>SECURE</span></div>
                <div className="status-item"><div className="status-dot" style={{ width: 8, height: 8, borderRadius: 8, background: "#00ff88" }} /> <span>PROTECTED</span></div>
              </div>

              <form onSubmit={handleSubmit} className="cyber-form" aria-live="polite">
                {isLocked && (
                  <div className="lockout-warning" role="status">
                    <div className="lockout-text">ACCOUNT TEMPORARILY LOCKED</div>
                    <div className="lockout-timer">RETRY IN {formatTime(remainingTime)}</div>
                  </div>
                )}

                <div className="cyber-input-group">
                  <label className="cyber-input-label" style={{ color: "#00ff88", fontSize: 12, letterSpacing: 1 }}>Security ID</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="cyber-input-field"
                    placeholder="Enter your security identifier"
                    required
                    disabled={isLocked}
                    aria-label="security id"
                  />
                </div>

                <div className="cyber-input-group">
                  <label className="cyber-input-label" style={{ color: "#00ff88", fontSize: 12, letterSpacing: 1 }}>Access Code</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="cyber-input-field"
                      placeholder="Enter your access code"
                      required
                      disabled={isLocked}
                      aria-label="access code"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLocked}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="cyber-btn cyber-btn-secondary"
                  onClick={() => navigate("/forgot-password")}
                  disabled={isLocked}
                  aria-label="reset access code"
                >
                  Reset Access Code
                </button>

                <button type="submit" className="cyber-btn cyber-btn-primary" disabled={isLocked} aria-label="grant access">
                  {isLocked ? "ACCESS DENIED" : "GRANT ACCESS"}
                </button>
              </form>
            </div>

            
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
