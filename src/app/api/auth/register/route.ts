import { NextRequest, NextResponse } from "next/server";
import { getUserCollection } from "@/lib/database/db_collections";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const id = (await params).userId;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { oldPassword, newPassword } = body;

    

    // Validation
    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Both old and new passwords are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const users = await getUserCollection();

    // Find user
    const user = await users.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Old password is incorrect" },
        { status: 400 }
      );
    }

    // If old === new
    if (oldPassword === newPassword) {
      return NextResponse.json(
        { success: false, message: "New password cannot be the same as the old password" },
        { status: 400 }
      );
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPass = await bcrypt.hash(newPassword, salt);

    // Update DB
    const updated = await users.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          password: hashedNewPass,
          updatedAt: new Date().toISOString(),
        },
      }
    );

    if (updated.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch  {

    return NextResponse.json(
      { success: false, message: "Failed to update password" },
      { status: 500 }
    );
  }
}
