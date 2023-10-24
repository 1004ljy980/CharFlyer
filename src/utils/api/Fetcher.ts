import { TypeCheckUser, TypeUser } from '@/types/interfaces/User.interface';
import { TypeIntroductionPostList } from '@/types/interfaces/introductionPost.interface';
import { TypeManagementContent } from '@/types/interfaces/management.interface';
import TypeResponse from '@/types/response';
import API_ROUTES from './apiRoutes';

// 상수
const protocol = 'http';
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const PORT = process.env.NEXT_PUBLIC_PORT;

// fetch 상수
const URL = `${protocol}://${DOMAIN}:${PORT}/api`;
const GET = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};
const POST = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};
const POST_FORM = {
  method: 'POST',
  headers: {
    // 'Content-Type': 'multipart/form-data'
    // 해당 값은 encType에 의해 자동으로 지정될 것임.
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
  const response = await fetch(`${URL}${API_ROUTES.INTRODUCNTION_POSTS}`, {
    ...GET,
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
  const response = await fetch(`${URL}${API_ROUTES.MANAGEMENT}`, { ...GET });

  return response.json();
}

/*
users
*/
export enum CheckParma {
  Email = 'email',
  Name = 'name',
}
export async function checkUser(
  checkParma: CheckParma,
  param: string
): Promise<TypeCheckUser & TypeResponse> {
  const response = await fetch(
    `${URL}${API_ROUTES.USERS}?${checkParma}=${param}`,
    { ...GET }
  );

  return response.json();
}

export async function postUser(
  formData: FormData
): Promise<TypeUser & TypeResponse> {
  // 미들웨어를 거치므로 response 열람 필요

  const response = await fetch(`${URL}/users`, {
    ...POST_FORM,
    body: formData,
  });

  return response.json();
}
