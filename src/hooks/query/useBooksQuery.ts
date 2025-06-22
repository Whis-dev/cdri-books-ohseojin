import { useInfiniteQuery } from '@tanstack/react-query';

import { bookQueryKey } from '@/queryKey/book';
import { requestBooks } from '@/apis/external';
import type { SEARCH_BOOK_TARGET } from '@/constants/book';

interface IUseBooksQueryParams {
  searchKeyword?: string;
  target?: keyof typeof SEARCH_BOOK_TARGET;
}

export default function useBooksQuery({
  searchKeyword,
  target,
}: IUseBooksQueryParams) {
  return useInfiniteQuery({
    enabled: !!searchKeyword,
    initialPageParam: 1,
    queryKey: bookQueryKey.searchBookList(searchKeyword || ''),
    queryFn: ({ pageParam }) =>
      requestBooks({
        query: searchKeyword || '',
        target,
        page: pageParam,
        size: 10,
      }),
    getNextPageParam: (lastPage, allPages, firstPageParam, allPageParam) => {
      return allPageParam[allPageParam.length - 1] + 1;
    },
  });
}
