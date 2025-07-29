import { getSellers } from '@/data/server-data';
import { NextResponse } from 'next/server';

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
