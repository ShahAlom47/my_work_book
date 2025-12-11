import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getEntriesCollection } from "@/lib/database/db_collections";
import { EntryData } from "@/lib/interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";

export async function POST(
  req: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } =  await params; // params is already resolved
    const searchParams = req.nextUrl.searchParams;
    const entryId = searchParams.get("entryId");

    const body = await req.json();
    const { date, placeName, description, addAmount } = body;




    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, message: "Invalid user ID" }, { status: 400 });
    }

    if (!entryId || !ObjectId.isValid(entryId)) {
      return NextResponse.json({ success: false, message: "Invalid entry ID" }, { status: 400 });
    }

    if (!date ) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const entriesCollection = await getEntriesCollection();

    const newEntryData: EntryData = {
      entryDataId: uuidv4(),
      date,
      placeName,
      description: description || "",
      addAmount: addAmount || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

   const updateResult = await entriesCollection.updateOne(
  { _id: new ObjectId(entryId), userId },
  {
    $push: { entryData: newEntryData },
    $set: { updatedAt: new Date().toISOString() }
  }
)

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: "Entry not found or not updated" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "EntryData added successfully", data: newEntryData }, { status: 200 });
  } catch (error) {
    console.error("Add entryData error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}