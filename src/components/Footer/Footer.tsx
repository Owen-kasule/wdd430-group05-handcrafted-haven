import React from 'react';
import Link from 'next/link';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/sellers">Artisans</Link>
            <Link href="/about">About</Link>
            <Link href="/login">Login</Link>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Handcrafted Haven. All rights reserved.</p>
          <p>Developed by wdd430-group05</p>
        </div>
      </div>
    </footer>
  );
}
