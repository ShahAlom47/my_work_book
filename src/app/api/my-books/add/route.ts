import { Entry, EntryData } from './../../../../lib/interfaces/interfaces';
// app/api/title/add/route.ts
import { getEntriesCollection } from "@/lib/database/db_collections";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
   const body = await req.json();
    const { entryName, createdAt, updatedAt } = body;

    // Validate payload
    if (!entryName || entryName.trim().length < 1) {
      return NextResponse.json(
        { message: "Invalid payload: title name required" },
        { status: 400 }
      );
    }

    const titleCollection = await getEntriesCollection();

    // Check if title already exists (optional)
    const existingTitle = await titleCollection.findOne({ name });

    if (existingTitle) {
      return NextResponse.json(
        { message: "Title already exists", title: existingTitle },
        { status: 409 }
      );
    }

    // Create new Title object
    const newTitle: Entry = {
      entryName,
      entryData: [],
      createdAt: createdAt || new Date().toISOString(),
      updatedAt: updatedAt || new Date().toISOString(),
    };

    // Insert into DB
    const insertedTitle = await titleCollection.insertOne(newTitle);

    return NextResponse.json(
      {
        message: "Title created successfully",
        title: insertedTitle,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add title error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
