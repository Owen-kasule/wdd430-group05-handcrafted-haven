import { NextRequest, NextResponse } from 'next/server'; 
import jwt from 'jsonwebtoken';
import { updateUser, getUserById } from '@/data/accountData/accountData'; // adjust path as needed

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userPayload = jwt.verify(token, JWT_SECRET);

    if (typeof userPayload === 'string' || !userPayload.id) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
    }

    if (email && typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Update user info in DB
    await updateUser(userPayload.id, { name, email });

    // Fetch updated user from DB (to include all needed fields for token)
    const updatedUser = await getUserById(userPayload.id);

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found after update' }, { status: 404 });
    }

    // Create new JWT token with updated user info
    const newToken = jwt.sign(
      {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role, // include role if you use it
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Prepare response with new token cookie set
    const response = NextResponse.json({ message: 'User updated', user: updatedUser });

    response.cookies.set('token', newToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
