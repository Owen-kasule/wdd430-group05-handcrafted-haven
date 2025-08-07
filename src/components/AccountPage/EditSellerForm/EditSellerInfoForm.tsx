import { useEffect, useState } from 'react';
import SellerInfoForm from './sellerInfoForm';

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

        setFormData({
          id: data.id,
          name: data.name,
          bio: data.bio,
          profileImage: data.profile_image,
          location: data.location,
          joinDate: data.join_date,
          rating: data.rating,
          totalReviews: data.total_reviews,
          totalSales: data.total_sales,
          specialties: data.specialties,
          story: data.story,
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

  const handleNestedChange = (
    parentKey: 'contact' | 'socialMedia',
    childKey: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev!,
      [parentKey]: {
        ...prev?.[parentKey],
        [childKey]: value,
      },
    }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData?.id) return;

    const flattenedData: any = {
      ...formData,
      contact_email: formData.contact?.email,
      contact_phone: formData.contact?.phone,
      contact_website: formData.contact?.website,
      instagram_handle: formData.socialMedia?.instagram,
      facebook_page: formData.socialMedia?.facebook,
    };

    delete flattenedData.contact;
    delete flattenedData.socialMedia;

    try {
      const res = await fetch(`/api/sellers/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flattenedData),
      });

      if (!res.ok) throw new Error('Update failed');
      await res.json();
    } catch (err) {
      console.error('Error updating seller:', err);
    }
  };

  if (status === 'loading') return <p>Loading seller info...</p>;
  if (status === 'error' || !formData) return <p>Failed to load seller info.</p>;

  return (
    <SellerInfoForm
      formData={formData}
      onInputChange={handleInputChange}
      onNestedChange={handleNestedChange}
      onSpecialtiesChange={handleSpecialtiesChange}
      onSubmit={handleSubmit}
    />
  );
}
