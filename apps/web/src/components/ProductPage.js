import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Mock product data - in real app, this would fetch from API
    const mockProduct = {
      id: id,
      name: 'Handcrafted Ceramic Vase',
      price: 89.99,
      description:
        'Beautiful handcrafted ceramic vase made with traditional techniques. Perfect for displaying fresh flowers or as a standalone decorative piece. Each piece is unique with subtle variations in color and texture.',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
      ],
      seller: {
        id: 'seller1',
        name: 'Maria Rodriguez',
        rating: 4.8,
        location: 'Santa Fe, NM',
      },
      specifications: {
        Material: 'High-fired ceramic',
        Dimensions: '12" H x 6" W',
        Weight: '2.5 lbs',
        Care: 'Hand wash only',
      },
      reviews: [
        {
          id: 1,
          user: 'Sarah Johnson',
          rating: 5,
          comment: 'Absolutely beautiful! The craftsmanship is exceptional.',
          date: '2025-01-15',
        },
        {
          id: 2,
          user: 'Michael Chen',
          rating: 4,
          comment:
            'Great quality and fast shipping. Very happy with my purchase.',
          date: '2025-01-10',
        },
      ],
      inStock: true,
      category: 'Home Decor',
    };
    setProduct(mockProduct);
  }, [id]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

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

          <div className="seller-info">
            <Link to={`/seller/${product.seller.id}`} className="seller-link">
              <strong>Artisan:</strong> {product.seller.name}
            </Link>
            <span className="seller-location">{product.seller.location}</span>
            <div className="seller-rating">
              <span className="stars">★★★★★</span>
              <span>{product.seller.rating}/5</span>
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
            <button className="add-to-cart-btn" disabled={!product.inStock}>
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        <div className="reviews-list">
          {product.reviews.map(review => (
            <div key={review.id} className="review">
              <div className="review-header">
                <span className="reviewer-name">{review.user}</span>
                <span className="review-date">{review.date}</span>
              </div>
              <div className="review-rating">
                <span className="stars">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </span>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
