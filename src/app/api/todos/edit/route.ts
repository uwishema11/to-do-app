import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const { complete } = await req.json(); // Parse JSON body to get `complete` status

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const result = await db
      .update(todos)
      .set({ complete: complete }) 
      .where(eq(todos.id, id)) 
      .returning();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
