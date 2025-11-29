import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getEntriesCollection } from "@/lib/database/db_collections";
import { FilterOption } from "@/types/types";
import { Entry, EntryData } from "@/lib/interfaces/interfaces";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const searchParams = req.nextUrl.searchParams;

    const entryId = searchParams.get("entryId"); 
    const search = searchParams.get("search")?.toLowerCase() || "";
    const filters=searchParams.get("filter")?.toLowerCase() || "";

   
 console.log(userId, entryId,"entry id", search, filters,"API query params");
const rawFilter = searchParams.get("filter");
const filter: FilterOption = 
  rawFilter === "This Week" || rawFilter === "This Month" || rawFilter === "This Year" 
    ? rawFilter 
    : "All";


   

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

    // --- Filter and Search on entryData array ---
    if (entry?.entryData && Array.isArray(entry.entryData)) {
      let filteredData = entry.entryData as EntryData[];

      // Search
      if (search) {
        filteredData = filteredData.filter((item: EntryData) =>
          item.placeName?.toLowerCase().includes(search) ||
          item.description?.toLowerCase().includes(search)
        );
      }

      // Filter by date (example: "this Week", "this Month", "this Year")
      if (filter && filter !== "All") {
        const now = new Date();
        filteredData = filteredData.filter((item: EntryData) => {
          const updatedAt = new Date(item.date);
          switch (filter) {
            case "This Week":
              const startOfWeek = new Date(
                now.setDate(now.getDate() - now.getDay())
              );
              return updatedAt >= startOfWeek;
            case "This Month":
              return (
                updatedAt.getMonth() === now.getMonth() &&
                updatedAt.getFullYear() === now.getFullYear()
              );
            case "This Year":
              return updatedAt.getFullYear() === now.getFullYear();
            default:
              return true;
          }
        });
      }

      // Sort by updatedAt descending
      filteredData.sort(
        (a, b) =>
          new Date(b.updatedAt ?? 0).getTime() -
          new Date(a.updatedAt ?? 0).getTime()
      );

      entry.entryData = filteredData;
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
