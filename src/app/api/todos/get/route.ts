import { db } from '@/db';
import { todos } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // const url = req.url;
    // if (!url) {
    //   return NextResponse.json(
    //     { message: 'Failed to fetch data  is required' },
    //     { status: 404 },
    //   );
    // }
    const query = await db.select().from(todos);

    return NextResponse.json(query);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
