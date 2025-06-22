let indexedDBInstance: IDBDatabase | null = null;

const getIndexedDB = ({
  dbName,
  dbVersion,
  storeName,
}: {
  dbName: string;
  dbVersion: number;
  storeName: string;
}): Promise<IDBDatabase> | IDBDatabase => {
  if (indexedDBInstance) return indexedDBInstance;

  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open(dbName, dbVersion);

    dbRequest.onsuccess = () => {
      indexedDBInstance = dbRequest.result;
      resolve(indexedDBInstance);
    };

    dbRequest.onupgradeneeded = event => {
      const indexedDB = (event.target as IDBOpenDBRequest).result;

      if (!indexedDB.objectStoreNames.contains(storeName)) {
        const objectStore = indexedDB.createObjectStore(storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });

        objectStore.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };

    dbRequest.onerror = () => reject(dbRequest.error);
  });
};

export { getIndexedDB };
