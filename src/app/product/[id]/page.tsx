'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// IMPORT useParams from 'next/navigation'
import { useParams } from 'next/navigation'; // <--- ADD THIS LINE

import { mockProducts, mockReviews } from '@/data/mockData';
import type { Product, Review } from '@/types/common'; // Ensure this path is correct
import Loading from '@/components/Loading/Loading';
import { useCart } from '@/hooks/useCart';


export default function ProductPage() { // No props are passed directly here anymore
  // Use the useParams hook to get the id
  const params = useParams();
  const id = params.id as string; //  Get 'id' from the params object returned by useParams

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Get the addToCart function from your useCart hook
  const { addToCart } = useCart();

  // useEffect to fetch product data when the id changes
  useEffect(() => {
    setLoading(true); // Start loading
    // Simulate data fetching (replace with actual API call later)
    const foundProduct = mockProducts.find(p => p.id === id); // Use 'id' here

    if (foundProduct) {
      setProduct(foundProduct);
      setReviews(mockReviews.filter(r => r.productId === id)); // Use 'id' here
    } else {
      setProduct(null); // Product not found
      setReviews([]);
    }
    setLoading(false); // End loading
  }, [id]); // Dependency array: Effect runs whenever id changes (use 'id')

  // Display loading state
  if (loading) {
    return <Loading />;
  }

  // Display "Product not found" if no product is loaded
  if (!product) {
    return (
      <div className="product-page-container">
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist or has been removed.</p>
        <Link href="/products" className="back-to-products">
          Back to Products
        </Link>
      </div>
    );
  }

  // Render the product details
  return (
    <div className="product-page-container">
      <div className="product-detail">
        {/* Product Image Section */}
        <div className="product-image">
          {product.images && product.images.length > 0 ? (
            <img src={product.images[0]} alt={product.name} />
          ) : (
            <div className="no-image-placeholder">No Image Available</div>
          )}
        </div>

        {/* Product Information Section */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-category">{product.category}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>

          {/* Add to Cart Button */}
          <button
            className="add-to-cart-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          {/* Optional: Back to products link */}
          <Link href="/products" className="back-to-products-link">
            &larr; Back to all products
          </Link>
        </div>
      </div>

      {/* Product Reviews Section */}
      <div className="product-reviews">
        <h2>Customer Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet for this product.</p>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="review-item">
                <h4>{review.userName}</h4> {/* Ensure this is review.userName */}
              <p>Rating: {review.rating}/5</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}