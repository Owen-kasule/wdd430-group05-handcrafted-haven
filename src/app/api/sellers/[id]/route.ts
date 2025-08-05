import { NextRequest, NextResponse } from 'next/server';
import { getSellerById } from '@/data/server-data';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

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
