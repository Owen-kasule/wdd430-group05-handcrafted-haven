﻿import React from 'react';
import Link from 'next/link';
import type { Product } from '@/data/mockData';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.featured && <span className="featured-badge">Featured</span>}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-seller">by {product.sellerName}</p>
        <div className="product-rating">
          <span className="stars"></span>
          <span className="rating-count">({product.rating} rating)</span>
        </div>
        <Link href={`/product/${product.id}`} className="view-product-btn">
          View Product
        </Link>
      </div>
    </div>
  );
}
