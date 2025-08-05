export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  provider: string;
  role: 'buyer' | 'seller' | 'admin';
  created_at: string;
  updated_at: string;
}
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  images: string[];
  category: string;
  category_id: string;
  seller_id: string;
  seller_name: string;
  rating: number;
  created_at: Date;
  featured: boolean;
  specifications: Record<string, string>;
  in_stock: boolean;
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
  product_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: Date;
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}
