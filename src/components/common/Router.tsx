import { Route, Routes } from 'react-router';

import Wrapper from '@/components/common/layout/Wrapper';
import SearchBook from '@/containers/search-book';
import FavoriteBook from '@/containers/favorite-book';

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
