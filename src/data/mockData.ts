import type {
  Review,
  Product,
  Seller,
  Category,
  User,
} from "@/types/definitions";
import { v4 as uuidv4 } from "uuid";

export const mockUsers: User[] = [
  {
    id: uuidv4(),
    email: "user1@example.com",
    name: "User One",
    password: "password1",
    provider: "local",
    role: "buyer",
  },
  {
    id: uuidv4(),
    email: "user2@example.com",
    name: "User Two",
    password: "password2",
    provider: "local",
    role: "buyer",
  },
  {
    id: uuidv4(),
    email: "admin1@example.com",
    name: "Admin One",
    password: "adminpassword",
    provider: "local",
    role: "admin",
  },
];

export const mockSellers: Seller[] = [
  {
    id: uuidv4(),
    name: "Maria Rodriguez",
    bio: "Passionate ceramic artist with over 15 years of experience creating unique, handcrafted pieces. I draw inspiration from traditional Mexican pottery techniques passed down through generations, combined with contemporary design elements.",
    profileImage:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
    location: "Santa Fe, New Mexico",
    joinDate: "March 2020",
    rating: 4.8,
    totalReviews: 247,
    totalSales: 1250,
    specialties: ["Ceramics", "Pottery", "Home Decor", "Garden Art"],
    story:
      "My journey as an artisan began in my grandmother's workshop in Oaxaca, where I learned the ancient art of pottery making. Each piece I create tells a story, blending traditional techniques with modern aesthetics to create functional art that brings joy to everyday life.",
    contact: {
      email: "maria@handcraftedhaven.com",
      phone: "(505) 123-4567",
      website: "www.mariaceramics.com",
    },
    socialMedia: {
      instagram: "@mariaceramics",
      facebook: "Maria Rodriguez Ceramics",
    },
  },
  {
    id: uuidv4(),
    name: "Sarah's Pottery Studio",
    bio: "Specializing in handcrafted ceramic pieces with over 10 years of experience.",
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    location: "Portland, OR",
    joinDate: "January 2022",
    rating: 4.8,
    totalReviews: 89,
    totalSales: 150,
    specialties: ["pottery", "ceramics", "handmade"],
    story:
      "I have been creating pottery for over 10 years, specializing in functional ceramics that bring beauty to everyday life.",
    contact: {
      email: "sarah@pottery.com",
      phone: "(503) 555-1234",
      website: "www.sarahspotterystudio.com",
    },
    socialMedia: {
      instagram: "@sarahspotterystudio",
      facebook: "Sarah's Pottery Studio",
    },
  },
  {
    id: uuidv4(),
    name: "Mike's Woodworks",
    bio: "Custom woodworking pieces made with sustainably sourced materials.",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    location: "Denver, CO",
    joinDate: "March 2022",
    rating: 4.9,
    totalReviews: 67,
    totalSales: 89,
    specialties: ["woodworking", "furniture", "sustainable"],
    story:
      "Passionate about creating beautiful, functional wooden items using traditional techniques and sustainable materials.",
    contact: {
      email: "mike@woodworks.com",
      phone: "(720) 555-5678",
      website: "www.mikeswoodworks.com",
    },
    socialMedia: {
      instagram: "@mikeswoodworks",
      facebook: "Mike's Woodworks",
    },
  },
  {
    id: uuidv4(),
    name: "Emma's Textiles",
    bio: "Handwoven and knitted items made with love and attention to detail.",
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    location: "Austin, TX",
    joinDate: "November 2021",
    rating: 4.7,
    totalReviews: 145,
    totalSales: 203,
    specialties: ["textiles", "knitting", "weaving"],
    story:
      "Creating cozy, comfortable textiles using traditional techniques passed down through generations.",
    contact: {
      email: "emma@textiles.com",
      phone: "(512) 555-9012",
      website: "www.emmasttextiles.com",
    },
    socialMedia: {
      instagram: "@emmastextiles",
      facebook: "Emma's Textiles",
    },
  },
  {
    id: uuidv4(),
    name: "Luna's Jewelry",
    bio: "Unique jewelry pieces crafted with precious metals and stones.",
    profileImage:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
    location: "San Francisco, CA",
    joinDate: "May 2023",
    rating: 4.6,
    totalReviews: 54,
    totalSales: 76,
    specialties: ["jewelry", "precious metals", "stones"],
    story:
      "Designing and creating unique jewelry pieces that tell a story and celebrate individuality.",
    contact: {
      email: "luna@jewelry.com",
      phone: "(415) 555-3456",
      website: "www.lunasjewelry.com",
    },
    socialMedia: {
      instagram: "@lunasjewelry",
      facebook: "Luna's Jewelry",
    },
  },
  {
    id: uuidv4(),
    name: "Tom's Leather Goods",
    bio: "Premium leather goods crafted using traditional techniques.",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    location: "Nashville, TN",
    joinDate: "July 2022",
    rating: 4.8,
    totalReviews: 98,
    totalSales: 134,
    specialties: ["leather", "traditional crafts", "premium"],
    story:
      "Handcrafting premium leather goods using time-honored techniques and the finest materials.",
    contact: {
      email: "tom@leather.com",
      phone: "(615) 555-7890",
      website: "www.tomsleathergoods.com",
    },
    socialMedia: {
      instagram: "@tomsleather",
      facebook: "Tom's Leather Goods",
    },
  },
];

// Get seller IDs
const mariaId = mockSellers[0].id;
const sarahId = mockSellers[1].id;
const mikeId = mockSellers[2].id;
const emmaId = mockSellers[3].id;
const lunaId = mockSellers[4].id;
const tomId = mockSellers[5].id;

export const categories: Category[] = [
  {
    id: uuidv4(),
    name: "Pottery & Ceramics",
    description:
      "Handcrafted ceramic pieces including mugs, bowls, vases, and decorative items.",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
  },
  {
    id: uuidv4(),
    name: "Woodworking",
    description:
      "Custom wooden items including furniture, cutting boards, and decorative pieces.",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop",
  },
  {
    id: uuidv4(),
    name: "Textiles",
    description:
      "Handwoven and knitted items including scarves, blankets, and bags.",
    image:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=400&fit=crop",
  },
  {
    id: uuidv4(),
    name: "Jewelry",
    description:
      "Handcrafted jewelry pieces including earrings, necklaces, and bracelets.",
    image:
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400&h=400&fit=crop",
  },
  {
    id: uuidv4(),
    name: "Leather Goods",
    description:
      "Premium leather items including wallets, bags, and accessories.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
  },
];

// Get category Names
const potteryCategoryName = categories[0].name;
const woodworkingCategoryName = categories[1].name;
const textilesCategoryName = categories[2].name;
const jewelryCategoryName = categories[3].name;
const leatherGoodsCategoryName = categories[4].name;

//Get category Names
const potteryCategoryId = categories[0].id;
const woodworkingCategoryId = categories[1].id;
const textilesCategoryId = categories[2].id;
const jewelryCategoryId = categories[3].id;
const leatherGoodsCategoryId = categories[4].id;
export const mockProducts: Product[] = [
  {
    id: uuidv4(),
    name: "Ceramic Dinner Plate Set",
    price: 125.0,
    image: "https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=300",
    images: [
      "https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=300",
      "https://images.unsplash.com/photo-1564436872-f6d81182df12?w=300",
      "https://images.unsplash.com/photo-1547825407-5d4e1e5c3d05?w=300",
    ],
    seller_name: "Maria Rodriguez",
    seller_id: mariaId,
    featured: true,
    category: potteryCategoryName,
    category_id: potteryCategoryId,
    description:
      "Beautiful ceramic dinner plates with elegant earth tone glazes",
    rating: 4.8,
    created_at: new Date("2024-01-01"),
    in_stock: true,
    specifications: {
      Material: "Ceramic",
      Size: "10 inches",
      Color: "Earth tones",
      "Set Includes": "4 dinner plates, 4 salad plates",
    },
  },
  {
    id: uuidv4(),
    name: "Handcrafted Coffee Mug",
    price: 32.0,
    image: "https://images.unsplash.com/photo-1517638851339-a711cfcf3279?w=300",
    images: [
      "https://images.unsplash.com/photo-1517638851339-a711cfcf3279?w=300",
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=300",
      "https://images.unsplash.com/photo-1579781351528-1f1e4e1b032f?w=300",
    ],
    seller_name: "Maria Rodriguez",
    seller_id: mariaId,
    featured: false,
    category: potteryCategoryName,
    category_id: potteryCategoryId,
    description: "Handcrafted ceramic coffee mug with comfortable grip",
    rating: 4.7,
    created_at: new Date("2024-01-02"),
    in_stock: true,
    specifications: {
      Material: "Stoneware ceramic",
      Capacity: "12 oz",
      Color: "Cobalt blue",
      Microwave: "Yes",
      Dishwasher: "Yes",
    },
  },
  {
    id: uuidv4(),
    name: "Decorative Serving Bowl",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1564436872-f6d81182df12?w=300",
    images: [
      "https://images.unsplash.com/photo-1564436872-f6d81182df12?w=300",
      "https://images.unsplash.com/photo-1547825407-5d4e1e5c3d05?w=300",
      "https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=300",
    ],
    seller_name: "Maria Rodriguez",
    seller_id: mariaId,
    featured: false,
    category: potteryCategoryName,
    category_id: potteryCategoryId,
    description: "Decorative ceramic serving bowl with intricate patterns",
    rating: 4.9,
    created_at: new Date("2024-01-03"),
    in_stock: true,
    specifications: {
      Material: "Ceramic",
      Size: "8 inches diameter",
      Color: "Sage green",
      Microwave: "No",
      Dishwasher: "No",
    },
  },
  {
    id: uuidv4(),
    name: "Silver Wire Earrings",
    price: 28.0,
    description:
      "Elegant silver wire earrings with a minimalist design. Handcrafted with sterling silver wire.",
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=300",
    images: [
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=300",
      "https://images.unsplash.com/photo-1585926520751-ee2a4d9d7d7c?w=300",
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=300",
    ],
    category: jewelryCategoryName,
    category_id: jewelryCategoryId,
    seller_id: lunaId,
    seller_name: "Luna's Jewelry",
    rating: 4.6,
    created_at: new Date("2024-02-01T16:45:00Z"),
    featured: false,
    specifications: {
      Material: "Sterling silver",
      Style: "Minimalist",
      Length: "1.5 inches",
      Weight: "2g",
      Closure: "Leverback",
    },
    in_stock: true,
  },
  {
    id: uuidv4(),
    name: "Leather Wallet",
    price: 60.0,
    description:
      "A premium leather wallet with multiple card slots and a bill compartment. Made from genuine leather.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
      "https://images.unsplash.com/photo-1521335629791-ce4aec67dd15?w=300",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300",
    ],
    category: leatherGoodsCategoryName,
    category_id: leatherGoodsCategoryId,
    seller_id: tomId,
    seller_name: "Tom's Leather Goods",
    rating: 4.8,
    created_at: new Date("2024-02-05T11:20:00Z"),
    featured: true,
    specifications: {
      Material: "Genuine leather",
      Color: "Chestnut brown",
      "Card slots": "8",
      "ID window": "Yes",
      Dimensions: "4.5x3.5x0.5 inches",
    },
    in_stock: false,
  },
  {
    id: uuidv4(),
    name: "Handwoven Wool Scarf",
    price: 45.0,
    description: "Warm and cozy handwoven wool scarf perfect for winter",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=300",
    images: [
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=300",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300",
      "https://images.unsplash.com/photo-1622550816048-18f5d1a3c0c0?w=300",
    ],
    category: textilesCategoryName,
    category_id: textilesCategoryId,
    seller_id: emmaId,
    seller_name: "Emma's Textiles",
    rating: 4.7,
    created_at: new Date("2024-02-10T09:15:00Z"),
    featured: true,
    specifications: {
      Material: "100% Wool",
      Length: "72 inches",
      Width: "10 inches",
      Color: "Navy blue and cream",
      Care: "Hand wash only",
    },
    in_stock: true,
  },
];

// Get product IDs
const plateSetId = mockProducts[0].id;
const coffeeMugId = mockProducts[1].id;
const servingBowlId = mockProducts[2].id;
const earringsId = mockProducts[3].id;
const walletId = mockProducts[4].id;
const scarfId = mockProducts[5].id;

export const mockReviews: Review[] = [
  {
    id: uuidv4(),
    product_id: plateSetId,
    user_id: mockUsers[0].id,
    user_name: "Sarah Johnson",
    rating: 5,
    comment:
      "These plates are absolutely stunning! The craftsmanship is excellent and they make every meal feel special.",
    created_at: new Date("2024-01-20T09:30:00Z"),
    verified: true,
  },
  {
    id: uuidv4(),
    product_id: coffeeMugId,
    user_id: mockUsers[1].id,
    user_name: "Mike Chen",
    rating: 4,
    comment:
      "Beautiful mug, very well made. Arrived quickly and was well packaged. Perfect size for my morning coffee.",
    created_at: new Date("2024-01-22T14:15:00Z"),
    verified: true,
  },
  {
    id: uuidv4(),
    product_id: servingBowlId,
    user_id: mockUsers[1].id,
    user_name: "Emma Davis",
    rating: 5,
    comment:
      "This serving bowl is a showstopper! The glaze is beautiful and it's the perfect size for salads and sides.",
    created_at: new Date("2024-01-25T16:45:00Z"),
    verified: true,
  },
  {
    id: uuidv4(),
    product_id: earringsId,
    user_id: mockUsers[2].id,
    user_name: "John Wilson",
    rating: 5,
    comment:
      "Elegant and lightweight! These earrings are perfect for everyday wear and go with everything in my wardrobe.",
    created_at: new Date("2024-01-30T11:20:00Z"),
    verified: false,
  },
  {
    id: uuidv4(),
    product_id: walletId,
    user_id: mockUsers[1].id,
    user_name: "Lisa Brown",
    rating: 4,
    comment:
      "Beautiful leather wallet with plenty of space for cards. The craftsmanship is excellent and it feels durable.",
    created_at: new Date("2024-02-05T10:00:00Z"),
    verified: true,
  },
  {
    id: uuidv4(),
    product_id: scarfId,
    user_id: mockUsers[0].id,
    user_name: "Alex Thompson",
    rating: 5,
    comment:
      "So soft and warm! Perfect for the winter season. The colors are even more beautiful in person.",
    created_at: new Date("2024-02-12T15:30:00Z"),
    verified: true,
  },
];
