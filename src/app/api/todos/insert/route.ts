// import { db } from "@/db";
// import { NextApiRequest, NextApiResponse } from "next";
// import { todos } from "@/db/schema";
// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@/auth";

// export const POST = async(req: NextRequest) =>{
//     try {
//         const session = await auth()
//         if(!session?.user) return NextResponse.json({message: "Not Authenticated"});

//         const { title } = await req.json()
//         const userId = session?.user.id as string;

//         const newTask =db.insert(todos).values({
//             title: title,
//             userId
//         }).returning()

//         return NextResponse.json({
//             newTask
//         })

//     } catch (error) {
//         console.log(error)
//     }
// }
import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { todos } from '@/db/schema';
import { auth } from '@/auth';

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

    console.log('values', { title, userId });

    const newTask = await db
      .insert(todos)
      .values({
        title: title,
        userId,
      })
      .returning();

    console.log('newTask', newTask);
    return NextResponse.json({ newTask });
  } catch (error) {
    console.error('Error in POST /api/insert:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
};
