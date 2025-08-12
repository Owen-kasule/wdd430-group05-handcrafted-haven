'use client'; // Needed if you want to use hooks or state inside this page

import React from 'react';
import CheckoutForm from '@/components/Checkout/Checkout'; // Renamed import to avoid conflict

export default function CheckoutPage() {
  return (
    <main className="checkout-page">
      <h2>Review & Place your Order</h2>
      <CheckoutForm />
    </main>
  );
}