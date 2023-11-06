import {
  TypeCheckUser,
  TypeUser,
} from '@/frontend/types/interfaces/User.interface';
import { TypeIntroductionPostList } from '@/frontend/types/interfaces/introductionPost.interface';
import { TypeManagementContent } from '@/frontend/types/interfaces/management.interface';
import API_ROUTES from './apiRoutes';
import { get, post } from './easyFetch';
import TypeResponse from '@/frontend/types/response';

// 상수
const protocol = 'http';
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const PORT = process.env.NEXT_PUBLIC_PORT;
const URL = `${protocol}://${DOMAIN}:${PORT}/api`;

/*
introductionPosts
*/

/**
 * 페이지에 맞는 소개 글 리스트를 받아옵니다.
 * @returns Promise<TypeintroductionPostList[]>
 */
export async function getIntroductionPostsList(
  page: number = 0
): Promise<TypeResponse<TypeIntroductionPostList[]>> {
  const data = await get(URL, API_ROUTES.INTRODUCNTION_POSTS, '', {
    cache: 'no-store',
  });

  return data;
}

/*
managements
*/

/**
 * 이용약관, 개인정보 수집 및 이용 동의 정보를 받아옵니다.
 * @returns Promise<TypeManagementContent>
 */
export async function getManagement(): Promise<
  TypeResponse<TypeManagementContent>
> {
  const data = await get(URL, API_ROUTES.MANAGEMENT);

  return data;
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
): Promise<TypeResponse<TypeCheckUser>> {
  const params = `${checkParma}=${param}`;
  const data = await get(URL, API_ROUTES.USERS, params);

  return data;
}

export async function postUser(
  formData: FormData
): Promise<TypeResponse<TypeUser>> {
  const data = await post(URL, API_ROUTES.USERS, formData);

  return data;
}

/*
session 로그인/로그아웃
*/

export async function postLogin(
  formData: FormData
): Promise<TypeResponse<object>> {
  const data = await post(URL, API_ROUTES.SESSION, formData);

  return data;
}
