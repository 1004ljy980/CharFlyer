import { NextFetchEvent, NextResponse, NextRequest } from 'next/server';
import uploadImageToS3 from './backend/utils/middleware/uploadImageToS3';
import MIDDLEWARE from './backend/constants/Middleware';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  // POST /api/users
  if (
    request.nextUrl.pathname.startsWith('/api/users') &&
    request.method === 'POST'
  ) {
    // 이미지 파일을 추출합니다.
    const formData = await request.formData();
    const file = formData.get('profileImage') as Blob;

    // 파일이 존재하지 않으면(용량 0) 미들웨어 건너뜀
    if (file.size < MIDDLEWARE.LEAST_FILE_SIZE) return NextResponse.next();
    // 파일 용량이 제한 사이즈보다 크면 오류
    if (file.size > MIDDLEWARE.LIMITS_FILE_SIZE)
      throw new Error('File Size Over.');

    try {
      // uploadImageToS3 유틸로 이미지 업로드
      const imageUrl = await uploadImageToS3(file, 'introductionPost');

      // 에러가 아닐 시 response의 headers에 imageUrl 저장
      if (typeof imageUrl === 'string') {
        const encodedUrl = encodeURIComponent(imageUrl);
        const newUserHeaders = new Headers(request.headers);
        newUserHeaders.set('imageUrl', encodedUrl);
        return NextResponse.next({
          request: {
            headers: newUserHeaders,
          },
        });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: '서버 이미지 업로드 실패 :', error },
        { status: 500 }
      );
    }
  }
}

export const config = {
  matcher: ['/api/users/:path*'],
};
