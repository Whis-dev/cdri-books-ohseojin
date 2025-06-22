import { useInfiniteQuery } from '@tanstack/react-query';

import { bookQueryKey } from '@/queryKey/book';
import { requestBooks } from '@/apis/external';
import type { SEARCH_BOOK_TARGET } from '@/constants/book';

export interface IUseBooksQueryParams {
  query?: string;
  target?: keyof typeof SEARCH_BOOK_TARGET;
}

export default function useBooksQuery({
  query = '',
  target,
}: IUseBooksQueryParams) {
  return useInfiniteQuery({
    enabled: !!query,
    initialPageParam: 1,
    queryKey: bookQueryKey.searchBookList(query),
    queryFn: ({ pageParam }) =>
      requestBooks({
        query: query || '',
        target,
        page: pageParam,
        size: 10,
      }),
    getNextPageParam: (lastPage, allPages, firstPageParam, allPageParam) => {
      return allPageParam[allPageParam.length - 1] + 1;
    },
  });
}
