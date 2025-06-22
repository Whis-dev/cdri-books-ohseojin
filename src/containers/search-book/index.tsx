import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useTheme } from '@emotion/react';

import {
  getBookKeywordsAction,
  getFavoriteBooksAction,
  removeBookKeywordsAction,
  setBookKeywordsAction,
  setFavoriteBooksAction,
} from '@/atoms/book/action';
import { BOOK_COLUMNS } from '@/constants/book';
import useIntersectionObserver from '@/hooks/common/useIntersectionObserver';
import type { IDocument } from '@/types/book';

import {
  BookIcon,
  CloseIcon,
  LikeFillIcon,
  LikeLineIcon,
  SearchIcon,
} from 'icons/index';
import Typography from '@/components/common/data-display/Typography';
import Nothing from '@/components/common/feedback/Nothing';
import Button from '@/components/common/form/Button';
import useBooksQuery from '@/hooks/query/useBooksQuery';
import CollapsibleTable from '@/components/common/data-display/CollapsibleTable';

export default function SearchBook() {
  const [isSearchInputFocused, setSearchInputFocused] =
    useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<Array<string>>([]);

  const searchBookInputRef = useRef<HTMLInputElement>(null);

  const bookKeywords = useAtomValue(getBookKeywordsAction);
  const { favoriteBookIds } = useAtomValue(getFavoriteBooksAction);

  const setBookKeyword = useSetAtom(setBookKeywordsAction);
  const removeBookKeyword = useSetAtom(removeBookKeywordsAction);
  const setFavoriteBooks = useSetAtom(setFavoriteBooksAction);

  const theme = useTheme();

  const { data, fetchNextPage } = useBooksQuery({ searchKeyword });

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

  const handleClickDetailSearch = () => {};

  const handleClickDeleteBookKeyword = (keyword: string) => () => {
    removeBookKeyword(keyword);
  };

  const handleClickSelectBookKeyword = (keyword: string) => () => {
    if (!searchBookInputRef.current) return;

    setSearchKeyword(keyword);
    setSearchInputFocused(false);
    searchBookInputRef.current.value = keyword;
  };

  const handleClickBookDetail = (rowKey: string) => () => {
    setSelectedRows(prev => {
      const isSelectedRow = prev.includes(rowKey);

      return isSelectedRow
        ? prev.filter(key => key !== rowKey)
        : [...prev, rowKey];
    });
  };

  const handleClickAddFavoriteBook = useCallback(
    (book: IDocument) => () => {
      setFavoriteBooks(book);
    },
    [setFavoriteBooks],
  );

  const handleFocusSearchInput = () => {
    if (bookKeywords.length) {
      setSearchInputFocused(true);
    }
  };

  const handleBlurSearchInput = () => {
    setSearchInputFocused(false);
  };

  const handleKeydownSearchInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.currentTarget.value) {
      setSearchKeyword(event.currentTarget.value);
      setBookKeyword(event.currentTarget.value);
    }
  };

  const generatedTableRows = useMemo(
    () =>
      data?.pages
        .map(page => page.documents)
        .flat()
        .map(book => ({
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
                  margin: '0px 48px 0px 32px',
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
                    width: '132px',
                    color: theme.color.text.primary,
                  }}
                >
                  {book.price.toLocaleString()}원
                </Typography>

                {book.sale_price && (
                  <Typography
                    variant="title3"
                    css={{
                      width: '132px',
                      color: theme.color.text.primary,
                    }}
                  >
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
    [data?.pages, favoriteBookIds, theme, handleClickAddFavoriteBook],
  );

  return (
    <article
      css={{
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Typography variant="title2">도서 검색</Typography>

      <div
        css={{
          display: 'flex',
          marginTop: '28px',
        }}
      >
        <ul
          onMouseEnter={handleFocusSearchInput}
          onMouseLeave={handleBlurSearchInput}
          css={{
            width: '480px',
            marginRight: '16px',
            paddingBottom:
              isSearchInputFocused && bookKeywords.length ? '16px' : '0px',
            backgroundColor: theme.color.palette.lightGray,
            borderRadius: isSearchInputFocused ? '24px' : '100px',
          }}
        >
          <li
            css={{
              display: 'flex',
              height: '16px',
              padding: '18px 10px 16px',
              alignItems: 'center',
            }}
          >
            <SearchIcon />

            <input
              defaultValue=""
              placeholder="검색어를 입력하세요"
              onKeyDown={handleKeydownSearchInput}
              ref={searchBookInputRef}
              css={{
                width: '100%',
                marginLeft: '11px',
                border: 'none',
                backgroundColor: theme.color.palette.lightGray,
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '16px',

                '&::placeholder': {
                  color: theme.color.text.subtitle,
                },

                '&:focus-visible': {
                  outline: 'none',
                },
              }}
            />
          </li>

          {isSearchInputFocused &&
            bookKeywords.map((keyword, index) => (
              <li
                key={`search-keyword-${index}`}
                css={{
                  display: 'flex',
                  padding: '12px 25px 12px 51px',
                  alignItems: 'center',
                }}
              >
                <Button
                  icon
                  fullWidth
                  onClick={handleClickSelectBookKeyword(keyword)}
                >
                  <Typography
                    variant="caption"
                    css={{
                      marginRight: 'auto',
                      color: theme.color.text.subtitle,
                    }}
                  >
                    {keyword}
                  </Typography>
                </Button>

                <Button icon onClick={handleClickDeleteBookKeyword(keyword)}>
                  <CloseIcon />
                </Button>
              </li>
            ))}
        </ul>

        <Button
          size="small"
          variant="outlined"
          onClick={handleClickDetailSearch}
          css={{
            margin: '8px 0px 6px',
          }}
        >
          <Typography variant="body2">상세검색</Typography>
        </Button>
      </div>

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
        <CollapsibleTable
          infiniteRowId="search-book-row"
          selectedRows={selectedRows}
          columns={BOOK_COLUMNS}
          rows={generatedTableRows}
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
