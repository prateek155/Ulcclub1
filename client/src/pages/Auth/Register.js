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
      const res = await axios.post(`https://ulcclub1.onrender.com/api/v1/auth/register`, {
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

     <style>{`
/* ===== FULL SCREEN BACKGROUND (NO WHITE BORDER) ===== */
.modern-form-container {
  min-height: 100vh;
  width: 100vw;          /* 🔥 FULL WIDTH */
  margin: 0;
  padding: 0;            /* 🔥 REMOVE SIDE SPACE */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* subtle background shapes */
.modern-form-container::before {
  content: '';
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(circle at 20% 20%, rgba(255,255,255,0.04), transparent 15%),
    radial-gradient(circle at 80% 30%, rgba(255,255,255,0.03), transparent 15%),
    radial-gradient(circle at 40% 80%, rgba(255,255,255,0.03), transparent 15%);
  pointer-events: none;
}

/* ===== FORM WRAPPER (CENTERED CARD WIDTH) ===== */
.form-wrapper {
  width: 100%;
  max-width: 420px;      /* ✔ controls form width */
  padding: 24px 20px;    /* ✔ padding moved HERE */
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  z-index: 2;
}

/* ===== HEADER ===== */
.form-header {
  text-align: center;
  color: #fff;
  margin-bottom: 18px;
}

.form-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255,255,255,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
}

.form-title {
  font-size: 28px;
  font-weight: 700;
}

.form-subtitle {
  font-size: 15px;
  opacity: 0.85;
}

/* ===== FORM ===== */
.modern-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* ===== INPUTS ===== */
.input-wrapper {
  position: relative;
}

.modern-input {
  width: 100%;
  height: 54px;
  padding: 0 52px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.05);
  color: #fff;
  font-size: 15px;
}

.modern-input::placeholder {
  color: rgba(255,255,255,0.65);
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255,255,255,0.6);
}

.password-toggle {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255,255,255,0.7);
  cursor: pointer;
}

/* ===== BUTTON ===== */
.modern-submit-btn {
  height: 54px;
  border-radius: 12px;
  border: none;
  background: rgba(255,255,255,0.15);
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
}

/* ===== MOBILE ===== */
@media (max-width: 480px) {
  .form-wrapper {
    max-width: 100%;
    padding: 20px 16px;
  }
}

/* ===== TOAST ===== */
.Toastify__toast-container {
  z-index: 9999;
}
`}</style>


    </Layout>
  );
};

export default Register;
