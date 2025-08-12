'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './Checkout.css';

interface CheckoutFormData {
  fname: string;
  lname: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  expiration: string;
  code: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState<CheckoutFormData>({
    fname: '',
    lname: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiration: '',
    code: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error as user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          orderDate: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Checkout failed');
        return;
      }

      alert('Order placed successfully!');
      router.push('/order-confirmation');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong during checkout.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="checkout-page">
      <h2>Review & Place your Order</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <fieldset>
          <legend>Shipping Information</legend>
          <div className="form-group">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleInputChange}
              className={errors.fname ? 'error' : ''}
            />
            {errors.fname && <span className="error-message">{errors.fname}</span>}

            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              id="lname"
              name="lname"
              value={formData.lname}
              onChange={handleInputChange}
              className={errors.lname ? 'error' : ''}
            />
            {errors.lname && <span className="error-message">{errors.lname}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="street">Street Address</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              className={errors.street ? 'error' : ''}
            />
            {errors.street && <span className="error-message">{errors.street}</span>}

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={errors.city ? 'error' : ''}
            />
            {errors.city && <span className="error-message">{errors.city}</span>}

            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className={errors.state ? 'error' : ''}
            />
            {errors.state && <span className="error-message">{errors.state}</span>}

            <label htmlFor="zip">Zip</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              className={errors.zip ? 'error' : ''}
            />
            {errors.zip && <span className="error-message">{errors.zip}</span>}
          </div>
        </fieldset>

        <fieldset>
          <legend>Payment</legend>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className={errors.cardNumber ? 'error' : ''}
            />
            {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}

            <label htmlFor="expiration">Expiration</label>
            <input
              type="text"
              id="expiration"
              name="expiration"
              value={formData.expiration}
              onChange={handleInputChange}
              className={errors.expiration ? 'error' : ''}
            />
            {errors.expiration && <span className="error-message">{errors.expiration}</span>}

            <label htmlFor="code">CVV</label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className={errors.code ? 'error' : ''}
            />
            {errors.code && <span className="error-message">{errors.code}</span>}
          </div>
        </fieldset>

        <button type="submit" className="checkout-btn" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Checkout'}
        </button>
      </form>
    </main>
  );
}