import { useCallback, useMemo, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useTheme } from '@emotion/react';

import {
  getFavoriteBooksAction,
  setFavoriteBooksAction,
} from '@/atoms/book/action';
import { BOOK_COLUMNS } from '@/constants/book';
import type { IDocument } from '@/types/book';

import { BookIcon, LikeFillIcon, LikeLineIcon } from 'icons/index';
import Typography from '@/components/common/data-display/Typography';
import Nothing from '@/components/common/feedback/Nothing';
import Button from '@/components/common/form/Button';
import CollapsibleTable from '@/components/common/data-display/CollapsibleTable';

export default function FavoriteBook() {
  const [selectedRows, setSelectedRows] = useState<Array<string>>([]);

  const { favoriteBookIds, favoriteBooks } = useAtomValue(
    getFavoriteBooksAction,
  );
  const setFavoriteBooks = useSetAtom(setFavoriteBooksAction);

  const theme = useTheme();

  const handleClickBookDetail = (rowKey: string) => () => {
    setSelectedRows(prev => [...prev, rowKey]);
  };

  const handleClickAddFavoriteBook = useCallback(
    (book: IDocument) => () => {
      setFavoriteBooks(book);
    },
    [setFavoriteBooks],
  );

  const generatedTableRows = useMemo(
    () =>
      favoriteBooks.map(book => ({
        key: book.isbn,
        thumbnail: (
          <button
            onClick={handleClickAddFavoriteBook(book)}
            css={{
              position: 'relative',
              margin: '0px 48px',
              border: 'none',

              '> svg': {
                position: 'absolute',
                top: 0,
                right: 0,
                width: '16px',
                height: '16px',
              },
            }}
          >
            <div
              css={{
                width: '48px',
                height: '68px',

                '> img': {
                  widht: '100%',
                  height: '100%',
                },
              }}
            >
              <img src={book.thumbnail} />
            </div>

            {favoriteBookIds.includes(book.isbn) ? (
              <LikeFillIcon />
            ) : (
              <LikeLineIcon />
            )}
          </button>
        ),
        title: (
          <div css={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Typography
              variant="title3"
              css={{ color: theme.color.text.primary }}
            >
              {book.title}
            </Typography>
            <Typography
              variant="body2"
              css={{ color: theme.color.text.secondary }}
            >
              {book.authors}
            </Typography>
          </div>
        ),
        price: (
          <Typography
            variant="title3"
            css={{
              marginRight: '56px',
              color: theme.color.text.primary,
            }}
          >
            {book.price}
          </Typography>
        ),
        buyAction: (
          <Button size="medium" color="primary" as="a" href={book.url}>
            구매하기
          </Button>
        ),
        viewDetail: (
          <Button size="medium" onClick={handleClickBookDetail(book.isbn)}>
            상세보기
          </Button>
        ),
      })) || [],
    [favoriteBooks, theme, favoriteBookIds, handleClickAddFavoriteBook],
  );

  return (
    <article>
      <Typography variant="title2">내가 찜한 책</Typography>

      <p
        css={{
          marginTop: '24px',
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
        <CollapsibleTable
          selectedRows={selectedRows}
          columns={BOOK_COLUMNS}
          rows={generatedTableRows}
        />
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
