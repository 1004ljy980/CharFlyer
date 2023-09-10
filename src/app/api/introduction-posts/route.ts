import { TypeIntroductionPost } from '@/types/interfaces/introductionPost.interface';
import dbConnect from '@/utils/db/dbConnection';
import IntroductionPost from '@/utils/schemas/introductionPosts.model';
import { Model } from 'mongoose';
import { NextResponse } from 'next/server';

async function connectToDatabase(): Promise<
  Model<TypeIntroductionPost> | undefined
> {
  try {
    await dbConnect();
    return IntroductionPost;
  } catch (error) {
    console.error('DB 연결 에러 : ' + error);
  }
}

export async function GET() {
  try {
    const IntroductionPosts = await connectToDatabase();
    const data = await IntroductionPosts?.find({});

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {
  try {
    const IntroductionPosts = await connectToDatabase();
    const data = await request.json();
    const created = await IntroductionPosts?.create({
      ...data,
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error(error);
  }
}
