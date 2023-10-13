import { TypeUser } from '@/types/interfaces/User.interface';
import dbConnect from '@/utils/db/dbConnection';
import User from '@/schemas/users.model';
import { Model } from 'mongoose';
import { NextResponse } from 'next/server';

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

export async function POST(request: Request) {
  try {
    const Users = await connectToDatabase();
    const data = request.formData;
    console.log(data);
    // const created = await Users?.create({
    //   ...data,
    // });

    // return NextResponse.json(created);
  } catch (error) {
    console.error(error);
  }
}
