import { formatQueryParameter } from './formatter';

export type TRequestParams = Record<string, unknown> | URLSearchParams;

interface IRequestAPIOptions {
  isExternal?: boolean;
  url: RequestInfo | URL;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: TRequestParams;
}

const requestAPI = ({
  isExternal = false,
  url,
  method,
  params,
}: IRequestAPIOptions) => {
  const path = /GET/.test(method)
    ? `${url}${formatQueryParameter(params)}`
    : url;

  const headers = new Headers({
    Authorization: isExternal
      ? `KakaoAK ${import.meta.env.VITE_KAKAO_APP_KEY}`
      : 'Bearer ',
  });

  return fetch(path, { method, headers })
    .then(async response => {
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();

      return result;
    })
    .catch(error => {
      throw Error(error).message;
    });
};

export { requestAPI };
