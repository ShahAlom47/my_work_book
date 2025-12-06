import { NextResponse } from "next/server";
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

    // 1️⃣ Check if user exists
    const user = await userCollection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000);

    // 3️⃣ OTP Expire time (5 minutes)
    const otpExpire = Date.now() + 5 * 60 * 1000;

    // 4️⃣ Save OTP in DB
    await userCollection.updateOne(
      { email },
      {
        $set: {
          resetOtp: otp,
          resetOtpExpire: otpExpire,
        },
      }
    );

    // ⭐ Backend Email পাঠাবে না
    // কারণ তুমি EmailJS দিয়ে frontend থেকে পাঠাবে

    // Response এ OTP দিচ্ছি যাতে frontend EmailJS এ পাঠাতে পারে
    return NextResponse.json(
      {
        success: true,
        message: "OTP generated and saved",
     data :{
         otp, // frontend এ EmailJS দিয়ে email করার জন্য
        email,
     } // frontend এ দরকার হবে
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
