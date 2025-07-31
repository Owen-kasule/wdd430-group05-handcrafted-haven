'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import type { Product, Seller } from '@/types/definitions';
import './SellerProfile.css';
import { SellerProfileSkeleton } from '@/components/skeletonLoader/skeleton';

export default function SellerProfile() {
  const params = useParams();
  const id = params.id as string;
  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch seller data
        const sellerResponse = await axios.get(`/api/sellers/${id}`);
        setSeller(sellerResponse.data);

        // Fetch seller's products
        const productsResponse = await axios.get(
          `/api/products?sellerId=${id}`
        );
        console.log('Products response:', productsResponse.data.products);
        setProducts(productsResponse.data.products);
      } catch (err) {
        console.error('Failed to fetch seller data:', err);
        setError('Failed to load seller profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [id]);

  if (loading) {
    return <SellerProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="seller-profile">
        <div className="error-message">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="seller-profile">
        <div className="not-found">
          <h2>Seller not found</h2>
          <p>
            The seller you're looking for doesn't exist or may have been
            removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="seller-profile">
      <div className="seller-header">
        <div className="seller-info">
          <img
            src={seller.profileImage}
            alt={seller.name}
            className="seller-avatar"
          />
          <div className="seller-details">
            <h1 className="seller-name">{seller.name}</h1>
            <p className="seller-location">{seller.location}</p>
            <div className="seller-stats">
              <div className="stat">
                <span className="stat-label">Rating</span>
                <span className="stat-number">{seller.rating}</span>
                <div className="rating-stars">
                  <span className="stars">★★★★★</span>
                  <span className="review-count">
                    ({seller.totalReviews} reviews)
                  </span>
                </div>
              </div>
              <div className="stat">
                <span className="stat-label">Total Sales</span>
                <span className="stat-number">{seller.totalSales}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Member Since</span>
                <span className="stat-number">{seller.joinDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="seller-content">
        <div className="seller-story">
          <h2>About the Artisan</h2>
          <p className="seller-bio">{seller.bio}</p>
          <p className="seller-story-text">{seller.story}</p>

          <div className="seller-specialties">
            <h3>Specialties</h3>
            <div className="specialty-tags">
              {seller.specialties.map((specialty, index) => (
                <span key={index} className="specialty-tag">
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div className="seller-contact">
            <h3>Contact Information</h3>
            <div className="contact-info">
              <p>
                <strong>Email:</strong> {seller.contact.email}
              </p>
              <p>
                <strong>Phone:</strong> {seller.contact.phone}
              </p>
              <p>
                <strong>Website:</strong>{' '}
                <a
                  href={`https://${seller.contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {seller.contact.website}
                </a>
              </p>
            </div>
            <div className="social-media">
              <p>
                <strong>Follow on Social Media:</strong>
              </p>
              <div className="social-links">
                <a
                  href={`https://instagram.com/${seller.socialMedia.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram: {seller.socialMedia.instagram}
                </a>
                <a
                  href={`https://facebook.com/${seller.socialMedia.facebook.replace(' ', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook: {seller.socialMedia.facebook}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="seller-products">
          <h2>Products by {seller.name}</h2>
          <div className="products-grid">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="no-products">
                <p>This seller currently has no products available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
