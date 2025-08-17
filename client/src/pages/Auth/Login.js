import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/auth";

const MAX_ATTEMPTS = 3;
const LOCK_DURATION = 30 * 1000; // 30 seconds in milliseconds

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

  // Generate digital rain effect
  useEffect(() => {
    const generateRainDrops = () => {
      const characters = '0123456789ABCDEF';
      const drops = [];
      
      for (let i = 0; i < 50; i++) {
        drops.push({
          id: i,
          char: characters[Math.floor(Math.random() * characters.length)],
          x: Math.random() * 100,
          animationDuration: Math.random() * 3 + 2,
          animationDelay: Math.random() * 2
        });
      }
      setDigitalRain(drops);
    };

    const generateSecurityElements = () => {
      const symbols = ['🔒', '🛡️', '⚠️', '🔐', '🔑'];
      const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
      const elements = [];

      // Add security symbols
      for (let i = 0; i < 8; i++) {
        elements.push({
          id: `lock-${i}`,
          content: symbols[Math.floor(Math.random() * symbols.length)],
          x: Math.random() * 90,
          y: Math.random() * 80,
          animationDelay: Math.random() * 4,
          type: 'lock'
        });
      }

      // Add numbers
      for (let i = 0; i < 15; i++) {
        elements.push({
          id: `num-${i}`,
          content: numbers[Math.floor(Math.random() * numbers.length)],
          x: Math.random() * 95,
          y: Math.random() * 85,
          animationDelay: Math.random() * 6,
          type: 'number',
          fontSize: Math.random() * 20 + 15
        });
      }

      setSecurityElements(elements);
    };

    generateRainDrops();
    generateSecurityElements();

    const interval = setInterval(() => {
      generateRainDrops();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Courier New', monospace;
          background: linear-gradient(135deg, #0a0f1c 0%, #1a2332 50%, #0f1419 100%);
          overflow-x: hidden;
          min-height: 100vh;
        }

        .cybersecurity-login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        /* Digital rain background */
        .digital-rain-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .rain-drop {
          position: absolute;
          color: #00ff88;
          font-size: 18px;
          font-weight: bold;
          opacity: 0.7;
          text-shadow: 0 0 10px #00ff88;
          animation: rainFall linear infinite;
        }

        @keyframes rainFall {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        /* Security elements */
        .security-elements-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        .security-element {
          position: absolute;
          color: #ffaa00;
          opacity: 0.6;
          text-shadow: 0 0 15px #ffaa00;
        }

        .security-element.lock {
          font-size: 24px;
          animation: lockFloat 8s ease-in-out infinite;
        }

        .security-element.number {
          animation: numberFloat 6s ease-in-out infinite;
        }

        @keyframes lockFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-30px) scale(1.1);
            opacity: 1;
          }
        }

        @keyframes numberFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
            opacity: 0.9;
          }
        }

        /* Circuit overlay */
        .circuit-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(90deg, transparent 98%, rgba(0, 255, 136, 0.1) 100%),
            linear-gradient(transparent 98%, rgba(0, 255, 136, 0.1) 100%);
          background-size: 100px 100px;
          z-index: 3;
          animation: circuitPulse 8s ease-in-out infinite;
        }

        @keyframes circuitPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        /* Hooded figure silhouette */
        .hooded-figure {
          position: absolute;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 400px;
          height: 500px;
          background: radial-gradient(ellipse at center top, rgba(0, 255, 136, 0.1) 0%, transparent 70%);
          clip-path: polygon(
            40% 0%, 60% 0%, 
            65% 20%, 70% 40%, 
            80% 60%, 85% 80%, 
            90% 100%, 10% 100%, 
            15% 80%, 20% 60%, 
            30% 40%, 35% 20%
          );
          z-index: 4;
          animation: figureGlow 4s ease-in-out infinite;
        }

        @keyframes figureGlow {
          0%, 100% {
            background: radial-gradient(ellipse at center top, rgba(0, 255, 136, 0.1) 0%, transparent 70%);
          }
          50% {
            background: radial-gradient(ellipse at center top, rgba(0, 255, 136, 0.2) 0%, transparent 70%);
          }
        }

        /* Login panel */
        .cyber-login-panel {
          width: 450px;
          max-width: 90vw;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(15px);
          border: 2px solid rgba(0, 255, 136, 0.6);
          border-radius: 8px;
          position: relative;
          padding: 40px;
          z-index: 10;
          box-shadow: 
            0 0 50px rgba(0, 255, 136, 0.3),
            inset 0 0 50px rgba(0, 255, 136, 0.05);
          animation: panelGlow 3s ease-in-out infinite;
        }

        @keyframes panelGlow {
          0%, 100% {
            border-color: rgba(0, 255, 136, 0.6);
            box-shadow: 
              0 0 50px rgba(0, 255, 136, 0.3),
              inset 0 0 50px rgba(0, 255, 136, 0.05);
          }
          50% {
            border-color: rgba(0, 255, 136, 0.9);
            box-shadow: 
              0 0 70px rgba(0, 255, 136, 0.5),
              inset 0 0 70px rgba(0, 255, 136, 0.1);
          }
        }

        /* Panel corners */
        .panel-corner {
          position: absolute;
          width: 30px;
          height: 30px;
          border: 3px solid #ffaa00;
        }

        .panel-corner.top-left {
          top: -10px;
          left: -10px;
          border-right: none;
          border-bottom: none;
        }

        .panel-corner.top-right {
          top: -10px;
          right: -10px;
          border-left: none;
          border-bottom: none;
        }

        .panel-corner.bottom-left {
          bottom: -10px;
          left: -10px;
          border-right: none;
          border-top: none;
        }

        .panel-corner.bottom-right {
          bottom: -10px;
          right: -10px;
          border-left: none;
          border-top: none;
        }

        /* Scanning line */
        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00ff88, transparent);
          animation: scanMove 4s linear infinite;
        }

        @keyframes scanMove {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(400px); opacity: 0; }
        }

        /* Header styling */
        .cyber-login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .cyber-title {
          font-size: 26px;
          color: #00ff88;
          text-transform: uppercase;
          letter-spacing: 3px;
          text-shadow: 0 0 20px #00ff88;
          margin-bottom: 8px;
          animation: titleFlicker 2s ease-in-out infinite;
        }

        .cyber-subtitle {
          font-size: 12px;
          color: #ffaa00;
          letter-spacing: 2px;
          opacity: 0.8;
        }

        @keyframes titleFlicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        /* Security status */
        .security-status {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 30px;
          font-size: 10px;
          color: #00ff88;
        }

        .status-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00ff88;
          animation: statusBlink 1.5s infinite;
        }

        @keyframes statusBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Form styling */
        .cyber-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .cyber-input-group {
          position: relative;
        }

        .cyber-input-label {
          display: block;
          color: #00ff88;
          font-size: 12px;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .cyber-input-field {
          width: 100%;
          padding: 12px 15px;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(0, 255, 136, 0.5);
          border-radius: 4px;
          color: #00ff88;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
        }

        .cyber-input-field::placeholder {
          color: rgba(0, 255, 136, 0.4);
        }

        .cyber-input-field:focus {
          border-color: #00ff88;
          background: rgba(0, 255, 136, 0.05);
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);
        }

        .cyber-input-field:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Password toggle */
        .password-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-toggle {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #00ff88;
          transition: color 0.3s ease;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .password-toggle:hover {
          color: #44ff99;
        }

        .password-toggle:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .eye-icon {
          width: 18px;
          height: 18px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
        }

        /* Lockout warning */
        .lockout-warning {
          background: rgba(255, 68, 68, 0.1);
          border: 2px solid #ff4444;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
          text-align: center;
          animation: lockoutPulse 2s infinite;
        }

        .lockout-text {
          color: #ff4444;
          font-weight: 600;
          margin: 0;
          font-size: 14px;
        }

        .lockout-timer {
          color: #ff6666;
          font-size: 18px;
          font-weight: 700;
          margin-top: 8px;
        }

        @keyframes lockoutPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        /* Buttons */
        .cyber-btn {
          width: 100%;
          padding: 15px;
          border: 2px solid #00ff88;
          border-radius: 4px;
          color: #00ff88;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          background: transparent;
        }

        .cyber-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: buttonSweep 3s infinite;
        }

        @keyframes buttonSweep {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: -100%; }
        }

        .cyber-btn-primary {
          background: linear-gradient(45deg, rgba(0, 255, 136, 0.2) 0%, rgba(255, 170, 0, 0.2) 100%);
          margin-top: 10px;
        }

        .cyber-btn-primary:hover:not(:disabled) {
          background: linear-gradient(45deg, rgba(0, 255, 136, 0.4) 0%, rgba(255, 170, 0, 0.4) 100%);
          border-color: #44ff99;
          box-shadow: 0 0 25px rgba(0, 255, 136, 0.5);
          transform: translateY(-2px);
        }

        .cyber-btn-secondary {
          background: rgba(0, 0, 0, 0.3);
          margin-bottom: 16px;
        }

        .cyber-btn-secondary:hover:not(:disabled) {
          background: rgba(0, 255, 136, 0.1);
          border-color: #44ff99;
          transform: translateY(-1px);
        }

        .cyber-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }

        .cyber-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        /* Warning message */
        .warning-message {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px;
          color: #ff4444;
          text-align: center;
          z-index: 15;
          animation: warningBlink 2s infinite;
        }

        @keyframes warningBlink {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        /* Toast container styling */
        .Toastify__toast-container {
          font-family: 'Courier New', monospace;
        }

        .Toastify__toast--success {
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid #00ff88;
          color: #00ff88;
        }

        .Toastify__toast--error {
          background: rgba(255, 68, 68, 0.1);
          border: 1px solid #ff4444;
          color: #ff4444;
        }

        /* Responsive design */
        @media (max-width: 500px) {
          .cyber-login-panel {
            width: 350px;
            padding: 30px;
          }
          
          .cyber-title {
            font-size: 22px;
          }
          
          .cyber-input-field, .cyber-btn {
            padding: 12px;
          }
        }
      `}</style>
      
      <Layout title="Secure Login - M-Group Portal">
        <div className="cybersecurity-login-container">
          {/* Digital rain background */}
          <div className="digital-rain-container">
            {digitalRain.map((drop) => (
              <div
                key={drop.id}
                className="rain-drop"
                style={{
                  left: `${drop.x}%`,
                  animationDuration: `${drop.animationDuration}s`,
                  animationDelay: `${drop.animationDelay}s`
                }}
              >
                {drop.char}
              </div>
            ))}
          </div>

          {/* Security elements */}
          <div className="security-elements-container">
            {securityElements.map((element) => (
              <div
                key={element.id}
                className={`security-element ${element.type}`}
                style={{
                  left: `${element.x}%`,
                  top: `${element.y}%`,
                  animationDelay: `${element.animationDelay}s`,
                  fontSize: element.fontSize ? `${element.fontSize}px` : undefined
                }}
              >
                {element.content}
              </div>
            ))}
          </div>

          {/* Circuit overlay */}
          <div className="circuit-overlay"></div>

          {/* Hooded figure silhouette */}
          <div className="hooded-figure"></div>

          {/* Login panel */}
          <div className="cyber-login-panel">
            {/* Panel corners */}
            <div className="panel-corner top-left"></div>
            <div className="panel-corner top-right"></div>
            <div className="panel-corner bottom-left"></div>
            <div className="panel-corner bottom-right"></div>

            {/* Scanning line */}
            <div className="scan-line"></div>

            <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            {/* Header */}
            <div className="cyber-login-header">
              <h1 className="cyber-title">SECURE ACCESS</h1>
              <p className="cyber-subtitle">M-GROUP SECURITY PORTAL v4.2</p>
            </div>

            {/* Security status */}
            <div className="security-status">
              <div className="status-item">
                <div className="status-dot"></div>
                <span>ENCRYPTED</span>
              </div>
              <div className="status-item">
                <div className="status-dot"></div>
                <span>SECURE</span>
              </div>
              <div className="status-item">
                <div className="status-dot"></div>
                <span>PROTECTED</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="cyber-form">
              {isLocked && (
                <div className="lockout-warning">
                  <p className="lockout-text">ACCOUNT TEMPORARILY LOCKED</p>
                  <div className="lockout-timer">RETRY IN {formatTime(remainingTime)}</div>
                </div>
              )}

              <div className="cyber-input-group">
                <label className="cyber-input-label">Security ID</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cyber-input-field"
                  placeholder="Enter your security identifier"
                  required
                  disabled={isLocked}
                />
              </div>

              <div className="cyber-input-group">
                <label className="cyber-input-label">Access Code</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="cyber-input-field"
                    placeholder="Enter your access code"
                    required
                    disabled={isLocked}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLocked}
                  >
                    {showPassword ? (
                      <svg className="eye-icon" viewBox="0 0 24 24">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg className="eye-icon" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="cyber-btn cyber-btn-secondary"
                onClick={() => navigate("/forgot-password")}
                disabled={isLocked}
              >
                Reset Access Code
              </button>

              <button 
                type="submit" 
                className="cyber-btn cyber-btn-primary" 
                disabled={isLocked}
              >
                {isLocked ? 'ACCESS DENIED' : 'GRANT ACCESS'}
              </button>
            </form>
          </div>

          {/* Warning message */}
          <div className="warning-message">
            ⚠ UNAUTHORIZED ACCESS ATTEMPTS ARE MONITORED AND LOGGED ⚠
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
