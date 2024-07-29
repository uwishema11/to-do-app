import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { todos } from '@/db/schema';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Not Authenticated' },
        { status: 401 },
      );
    }

    const { title } = await req.json();
    const userId = session?.user.id as string;

    // Validate title
    if (!title || typeof title !== 'string') {
      return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }

    const newTask = await db
      .insert(todos)
      .values({
        title: title,
        userId,
      })
      .returning();

    revalidatePath('/todos');
    return NextResponse.json({ newTask });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
};
