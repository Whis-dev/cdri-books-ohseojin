import { requestFavoriteBooks } from '@/apis/indexedDB';
import { bookQueryKey } from '@/queryKey/book';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useFavoriteBooksQuery(pageSize: number = 10) {
  return useInfiniteQuery({
    initialPageParam: 0,
    queryKey: bookQueryKey.favoriteBookList(),
    queryFn: ({ pageParam = 0 }) => requestFavoriteBooks(pageParam, pageSize),
    getNextPageParam: lastPage => lastPage.nextCursor,
  });
}
