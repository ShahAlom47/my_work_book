import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getEntriesCollection } from "@/lib/database/db_collections";
import { v4 as uuidv4 } from "uuid";
import { EntryData } from "@/lib/interfaces/interfaces";

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string; entryId: string } }
) {
  try {
    const { userId, entryId } = params;
    const body = await req.json();

    const { date, placeName, description, addAmount } = body;

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, message: "Invalid user ID" }, { status: 400 });
    }

    if (!entryId || !ObjectId.isValid(entryId)) {
      return NextResponse.json({ success: false, message: "Invalid entry ID" }, { status: 400 });
    }

    if (!date || !placeName || addAmount === undefined) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const entriesCollection = await getEntriesCollection();

    const newEntryData: EntryData = {
      entryDataId: uuidv4(), // <-- unique ID backend generated
      date,
      placeName,
      description,
      addAmount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updateResult = await entriesCollection.updateOne(
      { _id: new ObjectId(entryId), userId: userId },
      { $push: { entryData: newEntryData } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: "Entry not found or not updated" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "EntryData added successfully", data: newEntryData }, { status: 200 });

  } catch (error) {
    console.error("Add entryData error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
