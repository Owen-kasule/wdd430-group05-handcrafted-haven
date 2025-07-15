import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          Handcrafted Haven
        </Link>
        <div className="nav-menu">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/products" className="nav-link">
            Products
          </Link>
          <Link href="/sellers" className="nav-link">
            Artisans
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/login" className="nav-link nav-login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
