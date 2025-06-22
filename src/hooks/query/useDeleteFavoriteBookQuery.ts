import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteFavoriteBook } from '@/apis/indexedDB';
import { bookQueryKey } from '@/queryKey/book';

export default function useDeleteFavoriteBookQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteFavoriteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookQueryKey.favoriteBookList(),
      });
    },
  });
}
