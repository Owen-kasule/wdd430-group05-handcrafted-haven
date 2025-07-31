import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/data/server-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const options = {
    query: searchParams.get('query') || undefined,
    category: searchParams.get('category') || undefined,
    minPrice: searchParams.get('minPrice')
      ? Number(searchParams.get('minPrice'))
      : undefined,
    maxPrice: searchParams.get('maxPrice')
      ? Number(searchParams.get('maxPrice'))
      : undefined,
    sortBy: searchParams.get('sortBy') || undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    itemsPerPage: searchParams.get('itemsPerPage')
      ? Number(searchParams.get('itemsPerPage'))
      : 12,
    sellerId: searchParams.get('sellerId') || undefined,
  };

  try {
    const { products, totalCount } = await getProducts(options);
    return NextResponse.json({ products, totalCount });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
