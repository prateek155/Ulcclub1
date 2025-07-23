import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const [auth, setAuth] = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    setEmail(value);
    setEmailError(!regex.test(value) ? "Please enter a valid Gmail address." : "");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        answer,
      });

      if (res.data.success) {
        toast.success("Registered successfully!");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register">
      <ToastContainer />
      <div className="modern-form-container">
        <div className="form-wrapper">
          <div className="form-header">
            <div className="form-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                <path d="M12 14C7.03125 14 3 18.0312 3 23H21C21 18.0312 16.9688 14 12 14Z" fill="currentColor"/>
              </svg>
            </div>
            <h2 className="form-title">Create Account</h2>
            <p className="form-subtitle">Join us and start your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="modern-form">
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="modern-input"
                  placeholder="Full Name"
                  required
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 14C7.03125 14 3 18.0312 3 23H21C21 18.0312 16.9688 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`modern-input ${emailError ? 'error' : ''}`}
                  placeholder="Email Address"
                  required
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M22 7L13.03 12.7C12.71 12.89 12.36 13 12 13C11.64 13 11.29 12.89 10.97 12.7L2 7" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              {emailError && <div className="error-message">{emailError}</div>}
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="modern-input"
                  placeholder="Password"
                  required
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="11" width="18" height="10" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="modern-input"
                  placeholder="Phone Number"
                  required
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C10.93 21 3 13.07 3 3.08C3 2.48 3.48 2 4.08 2H7.08C7.68 2 8.16 2.48 8.16 3.08C8.16 4.08 8.35 5.03 8.7 5.92C8.89 6.4 8.75 6.96 8.35 7.35L6.35 9.35C7.97 12.69 11.31 16.03 14.65 17.65L16.65 15.65C17.04 15.26 17.6 15.11 18.08 15.3C18.97 15.65 19.92 15.84 20.92 15.84C21.52 15.84 22 16.32 22 16.92Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="modern-input"
                  placeholder="What is Your PRN?"
                  required
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 9C9 5.69 14.5 5.69 14.5 9C14.5 11.5 12 10.9 12 13.5" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="17" r="1" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </div>

            <button type="submit" className="modern-submit-btn">
              <span>Create Account</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .modern-form-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
        }

        .modern-form-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="white" stop-opacity="0.1"/><stop offset="100%" stop-color="white" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/><circle cx="400" cy="700" r="80" fill="url(%23a)"/><circle cx="900" cy="800" r="120" fill="url(%23a)"/></svg>');
          opacity: 0.5;
        }

        .form-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 40px;
          width: 100%;
          max-width: 450px;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          position: relative;
          z-index: 1;
        }

        .form-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .form-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: white;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .form-title {
          font-size: 28px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .form-subtitle {
          color: #718096;
          font-size: 16px;
          margin: 0;
        }

        .modern-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .input-group {
          position: relative;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .modern-input {
          width: 100%;
          height: 56px;
          padding: 0 56px 0 56px;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 500;
          background: #f8fafc;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #2d3748;
          outline: none;
        }

        .modern-input::placeholder {
          color: #a0aec0;
          font-weight: 400;
        }

        .modern-input:focus {
          border-color: #667eea;
          background: white;
          box-shadow: 
            0 0 0 4px rgba(102, 126, 234, 0.1),
            0 2px 8px rgba(0, 0, 0, 0.04);
          transform: translateY(-2px);
        }

        .modern-input.error {
          border-color: #e53e3e;
          background: #fed7d7;
        }

        .input-icon {
          position: absolute;
          left: 18px;
          color: #a0aec0;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .modern-input:focus + .input-icon,
        .input-wrapper:focus-within .input-icon {
          color: #667eea;
        }

        .password-toggle {
          position: absolute;
          right: 18px;
          background: none;
          border: none;
          color: #a0aec0;
          cursor: pointer;
          padding: 4px;
          border-radius: 8px;
          transition: all 0.3s ease;
          z-index: 1;
        }

        .password-toggle:hover {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        .error-message {
          color: #e53e3e;
          font-size: 14px;
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .error-message::before {
          content: '⚠';
          font-size: 12px;
        }

        .modern-submit-btn {
          height: 56px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 16px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 16px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .modern-submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .modern-submit-btn:hover::before {
          left: 100%;
        }

        .modern-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
        }

        .modern-submit-btn:active {
          transform: translateY(-1px);
        }

        .modern-submit-btn svg {
          transition: transform 0.3s ease;
        }

        .modern-submit-btn:hover svg {
          transform: translateX(4px);
        }

        @media (max-width: 480px) {
          .form-wrapper {
            padding: 32px 24px;
            margin: 16px;
          }
          
          .form-title {
            font-size: 24px;
          }
          
          .modern-input {
            height: 52px;
            font-size: 15px;
          }
          
          .modern-submit-btn {
            height: 52px;
            font-size: 15px;
          }
        }

        /* Animation for form appearance */
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-wrapper {
          animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Toast container styling */
        .Toastify__toast-container {
          z-index: 9999;
        }

        .Toastify__toast {
          border-radius: 12px;
          backdrop-filter: blur(20px);
        }

        .Toastify__toast--success {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        }

        .Toastify__toast--error {
          background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
        }
      `}</style>
    </Layout>
  );
};

export default Register;