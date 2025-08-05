'use client';

import { useState } from 'react';

interface CreateProductFormProps {
  sellerId: string;
  sellerName: string;
}

export default function CreateProductForm({
  sellerId,
  sellerName,
}: CreateProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category_id: '',
    image: '',
    in_stock: true,
    specifications: {} as Record<string, string>,
  });

  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>(
    'idle'
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handler for input changes (string fields)
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const name = target.name;

    // Check if it's a checkbox input to get checked value
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: target.value,
      }));
    }
  };

  // You can add UI for specifications if desired, for now we leave it empty

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    setErrorMessage(null);

    // Simple validation
    if (!formData.name || !formData.price || !formData.category_id) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    try {
      const res = await fetch('/api/products/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          seller_id: sellerId,
          seller_name: sellerName,
          rating: 0,
          created_at: new Date(),
          featured: false,
          images: formData.image ? [formData.image] : [],
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create product');
      }

      setStatus('success');
      setFormData({
        name: '',
        price: '',
        description: '',
        category_id: '',
        image: '',
        in_stock: true,
        specifications: {},
      });
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unknown error occurred');
      }
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Name*:
        <input
          name='name'
          type='text'
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Price*:
        <input
          name='price'
          type='number'
          min='0'
          step='0.01'
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Description:
        <textarea
          name='description'
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Category ID*:
        <input
          name='category_id'
          type='text'
          value={formData.category_id}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Main Image URL:
        <input
          name='image'
          type='url'
          value={formData.image}
          onChange={handleChange}
        />
      </label>

      <label>
        In Stock:
        <input
          name='in_stock'
          type='checkbox'
          checked={formData.in_stock}
          onChange={handleChange}
        />
      </label>

      <button type='submit' disabled={status === 'saving'}>
        {status === 'saving' ? 'Saving...' : 'Create Product'}
      </button>

      {status === 'error' && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {status === 'success' && (
        <p style={{ color: 'green' }}>Product created!</p>
      )}
    </form>
  );
}
