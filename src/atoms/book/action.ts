import { atom } from 'jotai';

import { bookKeywordsAtom, favoriteBooksAtom } from './atom';
import type { IDocument } from '@/types/book';

const getBookKeywordsAction = atom(get => get(bookKeywordsAtom));

const setBookKeywordsAction = atom(null, (_, set, newKeyword: string) =>
  set(bookKeywordsAtom, (prevKeywords: Array<string>) => {
    const currentKeyword = prevKeywords.filter(
      prevKeword => prevKeword !== newKeyword,
    );

    if (8 <= currentKeyword.length) {
      currentKeyword.pop();
    }

    return [newKeyword, ...currentKeyword];
  }),
);

const removeBookKeywordsAction = atom(null, (_, set, newKeyword: string) =>
  set(bookKeywordsAtom, (prevKeywords: Array<string>) =>
    prevKeywords.filter(prevKeyword => prevKeyword !== newKeyword),
  ),
);

const getFavoriteBooksAction = atom(get => get(favoriteBooksAtom));

const setFavoriteBooksAction = atom(
  null,
  (_, set, newFavoriteBook: IDocument) =>
    set(
      favoriteBooksAtom,
      ({
        favoriteBookIds: prevFavoriteBookIds,
        favoriteBooks: prevFavoriteBooks,
      }: {
        favoriteBookIds: Array<string>;
        favoriteBooks: Array<IDocument>;
      }) => {
        const isExistFavoriteBook = prevFavoriteBookIds.find(
          prevFavoriteBookId => prevFavoriteBookId === newFavoriteBook.isbn,
        );

        return isExistFavoriteBook
          ? {
              favoriteBookIds: prevFavoriteBookIds.filter(
                prevFavoriteBookId =>
                  prevFavoriteBookId !== newFavoriteBook.isbn,
              ),
              favoriteBooks: prevFavoriteBooks.filter(
                prevFavoriteBook =>
                  prevFavoriteBook.isbn !== newFavoriteBook.isbn,
              ),
            }
          : {
              favoriteBookIds: [...prevFavoriteBookIds, newFavoriteBook.isbn],
              favoriteBooks: [...prevFavoriteBooks, newFavoriteBook],
            };
      },
    ),
);

export {
  getBookKeywordsAction,
  setBookKeywordsAction,
  removeBookKeywordsAction,
  getFavoriteBooksAction,
  setFavoriteBooksAction,
};
