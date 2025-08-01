// app/account/page.tsx
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import './AccountPage.css'; // global CSS, not CSS module

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function AccountPage() {
  const cookieStore = await cookies();
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
    <div className="account-page">
      <div className="account-container">
        <h1 className="account-title">My Account</h1>
        <p className="account-welcome">
          Welcome, <span className="account-name">{user.name}</span>!
        </p>
        <p className="account-info">
          This page is protected by JWT authentication. You can add more personal details,
          order history, or settings here later.
        </p>
      </div>
    </div>
  );
}
