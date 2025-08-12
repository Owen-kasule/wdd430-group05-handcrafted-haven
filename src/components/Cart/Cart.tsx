'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import './Cart.css';

export default function Cart() {
  const { cartItems, removeFromCart, addToCart } = useCart();

  // Function to update item quantity in the cart
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

  return (
    <div className="cart-container">
      <h2 className="cart-header">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <Link href="/products" className="continue-shopping">
            <button className="shop-btn" type="button">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">${item.price.toFixed(2)}</span>
                </div>

                <div className="item-controls">
                  <div className="quantity-control">
                    <span className="quantity-label">Qty:</span>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                      title="Quantity"
                      placeholder="Quantity"
                    />
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">Total: ${totalPrice.toFixed(2)}</div>

          <div className="checkout-summary">
            <span className="total-label">Order Total:</span>
            <span className="total-amount">${totalPrice.toFixed(2)}</span>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
