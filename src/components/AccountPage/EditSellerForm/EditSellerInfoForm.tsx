'use client';
import React, { useState, useEffect } from 'react';

interface EditSellerInfoFormProps {
  email: string; // user's email to fetch seller info
}

export default function EditSellerInfoForm({ email }: EditSellerInfoFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    profileImage: '',
    location: '',
    specialties: '',
    story: '',
    contactEmail: '',
    phone: '',
    website: '',
    instagram: '',
    facebook: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSellerInfo() {
      try {
        const res = await fetch(`/api/sellers?email=${encodeURIComponent(email)}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch seller info (status: ${res.status})`);
        }
        const seller = await res.json();

        if (seller) {
          setFormData({
            name: seller.name || '',
            bio: seller.bio || '',
            profileImage: seller.profile_image || '',
            location: seller.location || '',
            specialties: Array.isArray(seller.specialties) ? seller.specialties.join(', ') : '',
            story: seller.story || '',
            contactEmail: seller.contact_email || '',
            phone: seller.contact_phone || '',
            website: seller.contact_website || '',
            instagram: seller.instagram_handle || '',
            facebook: seller.facebook_page || '',
          });
        }
      } catch (err: any) {
        console.error('Error loading seller info:', err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    if (email) {
      fetchSellerInfo();
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      specialties: formData.specialties.split(',').map((s) => s.trim()),
      contact: {
        email: formData.contactEmail,
        phone: formData.phone,
        website: formData.website,
      },
      socialMedia: {
        instagram: formData.instagram,
        facebook: formData.facebook,
      },
      userEmail: email,
    };

    try {
      const res = await fetch('/api/sellers/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save seller info');

      alert('Seller info saved!');
    } catch (err: any) {
      alert(err.message || 'Failed to save seller info');
    }
  };

  if (loading) return <p>Loading seller info...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Seller Info</h3>

      <input
        type="text"
        placeholder="Seller Name"
        value={formData.name}
        onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
        required
      />

      <textarea
        placeholder="Bio"
        value={formData.bio}
        onChange={(e) => setFormData((d) => ({ ...d, bio: e.target.value }))}
      />

      <input
        type="text"
        placeholder="Profile Image URL"
        value={formData.profileImage}
        onChange={(e) => setFormData((d) => ({ ...d, profileImage: e.target.value }))}
      />

      <input
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData((d) => ({ ...d, location: e.target.value }))}
      />

      <input
        type="text"
        placeholder="Specialties (comma separated)"
        value={formData.specialties}
        onChange={(e) => setFormData((d) => ({ ...d, specialties: e.target.value }))}
      />

      <textarea
        placeholder="Your Story"
        value={formData.story}
        onChange={(e) => setFormData((d) => ({ ...d, story: e.target.value }))}
      />

      <input
        type="email"
        placeholder="Contact Email"
        value={formData.contactEmail}
        onChange={(e) => setFormData((d) => ({ ...d, contactEmail: e.target.value }))}
      />

      <input
        type="text"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
      />

      <input
        type="text"
        placeholder="Website"
        value={formData.website}
        onChange={(e) => setFormData((d) => ({ ...d, website: e.target.value }))}
      />

      <input
        type="text"
        placeholder="Instagram"
        value={formData.instagram}
        onChange={(e) => setFormData((d) => ({ ...d, instagram: e.target.value }))}
      />

      <input
        type="text"
        placeholder="Facebook"
        value={formData.facebook}
        onChange={(e) => setFormData((d) => ({ ...d, facebook: e.target.value }))}
      />

      <button type="submit">Save Seller Info</button>
    </form>
  );
}
