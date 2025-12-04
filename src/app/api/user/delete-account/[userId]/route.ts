import { NextRequest, NextResponse } from "next/server";
import { getEntriesCollection, getUserCollection } from "@/lib/database/db_collections";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const id = (await params).userId;

    // Validate ID
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    const users = await getUserCollection();
    const entries = await getEntriesCollection();

    // Check user exists
    const user = await users.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Incorrect password" },
        { status: 400 }
      );
    }

    // 🔥 Step 1: Delete entries related to this user
    const deletedEntries = await entries.deleteMany({ userId: id });

    console.log("ENTRIES DELETED:", deletedEntries.deletedCount);

    // 🔥 Step 2: Delete user account
    const deletedUser = await users.deleteOne({ _id: new ObjectId(id) });

    if (deletedUser.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Failed to delete user" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Account and all related entries deleted successfully",
    });

  } catch (error) {
    console.error("ACCOUNT DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
