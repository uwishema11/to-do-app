import { db } from '@/db';
import { todos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    // Log the incoming request
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const [currentTask] = await db
      .select()
      .from(todos)
      .where(eq(todos.id, id))
      .limit(1);

    if (!currentTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    const complete = !currentTask.complete;

    const updatedTask = await db
      .update(todos)
      .set({ complete })
      .where(eq(todos.id, id))
      .returning();

    return NextResponse.json({
      message: 'Task updated successfully',
      task: updatedTask,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
