import { Entry } from './../../../../lib/interfaces/interfaces';
// app/api/title/add/route.ts
import { getEntriesCollection } from "@/lib/database/db_collections";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
   const body = await req.json();
    const { entryName,userId, createdAt, updatedAt } = body;


    // Validate payload
    if (!entryName || entryName.trim().length < 1) {
      return NextResponse.json(
        {success: false, message: "Invalid payload: title name required" },
        { status: 400 }
      );
    }

    const titleCollection = await getEntriesCollection();

    

    // Create new Title object
    const newTitle: Entry = {
      entryName,
      userId,
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
        success: true ,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add title error:", error);
    return NextResponse.json(
      { message: "Internal server error", error, success: false },
      { status: 500 }
    );
  }
}
