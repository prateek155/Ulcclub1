import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
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

  const navigate = useNavigate();
  const location = useLocation();

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    <Layout title="Login">
      <ToastContainer />
      <div className="modern-form-container">
        <div className="form-wrapper">
          <div className="form-header">
            <div className="form-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="11" width="18" height="10" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="16" r="1" fill="currentColor"/>
                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h2 className="form-title">Welcome Back</h2>
            <p className="form-subtitle">Sign in to your account</p>
          </div>

          {isLocked && (
            <div className="lock-warning">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
              </svg>
              <span>Account locked. Try again in {formatTime(remainingTime)}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="modern-form">
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="modern-input"
                  placeholder="Email Address"
                  disabled={isLocked}
                  required
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M22 7L13.03 12.7C12.71 12.89 12.36 13 12 13C11.64 13 11.29 12.89 10.97 12.7L2 7" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="modern-input"
                  placeholder="Password"
                  disabled={isLocked}
                  required
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="11" width="18" height="10" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <button 
                  type="button" 
                  className="password-toggle" 
                  onClick={togglePasswordVisibility}
                  disabled={isLocked}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="button"
              className="forgot-password-btn"
              onClick={() => navigate("/forgot-password")}
              disabled={isLocked}
            >
              Forgot Password?
            </button>

            <button type="submit" className="modern-submit-btn" disabled={isLocked}>
              <span>{isLocked ? "Account Locked" : "Sign In"}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Guidelines Section */}
            <div className="guidelines">
              <ul>
                <li>Use your registered email address to login.</li>
                <li>Never share your password with anyone.</li>
                <li>Three failed login attempts will lock your account for 30 seconds.</li>
                <li>Always logout after using a shared device.</li>
                <li>Contact admin if you experience persistent login issues.</li>
              </ul>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        /* ROOT & BACKGROUND */
        .modern-form-container {
          flex: 1; 
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow: hidden;
        }

        /* Subtle background shapes */
        .modern-form-container::before {
          content: '';
          position: absolute;
          top: -10%;
          left: -10%;
          width: 140%;
          height: 140%;
          background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.03), transparent 10%),
                      radial-gradient(circle at 80% 30%, rgba(255,255,255,0.02), transparent 12%),
                      radial-gradient(circle at 40% 80%, rgba(255,255,255,0.02), transparent 12%);
          pointer-events: none;
          z-index: 0;
          opacity: 0.8;
        }

        /* FORM WRAPPER */
        .form-wrapper {
          width: 100%;
          max-width: none;
          background: transparent;
          backdrop-filter: none;
          border-radius: 0;
          padding: 28px 20px;
          box-shadow: none;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        /* Header */
        .form-header {
          text-align: center;
          margin-bottom: 20px;
          color: #ffffff;
          z-index: 2;
        }

        .form-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px;
          color: white;
          box-shadow: none;
        }

        .form-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 6px;
          background: linear-gradient(135deg, #ffffff, rgba(255,255,255,0.9));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .form-subtitle {
          color: rgba(255,255,255,0.85);
          font-size: 15px;
          margin: 0;
        }

        /* Lock Warning */
        .lock-warning {
          width: 100%;
          max-width: 640px;
          background: rgba(255, 80, 80, 0.15);
          border: 1px solid rgba(255, 80, 80, 0.3);
          color: #fff;
          padding: 14px 16px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 12px;
          z-index: 2;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        /* Form layout */
        .modern-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
          width: 100%;
          max-width: 640px;
          z-index: 2;
        }

        .input-group { 
          position: relative; 
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        /* Inputs */
        .modern-input {
          width: 100%;
          height: 56px;
          padding: 0 56px 0 56px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          background: rgba(255,255,255,0.03);
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
          color: #fff;
          outline: none;
          backdrop-filter: blur(6px);
        }

        .modern-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .modern-input::placeholder {
          color: rgba(255,255,255,0.6);
          font-weight: 400;
        }

        .modern-input:focus {
          border-color: rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.04);
          box-shadow: 0 8px 20px rgba(0,0,0,0.25);
          transform: translateY(-2px);
        }

        .input-icon {
          position: absolute;
          left: 16px;
          color: rgba(255,255,255,0.6);
          z-index: 3;
          transition: color 0.22s ease;
        }

        .input-wrapper:focus-within .input-icon,
        .modern-input:focus + .input-icon {
          color: #ffffff;
        }

        .password-toggle {
          position: absolute;
          right: 16px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          z-index: 3;
          transition: all 0.2s ease;
        }

        .password-toggle:hover:not(:disabled) { 
          color: #fff; 
          background: rgba(255,255,255,0.03); 
        }

        .password-toggle:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Forgot Password Button */
        .forgot-password-btn {
          background: none;
          border: none;
          color: rgba(255,255,255,0.85);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          text-align: right;
          padding: 4px 0;
          transition: all 0.2s ease;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .forgot-password-btn:hover:not(:disabled) {
          color: #fff;
          text-decoration-color: #fff;
        }

        .forgot-password-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Submit button */
        .modern-submit-btn {
          height: 56px;
          width: 100%;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06));
          border: 1px solid rgba(255,255,255,0.16);
          color: #fff;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          z-index: 2;
        }

        .modern-submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.3);
        }

        .modern-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Guidelines */
        .guidelines {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 16px 20px;
          margin-top: 8px;
        }

        .guidelines ul {
          margin: 0;
          padding-left: 20px;
          color: rgba(255,255,255,0.85);
          font-size: 13px;
          line-height: 1.8;
        }

        .guidelines li {
          margin-bottom: 6px;
        }

        .guidelines li:last-child {
          margin-bottom: 0;
        }

        /* Small screens */
        @media (max-width: 480px) {
          .modern-form {
            max-width: 92vw;
          }
          
          .modern-input { 
            height: 52px; 
            font-size: 15px; 
            padding-left: 50px; 
            padding-right: 50px; 
          }
          
          .modern-submit-btn { 
            height: 52px; 
            font-size: 15px; 
          }
          
          .form-wrapper { 
            padding: 18px; 
            gap: 10px; 
          }

          .form-icon {
            width: 70px;
            height: 70px;
          }

          .form-title {
            font-size: 24px;
          }

          .guidelines {
            padding: 14px 16px;
          }

          .guidelines ul {
            font-size: 12px;
            padding-left: 18px;
          }
        }

        /* Entry animation */
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(18px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .form-wrapper { 
          animation: slideUp 0.5s cubic-bezier(0.4,0,0.2,1); 
        }

        /* Toast z-index */
        .Toastify__toast-container { 
          z-index: 9999; 
        }
      `}</style>
    </Layout>
  );
};

export default Login;
