import { TypeUser } from '@/types/interfaces/User.interface';
import dbConnect from '@/utils/db/dbConnection';
import User from '@/schemas/users.model';
import { Model } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { useSearchParams } from 'next/navigation';

// 데이터베이스 연결
async function connectToDatabase(): Promise<Model<TypeUser> | undefined> {
  try {
    await dbConnect();
    return User;
  } catch (error) {
    console.error('DB 연결 에러 : ' + error);
  }
}

export async function GET(request: Request) {
  try {
    const Users = await connectToDatabase();

    // 쿼리를 읽어옵니다.
    const { searchParams } = new URL(request.url);
    const emailParam = searchParams.get('email');
    const nameParam = searchParams.get('name');

    // 제공해줄 응답 없음 204
    if (!emailParam && !nameParam) return NextResponse.json({ status: 204 });

    let response;
    if (emailParam !== null) {
      response = await User?.findOne({ email: emailParam });
    } else if (nameParam !== null) {
      response = await User?.findOne({ name: nameParam });
    }

    if (response) {
      return NextResponse.json({ isDuplication: true }, { status: 200 });
    } else {
      return NextResponse.json({ isDuplication: false }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: '유저 확인 라우터에서 오류가 발생하였습니다.' },
      { status: 500 }
    );
  }
}

// middleware.ts 를 거쳐와서 cookies에 `profileImage의 URL`과 `해시화 된 암호` 가 저장되어있다.
export async function POST(request: NextRequest) {
  try {
    const Users = await connectToDatabase();
    const formData = await request.formData();

    // 비밀번호를 해시화 합니다.
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      formData.get('password') as string,
      saltRounds
    );

    // 프로필 이미지의 Url을 불러옵니다.
    const imageUrl = request.headers.get('imageUrl');
    const decodedUrl = imageUrl && decodeURIComponent(imageUrl);

    const data = {
      email: formData.get('email'),
      password: hashedPassword,
      name: formData.get('name'),
      profileImage: decodedUrl || '',
      introduction: formData.get('introduction'),
      preferredTags: formData.getAll('prefferedTags'),
    };

    const created = await Users?.create({
      ...data,
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: '회원가입 라우터에서 오류가 발생하였습니다.' },
      { status: 500 }
    );
  }
}
