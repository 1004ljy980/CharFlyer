import {
  TypeIntroductionPost,
  TypeIntroductionPostList,
} from '@/types/interfaces/introductionPost.interface';
import dbConnect from '@/utils/db/dbConnection';
import {
  AdjustTypes,
  adjustSequenceValue,
} from '@/utils/schemas/counter.model';
import IntroductionPost from '@/utils/schemas/introductionPosts.model';
import User from '@/utils/schemas/users.model';
import { Model } from 'mongoose';
import { NextResponse } from 'next/server';

async function connectToDatabase(): Promise<
  Model<TypeIntroductionPost> | undefined
> {
  try {
    // 데이터베이스와 연결합니다.
    await dbConnect();

    // 연결을 성공하면 model을 반환합니다.
    return IntroductionPost;
  } catch (error) {
    console.error('DB 연결 에러 : ' + error);
  }
}

export async function GET() {
  try {
    const IntroductionPosts = await connectToDatabase();
    User;

    const data = await IntroductionPosts?.find({})
      .populate('authorId', 'name profileImage') // author 필드를 populate하고, name과 profileImage 필드만 선택
      .select(
        'introductionPostId authorId title thumbnail summary category tags views timestamps'
      )
      .exec();

    return NextResponse.json({ ...data });
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {
  try {
    const IntroductionPosts = await connectToDatabase();
    const data = await request.json();
    // adjustSequenceValue 함수를 통해 counter를 받아와서 introdutionPostId로 사용합니다.
    const introductionPostId = await adjustSequenceValue(
      'introductionPostId',
      AdjustTypes.Increment
    );

    // 정보를 등록합니다.
    const created = await IntroductionPosts?.create({
      introductionPostId,
      ...data,
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error(error);
    try {
      // 오류가 발생할 시에, 증가시켜 놓았던 id를 다시 감소시킵니다.
      await adjustSequenceValue('introductionPostId', AdjustTypes.Decrement);
    } catch (error) {
      console.log('counter 오류 : ' + error);
    }
  }
}
