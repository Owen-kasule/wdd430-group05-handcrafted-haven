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
  email: string;
  description: string;
  bio: string;
  image: string;
  profileImage: string;
  rating: number;
  location: string;
  specialties: string[];
  totalSales: number;
  totalReviews: number;
  joinDate: string;
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

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Handmade Ceramic Mug",
    price: 25.99,
    description: "A beautiful handcrafted ceramic mug perfect for your morning coffee. Made with high-quality clay and fired at the perfect temperature for durability.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"
    ],
    category: "pottery",
    sellerId: "seller1",
    sellerName: "Sarah''s Pottery Studio",
    rating: 4.8,
    createdAt: new Date("2024-01-15T10:00:00Z"),
    featured: true,
    specifications: {
      "Material": "High-quality ceramic",
      "Capacity": "12 oz",
      "Color": "Natural glaze",
      "Care": "Dishwasher safe"
    },
    inStock: true
  },
  {
    id: "2",
    name: "Wooden Cutting Board",
    price: 45.00,
    description: "A solid oak cutting board with a beautiful grain pattern. Perfect for all your kitchen prep needs.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop"
    ],
    category: "woodworking",
    sellerId: "seller2",
    sellerName: "Mike''s Woodworks",
    rating: 4.9,
    createdAt: new Date("2024-01-20T14:30:00Z"),
    featured: false,
    specifications: {
      "Material": "Solid oak",
      "Dimensions": "12x8x0.75 inches",
      "Finish": "Food-safe oil",
      "Care": "Hand wash only"
    },
    inStock: true
  },
  {
    id: "3",
    name: "Knitted Wool Scarf",
    price: 35.50,
    description: "A cozy wool scarf hand-knitted with care. Available in multiple colors and perfect for cold weather.",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"
    ],
    category: "textiles",
    sellerId: "seller3",
    sellerName: "Emma''s Textiles",
    rating: 4.7,
    createdAt: new Date("2024-01-25T09:15:00Z"),
    featured: true,
    specifications: {
      "Material": "100% merino wool",
      "Length": "60 inches",
      "Width": "8 inches",
      "Care": "Hand wash cold"
    },
    inStock: true
  },
  {
    id: "4",
    name: "Silver Wire Earrings",
    price: 28.00,
    description: "Elegant silver wire earrings with a minimalist design. Handcrafted with sterling silver wire.",
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400&h=400&fit=crop"
    ],
    category: "jewelry",
    sellerId: "seller4",
    sellerName: "Luna''s Jewelry",
    rating: 4.6,
    createdAt: new Date("2024-02-01T16:45:00Z"),
    featured: false,
    specifications: {
      "Material": "Sterling silver",
      "Style": "Minimalist",
      "Length": "1.5 inches",
      "Weight": "2g"
    },
    inStock: true
  },
  {
    id: "5",
    name: "Leather Wallet",
    price: 60.00,
    description: "A premium leather wallet with multiple card slots and a bill compartment. Made from genuine leather.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"
    ],
    category: "leather",
    sellerId: "seller5",
    sellerName: "Tom''s Leather Goods",
    rating: 4.8,
    createdAt: new Date("2024-02-05T11:20:00Z"),
    featured: true,
    specifications: {
      "Material": "Genuine leather",
      "Color": "Brown",
      "Card slots": "8",
      "Dimensions": "4.5x3.5x0.5 inches"
    },
    inStock: false
  }
];

export const mockSellers: Seller[] = [
  {
    id: "seller1",
    name: "Sarah''s Pottery Studio",
    email: "sarah@pottery.com",
    description: "Specializing in handcrafted ceramic pieces with over 10 years of experience.",
    bio: "I have been creating pottery for over 10 years, specializing in functional ceramics that bring beauty to everyday life.",
    image: "https://images.unsplash.com/photo-1494790108755-2616c6d2b8e9?w=400&h=400&fit=crop",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616c6d2b8e9?w=400&h=400&fit=crop",
    rating: 4.8,
    location: "Portland, OR",
    specialties: ["pottery", "ceramics", "handmade"],
    totalSales: 150,
    totalReviews: 89,
    joinDate: "2022-01-15"
  },
  {
    id: "seller2",
    name: "Mike''s Woodworks",
    email: "mike@woodworks.com",
    description: "Custom woodworking pieces made with sustainably sourced materials.",
    bio: "Passionate about creating beautiful, functional wooden items using traditional techniques and sustainable materials.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.9,
    location: "Denver, CO",
    specialties: ["woodworking", "furniture", "sustainable"],
    totalSales: 89,
    totalReviews: 67,
    joinDate: "2022-03-20"
  },
  {
    id: "seller3",
    name: "Emma''s Textiles",
    email: "emma@textiles.com",
    description: "Handwoven and knitted items made with love and attention to detail.",
    bio: "Creating cozy, comfortable textiles using traditional techniques passed down through generations.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 4.7,
    location: "Austin, TX",
    specialties: ["textiles", "knitting", "weaving"],
    totalSales: 203,
    totalReviews: 145,
    joinDate: "2021-11-10"
  },
  {
    id: "seller4",
    name: "Luna''s Jewelry",
    email: "luna@jewelry.com",
    description: "Unique jewelry pieces crafted with precious metals and stones.",
    bio: "Designing and creating unique jewelry pieces that tell a story and celebrate individuality.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
    profileImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
    rating: 4.6,
    location: "San Francisco, CA",
    specialties: ["jewelry", "precious metals", "stones"],
    totalSales: 76,
    totalReviews: 54,
    joinDate: "2023-05-08"
  },
  {
    id: "seller5",
    name: "Tom''s Leather Goods",
    email: "tom@leather.com",
    description: "Premium leather goods crafted using traditional techniques.",
    bio: "Handcrafting premium leather goods using time-honored techniques and the finest materials.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    rating: 4.8,
    location: "Nashville, TN",
    specialties: ["leather", "traditional crafts", "premium"],
    totalSales: 134,
    totalReviews: 98,
    joinDate: "2022-07-12"
  }
];

export const mockReviews: Review[] = [
  {
    id: "review1",
    productId: "1",
    userId: "user1",
    userName: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely love this mug! The craftsmanship is excellent and it keeps my coffee warm.",
    createdAt: new Date("2024-01-20T09:30:00Z"),
    date: "2024-01-20",
    verified: true
  },
  {
    id: "review2",
    productId: "1",
    userId: "user2",
    userName: "Mike Chen",
    rating: 4,
    comment: "Beautiful mug, very well made. Arrived quickly and was well packaged.",
    createdAt: new Date("2024-01-22T14:15:00Z"),
    date: "2024-01-22",
    verified: true
  },
  {
    id: "review3",
    productId: "2",
    userId: "user3",
    userName: "Emma Davis",
    rating: 5,
    comment: "This cutting board is amazing! The wood grain is beautiful and it''s very durable.",
    createdAt: new Date("2024-01-25T16:45:00Z"),
    date: "2024-01-25",
    verified: true
  },
  {
    id: "review4",
    productId: "3",
    userId: "user4",
    userName: "John Wilson",
    rating: 5,
    comment: "So soft and warm! Perfect for the winter season.",
    createdAt: new Date("2024-01-30T11:20:00Z"),
    date: "2024-01-30",
    verified: false
  },
  {
    id: "review5",
    productId: "4",
    userId: "user5",
    userName: "Lisa Brown",
    rating: 4,
    comment: "Beautiful earrings, exactly as described. Very happy with my purchase.",
    createdAt: new Date("2024-02-05T10:00:00Z"),
    date: "2024-02-05",
    verified: true
  }
];

export const categories: Category[] = [
  {
    id: "pottery",
    name: "Pottery & Ceramics",
    description: "Handcrafted ceramic pieces including mugs, bowls, vases, and decorative items.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"
  },
  {
    id: "woodworking",
    name: "Woodworking",
    description: "Custom wooden items including furniture, cutting boards, and decorative pieces.",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop"
  },
  {
    id: "textiles",
    name: "Textiles",
    description: "Handwoven and knitted items including scarves, blankets, and bags.",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=400&fit=crop"
  },
  {
    id: "jewelry",
    name: "Jewelry",
    description: "Handcrafted jewelry pieces including earrings, necklaces, and bracelets.",
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400&h=400&fit=crop"
  },
  {
    id: "leather",
    name: "Leather Goods",
    description: "Premium leather items including wallets, bags, and accessories.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"
  }
];
