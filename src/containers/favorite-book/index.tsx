import { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { useTheme } from '@emotion/react';

import { getFavoriteBooksAction } from '@/atoms/book/action';
import useIntersectionObserver from '@/hooks/common/useIntersectionObserver';
import type { IDocument } from '@/types/book';

import { BookIcon } from 'icons/index';
import Typography from '@/components/common/data-display/Typography';
import Nothing from '@/components/common/feedback/Nothing';
import BookList from '@/components/book/BookList';

export default function FavoriteBook() {
  const [favoriteBookList, setFavoriteBookList] = useState<Array<IDocument>>(
    [],
  );

  const pageRef = useRef<number>(0);

  const { favoriteBookIds, favoriteBooks } = useAtomValue(
    getFavoriteBooksAction,
  );

  const theme = useTheme();

  useIntersectionObserver({
    elementId: 'favorite-book-row',
    callback: entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && pageRef.current < favoriteBooks.length) {
          pageRef.current += 1;
          setFavoriteBookList(prev => [
            ...prev,
            ...(favoriteBooks[pageRef.current] || []),
          ]);
        }
      });
    },
  });

  useEffect(() => {
    if (favoriteBooks.length) {
      setFavoriteBookList(
        favoriteBooks.filter((_, index) => index <= pageRef.current).flat(),
      );
    }
  }, [favoriteBooks]);

  return (
    <article
      css={{
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Typography variant="title2">내가 찜한 책</Typography>

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
          찜한 책
        </Typography>

        <Typography
          variant="caption"
          css={{ lineHeight: theme.typography.lineHeight.xxl }}
        >
          총{' '}
          <i css={{ color: theme.color.palette.primary }}>
            {favoriteBookIds.length}
          </i>
          건
        </Typography>
      </p>

      {favoriteBookIds.length ? (
        <BookList data={favoriteBookList} infiniteRowId="favorite-book-row" />
      ) : (
        <Nothing
          icon={<BookIcon />}
          description="찜한 책이 없습니다."
          css={{
            marginTop: '116px',
          }}
        />
      )}
    </article>
  );
}
