'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  getProductById,
  getProductReviews,
  getUsers,
} from '@/data/server-data';
import type { Product, Review } from '@/types/definitions';
import './ProductPage.css';

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const [productData, reviewsData] = await Promise.all([
          getProductById(id),
          getProductReviews(id),
        ]);

        if (!productData) {
          throw new Error('Product not found');
        }

        // Get unique user IDs from reviews
        const userIds = [
          ...new Set(reviewsData?.map(review => review.user_id) || []),
        ];

        // Fetch user data (only names)
        const usersMap = await getUsers(userIds);

        // Enhance reviews with user names
        const enhancedReviews =
          reviewsData?.map(review => ({
            ...review,
            user_name:
              usersMap[review.user_id]?.name || review.user_name || 'Anonymous',
          })) || [];

        setProduct(productData);
        setReviews(enhancedReviews);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const calculateRatingBreakdown = () => {
    if (reviews.length === 0) return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(review => {
      breakdown[review.rating as keyof typeof breakdown]++;
    });

    return breakdown;
  };

  function getInitials(name: string): string {
    if (!name) return '?';
    const parts = name.split(' ');
    let initials = parts[0].charAt(0).toUpperCase();
    if (parts.length > 1) {
      initials += parts[parts.length - 1].charAt(0).toUpperCase();
    }
    return initials;
  }

  const averageRating = product?.rating || 0;

  if (loading) {
    return (
      <div className="product-page">
        <div className="product-container skeleton-container">
          <div className="product-images">
            <div className="main-image skeleton"></div>
            <div className="image-thumbnails">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton"></div>
              ))}
            </div>
          </div>

          <div className="product-details">
            <div className="skeleton title-skeleton"></div>
            <div className="skeleton meta-skeleton"></div>
            <div className="skeleton rating-skeleton"></div>
            <div className="skeleton seller-skeleton"></div>
            <div className="skeleton description-skeleton"></div>
            <div
              className="skeleton description-skeleton"
              style={{ width: '80%' }}
            ></div>
            <div className="skeleton specs-skeleton"></div>
            <div className="skeleton purchase-skeleton"></div>
          </div>
        </div>

        <div className="reviews-section skeleton-container">
          <div className="skeleton reviews-header-skeleton"></div>
          <div className="skeleton rating-summary-skeleton"></div>
          <div className="skeleton reviews-list-skeleton"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (!product) {
    return <div className="error-message">Product not found</div>;
  }

  const ratingBreakdown = calculateRatingBreakdown();

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-images">
          <div className="main-image">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              onError={e => {
                (e.target as HTMLImageElement).src =
                  '/placeholder-image/placeholder-image.jpg';
              }}
            />
          </div>
          <div className="image-thumbnails">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className={selectedImage === index ? 'active' : ''}
                onClick={() => setSelectedImage(index)}
                onError={e => {
                  (e.target as HTMLImageElement).src =
                    '/placeholder-image/placeholder-image.jpg';
                }}
              />
            ))}
          </div>
        </div>

        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-meta">
            <span className="product-price">${product.price.toFixed(2)}</span>
            <span className="product-category">{product.category}</span>
          </div>

          <div className="product-rating">
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={
                    star <= Math.round(averageRating) ? 'star filled' : 'star'
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span className="rating-text">
              {averageRating.toFixed(1)} ({reviews.length} reviews)
            </span>
          </div>

          <div className="seller-info">
            <Link href={`/seller/${product.seller_id}`} className="seller-link">
              <strong>Artisan:</strong> {product.seller_name}
            </Link>
            <div className="seller-rating">
              <span className="stars">★★★★★</span>
              <span>{product.rating}/5</span>
            </div>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-specifications">
            <h3>Specifications</h3>
            <dl>
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="spec-row">
                  <dt>{key}:</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="purchase-section">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button className="add-to-cart-btn" disabled={!product.in_stock}>
              {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <div className="reviews-header">
          <h2>Customer Reviews</h2>
          <button
            className="write-review-btn"
            onClick={() => setShowReviewForm(!showReviewForm)}
            disabled={true}
          >
            Write a Review
          </button>
        </div>

        <div className="rating-summary">
          <div className="overall-rating">
            <div className="rating-number">{averageRating.toFixed(1)}</div>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={
                    star <= Math.round(averageRating) ? 'star filled' : 'star'
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <div className="rating-count">{reviews.length} reviews</div>
          </div>

          <div className="rating-breakdown">
            {[5, 4, 3, 2, 1].map(rating => {
              const percentage =
                reviews.length > 0
                  ? (ratingBreakdown[rating as keyof typeof ratingBreakdown] /
                      reviews.length) *
                    100
                  : 0;

              return (
                <div key={rating} className="rating-row">
                  <span className="rating-label">{rating} stars</span>
                  <div className="rating-bar">
                    <div
                      className="rating-fill"
                      data-percentage={percentage}
                      style={
                        {
                          '--rating-width': `${percentage}%`,
                        } as React.CSSProperties
                      }
                    ></div>
                  </div>
                  <span className="rating-count">
                    {ratingBreakdown[rating as keyof typeof ratingBreakdown]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="review">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {getInitials(review.user_name)}
                  </div>
                  <span className="reviewer-name">{review.user_name}</span>
                </div>
                <span className="review-date">
                  {new Date(review.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                {review.verified && (
                  <span className="verified-badge">Verified Purchase</span>
                )}
              </div>
              <div className="review-rating">
                <span className="stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      className={star <= review.rating ? 'star filled' : 'star'}
                    >
                      ★
                    </span>
                  ))}
                </span>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>

        {reviews.length === 0 && !showReviewForm && (
          <div className="no-reviews">
            <p>No reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
