import ProductPage from '@/components/ProductPage/ProductPage';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Product({ params: _params }: ProductPageProps) {
  return <ProductPage />;
}
