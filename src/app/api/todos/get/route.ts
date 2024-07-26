import { db } from "@/db";
import { todos } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("Received request for todos");
    const result = await db.select().from(todos);
    console.log("Fetched result:", result); // Log fetched result to debug
    if (result.length === 0) {
      console.warn("No data found in todos table"); // Warn if no data is found
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching todos:", error); // Log errors
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
