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

    console.log("DELETE ACCOUNT BODY:", body, id);

    // Input validation
    if (!password) {
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    const users = await getUserCollection();
    const entryCollection = await getEntriesCollection();

    // Find user
    const user = await users.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Incorrect password" },
        { status: 400 }
      );
    }

    // Delete user from DB
    const deleted = await users.deleteOne({ _id: new ObjectId(id) });

    if (deleted.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Failed to delete user" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("ACCOUNT DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
