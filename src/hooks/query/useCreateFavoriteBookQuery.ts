import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createFavoriteBook } from '@/apis/indexedDB';
import type { IDocument } from '@/types/book';
import { bookQueryKey } from '@/queryKey/book';

export default function useCreateFavoriteBookQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBook: Omit<IDocument, 'id'>) => createFavoriteBook(newBook),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookQueryKey.favoriteBookList(),
      });
    },
  });
}
