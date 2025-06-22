import {
  BOOK_DB_NAME,
  BOOK_DB_VERSION,
  FAVORITE_BOOK_STORE_NAME,
} from '@/constants/book';
import type { IDocument } from '@/types/book';
import { getIndexedDB } from '@/utils/indexedDB';

const createFavoriteBook = async (book: IDocument) => {
  const indexedDB = await getIndexedDB({
    dbName: BOOK_DB_NAME,
    dbVersion: BOOK_DB_VERSION,
    storeName: FAVORITE_BOOK_STORE_NAME,
  });

  return new Promise((resolve, reject) => {
    const transaction = indexedDB.transaction(
      [FAVORITE_BOOK_STORE_NAME],
      'readwrite',
    );
    const objectStore = transaction.objectStore(FAVORITE_BOOK_STORE_NAME);

    const storeRequest = objectStore.add({
      ...book,
      createdAt: new Date(),
    });

    storeRequest.onsuccess = () => resolve(storeRequest.result);

    storeRequest.onerror = () => reject(storeRequest.error);
  });
};

export { createFavoriteBook };
