'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.css';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop/Tablet Navbar */}
      <nav className="navbar desktop-navbar">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            Handcrafted Haven
          </Link>
          
          <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          </button>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link 
              href="/" 
              className={`nav-link ${pathname === '/' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className={`nav-link ${pathname === '/products' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link 
              href="/sellers" 
              className={`nav-link ${pathname === '/sellers' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Artisans
            </Link>
            <Link 
              href="/about" 
              className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              href="/login" 
              className={`nav-link nav-login ${pathname === '/login' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="mobile-bottom-navbar">
        <div className="mobile-nav-container">
          <Link href="/" className={`mobile-nav-item ${pathname === '/' ? 'active' : ''}`}>
            <div className="mobile-nav-icon">
              <img src="/icons/home_icon.svg" alt="Home" width="24" height="24" />
            </div>
            <span className="mobile-nav-label">Home</span>
          </Link>
          
          <Link href="/products" className={`mobile-nav-item ${pathname === '/products' ? 'active' : ''}`}>
            <div className="mobile-nav-icon">
              <img src="/icons/product_icon.svg" alt="Products" width="24" height="24" />
            </div>
            <span className="mobile-nav-label">Products</span>
          </Link>
          
          <Link href="/sellers" className={`mobile-nav-item ${pathname === '/sellers' ? 'active' : ''}`}>
            <div className="mobile-nav-icon">
              <img src="/icons/artisans_icon.svg" alt="Artisans" width="24" height="24" />
            </div>
            <span className="mobile-nav-label">Artisans</span>
          </Link>
          
          <Link href="/about" className={`mobile-nav-item ${pathname === '/about' ? 'active' : ''}`}>
            <div className="mobile-nav-icon">
              <img src="/icons/about_icon.svg" alt="About" width="24" height="24" />
            </div>
            <span className="mobile-nav-label">About</span>
          </Link>
          
          <Link href="/login" className={`mobile-nav-item ${pathname === '/login' ? 'active' : ''}`}>
            <div className="mobile-nav-icon">
              <img src="/icons/login_icon.svg" alt="Login" width="24" height="24" />
            </div>
            <span className="mobile-nav-label">Login</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
