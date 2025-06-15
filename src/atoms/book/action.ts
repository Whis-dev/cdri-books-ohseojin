import { atom } from 'jotai';

import { bookKeywords } from './atom';

const getBookKeywords = () => atom(get => get(bookKeywords));

export default { getBookKeywords };
