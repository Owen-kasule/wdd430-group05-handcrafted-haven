'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { getProducts, getCategories } from '@/data/server-data';
import type { Product, Category } from '@/types/definitions';
import './Homepage.css';
import { useRouter } from 'next/navigation';
import { CardsSkeleton } from '@/components/skeletonLoader/skeleton';
import Link from 'Next/Link';

export default function Homepage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products and filter for featured
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { products } = await getProducts({ itemsPerPage: 100 });
        //Featured products filter
        const featured = products
          .filter(product => product.featured)
          .slice(0, 4);
        setFeaturedProducts(featured);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle search and filter submission
  const handleSearchSubmit = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);

    router.push(`/products?${params.toString()}`);
  };

  // Categories for dropdown
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map(category => ({
      value: category.id.toString(),
      label: category.name,
    })),
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
            <Link href="/products">
              <button className="cta-button primary">Shop Now</button>
            </Link>
            <Link href="/login">
              <button className="cta-button secondary">Become a Seller</button>
            </Link>
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
      {/* <section className="search-section">
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for handcrafted items..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearchSubmit()}
              className="search-input"
            />
            <button className="search-button" onClick={handleSearchSubmit}>
              🔍
            </button>
          </div>
          <div className="filter-container">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="category-filter"
              aria-label="Filter by category"
              disabled={categories.length === 0}
            >
              {categories.length === 0 ? (
                <option>Loading categories...</option>
              ) : (
                categoryOptions.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </section> */}

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">
            Curated selections from our most talented artisans
          </p>
        </div>

        {loading ? (
          <div className="products-grid">
            <CardsSkeleton />
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h3>No featured products available</h3>
            <p>Check back later for new arrivals</p>
          </div>
        )}
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
