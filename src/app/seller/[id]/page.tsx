import SellerProfile from '@/components/SellerProfile/SellerProfile';

interface SellerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Seller({ params: _params }: SellerPageProps) {
  return <SellerProfile />;
}
