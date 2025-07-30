import { getSellerById } from '@/data/server-data';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const seller = await getSellerById(params.id);
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
