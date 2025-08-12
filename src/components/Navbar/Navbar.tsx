'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { LogIn } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/me', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setUser(null);
      }
    }

    fetchUser();
  }, [pathname]); // <-- Re-fetch user info every time the route changes

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setUser(null);
    router.refresh(); // refresh server components (optional)
    router.push('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Desktop/Tablet Navbar */}
      <nav className="navbar desktop-navbar">
        <div className="nav-container">
          <Link href="/" className="nav-logo" onClick={closeMenu}>
            Handcrafted Haven
          </Link>

          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}
            ></span>
            <span
              className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}
            ></span>
            <span
              className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}
            ></span>
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
              href="/cart"
              className={`nav-link cart-link ${pathname === '/cart' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="cart-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width={20}
                height={20}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h14M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
              {totalQuantity > 0 && (
                <span className="cart-count">{totalQuantity}</span>
              )}
              Cart
            </Link>

            {user ? (
              <div className="nav-account-dropdown">
                <button className="nav-link nav-account-button">
                  Account ▾
                </button>
                <div className="nav-account-menu">
                  <span className="nav-account-name">
                    Signed in as <strong>{user.name}</strong>
                  </span>
                  <hr className="nav-account-divider" />
                  <Link href="/account" className="nav-account-link">
                    My Account
                  </Link>
                  <button className="nav-account-logout" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className={`nav-link nav-login ${pathname === '/login' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <div className="nav-login-icon">
                  <LogIn />
                </div>
                <span className="nav-login-label">Login</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="mobile-bottom-navbar">
        <div className="mobile-nav-container">
          <Link
            href="/"
            className={`mobile-nav-item ${pathname === '/' ? 'active' : ''}`}
          >
            <div className="mobile-nav-icon">
              <img
                src="/icons/home_icon.svg"
                alt="Home"
                width="24"
                height="24"
              />
            </div>
            <span className="mobile-nav-label">Home</span>
          </Link>

          <Link
            href="/products"
            className={`mobile-nav-item ${pathname === '/products' ? 'active' : ''}`}
          >
            <div className="mobile-nav-icon">
              <img
                src="/icons/product_icon.svg"
                alt="Products"
                width="24"
                height="24"
              />
            </div>
            <span className="mobile-nav-label">Products</span>
          </Link>

          <Link
            href="/sellers"
            className={`mobile-nav-item ${pathname === '/sellers' ? 'active' : ''}`}
          >
            <div className="mobile-nav-icon">
              <img
                src="/icons/artisans_icon.svg"
                alt="Artisans"
                width="24"
                height="24"
              />
            </div>
            <span className="mobile-nav-label">Artisans</span>
          </Link>

          <Link
            href="/about"
            className={`mobile-nav-item ${pathname === '/about' ? 'active' : ''}`}
          >
            <span className="mobile-nav-label">About</span>
          </Link>
          <Link
            href="/cart"
            className={`mobile-nav-item ${pathname === '/cart' ? 'active' : ''}`}
          >
            <div className="mobile-nav-icon">
              {/* reuse same SVG icon or use img */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="cart-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width={24}
                height={24}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h14M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
            </div>
            {totalQuantity > 0 && (
              <span className="cart-count-mobile">{totalQuantity}</span>
            )}
            <span className="mobile-nav-label">Cart</span>
          </Link>

          {user ? (
            <div className="mobile-nav-item mobile-account-wrapper">
              <button
                className="mobile-account-button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <span className="mobile-nav-label">Account ▴</span>
              </button>

              {isMenuOpen && (
                <div className="mobile-account-menu">
                  <span className="mobile-account-name">
                    Signed in as <strong>{user.name}</strong>
                  </span>
                  <hr className="mobile-account-divider" />
                  <Link href="/account" className="mobile-account-link">
                    My Account
                  </Link>
                  <button className="mobile-account-logout" onClick={logout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className={`mobile-nav-item ${pathname === '/login' ? 'active' : ''}`}
            >
              <div className="mobile-nav-icon">
                <img
                  src="/icons/login_icon.svg"
                  alt="Login"
                  width="24"
                  height="24"
                />
              </div>
              <span className="mobile-nav-label">Login</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
