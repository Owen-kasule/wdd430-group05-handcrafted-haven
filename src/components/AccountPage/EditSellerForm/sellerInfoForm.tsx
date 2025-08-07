'use client';
import React from 'react';
import type { Seller } from './EditSellerInfoForm';

interface SellerInfoFormProps {
  formData: Seller;
  onInputChange: (field: keyof Seller, value: any) => void;
  onNestedChange: (
    parentKey: 'contact' | 'socialMedia',
    childKey: string,
    value: string
  ) => void;
  onSpecialtiesChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function SellerInfoForm({
  formData,
  onInputChange,
  onNestedChange,
  onSpecialtiesChange,
  onSubmit,
}: SellerInfoFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Name:
        <input
          type='text'
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          required
        />
      </label>

      <label>
        Bio:
        <textarea
          value={formData.bio}
          onChange={(e) => onInputChange('bio', e.target.value)}
        />
      </label>

      <label>
        Profile Image URL:
        <input
          type='text'
          value={formData.profileImage}
          onChange={(e) => onInputChange('profileImage', e.target.value)}
        />
      </label>

      <label>
        Location:
        <input
          type='text'
          value={formData.location}
          onChange={(e) => onInputChange('location', e.target.value)}
        />
      </label>

      <label>
        Join Date:
        <input
          type='date'
          value={formData.joinDate ? formData.joinDate.slice(0, 10) : ''}
          onChange={(e) => onInputChange('joinDate', e.target.value)}
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
            onInputChange('rating', parseFloat(e.target.value))
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
            onInputChange('totalReviews', parseInt(e.target.value, 10))
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
            onInputChange('totalSales', parseInt(e.target.value, 10))
          }
        />
      </label>

      <label>
        Specialties (comma separated):
        <input
          type='text'
          value={formData.specialties.join(', ')}
          onChange={(e) => onSpecialtiesChange(e.target.value)}
        />
      </label>

      <label>
        Story:
        <textarea
          value={formData.story}
          onChange={(e) => onInputChange('story', e.target.value)}
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
              onNestedChange('contact', 'email', e.target.value)
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
              onNestedChange('contact', 'phone', e.target.value)
            }
          />
        </label>

        <label>
          Website:
          <input
            type='url'
            value={formData.contact.website ?? ''}
            onChange={(e) =>
              onNestedChange('contact', 'website', e.target.value)
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
              onNestedChange('socialMedia', 'instagram', e.target.value)
            }
          />
        </label>

        <label>
          Facebook:
          <input
            type='text'
            value={formData.socialMedia.facebook ?? ''}
            onChange={(e) =>
              onNestedChange('socialMedia', 'facebook', e.target.value)
            }
          />
        </label>
      </fieldset>

      <button type='submit'>Save Seller Info</button>
    </form>
  );
}
