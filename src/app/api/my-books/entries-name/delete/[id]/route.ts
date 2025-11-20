import { NextRequest, NextResponse } from "next/server";
import { getEntriesCollection } from "@/lib/database/db_collections";
import { ObjectId } from "mongodb";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid entry ID", success: false },
        { status: 400 }
      );
    }

    const collection = await getEntriesCollection();

    const deleted = await collection.deleteOne({ _id: new ObjectId(id) });

    if (deleted.deletedCount === 0) {
      return NextResponse.json(
        { message: "Entry not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Entry deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to delete entry", success: false },
      { status: 500 }
    );
  }
}
