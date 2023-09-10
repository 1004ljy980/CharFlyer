import dbConnect from '@/utils/db/dbConnection';
import IntroductionPost from '@/utils/schemas/introductionPosts.model';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const IntroductionPosts = IntroductionPost;
    const data = await IntroductionPosts.find({});

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {}
