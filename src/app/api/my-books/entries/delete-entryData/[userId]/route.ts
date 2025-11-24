import { NextRequest, NextResponse } from "next/server";
import { getEntriesCollection } from "@/lib/database/db_collections";
import { ObjectId } from "mongodb";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const { searchParams } = new URL(req.url);

    const entryId = searchParams.get("entryId");
    const entryDataId = searchParams.get("entryDataId");

    if (!userId || !entryId || !entryDataId) {
      return NextResponse.json(
        { success: false, message: "Invalid parameters" },
        { status: 400 }
      );
    }

    const collection = await getEntriesCollection();

    // 🔥 First: pull specific entryData item
    const result = await collection.updateOne(
      {
        _id: new ObjectId(entryId),
        userId,
        "entryData.entryDataId": entryDataId,
      },
      {
        $pull: {
          entryData: { entryDataId: entryDataId },
        },
        $set: {
          updatedAt: new Date().toISOString(), // 🔥 update entry main timestamp
        },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Entry data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Entry data deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error while deleting entry data" },
      { status: 500 }
    );
  }
}
