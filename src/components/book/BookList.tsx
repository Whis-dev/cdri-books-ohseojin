import { useCallback, useMemo, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useTheme } from '@emotion/react';

import {
  getFavoriteBooksAction,
  setFavoriteBooksAction,
} from '@/atoms/book/action';
import { BOOK_COLUMNS } from '@/constants/book';
import type { IDocument } from '@/types/book';

import { LikeFillIcon, LikeLineIcon } from 'icons/index';
import CollapsibleTable from '@/components/common/data-display/CollapsibleTable';
import Typography from '@/components/common/data-display/Typography';
import Button from '@/components/common/form/Button';

interface IBookListProps {
  data: Array<IDocument>;
  infiniteRowId: string;
}

export default function BookList({ data, infiniteRowId }: IBookListProps) {
  const [selectedRows, setSelectedRows] = useState<Array<string>>([]);

  const { favoriteBookIds } = useAtomValue(getFavoriteBooksAction);

  const setFavoriteBooks = useSetAtom(setFavoriteBooksAction);

  const theme = useTheme();

  const handleClickAddFavoriteBook = useCallback(
    (book: IDocument) => () => {
      setFavoriteBooks(book);
    },
    [setFavoriteBooks],
  );

  const handleClickBookDetail = (rowKey: string) => () => {
    setSelectedRows(prev => {
      const isSelectedRow = prev.includes(rowKey);

      return isSelectedRow
        ? prev.filter(key => key !== rowKey)
        : [...prev, rowKey];
    });
  };

  const generatedTableRows = useMemo(
    () =>
      data.map(book => ({
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
              <img loading="lazy" src={book.thumbnail} />
            </div>

            {favoriteBookIds.includes(book.isbn) ? (
              <LikeFillIcon />
            ) : (
              <LikeLineIcon />
            )}
          </button>
        ),
        title: (
          <>
            <Typography
              variant="title3"
              css={{
                display: 'flex',
                width: '408px',
                marginRight: '22px',
                alignItems: 'center',
                gap: '16px',
                color: theme.color.text.primary,
              }}
            >
              <span
                css={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                {book.title}
              </span>

              <Typography
                variant="body2"
                css={{
                  color: theme.color.text.secondary,
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  flex: '0 0 30%',
                }}
              >
                {book.authors}
              </Typography>
            </Typography>
          </>
        ),
        price: (
          <Typography
            variant="title3"
            css={{
              width: '132px',
              marginRight: 'auto',
              color: theme.color.text.primary,
            }}
          >
            {book.price.toLocaleString()}원
          </Typography>
        ),
        buyAction: (
          <Button size="medium" color="primary" as="a" href={book.url}>
            구매하기
          </Button>
        ),
        viewDetail: (
          <Button
            size="medium"
            onClick={handleClickBookDetail(book.isbn)}
            css={{
              marginLeft: '8px',
            }}
          >
            상세보기
          </Button>
        ),
        detail: (
          <section
            css={{
              display: 'flex',
              height: '324px',
              padding: '24px 16px 40px 54px',
            }}
          >
            <button
              onClick={handleClickAddFavoriteBook(book)}
              css={{
                position: 'relative',
                border: 'none',

                '> svg': {
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '24px',
                  height: '24px',
                },
              }}
            >
              <div
                css={{
                  width: '210px',
                  height: '280px',

                  '> img': {
                    widht: '100%',
                    height: '100%',
                  },
                }}
              >
                <img loading="lazy" src={book.thumbnail} />
              </div>

              {favoriteBookIds.includes(book.isbn) ? (
                <LikeFillIcon />
              ) : (
                <LikeLineIcon />
              )}
            </button>

            <dl
              css={{
                width: '360px',
                margin: '46px 48px 0px 32px',
              }}
            >
              <dt>
                <Typography
                  variant="title3"
                  css={{
                    display: 'flex',
                    width: '408px',
                    marginRight: '22px',
                    alignItems: 'center',
                    gap: '16px',
                    color: theme.color.text.primary,
                  }}
                >
                  <span
                    css={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    {book.title}
                  </span>

                  <Typography
                    variant="body2"
                    css={{
                      color: theme.color.text.secondary,
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      flex: '0 0 30%',
                    }}
                  >
                    {book.authors}
                  </Typography>
                </Typography>
              </dt>

              <dd>
                <Typography
                  variant="body2bold"
                  css={{
                    display: 'block',
                    margin: '16px 0px 12px',
                    lineHeight: '26px',
                    color: theme.color.text.primary,
                  }}
                >
                  책 소개
                </Typography>

                <Typography
                  variant="small"
                  css={{
                    lineHeight: '16px',
                    color: theme.color.text.primary,
                  }}
                >
                  {book.contents}
                </Typography>
              </dd>
            </dl>

            <div
              css={{
                display: 'inline-flex',
                textAlign: 'right',
                alignItems: 'flex-end',
                flexDirection: 'column',
                flex: 1,
              }}
            >
              <Button
                size="medium"
                onClick={handleClickBookDetail(book.isbn)}
                css={{
                  marginLeft: '8px',
                  marginBottom: 'auto',
                }}
              >
                상세보기
              </Button>

              <Typography
                variant="title3"
                css={{
                  display: 'flex',
                  width: '132px',
                  fontWeight: 350,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  color: theme.color.text.primary,

                  '& > span:last-of-type': {
                    textDecoration: 'line-through',
                  },
                }}
              >
                <Typography
                  variant="small"
                  css={{
                    marginRight: '8px',
                    lineHeight: '22px',
                    color: theme.color.text.subtitle,
                  }}
                >
                  원가
                </Typography>

                <span>{book.price.toLocaleString()}원</span>
              </Typography>

              {book.sale_price !== -1 && (
                <Typography
                  variant="title3"
                  css={{
                    display: 'flex',
                    width: '132px',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    color: theme.color.text.primary,
                  }}
                >
                  <Typography
                    variant="small"
                    css={{
                      marginRight: '8px',
                      lineHeight: '22px',
                      color: theme.color.text.subtitle,
                    }}
                  >
                    할인가
                  </Typography>
                  {book.sale_price.toLocaleString()}원
                </Typography>
              )}

              <Button
                fullWidth
                size="medium"
                color="primary"
                as="a"
                href={book.url}
                css={{
                  marginTop: '28px',
                }}
              >
                구매하기
              </Button>
            </div>
          </section>
        ),
      })) || [],
    [data, favoriteBookIds, theme, handleClickAddFavoriteBook],
  );

  return (
    <CollapsibleTable
      infiniteRowId={infiniteRowId}
      selectedRows={selectedRows}
      columns={BOOK_COLUMNS}
      rows={generatedTableRows}
    />
  );
}
