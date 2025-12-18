import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://ulcclub1.onrender.com/api/v1/auth/register`,
        { name, email, password, phone, answer }
      );

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
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register">
      <ToastContainer />

      <div className="auth-page">
        <div className="auth-card">
          <h2>Create Account</h2>
          <p>Join us and start your journey</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <span className="error">{emailError}</span>}

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="What is your PRN?"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />

            <button type="submit">Create Account</button>
          </form>
        </div>
      </div>

      {/* PAGE-ONLY CSS */}
      <style>{`
        .auth-page {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          background: white;
          padding: 24px;
          border-radius: 12px;
          text-align: center;
        }

        .auth-card h2 {
          margin-bottom: 6px;
        }

        .auth-card p {
          margin-bottom: 20px;
          color: #666;
        }

        .auth-card input {
          width: 100%;
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .password-field {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .password-field button {
          background: none;
          border: none;
          cursor: pointer;
        }

        .auth-card button[type="submit"] {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: #667eea;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .error {
          color: red;
          font-size: 13px;
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </Layout>
  );
};

export default Register;
