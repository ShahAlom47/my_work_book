import { NextRequest, NextResponse } from "next/server";
import { getUserCollection } from "@/lib/database/db_collections";
import { ObjectId } from "mongodb";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const id = (await params).userId;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid user ID", success: false },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { userNewName } = body;

    console.log("UPDATE NAME REQ BODY:", body,id);

    if (!userNewName || !userNewName.trim()) {
      return NextResponse.json(
        { success: false, message: "Name cannot be empty" },
        { status: 400 }
      );
    }

    const collection = await getUserCollection();

    const updated = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: userNewName.trim(),
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
      message: "User updated successfully",
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update user" },
      { status: 500 }
    );
  }
}
