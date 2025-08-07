import { NextRequest, NextResponse } from 'next/server';
import { getSellerById } from '@/data/server-data';
import { createOrUpdateSeller } from '@/data/accountData/sellerData';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const seller = await getSellerById(id);

    if (!seller) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }

    return NextResponse.json(seller);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch seller' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const updatedData = await req.json();
  console.log('PUT /api/sellers/[id] - ID:', id, 'Data:', updatedData);

  const sellerInput = {
    id,
    name: updatedData.name,
    bio: updatedData.bio,
    profileImage: updatedData.profileImage || updatedData.profile_image,
    location: updatedData.location,
    joinDate: updatedData.joinDate || updatedData.join_date,
    rating: updatedData.rating,
    totalReviews: updatedData.totalReviews || updatedData.total_reviews,
    totalSales: updatedData.totalSales || updatedData.total_sales,
    specialties: updatedData.specialties,
    story: updatedData.story,
    contact: {
      email: updatedData.contact?.email || updatedData.contact_email,
      phone: updatedData.contact?.phone || updatedData.contact_phone,
      website: updatedData.contact?.website || updatedData.contact_website,
    },
    socialMedia: {
      instagram:
        updatedData.socialMedia?.instagram || updatedData.instagram_handle,
      facebook:
        updatedData.socialMedia?.facebook || updatedData.facebook_page,
    },
  };

  try {
    const updated = await createOrUpdateSeller(sellerInput);
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('PUT /api/sellers/[id] error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update seller' },
      { status: 500 }
    );
  }
}
