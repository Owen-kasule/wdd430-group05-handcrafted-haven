'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { mockProducts } from '@/data/mockData';
import type { Product } from '@/types/definitions';
import './Homepage.css';

export default function Homepage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setFeaturedProducts(mockProducts.filter(product => product.featured));
  }, []);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'home-decor', label: 'Home Decor' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'textiles', label: 'Textiles' },
    { value: 'ceramics', label: 'Ceramics' },
    { value: 'woodwork', label: 'Woodwork' },
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover Unique Handcrafted Treasures</h1>
          <p className="hero-subtitle">
            Connect with talented artisans and bring their beautiful,
            one-of-a-kind creations into your home
          </p>
          <div className="hero-cta">
            <button className="cta-button primary">Shop Now</button>
            <button className="cta-button secondary">Become a Seller</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="/homepage-image/jug-porter.webp"
            alt="Handcrafted pottery"
          />
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="search-section">
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for handcrafted items..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-button">🔍</button>
          </div>
          <div className="filter-container">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="category-filter"
              aria-label="Filter by category"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">
            Curated selections from our most talented artisans
          </p>
        </div>
        <div className="products-grid">
          {featuredProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=300"
              alt="Ceramics"
            />
            <div className="category-overlay">
              <h3>Ceramics & Pottery</h3>
              <p>Beautiful handcrafted ceramic pieces</p>
            </div>
          </div>
          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300"
              alt="Jewelry"
            />
            <div className="category-overlay">
              <h3>Jewelry</h3>
              <p>Unique handmade jewelry pieces</p>
            </div>
          </div>
          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300"
              alt="Textiles"
            />
            <div className="category-overlay">
              <h3>Textiles</h3>
              <p>Handwoven fabrics and textiles</p>
            </div>
          </div>
          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300"
              alt="Woodwork"
            />
            <div className="category-overlay">
              <h3>Woodwork</h3>
              <p>Expertly crafted wooden items</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="benefits-section">
        <h2 className="section-title">Why Choose Handcrafted Haven?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🎨</div>
            <h3>Authentic Craftsmanship</h3>
            <p>
              Every item is handmade by skilled artisans who pour their passion
              into each piece
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌍</div>
            <h3>Support Local Artists</h3>
            <p>
              Directly support independent artisans and help preserve
              traditional crafts
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">✨</div>
            <h3>Unique & One-of-a-Kind</h3>
            <p>
              Find truly unique pieces that can't be found in mass-produced
              stores
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📦</div>
            <h3>Secure & Fast Shipping</h3>
            <p>
              Your handcrafted treasures are carefully packaged and shipped with
              care
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Connected</h2>
          <p>
            Get updates on new artisans, featured products, and exclusive offers
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button type="submit">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
