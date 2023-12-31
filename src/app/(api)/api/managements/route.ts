import dbConnect from '@/backend/utils/db/dbConnection';
import { NextResponse } from 'next/server';
import Management from '@/backend/schemas/management.model';

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

    return data ? NextResponse.json(data[0], { status: 200 }) : undefined;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `약관 받아오기에 실패하였습니다. ${error}` },
      {
        status: 500,
      }
    );
  }
}
