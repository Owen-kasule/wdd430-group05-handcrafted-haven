import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import EditAccountForm from './EditForm/editAccountForm'; // import the new form component
import './AccountPage.css';

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

  // pass only needed fields to the form
  const initialData = {
    name: user.name,
    email: user.email, // if available
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <h1 className="account-title">My Account</h1>
        <p className="account-welcome">
          Welcome, <span className="account-name">{user.name}</span>!
        </p>
        <EditAccountForm initialData={initialData} />
      </div>
    </div>
  );
}
