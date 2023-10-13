import { TypeUser } from '@/types/interfaces/User.interface';
import { TypeIntroductionPostList } from '@/types/interfaces/introductionPost.interface';
import { TypeManagementContent } from '@/types/interfaces/management.interface';

// 상수
const protocol = 'http';
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const PORT = process.env.NEXT_PUBLIC_PORT;

// fetch 상수
const URL = `${protocol}://${DOMAIN}:${PORT}/api`;
const POST = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};
const POST_FORM = {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

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
  const response = await fetch(`${URL}/introduction-posts`, {
    cache: 'no-store',
  });

  return response.json();
}

/*
managements
*/

/**
 * 이용약관, 개인정보 수집 및 이용 동의 정보를 받아옵니다.
 * @returns Promise<TypeManagementContent>
 */
export async function getManagement(): Promise<TypeManagementContent> {
  const response = await fetch(`${URL}/managements`);

  return response.json();
}

/*
users
*/

export async function postUser(formData: FormData): Promise<TypeUser> {
  console.log(formData);
  const response = await fetch(`${URL}/users`, {
    ...POST_FORM,
    body: formData,
  });

  return response.json();
}
