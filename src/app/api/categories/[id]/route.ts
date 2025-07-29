import { getCategoryById } from '@/data/server-data';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await getCategoryById(params.id);
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch category' },
      { status: 500 }
    );
  }
}
