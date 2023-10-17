import { TypeUser } from '@/types/interfaces/User.interface';
import dbConnect from '@/utils/db/dbConnection';
import User from '@/schemas/users.model';
import { Model } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import upload from '@/middleware/multer';
import runMiddleware from '@/middleware/runMiddleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import multer from 'multer';

// 데이터베이스 연결
async function connectToDatabase(): Promise<Model<TypeUser> | undefined> {
  try {
    await dbConnect();
    return User;
  } catch (error) {
    console.error('DB 연결 에러 : ' + error);
  }
}

// Multer를 사용하기 위한 next-connect 라우터
// Express.js Request와 유사한 NextApiRequest를 사용하기위해 createEdgeRouter 대신 createRouter 사용
const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(multer().any() as any)
  .use(upload.single("profileImage") as any)
  .post(async (request, response)=> {
    try {
      const Users = await connectToDatabase();
      const { email, password, name, introduction, preferredTags } = request.body;
      console.log(email);
      console.log((request as any).file.originalname);
  
      const data = {
        email: email,
        password: password,
        name: name,
        profileImage: '',
        introduction: introduction,
        preferredTags: preferredTags,
      };
      const created = await Users?.create({
        ...data,
      });
       return NextResponse.json(created, {status : 201});
    } catch (error) {
      console.error(error);
    }
  })



export async function GET() {
  try {
    const Users = await connectToDatabase();
    const data = await Users?.find({}).select('objectId');

    return NextResponse.json({ data }, { status:200 });
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  // try {
  //   const Users = await connectToDatabase();
  //   const formData = request.body;

  //   await runMiddleware(request, response, upload.single("profileImage"));
  //   console.log((request as any).file.originalname);

  //   const data = {
  //     email: formData.get('email'),
  //     password: formData.get('password'),
  //     name: formData.get('name'),
  //     profileImage: '',
  //     introduction: formData.get('introduction'),
  //     preferredTags: formData.getAll('prefferedTags'),
  //   };
  //   const created = await Users?.create({
  //     ...data,
  //   });
  //    return NextResponse.json(created, {status : 201});
  // } catch (error) {
  //   console.error(error);
  // }
  return router.run(request, response);
}
