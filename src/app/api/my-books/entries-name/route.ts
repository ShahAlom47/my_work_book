// app/api/title/get/route.ts
import { getEntriesCollection } from "@/lib/database/db_collections";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const titleCollection = await getEntriesCollection();

    // Only required fields — no entryData
    const titles = await titleCollection
      .find(
        {},
        {
          projection: { entryName: 1, createdAt: 1, updatedAt: 1 }, // only needed fields
        }
      )
      .sort({ createdAt: -1 }) // latest first
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
