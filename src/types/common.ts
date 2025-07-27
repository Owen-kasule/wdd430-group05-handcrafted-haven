// src/types/common.ts

// Product Type (from your mockData)
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  inStock: boolean;
  sellerId: string;
  sellerName: string;
  rating: number; // Seller rating, not product rating
  specifications: Record<string, string>;
}

// Review Type (from your mockData)
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  date: string; // ISO string 'YYYY-MM-DD'
  verified: boolean;
}

// Cart Item Type (for your cart)
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string; // Storing the image for cart display
}