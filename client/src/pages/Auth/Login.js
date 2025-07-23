import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AuthStyles.css";
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
  const navigate = useNavigate();
  const location = useLocation();

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
        // lock expired
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
      const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, {
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
          toast.error("Too many failed attempts. You are locked out for 5 minutes.");
          navigate("/");
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
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }

        .modern-login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
        }

        .modern-login-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          backdrop-filter: blur(10px);
        }

        .login-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
          padding: 48px 40px;
          width: 100%;
          max-width: 420px;
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .login-card:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
        }

        .login-title {
          font-size: 32px;
          font-weight: 700;
          color: #1a202c;
          text-align: center;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .login-subtitle {
          color: #718096;
          text-align: center;
          margin-bottom: 40px;
          font-size: 16px;
          font-weight: 400;
        }

        .form-group {
          margin-bottom: 24px;
          position: relative;
        }

        .password-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #a0aec0;
          transition: color 0.3s ease;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .password-toggle:hover {
          color: #667eea;
        }

        .password-toggle:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .eye-icon {
          width: 20px;
          height: 20px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
        }

        .form-input {
          width: 100%;
          padding: 16px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 500;
          color: #2d3748;
          background: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input:focus {
          border-color: #667eea;
          background: rgba(255, 255, 255, 1);
          box-shadow: 
            0 0 0 3px rgba(102, 126, 234, 0.1),
            0 4px 12px rgba(102, 126, 234, 0.15);
          transform: translateY(-2px);
        }

        .form-input:disabled {
          background-color: #f7fafc;
          color: #a0aec0;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .form-input::placeholder {
          color: #a0aec0;
          font-weight: 400;
        }

        .lockout-warning {
          background: linear-gradient(135deg, #fed7d7, #feb2b2);
          border: 2px solid #fc8181;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          text-align: center;
          animation: pulse 2s infinite;
        }

        .lockout-text {
          color: #c53030;
          font-weight: 600;
          margin: 0;
        }

        .lockout-timer {
          color: #e53e3e;
          font-size: 18px;
          font-weight: 700;
          margin-top: 8px;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .btn {
          width: 100%;
          padding: 16px 24px;
          border: none;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: none;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .btn:hover::before {
          left: 100%;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          margin-top: 12px;
        }

        .btn-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #5a67d8, #6b46c1);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.9);
          color: #667eea;
          border: 2px solid #e2e8f0;
          margin-bottom: 16px;
        }

        .btn-secondary:hover:not(:disabled) {
          background: rgba(102, 126, 234, 0.05);
          border-color: #667eea;
          transform: translateY(-1px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.15);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .floating-element {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .floating-element:nth-child(1) {
          width: 80px;
          height: 80px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-element:nth-child(2) {
          width: 60px;
          height: 60px;
          top: 70%;
          right: 10%;
          animation-delay: 2s;
        }

        .floating-element:nth-child(3) {
          width: 40px;
          height: 40px;
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 32px 24px;
            margin: 20px;
          }
          
          .login-title {
            font-size: 28px;
          }
          
          .form-input, .btn {
            padding: 14px 18px;
          }
        }
      `}</style>
      
      <Layout title="Login - M-Group app">
        <div className="modern-login-container">
          <div className="floating-elements">
            <div className="floating-element"></div>
            <div className="floating-element"></div>
            <div className="floating-element"></div>
          </div>
          
          <div className="login-card">
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
            
            <form onSubmit={handleSubmit}>
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">Sign in to your account</p>

              {isLocked && (
                <div className="lockout-warning">
                  <p className="lockout-text">Account temporarily locked</p>
                  <div className="lockout-timer">Try again in {formatTime(remainingTime)}</div>
                </div>
              )}

              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email address"
                  required
                  disabled={isLocked}
                />
              </div>

              <div className="form-group">
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    placeholder="Enter your password"
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
                className="btn btn-secondary"
                onClick={() => navigate("/forgot-password")}
                disabled={isLocked}
              >
                Forgot Password?
              </button>

              <button type="submit" className="btn btn-primary" disabled={isLocked}>
                {isLocked ? 'Account Locked' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;