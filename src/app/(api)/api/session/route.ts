import dbConnect from '@/backend/utils/db/dbConnection';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/backend/schemas/users.model';
import Token from '@/backend/schemas/tokens.model';
import { comparePassword } from '@/backend/utils/passwordManager';
import {
  generateAccessToken,
  generateRefreshToken,
} from '@/backend/utils/tokenManager';

const PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const REFRESH_EXPIRES_IN_DAY: string =
  process.env.JWT_REFRESH_EXPIRES_IN?.split('d')[0] || '0';
const REFRESH_EXPIRES_IN_SECOND: number =
  Number(REFRESH_EXPIRES_IN_DAY) * 60 * 60 * 24; // 1일 기준으로 곱함

async function connectToDatabase() {
  try {
    // 데이터베이스와 연결합니다.
    await dbConnect();

    // 연결을 성공하면 model을 반환합니다.
    return { Users: User, Tokens: Token };
  } catch (error) {
    console.error('DB 연결 에러 : ' + error);
  }
}

export async function POST(request: NextRequest) {
  try {
    let Models = await connectToDatabase();

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
      const data = await Models?.Users?.findOne(
        { email: email },
        '_id password'
      );
      if (!data || data.length < 1)
        return NextResponse.json(
          {
            message: '회원이 아닌 이메일입니다.',
          },
          { status: 500 }
        );

      const compareResult = await comparePassword(password, data.password);
      const userId = data._id;

      // reponse 구성
      const accessToken = generateAccessToken(userId);
      const refreshToken = generateRefreshToken(userId);
      const response = NextResponse.json(
        {
          accessToken: accessToken,
        },
        { status: 200 }
      );
      response.cookies.set({
        name: 'refreshToken',
        value: generateRefreshToken(userId),
        maxAge: REFRESH_EXPIRES_IN_SECOND,
        path: '/',
        httpOnly: true,
        secure: PROTOCOL === 'https',
        domain: DOMAIN,
      });

      // refreshToken DB 저장
      const result = await Models?.Tokens?.findOneAndUpdate(
        { userId: userId },
        { refreshToken: refreshToken },
        { new: true, upsert: true } // upsert 옵션 사용하여 문서가 없으면 생성하고, new 옵션으로 업데이트 후의 문서 반환
      );

      return compareResult
        ? response
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
