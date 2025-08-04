'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './LoginPage.css';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  userType: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  userType?: string;
}

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    userType: 'buyer',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    console.log('Sending login data:', {
      email: formData.email,
      password: formData.password,
      isLogin,
      name: formData.name,
    });

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          isLogin,
          name: formData.name,
        }),
      });

      console.log('Response status:', response.status);

      const data = await response.json();

      console.log('Response data:', data);

      if (!response.ok) {
        alert(data.error || 'Something went wrong');
        setIsLoading(false);
        return;
      }

      if (isLogin) {
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          // alert('Login successful!');
          router.push('/');
          router.refresh();
        } else {
          // alert('Login succeeded but no token received');
        }
      } else {
        // alert('Registration successful!');
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      // alert('Login failed');
    }

    setIsLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      userType: 'buyer',
    });
    setErrors({});
  };

  return (
    <div className="login-page">
      {/* Header Section */}
      <div className="login-header">
        <div className="section-header">
          <h1 className="section-title">
            {isLogin ? 'Welcome Back' : 'Join Handcrafted Haven'}
          </h1>
          <p className="section-subtitle">
            {isLogin
              ? 'Sign in to your account to continue shopping'
              : 'Create an account to start buying or selling handcrafted items'}
          </p>
        </div>
      </div>

      <div className="login-container">
        <div className="login-form-container">
          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            {!isLogin && (
              <>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <span className="error-message">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="userType">Account Type</label>
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    className="user-type-select"
                  >
                    <option value="buyer">
                      Buyer - I want to purchase handcrafted items
                    </option>
                    <option value="seller">
                      Seller - I want to sell my handcrafted items
                    </option>
                  </select>
                </div>
              </>
            )}

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading
                ? 'Please wait...'
                : isLogin
                  ? 'Sign In'
                  : 'Create Account'}
            </button>
          </form>

          <div className="login-footer">
            <p>
              {isLogin
                ? "Don't have an account? "
                : 'Already have an account? '}
              <button
                type="button"
                onClick={toggleMode}
                className="toggle-mode-btn"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>

            {isLogin && (
              <p>
                <Link href="/forgot-password" className="forgot-password-link">
                  Forgot your password?
                </Link>
              </p>
            )}
          </div>
        </div>

        <div className="login-features">
          <div className="feature">
            <div className="feature-icon">🛍️</div>
            <h3>Shop Unique Items</h3>
            <p>
              Discover one-of-a-kind handcrafted pieces from talented artisans
              around the world
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎨</div>
            <h3>Support Artisans</h3>
            <p>
              Directly support independent creators and help preserve
              traditional craftsmanship
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon">🌟</div>
            <h3>Quality Guaranteed</h3>
            <p>
              Every item is handmade with care, attention to detail, and premium
              materials
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
