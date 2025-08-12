import { getSellerByEmail } from '@/data/accountData/sellerData';

export default async function getSellerInfoBySellerId(sellerId: string) {
  if (!sellerId) throw new Error('No sellerId provided');

  // Step 1: Fetch user info by sellerId from your API route
  const userRes = await fetch(`/api/users/${encodeURIComponent(sellerId)}`);
  if (!userRes.ok) {
    throw new Error('Failed to fetch user info');
  }
  const user = await userRes.json();
  console.log('User info fetched:', user);

  const email = user.email;
  if (!email) throw new Error('User email not found');

  // Step 2: Call getSellerByEmail with the email - 
  const seller = await getSellerByEmail(email);
  if (!seller) {
    throw new Error('Seller info not found');
  }
  console.log('Seller info fetched:', seller);

  return seller; 
}
