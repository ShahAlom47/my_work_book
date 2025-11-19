// app/api/title/add/route.ts
import { NextResponse } from "next/server";
import { getTitleCollection } from "@/lib/database/db_collections";
import { TitleRequestBody } from "@/Interfaces/titleInterface";

export async function POST(req: Request) {
  try {
    const body: TitleRequestBody = await req.json();
    const { name, createdAt, updatedAt } = body;

    // Validate payload
    if (!name || name.trim().length < 1) {
      return NextResponse.json(
        { message: "Invalid payload: title name required" },
        { status: 400 }
      );
    }

    const titleCollection = await getTitleCollection();

    // Check if title already exists (optional)
    const existingTitle = await titleCollection.findOne({ name });

    if (existingTitle) {
      return NextResponse.json(
        { message: "Title already exists", title: existingTitle },
        { status: 409 }
      );
    }

    // Create new Title object
    const newTitle = {
      name,
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
