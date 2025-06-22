const BOOK_DB_NAME = 'BOOK_LIST';
const BOOK_DB_VERSION = 1;
const FAVORITE_BOOK_STORE_NAME = 'FAVORITES';

const SEARCH_BOOK_TARGET = Object.freeze({
  title: '제목',
  publisher: '출판사',
  person: '저자명',
});

const BOOK_COLUMNS = Object.freeze([
  {
    key: 'thumbnail',
  },
  {
    key: 'title',
  },
  {
    key: 'price',
  },
  {
    key: 'buyAction',
  },
  {
    key: 'viewDetail',
  },
]);

export {
  BOOK_DB_NAME,
  BOOK_DB_VERSION,
  FAVORITE_BOOK_STORE_NAME,
  SEARCH_BOOK_TARGET,
  BOOK_COLUMNS,
};
