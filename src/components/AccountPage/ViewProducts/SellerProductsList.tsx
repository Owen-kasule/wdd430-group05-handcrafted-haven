'use client';

import { useEffect, useState } from 'react';
import getSellerInfoBySellerId from '../CreateForm/connectSellerInfo';
import { supabase } from '@/lib/supabaseClient';
import '@/components/reviewList/reviewList.css';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  category_id?: string;
  description?: string;
  featured: boolean;
  in_stock: boolean;
  specifications: Record<string, string>;
  created_at: string;
}

interface SellerProductsListProps {
  sellerId: string;
}

export default function SellerProductsList({
  sellerId,
}: SellerProductsListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({
    specifications: {},
  });

  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  // useEffect(() => {
  //   async function fetchProducts() {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const seller = await getSellerInfoBySellerId(sellerId);
  //       if (!seller?.id) throw new Error('Seller id not found');

  //       const { data, error } = await supabase
  //         .from('products')
  //         .select('*')
  //         .eq('seller_id', seller.id)
  //         .order('created_at', { ascending: false });

  //       if (error) throw error;

  //       const normalized = (data || []).map((p) => ({
  //         ...p,
  //         specifications: p.specifications || {},
  //         featured: !!p.featured,
  //         in_stock: !!p.in_stock,
  //       }));

  //       console.log('Normalized products:', normalized);

  //       // Just for testing, not setting products yet:
  //     //   setProducts(normalized);
  //     } catch (err: any) {
  //       setError(err.message || 'Failed to fetch products');
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   if (sellerId) fetchProducts();
  // }, [sellerId]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const seller = await getSellerInfoBySellerId(sellerId);
        const response = await fetch(`/api/products?sellerId=${seller.id}`);
        if (!response.ok) throw new Error('Failed to fetch products');



        const data = await response.json();
        const products = data.products || [];
        console.log('Fetched products:', products);

        const normalized = products.map((p: any) => {
          const specs =
            p.product_specifications?.reduce((acc: any, spec: any) => {
              acc[spec.spec_key] = spec.spec_value;
              return acc;
            }, {}) || {};

          return {
            ...p,
            featured: !!p.featured,
            in_stock: !!p.in_stock,
            specifications: specs,
          };
        });

        setProducts(normalized);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }

    if (sellerId) fetchProducts();
  }, [sellerId]);

  function startEdit(product: Product) {
    setEditingProductId(product.id);
    setEditForm({
      name: product.name,
      price: product.price,
      category: product.category,
      category_id: product.category_id,
      description: product.description,
      featured: product.featured,
      in_stock: product.in_stock,
      specifications: product.specifications || {},
    });
  }

  function cancelEdit() {
    setEditingProductId(null);
    setEditForm({ specifications: {} });
    setNewSpecKey('');
    setNewSpecValue('');
  }

  function handleInputChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const target = e.target;
    const name = target.name;
    let value: any;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      value = target.checked;
    } else if (target instanceof HTMLInputElement && target.type === 'number') {
      value = Number(target.value);
    } else {
      value = target.value;
    }

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Specs handlers for editing
  function handleAddSpec() {
    if (!newSpecKey.trim() || !newSpecValue.trim()) return;
    setEditForm((prev) => ({
      ...prev,
      specifications: {
        ...(prev.specifications || {}),
        [newSpecKey.trim()]: newSpecValue.trim(),
      },
    }));
    setNewSpecKey('');
    setNewSpecValue('');
  }

  function handleRemoveSpec(key: string) {
    setEditForm((prev) => {
      const newSpecs = { ...(prev.specifications || {}) };
      delete newSpecs[key];
      return { ...prev, specifications: newSpecs };
    });
  }

  async function handleUpdate(id: string) {
    try {
      const updates = {
        name: editForm.name,
        price: editForm.price,
        category: editForm.category,
        category_id: editForm.category_id,
        description: editForm.description,
        featured: editForm.featured,
        in_stock: editForm.in_stock,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id);
      if (error) throw error;

      // Update specifications
      if (
        editForm.specifications &&
        typeof editForm.specifications === 'object'
      ) {
        // Delete existing specs
        const { error: delSpecError } = await supabase
          .from('product_specifications')
          .delete()
          .eq('product_id', id);
        if (delSpecError) throw delSpecError;

        // Insert new specs
        const specsToInsert = Object.entries(editForm.specifications).map(
          ([key, val]) => ({
            product_id: id,
            spec_key: key,
            spec_value: val,
          })
        );

        if (specsToInsert.length > 0) {
          const { error: insertSpecError } = await supabase
            .from('product_specifications')
            .insert(specsToInsert);
          if (insertSpecError) throw insertSpecError;
        }
      }

      setProducts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                ...updates,
                name: editForm.name ?? p.name,
                price: editForm.price ?? p.price,
                category: editForm.category ?? p.category,
                category_id: editForm.category_id ?? p.category_id,
                description: editForm.description ?? p.description,
                featured: editForm.featured ?? p.featured,
                in_stock: editForm.in_stock ?? p.in_stock,
                specifications: editForm.specifications ?? p.specifications,
              }
            : p
        )
      );

      cancelEdit();
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update product.');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete product.');
    }
  }

  if (loading) return <p className='loading'>Loading products...</p>;
  if (error) return <p className='error'>Error: {error}</p>;
  if (products.length === 0)
    return <p className='no-reviews'>No products found.</p>;

  return (
    <div className='reviews-container'>
      <table className='reviews-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Featured</th>
            <th>In Stock</th>
            <th>Specifications</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const isEditing = editingProductId === product.id;
            return (
              <tr key={product.id}>
                <td>
                  {isEditing ? (
                    <input
                      name='name'
                      value={editForm.name || ''}
                      onChange={handleInputChange}
                      className='edit-input'
                    />
                  ) : (
                    product.name
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      name='price'
                      type='number'
                      min='0'
                      value={editForm.price || 0}
                      onChange={handleInputChange}
                      className='edit-input'
                    />
                  ) : (
                    `$${product.price.toFixed(2)}`
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      name='category'
                      value={editForm.category || ''}
                      onChange={handleInputChange}
                      className='edit-input'
                    />
                  ) : (
                    product.category
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <textarea
                      name='description'
                      value={editForm.description || ''}
                      onChange={handleInputChange}
                      className='edit-textarea'
                    />
                  ) : (
                    product.description || '-'
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      type='checkbox'
                      name='featured'
                      checked={!!editForm.featured}
                      onChange={handleInputChange}
                    />
                  ) : product.featured ? (
                    'Yes'
                  ) : (
                    'No'
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      type='checkbox'
                      name='in_stock'
                      checked={!!editForm.in_stock}
                      onChange={handleInputChange}
                    />
                  ) : product.in_stock ? (
                    'Yes'
                  ) : (
                    'No'
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <>
                      <input
                        placeholder='Key'
                        value={newSpecKey}
                        onChange={(e) => setNewSpecKey(e.target.value)}
                        className='edit-input'
                      />
                      <input
                        placeholder='Value'
                        value={newSpecValue}
                        onChange={(e) => setNewSpecValue(e.target.value)}
                        className='edit-input'
                      />
                      <button type='button' onClick={handleAddSpec}>
                        Add
                      </button>
                      <ul>
                        {Object.entries(editForm.specifications || {}).map(
                          ([key, val]) => (
                            <li key={key}>
                              {key}: {val}{' '}
                              <button
                                type='button'
                                onClick={() => handleRemoveSpec(key)}
                              >
                                Remove
                              </button>
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  ) : (
                    <ul>
                      {Object.entries(product.specifications || {}).map(
                        ([key, val]) => (
                          <li key={key}>
                            {key}: {val}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </td>

                <td>{new Date(product.created_at).toLocaleDateString()}</td>

                <td>
                  {isEditing ? (
                    <>
                      <button
                        className='btn save-btn'
                        onClick={() => handleUpdate(product.id)}
                      >
                        Save
                      </button>
                      <button className='btn cancel-btn' onClick={cancelEdit}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className='btn edit-btn'
                        onClick={() => startEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className='btn delete-btn'
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
