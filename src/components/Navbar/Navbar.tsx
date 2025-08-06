'use client'; // This component uses client-side hooks like useState and usePathname.

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.css';

// CORRECT: Import the useCart hook (it's a function/value, so no 'type' keyword)
import { useCart } from '@/hooks/useCart';

// NEW: Import the BsCart4 icon from react-icons/bs
import { BsCart4 } from 'react-icons/bs';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get cart details from the useCart hook
  const { totalItems, totalPrice } = useCart();

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
            {/* Add Cart Link to Desktop Navbar - NOW USING BsCart4 */}
            <Link
              href="/cart"
              className={`nav-link nav-cart ${pathname === '/cart' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <BsCart4 size={20} style={{ marginRight: '5px' }} /> {/* Icon with a little spacing */}
              Cart ({totalItems}) - ${totalPrice.toFixed(2)}
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

          {/* Add Cart Link to Mobile Navbar - NOW USING BsCart4 */}
          <Link href="/cart" className={`mobile-nav-item mobile-nav-cart ${pathname === '/cart' ? 'active' : ''}`}>
            <div className="mobile-nav-icon">
              <BsCart4 size={24} /> {/* Use the React icon here */}
            </div>
            {/* Display total items. You might want to consider space limitations on mobile for totalPrice. */}
            <span className="mobile-nav-label">Cart ({totalItems})</span>
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