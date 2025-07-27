// components/ProductPage/ProductPage.tsx
'use client'; // Make sure this is present if ProductPage uses client-side hooks

import React, { useState, useEffect } from 'react';
// ... other imports you might have (like Link, mock data, types, useCart)
import type { Product, Review } from '@/types/common'; // Important: use 'type' for type imports!
import { useCart } from '@/hooks/useCart'; // Make sure this import is correct (no 'type' here, as useCart is a value/function)

// 1. Define the props interface for ProductPage
//    This interface MUST define 'productId' as a string.
interface ProductPageProps {
  productId: string;
}

// 2. Use this interface in your component's function signature
//    Destructure 'productId' from the props object, and apply the ProductPageProps type.
export default function ProductPage({ productId }: ProductPageProps) {
  // ... rest of your ProductPage component logic

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Access cart functions

  useEffect(() => {
    setLoading(true);
    // Ensure you are using the passed productId here
    const foundProduct = mockProducts.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setReviews(mockReviews.filter(r => r.productId === productId));
    } else {
      setProduct(null);
    }
    setLoading(false);
  }, [productId]); // Ensure productId is a dependency

  // ... rest of your component's JSX
}