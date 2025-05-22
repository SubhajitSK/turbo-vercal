import { prisma } from "@repo/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Compare hashed password using bcrypt
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    return NextResponse.json({ success: true, message: "Login successful" });
  }
  if (user && user.password === password) {
    return NextResponse.json({ success: true, message: "Login successful" });
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
