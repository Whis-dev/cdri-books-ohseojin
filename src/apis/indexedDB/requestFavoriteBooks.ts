import {
  BOOK_DB_NAME,
  BOOK_DB_VERSION,
  FAVORITE_BOOK_STORE_NAME,
} from '@/constants/book';
import type { IDocument } from '@/types/book';
import { getIndexedDB } from '@/utils/indexedDB';

const requestFavoriteBooks = async (
  pageParam: number = 0,
  pageSize: number = 10,
): Promise<{
  books: Array<IDocument>;
  nextCursor: number | undefined;
  hasNextPage: boolean;
}> => {
  const indexedDB = await getIndexedDB({
    dbName: BOOK_DB_NAME,
    dbVersion: BOOK_DB_VERSION,
    storeName: FAVORITE_BOOK_STORE_NAME,
  });

  return new Promise((resolve, reject) => {
    const transaction = indexedDB.transaction(
      [FAVORITE_BOOK_STORE_NAME],
      'readonly',
    );
    const objectStore = transaction.objectStore(FAVORITE_BOOK_STORE_NAME);
    const books: Array<IDocument> = [];
    const dbCursorRequest = objectStore.openCursor();

    let itemCount = 0;
    let skipped = 0;

    dbCursorRequest.onsuccess = event => {
      const cursor = (event.target as IDBRequest).result;

      if (!cursor) {
        resolve({
          books,
          nextCursor: undefined,
          hasNextPage: false,
        });
      }

      if (skipped < pageParam) {
        skipped++;
        cursor.continue();
        return;
      }

      if (itemCount < pageSize) {
        books.push(cursor.value);
        itemCount++;
        cursor.continue();
      } else {
        resolve({
          books,
          nextCursor: pageParam + pageSize,
          hasNextPage: true,
        });
      }
    };

    dbCursorRequest.onerror = () => reject(dbCursorRequest.error);
  });
};

export { requestFavoriteBooks };
