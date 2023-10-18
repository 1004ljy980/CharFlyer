import { TypeUser } from '@/types/interfaces/User.interface';
import dbConnect from '@/utils/db/dbConnection';
import User from '@/schemas/users.model';
import { Model } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

// 데이터베이스 연결
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
    const data = await Users?.find({}).select('objectId');

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const Users = await connectToDatabase();
    const formData = await request.formData();

    console.log('profileImage :', request.cookies.get('imageUrl'));

    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      name: formData.get('name'),
      profileImage: request.cookies.get('imageUrl'),
      introduction: formData.get('introduction'),
      preferredTags: formData.getAll('prefferedTags'),
    };
    const created = await Users?.create({
      ...data,
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
  }
}
