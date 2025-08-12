'use client';

import { useState, useEffect } from 'react';
import CategorySelect from './CategorySelect';
import getSellerInfoBySellerId from './connectSellerInfo';

interface CreateProductFormProps {
  sellerId: string;
  sellerName: string;
}

interface Category {
  id: string;
  name: string;
}

export default function CreateProductForm({
  sellerId,
  sellerName,
}: CreateProductFormProps) {


  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '', // category name
    category_id: '',
    in_stock: true,
    featured: false,
    images: [] as string[],
    specifications: {} as Record<string, string>,
  });

  const [newImage, setNewImage] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>(
    'idle'
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  // Handle category dropdown change
  const handleCategorySelect = (id: string, name: string) => {
    setFormData((prev) => {
      const updated = { ...prev, category_id: id, category: name };
      console.log('Category selected:', id, name, updated);
      return updated;
    });
  };

  // Image handlers
  const handleAddImage = () => {
    if (newImage.trim()) {
      setFormData((prev) => {
        const updated = { ...prev, images: [...prev.images, newImage.trim()] };
        console.log('Image added:', newImage.trim(), updated.images);
        return updated;
      });
      setNewImage('');
    }
  };
  const handleRemoveImage = (index: number) => {
    setFormData((prev) => {
      const updatedImages = prev.images.filter((_, i) => i !== index);
      console.log('Image removed at index:', index, updatedImages);
      return { ...prev, images: updatedImages };
    });
  };

  // Specification handlers
  const handleAddSpec = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setFormData((prev) => {
        const updatedSpecs = {
          ...prev.specifications,
          [newSpecKey.trim()]: newSpecValue.trim(),
        };
        console.log(
          'Specification added:',
          newSpecKey.trim(),
          newSpecValue.trim(),
          updatedSpecs
        );
        return { ...prev, specifications: updatedSpecs };
      });
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };
  const handleRemoveSpec = (key: string) => {
    setFormData((prev) => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      console.log('Specification removed:', key, newSpecs);
      return { ...prev, specifications: newSpecs };
    });
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    console.log('Form submit started, current formData:', formData);

    try {
      const seller = await getSellerInfoBySellerId(sellerId);
      console.log(
        'Seller info fetched:',
        seller.name,
        'actual seller id:',
        seller.id
      );

      if (!seller || !seller.id) {
        throw new Error('Seller information is incomplete');
      }

      // Build payload using dynamic seller.id
      const payload = {
        ...formData,
        price: Number(formData.price),
        seller_id: seller.id,
        seller_name: seller.name,
        rating: 0,
        created_at: new Date(),
        updated_at: new Date(),
        product_images: formData.images.map((url) => ({ image_url: url })),
        product_specifications: Object.entries(formData.specifications).map(
          ([spec_key, spec_value]) => ({ spec_key, spec_value })
        ),
      };

      console.log('Payload sent to API:', payload);

      const res = await fetch('/api/products/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create product');
      }

      const data = await res.json();
      console.log('Product created successfully:', data);

      // Update status or reset form as needed here
      setStatus('success');
    } catch (err) {
      console.error('Submit error:', err);
      setErrorMessage(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Name*:
        <input
          name='name'
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

      {/* Category dropdown */}
      <CategorySelect
        value={formData.category_id}
        onChange={handleCategorySelect}
      />

      <label>
        Featured:
        <input
          type='checkbox'
          name='featured'
          checked={formData.featured}
          onChange={handleChange}
        />
      </label>

      <label>
        In Stock:
        <input
          type='checkbox'
          name='in_stock'
          checked={formData.in_stock}
          onChange={handleChange}
        />
      </label>

      {/* Images Section */}
      <div>
        <h4>Images</h4>
        <input
          type='url'
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
          placeholder='Enter image URL'
        />
        <button type='button' onClick={handleAddImage}>
          Add Image
        </button>
        <ul>
          {formData.images.map((url, i) => (
            <li key={i}>
              {url}{' '}
              <button type='button' onClick={() => handleRemoveImage(i)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Specifications Section */}
      <div>
        <h4>Specifications</h4>
        <input
          placeholder='Key'
          value={newSpecKey}
          onChange={(e) => setNewSpecKey(e.target.value)}
        />
        <input
          placeholder='Value'
          value={newSpecValue}
          onChange={(e) => setNewSpecValue(e.target.value)}
        />
        <button type='button' onClick={handleAddSpec}>
          Add Specification
        </button>
        <ul>
          {Object.entries(formData.specifications).map(([key, value]) => (
            <li key={key}>
              {key}: {value}{' '}
              <button type='button' onClick={() => handleRemoveSpec(key)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

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
