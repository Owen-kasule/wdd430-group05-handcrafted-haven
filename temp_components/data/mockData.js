import { v4 as uuidv4 } from 'uuid';

// Mock product data for the application
export const mockProducts = [
  {
    id: uuidv4(),
    name: "Handwoven Wool Blanket",
    price: 189.99,
    description: "Luxurious handwoven wool blanket made from 100% merino wool. Perfect for cozy evenings and adds warmth to any living space.",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500"
    ],
    sellerName: "Anna Thompson",
    sellerId: "seller_001",
    reviewCount: 67,
    rating: 4.8,
    featured: true,
    category: "Textiles",
    inStock: true,
    specifications: {
      "Material": "100% Merino Wool",
      "Dimensions": "60\" x 80\"",
      "Weight": "3.2 lbs",
      "Care": "Dry clean only"
    }
  },
  {
    id: uuidv4(),
    name: "Ceramic Dinner Plate Set",
    price: 125.00,
    description: "Beautiful set of 6 handcrafted ceramic dinner plates. Each plate is unique with subtle variations that showcase the artisan's skill.",
    imageUrl: "https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=400",
    images: [
      "https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=500",
      "https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=500",
      "https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=500"
    ],
    sellerName: "Maria Rodriguez",
    sellerId: "seller_002",
    reviewCount: 45,
    rating: 4.9,
    featured: true,
    category: "Ceramics",
    inStock: true,
    specifications: {
      "Material": "High-fired ceramic",
      "Dimensions": "10.5\" diameter",
      "Weight": "1.2 lbs each",
      "Care": "Dishwasher safe"
    }
  },
  {
    id: uuidv4(),
    name: "Hand-carved Wooden Bowl",
    price: 67.50,
    description: "Exquisite hand-carved wooden bowl made from sustainable bamboo. Perfect for serving salads, fruits, or as a decorative piece.",
    imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400",
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500"
    ],
    sellerName: "David Chen",
    sellerId: "seller_003",
    reviewCount: 89,
    rating: 4.7,
    featured: true,
    category: "Woodwork",
    inStock: true,
    specifications: {
      "Material": "Sustainable Bamboo",
      "Dimensions": "12\" x 4\"",
      "Weight": "0.8 lbs",
      "Care": "Hand wash with mild soap"
    }
  },
  {
    id: uuidv4(),
    name: "Macramé Wall Hanging",
    price: 45.00,
    description: "Intricate macramé wall hanging that adds bohemian charm to any space. Handcrafted using natural cotton cord.",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500"
    ],
    sellerName: "Sarah Wilson",
    sellerId: "seller_004",
    reviewCount: 34,
    rating: 4.6,
    featured: true,
    category: "Home Decor",
    inStock: true,
    specifications: {
      "Material": "100% Cotton Cord",
      "Dimensions": "24\" x 36\"",
      "Weight": "1.1 lbs",
      "Care": "Spot clean only"
    }
  },
  {
    id: uuidv4(),
    name: "Glass Pendant Necklace",
    price: 85.00,
    description: "Elegant glass pendant necklace featuring hand-blown glass with embedded metallic accents. Each piece is one-of-a-kind.",
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500"
    ],
    sellerName: "Emma Davis",
    sellerId: "seller_005",
    reviewCount: 56,
    rating: 4.8,
    featured: false,
    category: "Jewelry",
    inStock: true,
    specifications: {
      "Material": "Hand-blown glass, silver chain",
      "Dimensions": "2\" pendant, 18\" chain",
      "Weight": "0.3 lbs",
      "Care": "Wipe clean with soft cloth"
    }
  },
  {
    id: uuidv4(),
    name: "Leather Journal Cover",
    price: 78.00,
    description: "Premium leather journal cover handcrafted from full-grain leather. Features hand-stitched details and ages beautifully over time.",
    imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400",
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500"
    ],
    sellerName: "Michael Brown",
    sellerId: "seller_006",
    reviewCount: 23,
    rating: 4.9,
    featured: false,
    category: "Accessories",
    inStock: true,
    specifications: {
      "Material": "Full-grain leather",
      "Dimensions": "8.5\" x 5.5\"",
      "Weight": "0.7 lbs",
      "Care": "Condition with leather oil"
    }
  }
];

// Mock seller data
export const mockSellers = [
  {
    id: "seller_001",
    name: "Anna Thompson",
    bio: "Textile artist specializing in traditional weaving techniques with over 20 years of experience.",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
    location: "Portland, Oregon",
    joinDate: "January 2019",
    rating: 4.8,
    totalReviews: 312,
    totalSales: 1850,
    specialties: ["Textiles", "Weaving", "Natural Fibers", "Home Decor"]
  },
  {
    id: "seller_002",
    name: "Maria Rodriguez",
    bio: "Passionate ceramic artist with over 15 years of experience creating unique, handcrafted pieces.",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
    location: "Santa Fe, New Mexico",
    joinDate: "March 2020",
    rating: 4.9,
    totalReviews: 247,
    totalSales: 1250,
    specialties: ["Ceramics", "Pottery", "Home Decor", "Garden Art"]
  },
  {
    id: "seller_003",
    name: "David Chen",
    bio: "Woodworker committed to sustainable practices and creating functional art from reclaimed materials.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    location: "Seattle, Washington",
    joinDate: "July 2018",
    rating: 4.7,
    totalReviews: 189,
    totalSales: 950,
    specialties: ["Woodwork", "Sustainable Materials", "Furniture", "Kitchen Items"]
  },
  {
    id: "seller_004",
    name: "Sarah Wilson",
    bio: "Macramé and fiber artist bringing bohemian style to modern homes through intricate knotwork.",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    location: "Austin, Texas",
    joinDate: "November 2021",
    rating: 4.6,
    totalReviews: 156,
    totalSales: 680,
    specialties: ["Macramé", "Fiber Art", "Wall Hangings", "Plant Holders"]
  },
  {
    id: "seller_005",
    name: "Emma Davis",
    bio: "Glass artist creating unique jewelry and decorative pieces using traditional glassblowing techniques.",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    location: "Asheville, North Carolina",
    joinDate: "September 2020",
    rating: 4.8,
    totalReviews: 203,
    totalSales: 890,
    specialties: ["Glass Art", "Jewelry", "Decorative Objects", "Custom Pieces"]
  },
  {
    id: "seller_006",
    name: "Michael Brown",
    bio: "Leather craftsman creating durable, beautiful accessories using time-honored techniques.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    location: "Nashville, Tennessee",
    joinDate: "June 2019",
    rating: 4.9,
    totalReviews: 134,
    totalSales: 567,
    specialties: ["Leather Craft", "Accessories", "Bags", "Custom Work"]
  }
];

// Mock reviews data
export const mockReviews = [
  {
    id: uuidv4(),
    productId: mockProducts[0].id,
    userId: "user_001",
    userName: "Jennifer Smith",
    rating: 5,
    comment: "Absolutely beautiful blanket! The quality is exceptional and it's so soft and warm. Highly recommend!",
    date: "2025-01-15",
    verified: true
  },
  {
    id: uuidv4(),
    productId: mockProducts[0].id,
    userId: "user_002",
    userName: "Robert Johnson",
    rating: 4,
    comment: "Great quality and fast shipping. The colors are exactly as shown in the photos.",
    date: "2025-01-10",
    verified: true
  },
  {
    id: uuidv4(),
    productId: mockProducts[1].id,
    userId: "user_003",
    userName: "Lisa Anderson",
    rating: 5,
    comment: "These plates are gorgeous! Each one is slightly different which makes them special. Perfect for dinner parties.",
    date: "2025-01-12",
    verified: true
  }
];

// Categories
export const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'home-decor', label: 'Home Decor' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'textiles', label: 'Textiles' },
  { value: 'ceramics', label: 'Ceramics' },
  { value: 'woodwork', label: 'Woodwork' },
  { value: 'accessories', label: 'Accessories' }
];
