import { NextRequest, NextResponse } from "next/server";
import { getEntriesCollection } from "@/lib/database/db_collections";
import { ObjectId } from "mongodb";

export async function PATCH(
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
        { message: "Invalid ID", success: false },
        { status: 400 }
      );
    }

    const body = await req.json();

    const collection = await getEntriesCollection();

const updated = await collection.updateOne(
  {
    _id: new ObjectId(entryId),
    userId: userId,
    "entryData.entryDataId": entryDataId,
  },
  {
    $set: {
      "entryData.$.date": new Date(body.date).toISOString(),
      "entryData.$.placeName": body.placeName,
      "entryData.$.addAmount": body.addAmount,
      "entryData.$.description": body.description,
      "entryData.$.updatedAt": new Date().toISOString(),

      // 🔥 Main entry updatedAt update here:
      updatedAt: new Date().toISOString(),
    },
  }
);

    if (updated.matchedCount === 0) {
      return NextResponse.json(
        { message: "Entry not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Entry updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("PATCH ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update entry", success: false },
      { status: 500 }
    );
  }
}
