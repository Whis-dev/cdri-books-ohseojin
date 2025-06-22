import type { SEARCH_BOOK_TARGET } from '@/constants/book';
import type { IDocument, IMeta } from '@/types/book';
import { requestAPI } from '@/utils/api';

interface IRequestBooksParams
  extends Record<string, string | number | undefined> {
  query: string;
  page?: number;
  size?: number;
  target?: keyof typeof SEARCH_BOOK_TARGET;
}

interface IRequestBooksResponse {
  meta: IMeta;
  documents: Array<IDocument>;
}

export const requestBooks = (
  params: IRequestBooksParams,
): Promise<IRequestBooksResponse> =>
  requestAPI({
    isExternal: true,
    url: 'https://dapi.kakao.com/v3/search/book',
    method: 'GET',
    params,
  });
