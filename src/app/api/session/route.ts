import dbConnect from '@/utils/db/dbConnection';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/schemas/users.model';
import bcrypt from 'bcryptjs';

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
      const data = await Users?.find({ email: email });
      if (!data || data.length < 1)
        return NextResponse.json(
          {
            message: '회원이 아닌 이메일입니다.',
          },
          { status: 500 }
        );

      const compareResult = await bcrypt.compare(password, data[0].password);

      return compareResult
        ? NextResponse.json({}, { status: 200 })
        : NextResponse.json(
            { message: '비밀번호가 일치하지 않습니다.' },
            { status: 500 }
          );
    } catch (error) {
      return NextResponse.json(
        {
          message: error,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
  }
}
