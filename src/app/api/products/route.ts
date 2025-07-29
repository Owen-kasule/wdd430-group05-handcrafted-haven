import { getProducts } from '@/data/server-data'; // Import from server-data
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
