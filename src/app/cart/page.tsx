// src/app/cart/page.tsx
'use client'; // This page needs to be a Client Component to use the useCart hook

import { useCart } from '@/hooks/useCart'; // Import your useCart hook
import Link from 'next/link'; // For "Continue Shopping" link

export default function CartPage() {
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  if (totalItems === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Your Cart is Empty!</h1>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link href="/products" style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#4B8F29', /* primary-green */
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px'
        }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '80px auto 50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <h1>Your Shopping Cart</h1>
      {cart.map(item => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
          <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px', borderRadius: '4px' }} />
          <div style={{ flexGrow: 1 }}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price.toFixed(2)}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
              <input
                type="number"
                id={`quantity-${item.id}`}
                value={item.quantity}
                min="1"
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                style={{ width: '60px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  backgroundColor: '#dc3545', /* red */
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
          </div>
          <p style={{ fontWeight: 'bold' }}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}

      <div style={{ marginTop: '30px', borderTop: '2px solid #ddd', paddingTop: '20px', textAlign: 'right' }}>
        <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Total Items: {totalItems}</p>
        <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#4B8F29' }}>Order Total: ${totalPrice.toFixed(2)}</p>
        <button
          onClick={clearCart}
          style={{
            backgroundColor: '#6c757d', /* dark-gray */
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Clear Cart
        </button>
        <button
          style={{
            backgroundColor: '#F4A300', /* primary-yellow */
            color: '#2F2F2F',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'not-allowed'
          }}
          disabled
        >
          Proceed to Checkout (Disabled for now)
        </button>
      </div>
    </div>
  );
}