'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface EditAccountFormProps {
  initialData: {
    name: string;
    email: string;
  };
}

export default function EditAccountForm({ initialData }: EditAccountFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState(initialData);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync formData if initialData changes (e.g., on page load)
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

      // Refresh the page's server components and data (soft refresh)
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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          name="name"
          value={formData.name}
          onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
          required
        />
      </label>

      <label>
        Email:
        <input
          name="email"
          value={formData.email}
          onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
          type="email"
        />
      </label>

      <button type="submit" disabled={status === 'saving'}>
        {status === 'saving' ? 'Saving...' : 'Save Changes'}
      </button>

      {status === 'error' && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {status === 'success' && (
        <p style={{ color: 'green' }}>Profile updated!</p>
      )}
    </form>
  );
}
