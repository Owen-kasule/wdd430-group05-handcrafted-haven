'use client';
import { useEffect, useState } from 'react';

export interface Seller {
  id: string;
  name: string;
  bio: string;
  profileImage: string;
  location: string;
  joinDate: string;
  rating: number;
  totalReviews: number;
  totalSales: number;
  specialties: string[];
  story: string;
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
  };
}

interface EditSellerInfoFormProps {
  email: string;
}

export default function EditSellerInfoForm({ email }: EditSellerInfoFormProps) {
  const [formData, setFormData] = useState<Seller | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    async function fetchSeller() {
  try {
    const res = await fetch(`/api/sellers/byEmail?email=${encodeURIComponent(email)}`);
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    
    console.log('Fetched seller data:', data);  // <-- Add this to inspect data shape

    setFormData({
      ...data,
      contact: {
        email: data.contact_email || '',
        phone: data.contact_phone || '',
        website: data.contact_website || '',
      },
      socialMedia: {
        instagram: data.instagram_handle || '',
        facebook: data.facebook_page || '',
      },
    });
    setStatus('ready');
  } catch (error) {
    console.error(error);
    setStatus('error');
  }
}


    fetchSeller();
  }, [email]);

  if (status === 'loading') return <p>Loading seller info...</p>;
  if (status === 'error' || !formData) return <p>Failed to load seller info.</p>;

  function handleNestedChange(parentKey: 'contact' | 'socialMedia', childKey: string, value: string) {
    setFormData((prev) => ({
      ...prev!,
      [parentKey]: {
        ...prev?.[parentKey],
        [childKey]: value,
      },
    }));
  }

  const handleInputChange = (field: keyof Seller, value: any) => {
    setFormData((d) => (d ? { ...d, [field]: value } : d));
  };

  const handleSpecialtiesChange = (value: string) => {
    const specialtiesArray = value
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    handleInputChange('specialties', specialtiesArray);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API call here to save updated seller info
    console.log('Saving seller info:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type='text'
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />
      </label>

      <label>
        Bio:
        <textarea
          value={formData.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
        />
      </label>

      <label>
        Profile Image URL:
        <input
          type='text'
          value={formData.profileImage}
          onChange={(e) => handleInputChange('profileImage', e.target.value)}
        />
      </label>

      <label>
        Location:
        <input
          type='text'
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
        />
      </label>

      <label>
        Join Date:
        <input
          type='date'
          value={formData.joinDate ? formData.joinDate.slice(0, 10) : ''}
          onChange={(e) => handleInputChange('joinDate', e.target.value)}
        />
      </label>

      <label>
        Rating:
        <input
          type='number'
          min={0}
          max={5}
          step={0.1}
          value={formData.rating}
          onChange={(e) =>
            handleInputChange('rating', parseFloat(e.target.value))
          }
        />
      </label>

      <label>
        Total Reviews:
        <input
          type='number'
          min={0}
          value={formData.totalReviews}
          onChange={(e) =>
            handleInputChange('totalReviews', parseInt(e.target.value, 10))
          }
        />
      </label>

      <label>
        Total Sales:
        <input
          type='number'
          min={0}
          value={formData.totalSales}
          onChange={(e) =>
            handleInputChange('totalSales', parseInt(e.target.value, 10))
          }
        />
      </label>

      <label>
        Specialties (comma separated):
        <input
          type='text'
          value={formData.specialties.join(', ')}
          onChange={(e) => handleSpecialtiesChange(e.target.value)}
        />
      </label>

      <label>
        Story:
        <textarea
          value={formData.story}
          onChange={(e) => handleInputChange('story', e.target.value)}
        />
      </label>

      <fieldset>
        <legend>Contact Info</legend>

        <label>
          Email:
          <input
            type='email'
            value={formData.contact.email ?? ''}
            onChange={(e) =>
              handleNestedChange('contact', 'email', e.target.value)
            }
            required
          />
        </label>

        <label>
          Phone:
          <input
            type='tel'
            value={formData.contact.phone ?? ''}
            onChange={(e) =>
              handleNestedChange('contact', 'phone', e.target.value)
            }
          />
        </label>

        <label>
          Website:
          <input
            type='url'
            value={formData.contact.website ?? ''}
            onChange={(e) =>
              handleNestedChange('contact', 'website', e.target.value)
            }
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Social Media</legend>

        <label>
          Instagram:
          <input
            type='text'
            value={formData.socialMedia.instagram ?? ''}
            onChange={(e) =>
              handleNestedChange('socialMedia', 'instagram', e.target.value)
            }
          />
        </label>

        <label>
          Facebook:
          <input
            type='text'
            value={formData.socialMedia.facebook ?? ''}
            onChange={(e) =>
              handleNestedChange('socialMedia', 'facebook', e.target.value)
            }
          />
        </label>
      </fieldset>

      <button type='submit'>Save Seller Info</button>
    </form>
  );
}
