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

  const navigate = useNavigate();
  const location = useLocation();

  /* ---------------- Digital rain background ---------------- */
  useEffect(() => {
    const chars = "0123456789ABCDEF";
    const generateRain = () => {
      const drops = Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        char: chars[Math.floor(Math.random() * chars.length)],
        x: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      }));
      setDigitalRain(drops);
    };
    generateRain();
    const interval = setInterval(generateRain, 3000);
    return () => clearInterval(interval);
  }, []);

  /* ---------------- Lock logic ---------------- */
  useEffect(() => {
    const lockTime = localStorage.getItem("lockTime");
    if (!lockTime) return;

    const check = () => {
      const diff = lockTime - Date.now();
      if (diff <= 0) {
        setIsLocked(false);
        localStorage.removeItem("lockTime");
        localStorage.removeItem("failedAttempts");
      } else {
        setIsLocked(true);
        setRemainingTime(Math.floor(diff / 1000));
      }
    };

    check();
    const timer = setInterval(check, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  /* ---------------- Submit ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) return toast.error("Account temporarily locked");

    const failed = Number(localStorage.getItem("failedAttempts")) || 0;

    try {
      const res = await axios.post(
        "https://ulcclub1.onrender.com/api/v1/auth/login",
        { email, password }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        localStorage.removeItem("failedAttempts");
        localStorage.removeItem("lockTime");
        navigate(location.state || "/");
      } else {
        const next = failed + 1;
        localStorage.setItem("failedAttempts", next);
        toast.error(res.data.message);

        if (next >= MAX_ATTEMPTS) {
          localStorage.setItem("lockTime", Date.now() + LOCK_DURATION);
          setIsLocked(true);
          setRemainingTime(LOCK_DURATION / 1000);
          toast.error("Too many attempts. Locked for 30 seconds.");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Try again.");
    }
  };

  return (
    <Layout title="Secure Login">
      <ToastContainer position="top-right" />

      <div className="login-safe-area">
        <div className="login-container">
          {/* Digital rain */}
          {digitalRain.map((d) => (
            <span
              key={d.id}
              className="rain"
              style={{
                left: `${d.x}%`,
                animationDuration: `${d.duration}s`,
                animationDelay: `${d.delay}s`,
              }}
            >
              {d.char}
            </span>
          ))}

          {/* Login panel */}
          <div className="login-panel">
            <h1 className="login-title">SECURE ACCESS</h1>
            <p className="login-subtitle">Ulc Club Security Portal</p>

            {isLocked && (
              <div className="lock-warning">
                ACCOUNT LOCKED — TRY AGAIN IN {formatTime(remainingTime)}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="email"
                placeholder="Security ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLocked}
                required
              />

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Access Code"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLocked}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/forgot-password")}
                disabled={isLocked}
              >
                Reset Access Code
              </button>

              <button type="submit" className="primary-btn" disabled={isLocked}>
                {isLocked ? "ACCESS DENIED" : "GRANT ACCESS"}
              </button>

              {/* Guidelines (footer-safe height) */}
              <div className="login-guidelines">
                <ul>
                  <li>Use your registered email ID only.</li>
                  <li>Never share your access credentials.</li>
                  <li>Three failed attempts will lock your account.</li>
                  <li>Logout after using a shared device.</li>
                  <li>Contact admin if login issues persist.</li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ---------- Inline CSS (safe + mobile friendly) ---------- */}
      <style>{`
        .login-safe-area {
          min-height: calc(100vh - 120px);
          padding-bottom: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-container {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .rain {
          position: absolute;
          top: -10%;
          color: #00ff88;
          font-weight: bold;
          animation: fall linear infinite;
          opacity: 0.6;
        }

        @keyframes fall {
          to {
            transform: translateY(120vh);
          }
        }

        .login-panel {
          background: rgba(5, 10, 20, 0.9);
          border: 2px solid rgba(0, 255, 136, 0.2);
          padding: 28px;
          border-radius: 12px;
          width: 100%;
          max-width: 420px;
          z-index: 5;
        }

        .login-title {
          text-align: center;
          color: #00ff88;
          letter-spacing: 2px;
          margin-bottom: 6px;
        }

        .login-subtitle {
          text-align: center;
          color: #ffaa00;
          font-size: 12px;
          margin-bottom: 20px;
        }

        .lock-warning {
          background: rgba(255, 0, 0, 0.1);
          color: #ff9999;
          padding: 10px;
          border-radius: 6px;
          text-align: center;
          font-size: 12px;
          margin-bottom: 12px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .login-form input {
          padding: 12px;
          border-radius: 6px;
          background: transparent;
          border: 1px solid rgba(0, 255, 136, 0.3);
          color: #eafff2;
        }

        .password-wrapper {
          position: relative;
        }

        .password-wrapper button {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #00ff88;
          cursor: pointer;
        }

        .secondary-btn {
          background: transparent;
          border: 1px solid rgba(0, 255, 136, 0.2);
          color: #9affc7;
          padding: 10px;
          border-radius: 6px;
        }

        .primary-btn {
          background: linear-gradient(90deg, #00ff88, #22c55e);
          color: #022c22;
          padding: 12px;
          border-radius: 8px;
          font-weight: bold;
        }

        .login-guidelines {
          margin-top: 16px;
          font-size: 12px;
          color: #9affc7;
          line-height: 1.6;
        }

        .login-guidelines ul {
          padding-left: 18px;
        }

        @media (max-height: 700px) {
          .login-panel {
            max-height: calc(100vh - 180px);
            overflow-y: auto;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Login;
