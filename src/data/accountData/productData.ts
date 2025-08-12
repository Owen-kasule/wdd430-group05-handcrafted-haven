import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function handleDatabaseError(error: any, context: string): never {
  console.error(`Database Error (${context}):`, error);
  throw new Error(`Failed to ${context}`);
}


// Create product with images and specifications
export async function createProduct(productData: {
  name: string;
  price: number;
  description?: string;
  category: string;
  category_id: string;
  in_stock: boolean;
  featured: boolean;
  seller_id: string;
  seller_name: string;
  rating: number;
  created_at: Date;
  updated_at: Date;
  product_images: { image_url: string }[];
  product_specifications: { spec_key: string; spec_value: string }[];
}) {
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
  } = productData;

  // Insert product
  const { data: product, error: productError } = await supabase
    .from('products')
    .insert({
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
    })
    .select()
    .single();

  if (productError) {
    handleDatabaseError(productError, 'insert product');
  }

  if (!product) {
    throw new Error('Product insert returned no data');
  }

  const productId = product.id;

  // Insert images linked to product
  if (product_images.length > 0) {
    const { error: imagesError } = await supabase
      .from('product_images')
      .insert(
        product_images.map((img) => ({
          product_id: productId,
          image_url: img.image_url,
        }))
      );

    if (imagesError) {
      handleDatabaseError(imagesError, 'insert product images');
    }
  }

  // Insert specifications linked to product
  if (product_specifications.length > 0) {
    const { error: specsError } = await supabase
      .from('product_specifications')
      .insert(
        product_specifications.map((spec) => ({
          product_id: productId,
          spec_key: spec.spec_key,
          spec_value: spec.spec_value,
        }))
      );

    if (specsError) {
      handleDatabaseError(specsError, 'insert product specifications');
    }
  }

  return product;
}
