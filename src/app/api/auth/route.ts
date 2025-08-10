import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail, createUser } from "@/data/server-data";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginSchema, RegisterSchema } from "@/data/schema/authSchema";

const JWT_SECRET = process.env.JWT_SECRET!;
const MAX_AGE = 60 * 60 * 24 * 7;

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
  try {
    const rawData = await req.json();
    // console.log("Auth POST received:", rawData);

    // Validate based on isLogin flag
    let validationResult;
    if (rawData.isLogin) {
      validationResult = LoginSchema.safeParse(rawData);
    } else {
      validationResult = RegisterSchema.safeParse(rawData);
    }

    // Handle validation errors
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const { email, password, isLogin } = validationResult.data;

    if (isLogin) {
      // Login flow
      const user = await findUserByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );
      }

      // console.log("Login successful for user:", email);
      const token = createJwtToken(user);

      const response = NextResponse.json({
        message: "Login successful",
        user,
        token,
      });

      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: MAX_AGE,
        sameSite: "lax",
      });

      return response;
    } else {
      // Registration flow
      const { name, role } = validationResult.data;

      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await createUser({
        email,
        name,
        password: hashedPassword,
        provider: "local",
        role: role || "buyer",
      });

      const token = createJwtToken(newUser);

      const response = NextResponse.json({
        message: "Registered successfully",
        user: newUser,
        token,
      });

      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: MAX_AGE,
        sameSite: "lax",
      });

      return response;
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
