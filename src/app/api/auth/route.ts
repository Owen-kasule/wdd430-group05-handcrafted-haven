import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, createUser } from '@/data/server-data';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const MAX_AGE = 60 * 60 * 24 * 7; // 1 week

function createJwtToken(user: any) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: MAX_AGE }
  );
}

export async function POST(req: NextRequest) {
  const { email, password, isLogin, name, role } = await req.json();
  console.log('Auth POST received:', { email, isLogin, name, role });

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }

  if (isLogin) {
    const user = await findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('Login successful for user:', email);
    const token = createJwtToken(user);

    const response = NextResponse.json({
      message: 'Login successful',
      user,
      token,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: MAX_AGE,
    });

    return response;
  } else {
    // Register flow
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date().toISOString();

    const newUser = await createUser({
      email,
      name,
      password: hashedPassword,
      provider: 'local',
      role: role || 'buyer',
      created_at: new Date(),
      updated_at: new Date(),
    });

    const token = createJwtToken(newUser);

    const response = NextResponse.json({
      message: 'Registered successfully',
      user: newUser,
      token,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: MAX_AGE,
    });

    return response;
  }
}
