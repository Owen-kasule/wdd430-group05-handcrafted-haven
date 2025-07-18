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
  specifications: {
    [key: string]: string;
  };
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  bio: string;
  profileImage: string;
  location: string;
  joinDate: string;
  rating: number;
  totalReviews: number;
  totalSales: number;
  specialties: string[];
  story: string;
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
  };
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
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
