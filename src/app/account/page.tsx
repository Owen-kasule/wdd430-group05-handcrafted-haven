import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import type { JwtPayload } from 'jsonwebtoken';
import { getUserById } from '@/data/accountData/accountData';
import ClientAccountPage from '@/components/AccountPage/AccountPage';

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function AccountPage() {
  const headerList = await headers();
  const cookie = headerList.get('cookie');
  const tokenMatch = cookie?.match(/token=([^;]+)/);
  const token = tokenMatch?.[1];

  if (!token) {
    redirect('/login');
  }

  let user: JwtPayload;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'string' || !decoded.id) {
      throw new Error('Invalid token');
    }
    user = decoded;
  } catch (err) {
    console.error('Invalid JWT:', err);
    redirect('/login');
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    redirect('/login');
  }

  return <ClientAccountPage user={dbUser} />;
}
