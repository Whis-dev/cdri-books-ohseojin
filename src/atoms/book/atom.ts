import { atomWithStorage } from 'jotai/utils';

import type { IDocument } from '@/types/book';

const bookKeywordsAtom = atomWithStorage<Array<string>>('bookKeywords', []);

const favoriteBooksAtom = atomWithStorage<{
  favoriteBookIds: Array<string>;
  favoriteBooks: Array<IDocument>;
}>('favoriteBooks', {
  favoriteBookIds: [],
  favoriteBooks: [],
});

export { bookKeywordsAtom, favoriteBooksAtom };
