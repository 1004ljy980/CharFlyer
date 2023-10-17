import { TypeUser } from '@/types/interfaces/User.interface';
import dbConnect from '@/utils/db/dbConnection';
import User from '@/schemas/users.model';
import { Model } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

async function connectToDatabase(): Promise<Model<TypeUser> | undefined> {
  try {
    await dbConnect();
    return User;
  } catch (error) {
    console.error('DB 연결 에러 : ' + error);
  }
}

export async function GET() {
  try {
    const Users = await connectToDatabase();
    const data = await Users?.find({});

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
  }
}

// users의 POST 라우팅은 미들웨어를 통해 전달되므로 request에 파일 URL 경로가 포함될 수 있음.
export async function POST(request: NextRequest) {
  try {
    const Users = await connectToDatabase();
    const formData = await request.formData();

    console.log((request as any).file?.location);

    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      name: formData.get('name'),
      profileImage: '',
      introduction: formData.get('introduction'),
      preferredTags: formData.getAll('prefferedTags'),
    };
    const created = await Users?.create({
      ...data,
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error(error);
  }
}
