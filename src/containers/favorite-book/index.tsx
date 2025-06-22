import { useAtomValue } from 'jotai';
import { useTheme } from '@emotion/react';

import { getFavoriteBooksAction } from '@/atoms/book/action';

import { BookIcon } from 'icons/index';
import Typography from '@/components/common/data-display/Typography';
import Nothing from '@/components/common/feedback/Nothing';
import BookList from '@/components/book/BookList';

export default function FavoriteBook() {
  const { favoriteBookIds, favoriteBooks } = useAtomValue(
    getFavoriteBooksAction,
  );

  const theme = useTheme();

  return (
    <article>
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
        <BookList data={favoriteBooks} infiniteRowId="favorite-book-row" />
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
