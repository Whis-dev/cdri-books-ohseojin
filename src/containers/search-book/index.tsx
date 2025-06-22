import { useState } from 'react';
import { useTheme } from '@emotion/react';

import useIntersectionObserver from '@/hooks/common/useIntersectionObserver';
import useBooksQuery, {
  type IUseBooksQueryParams,
} from '@/hooks/query/useBooksQuery';

import { BookIcon } from '@/assets/icons/index';
import Typography from '@/components/common/data-display/Typography';
import Nothing from '@/components/common/feedback/Nothing';
import BookList from '@/components/book/BookList';
import BookSearchForm from '@/components/book/BookSearchForm';

export default function SearchBook() {
  const [bookQueryParams, setBookQueryParams] = useState<IUseBooksQueryParams>(
    {},
  );

  const theme = useTheme();

  const { data, fetchNextPage } = useBooksQuery(bookQueryParams);

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

  const handleSubmitBookSearch = (params: IUseBooksQueryParams) => {
    setBookQueryParams(params);
  };

  return (
    <article
      css={{
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Typography variant="title2">도서 검색</Typography>

      <BookSearchForm onSubmitBookSearch={handleSubmitBookSearch} />

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
