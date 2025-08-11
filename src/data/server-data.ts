import { createClient } from "@supabase/supabase-js";
import type {
  Product,
  Seller,
  Review,
  Category,
  User,
} from "@/types/definitions";
import {
  mockProducts,
  mockSellers,
  mockUsers,
  categories,
  mockReviews,
} from "./mockData";

// Check if Supabase environment variables are available
const hasSupabaseConfig =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Initialize Supabase client only if config is available
const supabase = hasSupabaseConfig
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  : null;

// Helper function for error handling
function handleDatabaseError(error: any, context: string): never {
  console.error(`Database Error (${context}):`, error);
  throw new Error(`Failed to ${context}`);
}

// Helper function to ensure supabase is available for operations that require it
function requireSupabase() {
  if (!supabase) {
    throw new Error("Database not available - Supabase configuration missing");
  }
  return supabase;
}

export async function getUserById(id: string) {
  if (!supabase) {
    // Fallback to mock data
    const user = mockUsers.find((u) => u.id === id);
    if (!user) throw new Error("User not found");
    return user;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }

  return data;
}
export async function getAllUsers() {
  if (!supabase) {
    // Fallback to mock data
    return mockUsers;
  }

  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }

  return data;
}

export async function getUsers(
  userIds: string[]
): Promise<Record<string, { name: string }>> {
  try {
    if (userIds.length === 0) return {};

    if (!supabase) {
      // Fallback to mock data
      const result: Record<string, { name: string }> = {};
      userIds.forEach((id) => {
        const user = mockUsers.find((u: any) => u.id === id);
        if (user) {
          result[id] = { name: user.name };
        }
      });
      return result;
    }

    const { data, error } = await supabase
      .from("users")
      .select("id, name")
      .in("id", userIds);

    if (error) throw error;

    const usersMap: Record<string, { name: string }> = {};
    (data || []).forEach((user) => {
      usersMap[user.id] = {
        name: user.name,
      };
    });

    return usersMap;
  } catch (error) {
    return handleDatabaseError(error, "fetch users");
  }
}

// Products with filtering and pagination
export async function getProducts(
  options: {
    query?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    page?: number;
    itemsPerPage?: number;
    sellerId?: string;
  } = {}
): Promise<{ products: Product[]; totalCount: number }> {
  try {
    if (!supabase) {
      // Fallback to mock data with basic filtering
      let products = [...mockProducts];

      if (options.query) {
        products = products.filter(
          (p) =>
            p.name.toLowerCase().includes(options.query!.toLowerCase()) ||
            p.description.toLowerCase().includes(options.query!.toLowerCase())
        );
      }

      if (options.category && options.category !== "all") {
        products = products.filter((p) => p.category_id === options.category);
      }

      if (options.sellerId) {
        products = products.filter((p) => p.seller_id === options.sellerId);
      }

      const itemsPerPage = options.itemsPerPage || 12;
      const page = options.page || 1;
      const startIndex = (page - 1) * itemsPerPage;
      const paginatedProducts = products.slice(
        startIndex,
        startIndex + itemsPerPage
      );

      return {
        products: paginatedProducts,
        totalCount: products.length,
      };
    }

    const itemsPerPage = options.itemsPerPage || 12;
    const offset = options.page ? (options.page - 1) * itemsPerPage : 0;

    // Base query
    let query = supabase.from("products").select(
      `
        *,
        product_images (image_url),
        product_specifications (spec_key, spec_value)
      `,
      { count: "exact" }
    );
    if (options.sellerId) {
      query = query.eq("seller_id", options.sellerId);
    }

    if (options.category) {
      // Get category ID by name
      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("id")
        .eq("name", options.category)
        .single();

      if (categoryError) throw categoryError;
      if (categoryData) {
        query = query.eq("category_id", categoryData.id);
      }
    }

    if (options.query) {
      query = query.or(
        `name.ilike.%${options.query}%,description.ilike.%${options.query}%,seller_name.ilike.%${options.query}%`
      );
    }
    if (options.category) {
      query = query.eq("category", options.category);
    }
    if (options.minPrice !== undefined) {
      query = query.gte("price", options.minPrice);
    }
    if (options.maxPrice !== undefined) {
      query = query.lte("price", options.maxPrice);
    }

    // Apply sorting
    switch (options.sortBy) {
      case "price-low":
        query = query.order("price", { ascending: true });
        break;
      case "price-high":
        query = query.order("price", { ascending: false });
        break;
      case "rating":
        query = query.order("rating", { ascending: false });
        break;
      case "newest":
        query = query.order("created_at", { ascending: false });
        break;
      default:
        query = query.order("featured", { ascending: false });
    }

    // Apply pagination
    query = query.range(offset, offset + itemsPerPage - 1);

    const { data: products, count, error } = await query;

    if (error) throw error;

    // Transform data to match Product type
    const transformedProducts = (products || []).map((product: any) => ({
      ...product,
      images: product.product_images.map((img: any) => img.image_url),
      specifications: product.product_specifications.reduce(
        (acc: Record<string, string>, spec: any) => {
          acc[spec.spec_key] = spec.spec_value;
          return acc;
        },
        {}
      ),
    }));

    return {
      products: transformedProducts,
      totalCount: count || 0,
    };
  } catch (error) {
    return handleDatabaseError(error, "fetch products");
  }
}

// Get single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    if (!supabase) {
      return mockProducts.find((p: any) => p.id === id) || null;
    }

    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        product_images (image_url),
        product_specifications (spec_key, spec_value)
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      images: data.product_images.map((img: any) => img.image_url),
      specifications: data.product_specifications.reduce(
        (acc: Record<string, string>, spec: any) => {
          acc[spec.spec_key] = spec.spec_value;
          return acc;
        },
        {}
      ),
    };
  } catch (error) {
    return handleDatabaseError(error, "fetch product");
  }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    if (!supabase) {
      return categories;
    }

    const { data, error } = await supabase.from("categories").select("*");

    if (error) throw error;
    return data || [];
  } catch (error) {
    return handleDatabaseError(error, "fetch categories");
  }
}

// Get single category by ID
export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    if (!supabase) {
      return categories.find((c: any) => c.id === id) || null;
    }

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data || null;
  } catch (error) {
    return handleDatabaseError(error, "fetch category");
  }
}

// Get product reviews
export async function getProductReviews(productId: string): Promise<Review[]> {
  try {
    if (!supabase) {
      return mockReviews.filter((r: any) => r.product_id === productId);
    }

    const { data, error } = await requireSupabase()
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    return handleDatabaseError(error, "fetch product reviews");
  }
}

// Create a new review
export async function createReview(
  review: Omit<Review, "id" | "created_at">
): Promise<Review> {
  try {
    // Check if user already has a review for this product
    const { data: existingReview, error: existingError } =
      await requireSupabase()
        .from("reviews")
        .select("id")
        .eq("product_id", review.product_id)
        .eq("user_id", review.user_id)
        .single();

    if (!existingError && existingReview) {
      throw new Error("You have already reviewed this product");
    }

    const { data, error } = await requireSupabase()
      .from("reviews")
      .insert({
        product_id: review.product_id,
        user_id: review.user_id,
        user_name: review.user_name,
        rating: review.rating,
        comment: review.comment,
        verified: review.verified,
      })
      .select()
      .single();

    if (error) throw error;

    // Update product rating
    await requireSupabase().rpc("update_product_rating", {
      product_id: review.product_id,
    });

    return data;
  } catch (error) {
    return handleDatabaseError(error, "create review");
  }
}

// Sellers
export async function getSellers(): Promise<Seller[]> {
  try {
    if (!supabase) {
      return mockSellers;
    }

    const { data, error } = await supabase.from("sellers").select(`
        id,
        name,
        bio,
        profile_image,
        location,
        join_date,
        rating,
        total_reviews,
        total_sales,
        specialties,
        story,
        contact_email,
        contact_phone,
        contact_website,
        instagram_handle,
        facebook_page
      `);

    if (error) throw error;

    return (data || []).map((seller) => ({
      ...seller,
      profileImage: seller.profile_image,
      joinDate: seller.join_date,
      totalReviews: seller.total_reviews,
      totalSales: seller.total_sales,
      contact: {
        email: seller.contact_email,
        phone: seller.contact_phone,
        website: seller.contact_website,
      },
      socialMedia: {
        instagram: seller.instagram_handle,
        facebook: seller.facebook_page,
      },
    }));
  } catch (error) {
    return handleDatabaseError(error, "fetch sellers");
  }
}

// Get single seller by ID
export async function getSellerById(id: string): Promise<Seller | null> {
  try {
    if (!supabase) {
      return mockSellers.find((s: any) => s.id === id) || null;
    }

    const { data, error } = await supabase
      .from("sellers")
      .select(
        `
        id,
        name,
        bio,
        profile_image,
        location,
        join_date,
        rating,
        total_reviews,
        total_sales,
        specialties,
        story,
        contact_email,
        contact_phone,
        contact_website,
        instagram_handle,
        facebook_page
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      profileImage: data.profile_image,
      joinDate: data.join_date,
      totalReviews: data.total_reviews,
      totalSales: data.total_sales,
      contact: {
        email: data.contact_email,
        phone: data.contact_phone,
        website: data.contact_website,
      },
      socialMedia: {
        instagram: data.instagram_handle,
        facebook: data.facebook_page,
      },
    };
  } catch (error) {
    return handleDatabaseError(error, "fetch seller");
  }
}

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    if (!supabase) {
      return mockUsers.find((u: any) => u.email === email) || null;
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) throw error;
    return data || null;
  } catch (error) {
    console.error(`Failed to find user by email: ${email}`, error);
    return null;
  }
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
  if (!supabase) {
    const newUser = { ...user, id: Math.random().toString(36).substr(2, 9) };
    return newUser;
  }

  const { data, error } = await supabase
    .from("users")
    .insert(user)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Get reviews by user ID
export async function getReviewsByUserId(userId: string): Promise<Review[]> {
  try {
    if (!supabase) {
      return mockReviews
        .filter((r: any) => r.user_id === userId)
        .map((review) => {
          const product = mockProducts.find((p) => p.id === review.product_id);
          return {
            ...review,
            product: {
              id: product?.id,
              name: product?.name,
              image: product?.images?.[0],
            },
          };
        });
    }
    const { data, error } = await supabase
      .from("reviews")
      .select(
        `
        *,
        products (
          id,
          name,
          product_images (image_url)
        )
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data || []).map((review: any) => ({
      ...review,
      product: {
        id: review.products?.id,
        name: review.products?.name,
        image: review.products?.product_images?.[0]?.image_url,
      },
    }));
  } catch (error) {
    return handleDatabaseError(error, "fetch user reviews");
  }
}
