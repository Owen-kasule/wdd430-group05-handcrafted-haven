'use client'; // This hook needs to be a Client Component

import { useState, useEffect } from 'react';
// Import both CartItem and Product from your common types file
import type { CartItem, Product } from '@/types/common';

const CART_STORAGE_KEY = 'simple_nextjs_cart';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // This runs once when the component mounts
    if (typeof window !== 'undefined') { // Ensure we are in a browser environment
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return []; // Return empty array if not in browser (e.g., during server-side rendering)
  });

  // Effect to sync cart state with localStorage whenever cart changes
  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensure we are in a browser environment
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]); // Dependency array: runs whenever 'cart' state changes

  // Function to add a product to the cart
  // It now correctly accepts a 'Product' type
  const addToCart = (product: Product) => { // Changed type to Product
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // If item exists, increase its quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        // We only take relevant fields for CartItem
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0], // Assuming product.images[0] is the main image
            quantity: 1,
          },
        ];
      }
    });
  };

  // Function to remove an item from the cart by its ID
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) { // Handle cases where quantity goes to 0 or less
      removeFromCart(id); // Remove item if quantity is 0 or less
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total number of items in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price of all items in the cart
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Return all cart state and functions
  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
}