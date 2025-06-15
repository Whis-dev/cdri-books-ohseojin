import { atomWithStorage } from 'jotai/utils';

const bookKeywords = atomWithStorage<Array<Record<string, string>>>(
  'bookKeywords',
  [],
);

const faboriteBooks = atomWithStorage<Array<Record<string, string>>>(
  'faboriteBooks',
  [],
);

export { bookKeywords, faboriteBooks };
