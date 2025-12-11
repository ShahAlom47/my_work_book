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
    const rawFilter = searchParams.get("filter") || "All";

    const filter: FilterOption =
      rawFilter === "This Week" ||
      rawFilter === "This Month" ||
      rawFilter === "This Year"
        ? rawFilter
        : "All";

    // Validation
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

    const entry = (await entriesCollection.findOne({
      _id: new ObjectId(entryId),
      userId: userId,
    })) as Entry | null;

    if (!entry) {
      return NextResponse.json(
        { success: false, message: "Entry not found" },
        { status: 404 }
      );
    }

    // -----------------------------
    // 🔍 SEARCH + FILTER PROCESSING
    // -----------------------------
    let filteredData = entry.entryData || [];

    // Search
    if (search) {
      filteredData = filteredData.filter(
        (item) =>
          item.placeName?.toLowerCase().includes(search) ||
          item.description?.toLowerCase().includes(search)
      );
    }

    // Filter by date
    if (filter !== "All") {
      const now = new Date();

      filteredData = filteredData.filter((item: EntryData) => {
        const date = new Date(item.date);

        switch (filter) {
          case "This Week": {
            const start = new Date();
            const day = start.getDay();
            start.setDate(start.getDate() - day);
            return date >= start;
          }

          case "This Month":
            return (
              date.getMonth() === now.getMonth() &&
              date.getFullYear() === now.getFullYear()
            );

          case "This Year":
            return date.getFullYear() === now.getFullYear();

          default:
            return true;
        }
      });
    }

    // Sort by updatedAt DESC
    filteredData.sort(
      (a, b) =>
        new Date(b.date ?? 0).getTime() -
        new Date(a.date ?? 0).getTime()
    );
// ----------------------------------------
// ⭐ CALCULATIONS: totalDays, salary, remain
// ----------------------------------------

const perDaySalary = entry.perDaySalary || 0;

// Work days count: placeName >= 3 characters clean
const totalWorkDays = filteredData.filter(
  (item) => item.placeName && item.placeName.trim().length >= 2
).length;

// ✔ TOTAL PAID (sum of addAmount where it is positive)
const totalPaid = filteredData.reduce(
  (sum, item) => sum + (item.addAmount || 0),
  0
);

// ✔ TOTAL SALARY (only work days × perDaySalary)
const totalSalary = totalWorkDays * perDaySalary;

// ✔ REMAINING SALARY
const remainingSalary = totalSalary - totalPaid;

// Inject calculated values into entry
entry.entryData = filteredData;
entry.totalDays = totalWorkDays;
entry.totalSalary = totalSalary;
entry.paidSalary = totalPaid;
entry.remainingSalary = remainingSalary;

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
