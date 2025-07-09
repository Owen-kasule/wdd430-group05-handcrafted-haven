import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Handcrafted Haven
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>
          <Link to="/sellers" className="nav-link">
            Artisans
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/login" className="nav-link nav-login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
