import { db } from '@/db';
import { todos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const [currentTask] = await db
      .select()
      .from(todos)
      .where(eq(todos.id, id))
      .limit(1);

    if (!currentTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    console.log(currentTask);
    const complete = !currentTask.complete;

    const result = await db
      .update(todos)
      .set({ complete: complete })
      .where(eq(todos.id, id))
      .returning();

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
