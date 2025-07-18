// Type-safe environment variable access
declare const process: { env: { [key: string]: string | undefined } } | undefined;

export const appConfig = {
  name: 'Handcrafted Haven',
  version: '1.0.0',
  description: 'Connecting artisans with customers worldwide',
  contact: {
    email: 'contact@handcraftedhaven.com',
    phone: '+1 (555) 123-4567',
    address: '123 Artisan Street, Creative City, CC 12345'
  },
  social: {
    facebook: 'https://facebook.com/handcraftedhaven',
    instagram: 'https://instagram.com/handcraftedhaven',
    twitter: 'https://twitter.com/handcraftedhaven',
    pinterest: 'https://pinterest.com/handcraftedhaven'
  }
};

export const apiConfig = {
  baseUrl: (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) || 'http://localhost:3001',
  endpoints: {
    products: '/api/products',
    sellers: '/api/sellers',
    reviews: '/api/reviews',
    categories: '/api/categories'
  },
  timeout: 30000,
  retryAttempts: 3
};

export const uiConfig = {
  theme: {
    primaryColor: '#8B4513',
    secondaryColor: '#D2691E',
    accentColor: '#CD853F',
    backgroundColor: '#FFF8DC',
    textColor: '#2F4F4F',
    errorColor: '#DC143C',
    successColor: '#228B22',
    warningColor: '#FFB347'
  },
  layout: {
    maxWidth: '1200px',
    containerPadding: '1rem',
    headerHeight: '80px',
    footerHeight: '200px'
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    widescreen: '1200px'
  }
};

export const featuresConfig = {
  enableReviews: true,
  enableWishlist: true,
  enableChat: false,
  enablePayments: true,
  enableShipping: true,
  enableNotifications: true,
  enableAnalytics: false,
  maxImagesPerProduct: 5,
  maxProductsPerSeller: 100,
  maxReviewLength: 500
};

export const seoConfig = {
  defaultTitle: 'Handcrafted Haven - Unique Artisan Goods',
  defaultDescription: 'Discover unique handcrafted goods from talented artisans worldwide. Shop authentic, quality items that tell a story.',
  defaultKeywords: 'handcrafted, artisan, handmade, unique, crafts, art, pottery, textiles, jewelry',
  siteUrl: 'https://handcraftedhaven.com',
  ogImage: '/images/og-image.png',
  twitterHandle: '@handcraftedhaven'
};

export const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'home-decor', label: 'Home Decor' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'textiles', label: 'Textiles' },
  { value: 'ceramics', label: 'Ceramics' },
  { value: 'woodwork', label: 'Woodwork' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'art', label: 'Art' },
  { value: 'kitchen', label: 'Kitchen & Dining' },
  { value: 'clothing', label: 'Clothing' }
];

export const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviews' },
  { value: 'name', label: 'Name: A to Z' }
];

export const paymentMethods = [
  { id: 'credit-card', name: 'Credit Card', icon: '💳' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️' },
  { id: 'apple-pay', name: 'Apple Pay', icon: '📱' },
  { id: 'google-pay', name: 'Google Pay', icon: '🎯' }
];

export const shippingOptions = [
  { id: 'standard', name: 'Standard Shipping', price: 5.99, days: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 12.99, days: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 24.99, days: '1 business day' },
  { id: 'free', name: 'Free Shipping', price: 0, days: '7-10 business days', minOrder: 75 }
];
