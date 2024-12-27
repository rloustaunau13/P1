import React from 'react';
import { Link } from 'react-router-dom';
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Bootstrap JavaScript (includes Popper.js)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {  useNavigate } from 'react-router-dom';


export const Navbar: React.FC = () => {


    const navigate = useNavigate();


    const handleLogout = () => {
        // Clear authentication token and other user data
        localStorage.removeItem('token');
        sessionStorage.clear();
    
        // Redirect to the login page
        navigate('/login');
      };




  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Reimbursement App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/new-reimbursement">
                New Reimbursement
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
