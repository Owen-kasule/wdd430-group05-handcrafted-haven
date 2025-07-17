import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts, mockReviews } from '../data/mockData';
import './ProductPage.css';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    userName: 'Anonymous User'
  });

  useEffect(() => {
    // Find product by ID
    const foundProduct = mockProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Get reviews for this product
      const productReviews = mockReviews.filter(r => r.productId === id);
      setReviews(productReviews);
    }
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = {
      id: Date.now(),
      productId: id,
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      verified: false
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '', userName: 'Anonymous User' });
    setShowReviewForm(false);
  };

  const calculateRatingBreakdown = () => {
    if (reviews.length === 0) return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(review => {
      breakdown[review.rating]++;
    });
    
    return breakdown;
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  const ratingBreakdown = calculateRatingBreakdown();

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-images">
          <div className="main-image">
            <img src={product.images[selectedImage]} alt={product.name} />
          </div>
          <div className="image-thumbnails">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className={selectedImage === index ? 'active' : ''}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-meta">
            <span className="product-price">${product.price}</span>
            <span className="product-category">{product.category}</span>
          </div>
          
          <div className="product-rating">
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  className={star <= Math.round(averageRating) ? 'star filled' : 'star'}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="rating-text">
              {averageRating} ({reviews.length} reviews)
            </span>
          </div>
          
          <div className="seller-info">
            <Link to={`/seller/${product.sellerId}`} className="seller-link">
              <strong>Artisan:</strong> {product.sellerName}
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
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <button className="add-to-cart-btn" disabled={!product.inStock}>
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
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
          >
            Write a Review
          </button>
        </div>

        {/* Rating Summary */}
        <div className="rating-summary">
          <div className="overall-rating">
            <div className="rating-number">{averageRating}</div>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  className={star <= Math.round(averageRating) ? 'star filled' : 'star'}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="rating-count">{reviews.length} reviews</div>
          </div>
          
          <div className="rating-breakdown">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="rating-row">
                <span className="rating-label">{rating} stars</span>
                <div className="rating-bar">
                  <div 
                    className="rating-fill" 
                    style={{ 
                      width: reviews.length > 0 
                        ? `${(ratingBreakdown[rating] / reviews.length) * 100}%` 
                        : '0%' 
                    }}
                  ></div>
                </div>
                <span className="rating-count">{ratingBreakdown[rating]}</span>
              </div>
            ))}
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
                  onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <select
                  id="rating"
                  value={newReview.rating}
                  onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                >
                  {[5, 4, 3, 2, 1].map(num => (
                    <option key={num} value={num}>{num} stars</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="comment">Review:</label>
                <textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  rows="4"
                  required
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="submit-review-btn">Submit Review</button>
                <button 
                  type="button" 
                  className="cancel-review-btn"
                  onClick={() => setShowReviewForm(false)}
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
                <span className="reviewer-name">{review.userName}</span>
                <span className="review-date">{review.date}</span>
                {review.verified && <span className="verified-badge">Verified Purchase</span>}
              </div>
              <div className="review-rating">
                <span className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
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

        {reviews.length === 0 && (
          <div className="no-reviews">
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </div>
    </div>
  );
}
