// easyFetch header
const header = {
  GET: {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  POST: {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data'
      // 해당 값은 encType에 의해 자동으로 지정될 것임.
    },
  },
};

// 커스텀 fetch 함수
type TypeHeader = {
  method: string;
  headers: HeadersInit;
};
export const easyFetch = async (
  url: string,
  route: string,
  header: TypeHeader,
  params?: string,
  options?: object
) => {
  const response = await fetch(`${url}${route}?${params}`, {
    ...header,
    ...options,
  });
  const data = await response.json();

  return { data: data, status: response.status };
};

// 각 method에 따른 함수
export const get = async (
  url: string,
  route: string,
  params?: string,
  options?: object
) => {
  return easyFetch(url, route, header.GET, params, options);
};
export const post = async (
  url: string,
  route: string,
  data: any,
  params?: string,
  options?: object
) => {
  return easyFetch(url, route, header.POST, params, { ...options, body: data });
};
