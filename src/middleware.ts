import { NextFetchEvent, NextResponse, NextRequest } from 'next/server';
import uploadImageToS3 from './utils/middleware/uploadImageToS3';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  // 기본 response
  const response = NextResponse.next();

  // POST /api/users
  if (
    request.nextUrl.pathname.startsWith('/api/users') &&
    request.method === 'POST'
  ) {
    console.log('진입');

    // 이미지 파일을 추출합니다.
    const formData = await request.formData();
    const file = formData.get('profileImage') as Blob;

    // 파일이 존재하지 않으면 미들웨어 건너뜀
    if (!file) return response;

    // 이미지 업로드가 성공하면 URL을 cookies의 imageUrl에 set 할 것
    try {
      const imageUrl = await uploadImageToS3(file, 'introductionPost');

      // unkown 형태의 Error 발생 가능
      typeof imageUrl === 'string' &&
        response.cookies.set('imageUrl', imageUrl);

      return response;
    } catch (error) {
      return NextResponse.json(
        { message: '서버 이미지 업로드 실패 :', error },
        { status: 500 }
      );
    }
  }

  return response;
}

export const config = {
  matcher: ['/api/users/:path*'],
};
