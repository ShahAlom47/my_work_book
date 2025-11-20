import { NextRequest, NextResponse } from "next/server";
import { getEntriesCollection } from "@/lib/database/db_collections";
import { ObjectId } from "mongodb";

export async function PATCH(
  req: NextRequest,
 { params }: { params:Promise< { id: string }> }
) {
  try {
    const {id} = await params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid category ID", success: false },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { entryName } = body;
    console.log(entryName,id)

    if (!entryName || !entryName.trim()) {
      return NextResponse.json(
        { success: false, message: "Title cannot be empty" },
        { status: 400 }
      );
    }

    const collection = await getEntriesCollection();

    const updated = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          entryName: entryName.trim(),
          updatedAt: new Date().toISOString(),
        },
      }
    );

    if (updated.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Entry updated successfully",
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update entry" },
      { status: 500 }
    );
  }
}
