import { NextRequest, NextResponse } from 'next/server';
import { getSellerByEmail } from '@/data/accountData/sellerData';

export async function GET(req: NextRequest) {
  console.log('[API] GET /api/sellers/byEmail called');

  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  console.log('[API] Received email:', email);

  if (!email) {
    console.warn('[API] Missing email parameter');
    return NextResponse.json({ error: 'Missing email parameter' }, { status: 400 });
  }

  try {
    console.log('[API] Calling getSellerByEmail...');
    const seller = await getSellerByEmail(email);
    console.log('[API] getSellerByEmail returned:', seller);

    if (!seller) {
      console.warn('[API] Seller not found for email:', email);
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }

    console.log('[API] Returning seller data');
    return NextResponse.json(seller);
  } catch (error: any) {
    console.error('[API] Error fetching seller:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch seller' },
      { status: 500 }
    );
  }
}
