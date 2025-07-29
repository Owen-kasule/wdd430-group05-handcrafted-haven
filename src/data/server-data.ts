import postgres from 'postgres';
import type { Product, Seller, Review, Category } from '@/types/definitions';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: 'require',
  transform: {
    undefined: null, // Handle undefined values as NULL in the database
  },
});

// Helper function to handle database errors
function handleDatabaseError(error: any, context: string): never {
  console.error(`Database Error (${context}):`, error);
  throw new Error(`Failed to ${context}`);
}

// Products
export async function getProducts(): Promise<Product[]> {
  try {
    return await sql<Product[]>`
      SELECT 
        p.*, 
        COALESCE(
          (SELECT json_agg(DISTINCT pi.image_url) 
           FROM product_images pi 
           WHERE pi.product_id = p.id),
          '[]'::json
        ) as images,
        COALESCE(
          (SELECT jsonb_object_agg(ps.spec_key, ps.spec_value) 
           FROM product_specifications ps 
           WHERE ps.product_id = p.id),
          '{}'::jsonb
        ) as specifications
      FROM products p
      GROUP BY p.id
    `;
  } catch (error) {
    return handleDatabaseError(error, 'fetch products');
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const [product] = await sql<Product[]>`
      SELECT 
        p.*, 
        COALESCE(
          (SELECT json_agg(DISTINCT pi.image_url) 
           FROM product_images pi 
           WHERE pi.product_id = p.id),
          '[]'::json
        ) as images,
        COALESCE(
          (SELECT jsonb_object_agg(ps.spec_key, ps.spec_value) 
           FROM product_specifications ps 
           WHERE ps.product_id = p.id),
          '{}'::jsonb
        ) as specifications
      FROM products p
      WHERE p.id = ${id}
      GROUP BY p.id
    `;
    return product || null;
  } catch (error) {
    return handleDatabaseError(error, 'fetch product');
  }
}

// Sellers
export async function getSellers(): Promise<Seller[]> {
  try {
    return await sql<Seller[]>`
      SELECT 
        id, 
        name, 
        bio, 
        profile_image as "profileImage", 
        location, 
        join_date as "joinDate", 
        rating, 
        total_reviews as "totalReviews", 
        total_sales as "totalSales",
        specialties, 
        story,
        json_build_object(
          'email', contact_email,
          'phone', contact_phone,
          'website', contact_website
        ) as contact,
        json_build_object(
          'instagram', instagram_handle,
          'facebook', facebook_page
        ) as "socialMedia"
      FROM sellers
    `;
  } catch (error) {
    return handleDatabaseError(error, 'fetch sellers');
  }
}

export async function getSellerById(id: string): Promise<Seller | null> {
  try {
    const [seller] = await sql<Seller[]>`
      SELECT 
        id, 
        name, 
        bio, 
        profile_image as "profileImage", 
        location, 
        join_date as "joinDate", 
        rating, 
        total_reviews as "totalReviews", 
        total_sales as "totalSales",
        specialties, 
        story,
        json_build_object(
          'email', contact_email,
          'phone', contact_phone,
          'website', contact_website
        ) as contact,
        json_build_object(
          'instagram', instagram_handle,
          'facebook', facebook_page
        ) as "socialMedia"
      FROM sellers
      WHERE id = ${id}
    `;
    return seller || null;
  } catch (error) {
    return handleDatabaseError(error, 'fetch seller');
  }
}

// Categories
export async function getCategories(): Promise<Category[]> {
  try {
    return await sql<Category[]>`SELECT * FROM categories`;
  } catch (error) {
    return handleDatabaseError(error, 'fetch categories');
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const [category] = await sql<Category[]>`
      SELECT * FROM categories WHERE id = ${id}
    `;
    return category || null;
  } catch (error) {
    return handleDatabaseError(error, 'fetch category');
  }
}

// Reviews
export async function getProductReviews(productId: string): Promise<Review[]> {
  try {
    return await sql<Review[]>`
      SELECT 
        id, 
        product_id as "productId", 
        user_id as "userId", 
        user_name as "userName", 
        rating, 
        comment, 
        verified,
        created_at as "createdAt",
        to_char(created_at, 'YYYY-MM-DD') as "date"
      FROM reviews
      WHERE product_id = ${productId}
      ORDER BY created_at DESC
    `;
  } catch (error) {
    return handleDatabaseError(error, 'fetch product reviews');
  }
}

export async function createReview(
  review: Omit<Review, 'id' | 'createdAt' | 'date'>
): Promise<Review> {
  try {
    const [newReview] = await sql<Review[]>`
      INSERT INTO reviews (
        product_id, 
        user_id, 
        user_name, 
        rating, 
        comment, 
        verified
      )
      VALUES (
        ${review.productId}, 
        ${review.userId}, 
        ${review.userName}, 
        ${review.rating}, 
        ${review.comment}, 
        ${review.verified || false}
      )
      RETURNING 
        id, 
        product_id as "productId", 
        user_id as "userId", 
        user_name as "userName", 
        rating, 
        comment, 
        verified,
        created_at as "createdAt",
        to_char(created_at, 'YYYY-MM-DD') as "date"
    `;

    // Update product rating
    await sql`
      UPDATE products
      SET rating = (
        SELECT AVG(rating)::numeric(10,1)
        FROM reviews
        WHERE product_id = ${review.productId}
      )
      WHERE id = ${review.productId}
    `;

    return newReview;
  } catch (error) {
    return handleDatabaseError(error, 'create review');
  }
}
