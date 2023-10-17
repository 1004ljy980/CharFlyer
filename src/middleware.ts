import upload from '@/utils/db/multer';
import { type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname, request.method);

  // /users 라우팅의 POST 요청에 관한 미들웨어입니다.
  // 이미지 주소를 생성합니다.
  if (
    request.nextUrl.pathname.startsWith('/users') &&
    request.method === 'POST'
  ) {
    console.log('미들웨어 진입');

    // // 'profileImage'라는 인자는 <input type="file" name="profileImage"> 에서 폼데이터 이름으로 온 것이다.
    // upload.single('profileImage');
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
