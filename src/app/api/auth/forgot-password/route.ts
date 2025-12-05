import { NextResponse } from "next/server";
import crypto from "crypto";
import { getUserCollection } from "@/lib/database/db_collections";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || email.trim().length < 1) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const userCollection = await getUserCollection();

    // 1️⃣ User exists or not
    const user = await userCollection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

    // 3️⃣ Save token to DB
    await userCollection.updateOne(
      { email },
      {
        $set: {
          resetToken,
          resetTokenExpire,
        },
      }
    );

    // 4️⃣ Reset Link (frontend page)
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    // ⭐ Email পাঠানোর কাজ (পরবর্তীতে add করবে)
    // await sendEmail(email, "Reset Password", resetLink);

    return NextResponse.json(
      {
        success: true,
        message: "Password reset link has been sent to your email",
        resetLink, // test করার জন্য দিচ্ছি
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forget password error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
