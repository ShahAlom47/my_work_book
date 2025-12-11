// app/api/title/get/route.ts
import { getEntriesCollection } from "@/lib/database/db_collections";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid category ID", success: false },
        { status: 400 }
      );
    }

    const titleCollection = await getEntriesCollection();

    // Only required fields — no entryData
    const titles = await titleCollection
      .find(
        { userId: userId },
        {
          projection: { entryName: 1, userId: 1, createdAt: 1, updatedAt: 1 }, // only needed fields
        }
      )
      .sort({ updatedAt: -1 }) // latest first
      .toArray();

    return NextResponse.json(
      {
        message: "Titles fetched successfully",
        data: titles,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get title error:", error);
    return NextResponse.json(
      { message: "Internal server error", error, success: false },
      { status: 500 }
    );
  }
}
