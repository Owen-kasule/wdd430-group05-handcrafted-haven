import { getSellers } from '@/data/server-data';
import { createOrUpdateSeller } from '@/data/accountData/sellerData';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
  try {
    const sellers = await getSellers();
    return NextResponse.json(sellers);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch sellers' },
      { status: 500 }
    );
  }
}

// POST /api/sellers 
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      id,
      name,
      bio = '',
      profileImage = '',
      location = '',
      joinDate = new Date().toISOString(),
      rating = 0,
      totalReviews = 0,
      totalSales = 0,
      specialties = [],
      story = '',
      contact = {},
      socialMedia = {},
    } = data;

    const contact_email = contact.email ?? '';
    const contact_phone = contact.phone ?? '';
    const contact_website = contact.website ?? '';

    const instagram_handle = socialMedia.instagram ?? '';
    const facebook_page = socialMedia.facebook ?? '';

    if (!name || !contact_email || !location) {
      return NextResponse.json(
        { error: 'Missing required fields: name, contact.email, or location' },
        { status: 400 }
      );
    }

    const seller = await createOrUpdateSeller({
      id,
      name,
      bio,
      profileImage,
      location,
      joinDate,
      rating,
      totalReviews,
      totalSales,
      specialties,
      story,
      contact: {
        email: contact_email,
        phone: contact_phone,
        website: contact_website,
      },
      socialMedia: {
        instagram: instagram_handle,
        facebook: facebook_page,
      },
    });

    return NextResponse.json(seller, { status: 200 });
  } catch (error: any) {
    console.error('POST /api/sellers error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save seller' },
      { status: 500 }
    );
  }
}
