import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setAuth({ ...auth, user: null, token: '' });
    localStorage.removeItem('auth');
    toast.success('Logout Successfully');
    navigate('/login');
  };

  const userInitial = auth?.user?.name
    ? auth.user.name.charAt(0).toUpperCase()
    : 'U';

  return (
    <>
      <ToastContainer />

      <style>
        {`
        .navbar-custom {
          position: sticky;
          top: 0;
          z-index: 999;
          background-color: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          padding: 0.45rem 0;
        }

        .navbar-brand-custom img {
          width: 60px;
          height: 40px;
          object-fit: contain;
          border-radius: 6px;
        }

        .nav-right {
          margin-left: auto;
          display: flex;
          align-items: center;
        }

        /* Profile icon */
        .profile-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid rgba(255,255,255,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
          color: #111;
          overflow: hidden;
          cursor: pointer;
        }

        .profile-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Dropdown */
        .dropdown-menu {
          border-radius: 10px;
          min-width: 160px;
        }

        .dropdown-item {
          font-weight: 600;
        }

        @media (max-width: 576px) {
          .profile-icon {
            width: 36px;
            height: 36px;
            font-size: 14px;
          }

          .navbar-brand-custom img {
            width: 48px;
            height: 34px;
          }
        }
        `}
      </style>

      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
        <div className="container-fluid">

          {/* LEFT SIDE: LOGO */}
          <Link to="/" className="navbar-brand navbar-brand-custom">
            <img src="/image/ulc1.jpg" alt="ULC Logo" />
          </Link>

          {/* RIGHT SIDE: ONLY PROFILE ICON (NO NAVBAR TOGGLER) */}
          <div className="nav-right">

            {/* NOT LOGGED IN → Register + Login in dropdown */}
            {!auth?.user ? (
              <div className="dropdown">
                <a
                  className="nav-link p-0"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="profile-icon">
                    {/* Default avatar icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                      fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </a>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li><NavLink to="/" className="dropdown-item">Home</NavLink></li>
                  <li><NavLink to="/register" className="dropdown-item">Register</NavLink></li>
                  <li><NavLink to="/login" className="dropdown-item">Login</NavLink></li>
                </ul>
              </div>

            ) : (
              /* LOGGED IN → Dashboard, About, Events, Logout */
              <div className="dropdown">
                <a
                  className="nav-link p-0"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="profile-icon" title={auth.user.name}>
                    {auth.user.photo ? (
                      <img src={auth.user.photo} alt="profile" />
                    ) : (
                      userInitial
                    )}
                  </div>
                </a>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <NavLink
                      to={`/dashboard/${auth.user.role === 1 ? 'admin' : 'user'}`}
                      className="dropdown-item"
                    >
                      Dashboard
                    </NavLink>
                  </li>

                  <li><NavLink to="/about" className="dropdown-item">About</NavLink></li>
                  <li><NavLink to="/Event" className="dropdown-item">Events</NavLink></li>

                  <li><hr className="dropdown-divider" /></li>

                  <li>
                    <a href="/" onClick={handleLogout} className="dropdown-item">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
