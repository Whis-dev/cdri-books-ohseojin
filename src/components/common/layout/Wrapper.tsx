import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';

import Typography from '@/components/common/data-display/Typography';
import Tab from '@/components/common/navigator/Tab';

const TAB_ITEMS = [
  {
    key: 'search-book',
    label: '도서 검색',
    to: '/',
  },
  {
    key: 'favorite-book',
    label: '내가 찜한 책',
    to: '/favorite-book',
  },
];

export default function Main() {
  const [selectedTab, setSelectedTab] = useState<
    'search-book' | 'favorite-book'
  >('search-book');

  const location = useLocation();

  useEffect(() => {
    setSelectedTab(location.pathname === '/' ? 'search-book' : 'favorite-book');
  }, [location.pathname]);

  return (
    <>
      <header>
        <Typography variant="title1">CERTICOS BOOKS</Typography>

        <Tab
          isLinkTab
          fullWidth
          selectedTab={selectedTab}
          tabItems={TAB_ITEMS}
        />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
