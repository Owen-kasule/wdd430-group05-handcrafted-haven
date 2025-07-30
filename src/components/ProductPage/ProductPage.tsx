'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  getProductById,
  getProductReviews,
  createReview,
} from '@/data/server-data';
import type { Product, Review, User } from '@/types/definitions';
import './ProductPage.css';

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    userName: 'Anonymous User',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submittingReview, setSubmittingReview] = useState(false);

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

        setProduct(productData);
        setReviews(reviewsData || []);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmittingReview(true);

      // Generate a mock user ID for now
      const userId = 'user_' + Date.now().toString();

      const createdReview = await createReview({
        product_id: id,
        user_id: userId,
        user_name: newReview.userName,
        rating: newReview.rating,
        comment: newReview.comment,
        verified: false,
      });

      // Update reviews list with new review
      setReviews([
        {
          ...createdReview,
          id: createdReview.id,
          product_id: createdReview.product_id,
          user_id: createdReview.user_id,
          user_name: createdReview.user_name,
          created_at: new Date(createdReview.created_at),
        },
        ...reviews,
      ]);

      // ... rest of the function remains the same
    } catch (err) {
      console.error('Error creating review:', err);
      setError('Failed to submit review. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const calculateRatingBreakdown = () => {
    if (reviews.length === 0) return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(review => {
      breakdown[review.rating as keyof typeof breakdown]++;
    });

    return breakdown;
  };

  const averageRating = product?.rating || 0;

  if (loading) {
    return (
      <div className="product-page">
        <div className="product-container skeleton-container">
          {/* Image Skeleton */}
          <div className="product-images">
            <div className="main-image skeleton"></div>
            <div className="image-thumbnails">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton"></div>
              ))}
            </div>
          </div>

          {/* Details Skeleton */}
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

        {/* Reviews Section Skeleton */}
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
            disabled={submittingReview}
          >
            Write a Review
          </button>
        </div>

        {/* Rating Summary */}
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

        {/* Review Form */}
        {showReviewForm && (
          <div className="review-form-container">
            <h3>Write Your Review</h3>
            <form onSubmit={handleReviewSubmit} className="review-form">
              <div className="form-group">
                <label htmlFor="reviewer-name">Name:</label>
                <input
                  type="text"
                  id="reviewer-name"
                  value={newReview.userName}
                  onChange={e =>
                    setNewReview({ ...newReview, userName: e.target.value })
                  }
                  required
                  disabled={submittingReview}
                />
              </div>

              <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <select
                  id="rating"
                  value={newReview.rating}
                  onChange={e =>
                    setNewReview({
                      ...newReview,
                      rating: parseInt(e.target.value),
                    })
                  }
                  disabled={submittingReview}
                >
                  {[5, 4, 3, 2, 1].map(num => (
                    <option key={num} value={num}>
                      {num} stars
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="comment">Review:</label>
                <textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={e =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  rows={4}
                  required
                  disabled={submittingReview}
                ></textarea>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-review-btn"
                  disabled={submittingReview}
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                  type="button"
                  className="cancel-review-btn"
                  onClick={() => setShowReviewForm(false)}
                  disabled={submittingReview}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="review">
              <div className="review-header">
                <span className="reviewer-name">{review.user_name}</span>
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
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </div>
    </div>
  );
}
