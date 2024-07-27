import { db } from '@/db';
import { todos } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Log the incoming request
    console.log('Incoming GET request:', req.url);

    const query = await db.select().from(todos);

    // const result = await query;

    if (query.length === 0) {
      console.warn('No data found in todos table');
    }
    return NextResponse.json(query);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
