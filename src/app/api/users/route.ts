import dbConnect from '@/utils/db/dbConnection';
import User from '@/utils/schemas/users.model';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const Users = User;
    const data = await Users.find({});

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {
  return NextResponse.json(await request.json());
}
