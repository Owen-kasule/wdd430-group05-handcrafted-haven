import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers } from '@/data/server-data';

export async function GET(req: NextRequest) {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
