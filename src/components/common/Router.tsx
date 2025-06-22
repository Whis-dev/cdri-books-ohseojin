import { Route, Routes } from 'react-router';

import Wrapper from '@/components/common/layout/Wrapper';
import SearchBook from '@/conatainers/search-book';
import FavoriteBook from '@/conatainers/favorite-book';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Wrapper />}>
        <Route index element={<SearchBook />} />
        <Route path="favorite-book" element={<FavoriteBook />} />
      </Route>
    </Routes>
  );
}
