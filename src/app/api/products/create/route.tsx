import { NextRequest, NextResponse } from 'next/server';
import { createProduct } from '@/data/accountData/productData'; // your DB insertion logic

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      price,
      description,
      category,
      category_id,
      in_stock,
      featured,
      seller_id,
      seller_name,
      rating,
      created_at,
      updated_at,
      product_images,
      product_specifications,
    } = body;

    if (
      !name ||
      !price ||
      !category ||
      !category_id ||
      !seller_id ||
      !seller_name
    ) {
      return NextResponse.json(
        { error: 'Missing required product fields' },
        { status: 400 }
      );
    }

    const product = await createProduct({
      name,
      price: Number(price),
      description,
      category,
      category_id,
      in_stock,
      featured,
      seller_id,
      seller_name,
      rating,
      created_at: new Date(created_at),
      updated_at: new Date(updated_at),
      product_images,
      product_specifications,
    });

    return NextResponse.json(
      { message: 'Product created successfully', product },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}