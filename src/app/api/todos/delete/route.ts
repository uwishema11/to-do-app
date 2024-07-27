import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { todos } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  try {
    if (!id) {
      return NextResponse.json({ message: 'id is required' }, { status: 400 });
    }
    await db.delete(todos).where(eq(todos.id, id)).returning();
    return NextResponse.json({ message: `Task deleted successfully` });
  } catch (error) {
    console.log(error);
  }
};
