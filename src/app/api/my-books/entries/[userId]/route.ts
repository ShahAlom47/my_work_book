import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getEntriesCollection } from "@/lib/database/db_collections";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const searchParams = req.nextUrl.searchParams;

    const entryId = searchParams.get("entryId"); // <-- Query param

    console.log(userId, entryId, "user and entry id in api route");

    // Validate userId
    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 }
      );
    }

    if (!entryId || !ObjectId.isValid(entryId)) {
      return NextResponse.json(
        { success: false, message: "Invalid entry ID" },
        { status: 400 }
      );
    }

    const entriesCollection = await getEntriesCollection();

    const entry = await entriesCollection.findOne({
      _id: new ObjectId(entryId),
      userId: userId,
    });

 if (!entry) {
      return NextResponse.json(
        { success: false, message: "Entry not found" },
        { status: 404 }
      );
    }

    if (entry?.entryData && Array.isArray(entry?.entryData)) {
      entry.entryData.sort(
        (a, b) =>
          new Date(b.updatedAt ?? 0).getTime() - new Date(a.updatedAt ?? 0).getTime()
      );
    }

    

    return NextResponse.json(
      {
        success: true,
        message: "Entry fetched successfully",
        data: entry,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch entry by ID error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
