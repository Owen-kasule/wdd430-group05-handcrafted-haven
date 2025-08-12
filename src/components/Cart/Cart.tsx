'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import './Cart.css';

export default function Cart() {
  const { cartItems, removeFromCart, addToCart } = useCart();

  // We’ll reuse your updateQuantity logic via addToCart:
  // To update quantity, add the difference between new quantity and current quantity
  const updateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return;

    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const diff = newQty - item.quantity;
    if (diff === 0) return;

    addToCart({ ...item, quantity: diff });
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) return <p>Your cart is empty</p>;

return (
  <div className="cart-container">
    <ul>
      {cartItems.map(item => (
        <li key={item.id}>
          <div>
            <strong>{item.name}</strong> - ${item.price.toFixed(2)}
          </div>

          <div>
            Quantity: 
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            />
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </li>
      ))}
    </ul>

    <div className="cart-total">Total: ${totalPrice.toFixed(2)}</div>

    <div className="checkout-summary">
      <span className="total-label">Order Total:</span>
      <span>${totalPrice.toFixed(2)}</span>
      <button className="checkout-button" disabled>
        Checkout
      </button>
    </div>
  </div>
);

}
