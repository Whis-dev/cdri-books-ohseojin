import { useRef, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useTheme } from '@emotion/react';

import {
  getBookKeywordsAction,
  removeBookKeywordsAction,
  setBookKeywordsAction,
} from '@/atoms/book/action';
import type { IUseBooksQueryParams } from '@/hooks/query/useBooksQuery';

import { CloseIcon, SearchIcon } from '@/assets/icons/index';
import Button from '@/components/common/form/Button';
import Typography from '@/components/common/data-display/Typography';
import Popover from '@/components/common/surface/Popover';
import Select, { type TSelectOption } from '@/components/common/form/Select';
import { SEARCH_BOOK_TARGET } from '@/constants/book';

interface IBookSearchForm {
  onSubmitBookSearch: ({ query, target }: IUseBooksQueryParams) => void;
}

export default function BookSearchForm({
  onSubmitBookSearch,
}: IBookSearchForm) {
  const [isOpenDetailSearchPopover, setOpenDetailSearchPopover] =
    useState<boolean>(false);
  const [isSearchInputFocused, setSearchInputFocused] =
    useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [detailSearchKeyword, setDetailSearchKeyword] = useState<string>('');
  const [selectedTargetOption, setSelectedTargetOption] =
    useState<TSelectOption>({ label: '제목', value: 'title' });

  const popoverTriggerRef = useRef<HTMLButtonElement>(null);

  const bookKeywords = useAtomValue(getBookKeywordsAction);

  const setBookKeyword = useSetAtom(setBookKeywordsAction);
  const removeBookKeyword = useSetAtom(removeBookKeywordsAction);

  const theme = useTheme();

  const handleClickDetailSearch = () => {
    setOpenDetailSearchPopover(true);
    setSearchInputFocused(false);
    setSearchKeyword('');
  };

  const handleClickCloseDetailSearch = () => {
    setOpenDetailSearchPopover(false);
  };

  const handleClickSelectTarget = (option: TSelectOption) => {
    setSelectedTargetOption(option);
  };

  const handleClickDeleteBookKeyword = (keyword: string) => () => {
    removeBookKeyword(keyword);
  };

  const handleClickSelectBookKeyword = (keyword: string) => () => {
    onSubmitBookSearch({ query: keyword });
    setSearchKeyword(keyword);
    setSearchInputFocused(false);
  };

  const handleSubmitDetailSearch = () => {
    onSubmitBookSearch({
      query: detailSearchKeyword,
      target: selectedTargetOption.value as keyof typeof SEARCH_BOOK_TARGET,
    });

    setDetailSearchKeyword('');
    setOpenDetailSearchPopover(false);
  };

  const handleFocusSearchInput = () => {
    if (!isOpenDetailSearchPopover && bookKeywords.length) {
      setSearchInputFocused(true);
    }
  };

  const handleBlurSearchInput = () => {
    setSearchInputFocused(false);
  };

  const handleChangeSearchInput = (event: React.BaseSyntheticEvent) => {
    setSearchKeyword(event.target.value);
  };

  const handleChangeDetailSearchInput = (event: React.BaseSyntheticEvent) => {
    setDetailSearchKeyword(event.target.value);
  };

  const handleKeydownSearchInput = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter' && event.currentTarget.value) {
      onSubmitBookSearch({ query: searchKeyword });
      setBookKeyword(event.currentTarget.value);
    }
  };

  return (
    <div
      css={{
        display: 'flex',
        position: 'relative',
        width: '568px',
        height: '50px',
        marginTop: '28px',
      }}
    >
      <ul
        onMouseEnter={handleFocusSearchInput}
        onMouseLeave={handleBlurSearchInput}
        css={{
          position: 'absolute',
          width: '480px',
          marginRight: '16px',
          paddingBottom:
            isSearchInputFocused && bookKeywords.length ? '16px' : '0px',
          top: 0,
          left: 0,
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
            value={searchKeyword}
            placeholder="검색어를 입력하세요"
            onChange={handleChangeSearchInput}
            onKeyDown={handleKeydownSearchInput}
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

      <Popover
        isOpen={isOpenDetailSearchPopover}
        trigger={
          <Button
            size="small"
            variant="outlined"
            onClick={handleClickDetailSearch}
            ref={popoverTriggerRef}
            css={{
              position: 'absolute',
              margin: '8px 0px 6px',
              top: 0,
              right: 0,
            }}
          >
            <Typography variant="body2">상세검색</Typography>
          </Button>
        }
        content={
          <dl
            css={{
              position: 'absolute',
              width: '360px',
              paddingBottom: '36px',
              top:
                (popoverTriggerRef.current?.getBoundingClientRect().top || 0) +
                48 +
                14,
              left:
                (popoverTriggerRef.current?.getBoundingClientRect().left || 0) -
                180 +
                36,
              boxShadow: '0px 4px 14px 6px #97979726',
              backgroundColor: theme.color.palette.white,
              zIndex: 10,
              borderRadius: '8px',

              dd: {
                padding: '0px 24px',

                '&:last-of-type': {
                  marginTop: '16px',
                },
              },
            }}
          >
            <dt
              css={{
                padding: '8px',
              }}
            >
              <Button
                icon
                css={{
                  marginLeft: 'auto',
                  svg: {
                    width: 20,
                    height: 20,
                  },
                }}
                onClick={handleClickCloseDetailSearch}
              >
                <CloseIcon />
              </Button>
            </dt>

            <dd
              css={{
                display: 'flex',
                gap: '4px',
              }}
            >
              <Select
                selectedOption={selectedTargetOption}
                options={Object.entries(SEARCH_BOOK_TARGET).map(
                  ([value, label]) => ({
                    label,
                    value,
                  }),
                )}
                onClickSelectValue={handleClickSelectTarget}
              />

              <input
                placeholder="검색어 입력"
                value={detailSearchKeyword}
                onChange={handleChangeDetailSearchInput}
                css={{
                  padding: '4px 10px',
                  flex: 1,
                  border: 'none',
                  borderBottom: `1px solid ${theme.color.palette.primary}`,
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '22px',

                  '&::placeholder': {
                    color: theme.color.text.subtitle,
                  },

                  '&:focus-visible': {
                    outline: 'none',
                  },
                }}
              />
            </dd>

            <dd>
              <Button
                fullWidth
                color="primary"
                size="small"
                onClick={handleSubmitDetailSearch}
                css={{
                  '> span': {
                    fontSize: '14px',
                    lineHeight: '22px',
                  },
                }}
              >
                검색하기
              </Button>
            </dd>
          </dl>
        }
      />
    </div>
  );
}
