import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export function getUserFromToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
      name: string;
    };
  } catch {
    return null;
  }
}
