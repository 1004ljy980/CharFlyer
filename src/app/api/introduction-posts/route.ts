import dbConnect from '@/utils/db/dbConnection';
import { AdjustTypes, adjustSequenceValue } from '@/schemas/counter.model';
import IntroductionPost, {
  TypeIntroductionPost,
} from '@/schemas/introductionPosts.model';
import User from '@/schemas/users.model';
import { NextResponse } from 'next/server';

async function connectToDatabase() {
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

    // 타입스크립트가 유추한 Omit<any, never>타입 대신, 타입 단언 as 사용
    const data = (await IntroductionPosts?.find({})
      .populate('author', 'name profileImage')
      .select(
        'introductionPostId author title thumbnail summary content category tags views timestamps createdAt'
      )
      .exec()) as TypeIntroductionPost[] | undefined;

    // 프론트엔드 인터페이스에 맞게 데이터 가공
    const modifiedData = data?.map((post) => ({
      id: post._id,
      introductionPostId: post.introductionPostId,
      authorId: post.author._id,
      authorName: post.author.name,
      authorImage: post.author.profileImage,
      title: post.title,
      thumbnail: post.thumbnail,
      content: post.content,
      summary: post.summary,
      category: post.category,
      tags: post.tags,
      views: post.views,
      timestamps: post.createdAt,
    }));

    return NextResponse.json(modifiedData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `게시글 받아오기에 실패하였습니다. ${error}` },
      { status: 500 }
    );
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

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
    try {
      // 오류가 발생할 시에, 증가시켜 놓았던 id를 다시 감소시킵니다.
      await adjustSequenceValue('introductionPostId', AdjustTypes.Decrement);
    } catch (error) {
      console.log('counter 오류 : ' + error);
      return NextResponse.json(
        { message: `counter에서 오류 발생 ${error}` },
        { status: 500 }
      );
    }
  }
}
