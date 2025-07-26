'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '../ProductCard/ProductCard';
import Loading from '@/components/Loading/Loading';
import type { Product, Seller } from '@/types/definitions';
import { mockSellers, mockProducts } from '@/data/mockData';
import './SellerProfile.css';

export default function SellerProfile() {
  const params = useParams();
  const id = params.id as string;
  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Find seller by ID
    const foundSeller = mockSellers.find(s => s.id === id);

    // Find products for this seller
    const sellerProducts = mockProducts.filter(p => p.sellerId === id);

    setSeller(foundSeller || null);
    setProducts(sellerProducts);
  }, [id]);

  if (!seller) {
    return <Loading message="Loading seller profile..." />;
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
                <span className="stat-number">{seller.rating}</span>
                <span className="stat-label">Rating</span>
                <div className="rating-stars">
                  <span className="stars">★★★★★</span>
                  <span className="review-count">
                    ({seller.totalReviews} reviews)
                  </span>
                </div>
              </div>
              <div className="stat">
                <span className="stat-number">{seller.totalSales}</span>
                <span className="stat-label">Total Sales</span>
              </div>
              <div className="stat">
                <span className="stat-number">{seller.joinDate}</span>
                <span className="stat-label">Member Since</span>
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
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
