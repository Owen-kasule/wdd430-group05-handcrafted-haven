'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EditSellerInfoForm from '../EditSellerForm/EditSellerInfoForm';

interface EditAccountFormProps {
  initialData: {
    name: string;
    email: string;
    role: string;
  };
}

export default function EditAccountForm({ initialData }: EditAccountFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState(initialData);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>(
    'idle'
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('saving');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/account/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update');
      }

      setStatus('success');
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        setErrorMessage(err.message);
      } else {
        console.error('Unknown error', err);
        setErrorMessage('An unknown error occurred');
      }
      setStatus('error');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name='name'
            value={formData.name}
            onChange={(e) =>
              setFormData((d) => ({ ...d, name: e.target.value }))
            }
            required
          />
        </label>

        <label>
          Email:
          <input
            name='email'
            type='email'
            value={formData.email}
            onChange={(e) =>
              setFormData((d) => ({ ...d, email: e.target.value }))
            }
            required
          />
        </label>

        <label>
          Role:
          <select
            name='role'
            value={formData.role}
            onChange={(e) =>
              setFormData((d) => ({ ...d, role: e.target.value }))
            }
            required
          >
            <option value='buyer'>Buyer</option>
            <option value='seller'>Seller</option>
            <option value='admin'>Admin</option>
          </select>
        </label>

        <button type='submit' disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving...' : 'Save Changes'}
        </button>

        {status === 'error' && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {status === 'success' && (
          <p style={{ color: 'green' }}>Profile updated!</p>
        )}
      </form>

      {/* Only show seller form if role is seller */}
      {formData.role === 'seller' && (
        <EditSellerInfoForm email={formData.email} />
      )}
    </>
  );
}
