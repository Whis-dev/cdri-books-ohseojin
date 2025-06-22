import { useInfiniteQuery } from '@tanstack/react-query';

import { bookQueryKey } from '@/queryKey/book';
import { requestBooks } from '@/apis/external';

interface IUseBooksQueryParams {
  searchKeyword?: string;
}

export default function useBooksQuery({ searchKeyword }: IUseBooksQueryParams) {
  return useInfiniteQuery({
    enabled: !!searchKeyword,
    initialPageParam: 1,
    queryKey: bookQueryKey.searchBookList(searchKeyword || ''),
    queryFn: ({ pageParam }) =>
      requestBooks({ query: searchKeyword || '', page: pageParam, size: 10 }),
    getNextPageParam: (lastPage, allPages, firstPageParam, allPageParam) => {
      return allPageParam[allPageParam.length - 1] + 1;
    },
  });
}
