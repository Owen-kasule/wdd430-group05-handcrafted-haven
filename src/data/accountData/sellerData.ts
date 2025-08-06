import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function createOrUpdateSeller(seller: {
  id?: string;
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
}) {
const upsertData = {
  id: seller.id || crypto.randomUUID(),
  name: seller.name,
  bio: seller.bio,
  profile_image: seller.profileImage,
  location: seller.location,
  join_date: seller.joinDate,
  rating: seller.rating,
  total_reviews: seller.totalReviews,
  total_sales: seller.totalSales,
  specialties: seller.specialties,
  story: seller.story,
  contact_email: seller.contact.email,
  contact_phone: seller.contact.phone,
  contact_website: seller.contact.website,
  instagram_handle: seller.socialMedia.instagram, 
  facebook_page: seller.socialMedia.facebook,     
};


  const { data, error } = await supabase
    .from('sellers')
    .upsert(upsertData, { onConflict: 'id' }) 
    .select(); //  fetches the updated/inserted row

  if (error) {
    console.error('Supabase Upsert Error:', error);
    throw new Error('Failed to create or update seller');
  }

  return data?.[0];
}

export async function getSellerByEmail(email: string) {
  console.log('[DB] Searching seller by email:', email);

  const { data, error } = await supabase
    .from('sellers')
    .select('*')
    .eq('contact_email', email)
    .limit(1);

  if (error) {
    console.error('[DB] Supabase Fetch Error:', error);
    throw new Error('Failed to fetch seller by email');
  }

  if (!data || data.length === 0) {
    console.warn('[DB] No seller found for email:', email);
    return null;
  }

  console.log('[DB] Seller found:', data[0]);
  return data[0];
}

