import bcrypt from 'bcrypt';
import postgres from 'postgres';
import {
  mockUsers,
  mockSellers,
  mockProducts,
  categories,
  mockReviews,
} from '@/data/mockData';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      provider TEXT,
      role TEXT NOT NULL CHECK (role IN ('user', 'admin')),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const insertedUsers = await Promise.all(
    mockUsers.map(async user => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, email, name, password, provider, role)
        VALUES (
          ${user.id}, 
          ${user.email}, 
          ${user.name}, 
          ${hashedPassword}, 
          ${user.provider}, 
          ${user.role}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedSellers() {
  await sql`
    CREATE TABLE IF NOT EXISTS sellers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name TEXT NOT NULL,
      bio TEXT,
      profile_image TEXT,
      location TEXT,
      join_date TEXT,
      rating FLOAT,
      total_reviews INT,
      total_sales INT,
      specialties TEXT[],
      story TEXT,
      contact_email TEXT,
      contact_phone TEXT,
      contact_website TEXT,
      instagram_handle TEXT,
      facebook_page TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const insertedSellers = await Promise.all(
    mockSellers.map(
      seller => sql`
        INSERT INTO sellers (
          id, name, bio, profile_image, location, join_date, rating, 
          total_reviews, total_sales, specialties, story, 
          contact_email, contact_phone, contact_website,
          instagram_handle, facebook_page
        )
        VALUES (
          ${seller.id}, 
          ${seller.name}, 
          ${seller.bio}, 
          ${seller.profileImage}, 
          ${seller.location}, 
          ${seller.joinDate}, 
          ${seller.rating}, 
          ${seller.totalReviews}, 
          ${seller.totalSales}, 
          ${seller.specialties}, 
          ${seller.story},
          ${seller.contact.email},
          ${seller.contact.phone},
          ${seller.contact.website},
          ${seller.socialMedia.instagram},
          ${seller.socialMedia.facebook}
        )
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedSellers;
}

async function seedCategories() {
  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      image TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const insertedCategories = await Promise.all(
    categories.map(
      category => sql`
        INSERT INTO categories (id, name, description, image)
        VALUES (
          ${category.id}, 
          ${category.name}, 
          ${category.description}, 
          ${category.image}
        )
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedCategories;
}

async function seedProducts() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name TEXT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      description TEXT,
      category_id UUID REFERENCES categories(id),
      seller_id UUID REFERENCES sellers(id),
      seller_name TEXT,
      rating FLOAT,
      featured BOOLEAN DEFAULT false,
      in_stock BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  // Create product images table
  await sql`
    CREATE TABLE IF NOT EXISTS product_images (
      id SERIAL PRIMARY KEY,
      product_id UUID REFERENCES products(id) ON DELETE CASCADE,
      image_url TEXT NOT NULL,
      is_primary BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE (product_id, image_url)
    );
  `;

  // Create product specifications table
  await sql`
    CREATE TABLE IF NOT EXISTS product_specifications (
      id SERIAL PRIMARY KEY,
      product_id UUID REFERENCES products(id) ON DELETE CASCADE,
      spec_key TEXT NOT NULL,
      spec_value TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE (product_id, spec_key)
    );
  `;

  // Insert products
  const insertedProducts = await Promise.all(
    mockProducts.map(
      product => sql`
        INSERT INTO products (
          id, name, price, description, category_id, seller_id, 
          seller_name, rating, featured, in_stock, created_at
        )
        VALUES (
          ${product.id},
          ${product.name},
          ${product.price},
          ${product.description},
          ${product.category},
          ${product.sellerId},
          ${product.sellerName},
          ${product.rating},
          ${product.featured ?? false},
          ${product.inStock},
          ${product.createdAt}
        )
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  // Insert product images
  for (const product of mockProducts) {
    await Promise.all(
      product.images.map(
        (img, i) => sql`
          INSERT INTO product_images (product_id, image_url, is_primary)
          VALUES (${product.id}, ${img}, ${i === 0})
          ON CONFLICT (product_id, image_url) DO NOTHING;
        `
      )
    );
  }

  // Insert product specifications
  for (const product of mockProducts) {
    if (product.specifications) {
      await Promise.all(
        Object.entries(product.specifications).map(
          ([key, value]) => sql`
            INSERT INTO product_specifications (product_id, spec_key, spec_value)
            VALUES (${product.id}, ${key}, ${value})
            ON CONFLICT (product_id, spec_key) DO NOTHING;
          `
        )
      );
    }
  }

  return insertedProducts;
}

async function seedReviews() {
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      product_id UUID REFERENCES products(id) ON DELETE CASCADE,
      user_id UUID REFERENCES users(id),
      user_name TEXT NOT NULL,
      rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
      comment TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      date TEXT,
      verified BOOLEAN DEFAULT false
    );
  `;

  const insertedReviews = await Promise.all(
    mockReviews.map(
      review => sql`
        INSERT INTO reviews (
          id, product_id, user_id, user_name, rating, 
          comment, created_at, date, verified
        )
        VALUES (
          ${review.id}, 
          ${review.productId}, 
          ${review.userId}, 
          ${review.userName}, 
          ${review.rating},
          ${review.comment},
          ${review.createdAt},
          ${review.date},
          ${review.verified}
        )
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedReviews;
}

export async function GET() {
  try {
    // Create extension once at beginning
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql.begin(async sql => {
      await seedUsers();
      await seedSellers();
      await seedCategories();
      await seedProducts();
      await seedReviews();
    });

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding database:', error);
    return Response.json({ error }, { status: 500 });
  } finally {
    await sql.end();
  }
}

// Run the seed function when executed directly
if (import.meta.url.endsWith(process.argv[1])) {
  GET()
    .then(response => {
      if (response.status >= 400) {
        console.error(`Seeding failed with status ${response.status}`);
        response.json().then(data => console.error(data));
        process.exit(1);
      } else {
        response.json().then(data => console.log(data));
        process.exit(0);
      }
    })
    .catch(err => {
      console.error('Unhandled error:', err);
      process.exit(1);
    });
}
