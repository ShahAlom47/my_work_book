import { NextRequest, NextResponse } from "next/server";
import { getEntriesCollection } from "@/lib/database/db_collections";
import { ObjectId } from "mongodb";

export async function PATCH(
  req: NextRequest,
  { params }: { params:Promise< { userId: string }> }
) {
  try {
    const { userId } =await params;

    const { searchParams } = new URL(req.url);
    const entryId = searchParams.get("entryId");

    if (!userId || !entryId) {
      return NextResponse.json(
        { message: "Invalid ID", success: false },
        { status: 400 }
      );
    }

    const { perDaySalary } = await req.json();

    if (!perDaySalary || perDaySalary <= 0) {
      return NextResponse.json(
        { message: "Invalid per day salary", success: false },
        { status: 400 }
      );
    }

    const collection = await getEntriesCollection();

    // 🔥 MAIN UPDATE QUERY
    const updated = await collection.updateOne(
      {
        _id: new ObjectId(entryId),
        userId: userId,
      },
      {
        $set: {
          perDaySalary,
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
      message: "Per day salary updated successfully",
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
