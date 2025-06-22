import { useRef, useState, type KeyboardEvent } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useTheme } from '@emotion/react';

import {
  getBookKeywordsAction,
  removeBookKeywordsAction,
  setBookKeywordsAction,
} from '@/atoms/book/action';
import useIntersectionObserver from '@/hooks/common/useIntersectionObserver';

import { BookIcon, CloseIcon, SearchIcon } from 'icons/index';
import Typography from '@/components/common/data-display/Typography';
import Nothing from '@/components/common/feedback/Nothing';
import Button from '@/components/common/form/Button';
import useBooksQuery from '@/hooks/query/useBooksQuery';
import BookList from '@/components/book/BookList';

export default function SearchBook() {
  const [isSearchInputFocused, setSearchInputFocused] =
    useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const searchBookInputRef = useRef<HTMLInputElement>(null);

  const bookKeywords = useAtomValue(getBookKeywordsAction);

  const setBookKeyword = useSetAtom(setBookKeywordsAction);
  const removeBookKeyword = useSetAtom(removeBookKeywordsAction);

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
