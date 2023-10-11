import dbConnect from '@/utils/db/dbConnection';
import { NextResponse } from 'next/server';
import Management from '@/schemas/management.model';

async function connectToDatabase() {
  try {
    // 데이터베이스와 연결합니다.
    await dbConnect();

    // 연결을 성공하면 model을 반환합니다.
    return Management;
  } catch (error) {
    console.error('DB 연결 에러 : ' + error);
  }
}

export async function GET() {
  try {
    const Managements = await connectToDatabase();

    const data = await Managements?.find({});

    return data ? NextResponse.json(data[0]) : undefined;
  } catch (error) {
    console.error(error);
  }
}
