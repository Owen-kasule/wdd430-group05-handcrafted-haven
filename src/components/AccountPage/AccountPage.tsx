// app/account/page.tsx
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken'; // ✅ type-only import
import { redirect } from 'next/navigation';

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function AccountPage() {
  const cookieStore =  await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  let user: JwtPayload;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'string') {
      throw new Error('Invalid token payload');
    }
    user = decoded;
  } catch (err) {
    console.error('Invalid JWT:', err);
    redirect('/login');
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>My Account</h1>
      <p>Welcome, <strong>{user.name}</strong>!</p>
      <p>This page is protected by JWT authentication.</p>
    </div>
  );
}
