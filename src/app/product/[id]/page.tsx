// app/products/[id]/page.tsx

// Import your ProductPage component
// Make sure this path is correct relative to your 'app' directory
// If ProductPage is a client component, remember 'use client' at the top of ProductPage.tsx
import ProductPage from '@/components/ProductPage/ProductPage';

// Define the props interface correctly for dynamic routes
// 'params' will be an object where keys match your dynamic segments ([id])
interface ProductPageProps {
  params: {
    id: string; // The 'id' from [id] in the folder name will be a string
  };
}

// Your page component (a Server Component by default)
export default async function Product({ params }: ProductPageProps) {
  const productId = params.id; // Access the id directly from the params object

  // --- Example: Fetching product data based on productId ---
  // In a real application, you would fetch data here
  // const productData = await fetch(`https://your-api.com/products/${productId}`).then(res => res.json());
  // console.log("Fetching product:", productId);

  // You can pass the productId to your ProductPage component
  // Or, if ProductPage itself needs to be a Client Component and fetch data,
  // ensure it uses `useEffect` for data fetching or receives props from here.
  return <ProductPage productId={productId} />;
}