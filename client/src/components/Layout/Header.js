import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    toast.success('Logout Successfully');
  };

  return (
    <>
      <ToastContainer />
      <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm py-2">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fs-4 " style={{ fontFamily: 'Satisfy' }} >
           <img
           src="/image/Ulcback.png"
           alt="ULC Logo"
           style={{ width: '60px', height: '40px', objectFit: 'contain' }}
           />
            ULC
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center gap-2">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Event" className="nav-link" >
                  Events
                </NavLink>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-capitalize"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth.user.name}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth.user.role === 1
                            ? 'admin'
                            : 'user'
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login" onClick={handleLogout} className="dropdown-item">
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
