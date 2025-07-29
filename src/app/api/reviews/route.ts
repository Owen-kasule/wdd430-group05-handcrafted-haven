import { createReview, getProductReviews } from '@/data/server-data';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { error: 'Missing productId parameter' },
        { status: 400 }
      );
    }

    const reviews = await getProductReviews(productId);
    return NextResponse.json(reviews);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const reviewData = await request.json();
    const newReview = await createReview(reviewData);
    return NextResponse.json(newReview, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create review' },
      { status: 500 }
    );
  }
}
