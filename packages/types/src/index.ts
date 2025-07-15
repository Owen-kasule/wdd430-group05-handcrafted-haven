export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  images: string[];
  sellerName: string;
  sellerId: string;
  reviewCount: number;
  rating: number;
  featured: boolean;
  category: string;
  inStock: boolean;
  specifications: Record<string, string>;
}

export interface Seller {
  id: string;
  name: string;
  bio: string;
  profileImage: string;
  location: string;
  joinDate: string;
  rating: number;
  totalReviews: number;
  totalSales: number;
  specialties: string[];
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Category {
  value: string;
  label: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  address?: Address;
  preferences?: UserPreferences;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface UserPreferences {
  newsletter: boolean;
  notifications: boolean;
  favoriteCategories: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  shippingAddress: Address;
}

export interface APIResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
