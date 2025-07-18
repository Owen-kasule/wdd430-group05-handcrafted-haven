// Type definitions for UI components
declare module '@handcrafted-haven/ui' {
  import * as React from 'react';

  export const Navbar: React.ComponentType<any>;
  export const ProductCard: React.ComponentType<any>;
  export const ProductPage: React.ComponentType<any>;
  export const SellerProfile: React.ComponentType<any>;
  export const Homepage: React.ComponentType<any>;
  export const AboutPage: React.ComponentType<any>;
}

// Individual component declarations
declare const Navbar: React.ComponentType<any>;
declare const ProductCard: React.ComponentType<any>;
declare const ProductPage: React.ComponentType<any>;
declare const SellerProfile: React.ComponentType<any>;
declare const Homepage: React.ComponentType<any>;
declare const AboutPage: React.ComponentType<any>;

export {
  Navbar,
  ProductCard,
  ProductPage,
  SellerProfile,
  Homepage,
  AboutPage
};
