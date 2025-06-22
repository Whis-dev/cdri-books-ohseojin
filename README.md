# CDRI-BOOKS-OHSEOJIN

카카오 API를 활용한 책 리스트 및 찜화기 화면 구현한 프로젝트 입니다.
개발 환경은 아래와 같습니다.

```shell
package manager: pnpm v10.11.1
node: v22.12.0
```

## 실행 방법 및 환경 설정

1. root folder에 .env 파일 세팅
2. package install (pnpm으로 세팅 되어 있습니다.)

```shell
pnpm install
```

3. 실행

```shell
pnpm dev  # 실행 후 localhost:3000으로 접속
```

## 폴더 구조 및 주요 코드 설명

### 폴더 구조

```
cdri-books-ohseojin
├─ .prettierrc
├─ README.md
├─ emotion.d.ts
├─ eslint.config.js
├─ image.d.ts
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ public
│  ├─ fonts
│  │  ├─ NotoSansKR-Bold.ttf
│  │  └─ NotoSansKR-Medium.ttf
│  └─ icons
│     ├─ book.svg
│     ├─ chevron-down.svg
│     ├─ chevron-up.svg
│     ├─ close.svg
│     ├─ index.ts
│     ├─ like-fill.svg
│     ├─ like-line.svg
│     └─ search.svg
├─ src
│  ├─ App.tsx
│  ├─ apis
│  │  ├─ external
│  │  │  ├─ index.ts
│  │  │  └─ requestBooks.ts
│  │  └─ indexedDB
│  │     ├─ createFavoriteBook.ts
│  │     ├─ deleteFavoriteBook.ts
│  │     ├─ index.ts
│  │     └─ requestFavoriteBooks.ts
│  ├─ atoms
│  │  └─ book
│  │     ├─ action.ts
│  │     └─ atom.ts
│  ├─ components
│  │  ├─ book
│  │  │  └─ BookList.tsx
│  │  └─ common
│  │     ├─ GlobalStyle.tsx
│  │     ├─ Router.tsx
│  │     ├─ data-display
│  │     │  ├─ CollapsibleTable.tsx
│  │     │  └─ Typography.tsx
│  │     ├─ feedback
│  │     │  └─ Nothing.tsx
│  │     ├─ form
│  │     │  ├─ Button.tsx
│  │     │  └─ Select.tsx
│  │     ├─ layout
│  │     │  └─ Wrapper.tsx
│  │     ├─ navigator
│  │     │  └─ Tab.tsx
│  │     └─ surface
│  │        └─ Popover.tsx
│  ├─ constants
│  │  ├─ book.ts
│  │  └─ theme.ts
│  ├─ containers
│  │  ├─ favorite-book
│  │  │  └─ index.tsx
│  │  └─ search-book
│  │     └─ index.tsx
│  ├─ hooks
│  │  ├─ common
│  │  │  └─ useIntersectionObserver.ts
│  │  └─ query
│  │     ├─ useBooksQuery.ts
│  │     ├─ useCreateFavoriteBookQuery.ts
│  │     ├─ useDeleteFavoriteBookQuery.ts
│  │     └─ useFavoriteBooksQuery.ts
│  ├─ main.tsx
│  ├─ queryKey
│  │  └─ book.ts
│  ├─ types
│  │  └─ book.ts
│  ├─ utils
│  │  ├─ api.ts
│  │  ├─ formatter.ts
│  │  └─ indexedDB.ts
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```

### 코드 설명

## 설치된 라이브러리 및 설명

1. Jotai

- 책 검색 키워드에 대한 관리를 합니다. 키워드가 8개 이상일 경우 마지막 키워드는 지워주고, 중복된 키워드를 입력했을 경우 기존에 중복된 내용을 삭제한 뒤, 최근 입력한 키워드가 되도록 설정합니다.
- 처음에는 찜 목록도 atom으로 관리를 했으나, 페이지네이션을 하기에 indexedDB를 사용하는 것이 더 간단해 보여, 찜을 한 간단한 목록만 관리하도록 변경했습니다. 이는 '도서 검색' 페이지에서 빠르게 찜한 목록을 체크하기 위함입니다. (indexedDB를 통해 찜한 목록을 가져오는 것은 비동기 형태로 가져오기 때문에)

2. @emotion/react, @emotion/styled

- material ui를 사용할까, 직접 구현할까 고민하다가 직접 구현하기로 하고 emotion을 사용했습니다. tailwind 대신 emotion 을 사용하는 것은 약간의 개인 취향이기도 한데, tailwind의 경우 화면상에서 className이 길어지는 것이 확인하기 번거로움이 있어서 개인적으로는 emotion을 선호하는 편입니다.

## 강조 하고 싶은 기능

1. intersection observer를 이용한 무한 스크롤 기능

   - 간단하게 intersection observer를 이용하여, trigger를 시켜 페이지를 정해진 아이템의 수만큼 가져오도록 작업했습니다.

2. indexedDB를 사용한 Favorite Books 화면 처리
