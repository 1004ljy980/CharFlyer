import { TypeIntroductionPostList } from '@/types/interfaces/introductionPost.interface';

// 환경변수
const DOMAIN = process.env.DOMAIN;
const PORT = process.env.PORT;

/*
introductionPosts
*/

/**
 * 페이지에 맞는 소개 글 리스트를 받아옵니다.
 * @returns Promise<TypeintroductionPostList[]>
 */
export async function getIntroductionPostsList(
  page: number = 0
): Promise<TypeIntroductionPostList[]> {
  const response = await fetch(
    `http://${DOMAIN}:${PORT}/api/introduction-posts`,
    {
      cache: 'no-store',
    }
  );

  return response.json();
}
