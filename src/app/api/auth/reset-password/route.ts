import { NextResponse } from "next/server";
import { getUserCollection } from "@/lib/database/db_collections";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp, newPassword } = body;

    // 1️⃣ Validation
    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const userCollection = await getUserCollection();

    // 2️⃣ Find user
    const user = await userCollection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 3️⃣ Check if OTP exists
    if (!user.resetOtp || !user.resetOtpExpire) {
      return NextResponse.json(
        { success: false, message: "OTP not generated" },
        { status: 400 }
      );
    }

    // 4️⃣ OTP expired কিনা চেক
    if (Date.now() > user.resetOtpExpire) {
      return NextResponse.json(
        { success: false, message: "OTP expired. Please try again." },
        { status: 400 }
      );
    }

    // 5️⃣ OTP match হচ্ছে কিনা
    if (Number(otp) !== Number(user.resetOtp)) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 }
      );
    }

    // 6️⃣ Password hash
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 7️⃣ Save password and remove OTP fields
    await userCollection.updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
        },
        $unset: {
          resetOtp: "",
          resetOtpExpire: "",
        },
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Password reset successful",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
