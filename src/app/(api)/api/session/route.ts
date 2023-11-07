import dbConnect from '@/backend/utils/db/dbConnection';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/backend/schemas/users.model';
import { comparePassword } from '@/backend/utils/passwordManager';
import { generateAccessToken } from '@/backend/utils/tokenManager';

async function connectToDatabase() {
  try {
    // 데이터베이스와 연결합니다.
    await dbConnect();

    // 연결을 성공하면 model을 반환합니다.
    return User;
  } catch (error) {
    console.error('DB 연결 에러 : ' + error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const Users = await connectToDatabase();

    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    if (!email || !password)
      return NextResponse.json(
        {
          message: '이메일, 비밀번호를 모두 입력해 주세요.',
        },
        { status: 500 }
      );

    try {
      const data = await Users?.findOne({ email: email }, '_id password');
      if (!data || data.length < 1)
        return NextResponse.json(
          {
            message: '회원이 아닌 이메일입니다.',
          },
          { status: 500 }
        );

      const compareResult = await comparePassword(password, data.password);

      return compareResult
        ? NextResponse.json(
            {
              accessToken: generateAccessToken(data._id),
            },
            { status: 200 }
          )
        : NextResponse.json(
            { message: '비밀번호가 일치하지 않습니다.' },
            { status: 500 }
          );
    } catch (error) {
      return NextResponse.json(
        {
          message: `유저 데이터 로딩에 실패하였습니다. ${error}`,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `세션 연동에 실패하였습니다. ${error}` },
      {
        status: 500,
      }
    );
  }
}
