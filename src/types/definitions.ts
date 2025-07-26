export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  provider: string;
  role: 'user' | 'admin';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  images: string[];
  category: string;
  sellerId: string;
  sellerName: string;
  rating: number;
  createdAt: Date;
  featured?: boolean;
  specifications: Record<string, string>;
  inStock: boolean;
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
  date: string;
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}
