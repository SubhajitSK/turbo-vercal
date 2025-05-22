import { prisma } from "@repo/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

type SignupData = {
  name: string;
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const data: SignupData = await req.json();

  console.log("Received signup data:", data);

  if (!data.email || !data.password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 409 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    console.log("User created:", user, hashedPassword);

    return NextResponse.json(
      { message: "Signup successful", user: { email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
