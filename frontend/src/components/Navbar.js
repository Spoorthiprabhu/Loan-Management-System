import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'; // Assuming you will add a separate CSS file for navbar styling

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Loan Management System</div>

      <div>
        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        <Link to="/register" className="navbar-link">Register</Link>
        <Link to="/" className="navbar-link">Login</Link>
        <button onClick={handleLogout} className="navbar-button">Logout</button>
      </div>
    </nav>
  );
  }
  export default Navbar;
