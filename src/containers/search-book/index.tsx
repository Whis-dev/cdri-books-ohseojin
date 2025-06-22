import { useTheme } from '@emotion/react';

import useIntersectionObserver from '@/hooks/common/useIntersectionObserver';

import { BookIcon } from 'icons/index';
import Typography from '@/components/common/data-display/Typography';
import Nothing from '@/components/common/feedback/Nothing';
import useBooksQuery from '@/hooks/query/useBooksQuery';
import BookList from '@/components/book/BookList';
import BookSearchForm from '@/components/book/BookSearchForm';

export default function SearchBook() {
  const theme = useTheme();

  const { data, fetchNextPage } = useBooksQuery({ searchKeyword: '' });

  useIntersectionObserver({
    elementId: 'search-book-row',
    callback: entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      });
    },
  });

  return (
    <article
      css={{
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Typography variant="title2">도서 검색</Typography>

      <BookSearchForm />

      <p
        css={{
          margin: '24px 0 36px',
          color: theme.color.text.primary,

          'span:first-of-type': {
            marginRight: '16px',
          },
        }}
      >
        <Typography
          variant="caption"
          css={{ lineHeight: theme.typography.lineHeight.xxl }}
        >
          도서 검색 결과
        </Typography>

        <Typography
          variant="caption"
          css={{ lineHeight: theme.typography.lineHeight.xxl }}
        >
          총{' '}
          <i css={{ color: theme.color.palette.primary }}>
            {data?.pages[0].meta.total_count || 0}
          </i>
          건
        </Typography>
      </p>

      {data?.pages[0].meta.total_count ? (
        <BookList
          data={data?.pages.map(page => page.documents).flat() || []}
          infiniteRowId="search-book-row"
        />
      ) : (
        <Nothing
          icon={<BookIcon />}
          description="검색된 결과가 없습니다."
          css={{
            marginTop: '120px',
          }}
        />
      )}
    </article>
  );
}
