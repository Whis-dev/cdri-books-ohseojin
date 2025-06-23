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

```text
cdri-books-ohseojin
├─ .prettierrc
├─ emotion.d.ts
├─ eslint.config.js
├─ image.d.ts
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ public
├─ README.md
├─ src
│  ├─ apis
│  │  ├─ external                         // Kakao API 처럼 외부에서 접근하는 api 모음
│  │  │  ├─ index.ts
│  │  │  └─ requestBooks.ts
│  │  └─ indexedDB                        // indexedDB를 api처럼 호출하도록 작업 (사용하지 않고 있음)
│  │     ├─ createFavoriteBook.ts
│  │     ├─ deleteFavoriteBook.ts
│  │     ├─ index.ts
│  │     └─ requestFavoriteBooks.ts
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ fonts
│  │  │  ├─ NotoSansKR-Bold.ttf
│  │  │  └─ NotoSansKR-Medium.ttf
│  │  └─ icons
│  │     ├─ book.svg
│  │     ├─ chevron-down.svg
│  │     ├─ chevron-up.svg
│  │     ├─ close.svg
│  │     ├─ index.ts
│  │     ├─ like-fill.svg
│  │     ├─ like-line.svg
│  │     └─ search.svg
│  ├─ atoms
│  │  └─ book                              // searchKeyword와 favoriteBooks에 관련한 atom과 action이 있음
│  │     ├─ action.ts
│  │     └─ atom.ts
│  ├─ components
│  │  ├─ book
│  │  │  ├─ BookList.tsx                   // 각 페이지에서 사용하는 BookList가 공통으로 사용되는 부분이 많아 공통화함
│  │  │  └─ BookSearchForm.tsx
│  │  └─ common                            // 공통으로 사용하는 컴포넌트 작업. 폴더이름은 material-ui에서 참고하여 분리함.
│  │     ├─ data-display
│  │     │  ├─ CollapsibleTable.tsx
│  │     │  └─ Typography.tsx
│  │     ├─ feedback
│  │     │  └─ Nothing.tsx
│  │     ├─ form
│  │     │  ├─ Button.tsx
│  │     │  └─ Select.tsx
│  │     ├─ GlobalStyle.tsx
│  │     ├─ layout
│  │     │  └─ Wrapper.tsx
│  │     ├─ navigator
│  │     │  └─ Tab.tsx
│  │     ├─ Router.tsx                     // 프로젝트 라우터
│  │     └─ surface
│  │        └─ Popover.tsx
│  ├─ constants                            // theme 외 공통으로 사용하는 상수들의 모음
│  │  ├─ book.ts
│  │  └─ theme.ts
│  ├─ containers                           // page
│  │  ├─ favorite-book
│  │  │  └─ index.tsx
│  │  └─ search-book
│  │     └─ index.tsx
│  ├─ hooks
│  │  ├─ common
│  │  │  └─ useIntersectionObserver.ts     // 무한스크롤 구현을 위한 간단한 intersection observer hook
│  │  └─ query
│  │     ├─ useBooksQuery.ts               // Kakao API에서 호출한 책의 목록을 관리하는 쿼리
│  │     ├─ useCreateFavoriteBookQuery.ts  // indexed DB 관련 query
│  │     ├─ useDeleteFavoriteBookQuery.ts  // indexed DB 관련 query
│  │     └─ useFavoriteBooksQuery.ts       // indexed DB 관련 query
│  ├─ main.tsx
│  ├─ queryKey
│  │  └─ book.ts
│  ├─ types                                // 공통으로 사용하는 타입들의 모음
│  │  └─ book.ts
│  ├─ utils
│  │  ├─ api.ts                            // fetch로 만든 공통 모듈
│  │  ├─ formatter.ts
│  │  └─ indexedDB.ts                      // indexedDB initializer
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```

### 코드 설명

1. props의 메서드 명은 onClick 등의 prefix로, 컴포넌트 내부에서 사용하는 이벤트 handler의 이름은 handle~의 prefix를 사용했습니다.
2. Popover component는 정말 간단하게만 구현했습니다. 원래대로라면, offset이나 position 값을 받아와서 내부에서 처리했어야합니다.
3. 검색 키워드와, 찜한 목록은 localStorage에 저장하여 관리하도록 했습니다. (요구사항)

## 설치된 라이브러리 및 설명

1. Jotai

   - 책 검색 키워드에 대한 관리를 합니다. 키워드가 8개 이상일 경우 마지막 키워드는 지워주고, 중복된 키워드를 입력했을 경우 기존에 중복된 내용을 삭제한 뒤, 최근 입력한 키워드가 되도록 설정합니다.
   - 처음에는 찜 목록도 atom으로 관리를 했으나, 페이지네이션을 하기에 indexedDB를 사용하는 것이 더 간단해 보여, 찜을 한 간단한 목록만 관리하도록 변경했습니다. 이는 '도서 검색' 페이지에서 빠르게 찜한 목록을 체크하기 위함입니다. (indexedDB를 통해 찜한 목록을 가져오는 것은 비동기 형태로 가져오기 때문에)

2. @emotion/react, @emotion/styled

   - material ui를 사용할까, 직접 구현할까 고민하다가 직접 구현하기로 하고 emotion을 사용했습니다. tailwind 대신 emotion 을 사용하는 것은 약간의 개인 취향이기도 한데, tailwind의 경우 화면상에서 className이 길어지는 것이 확인하기 번거로움이 있어서 개인적으로는 emotion을 선호하는 편입니다.

## 강조 하고 싶은 기능

1. intersection observer를 이용한 무한 스크롤 기능

   - 간단하게 intersection observer를 이용하여, trigger를 시켜 페이지를 정해진 아이템의 수만큼 가져오도록 작업했습니다.

2. indexedDB를 사용한 Favorite Books 화면 처리를 하려고 했으나(utils > indexedDB, apis > indexedDB, hooks > query > useCreateFavoriteBookQuery, useDeleteFavoriteBookQuery, useFavoriteBooksQuery 참고), jotai에서 item을 저장할 때 splice로 잘라서 넣어 놓으면 유사 pagination처럼 동작하지 않을까 하여(이 방법을 옛날에 사용한 적이 있었는데 늦게 생각났습니다..), 코드 상으로 잘라서 pagination을 구현한 상태입니다. indexedDB 연관한 코드는 사용하지 않았지만 남겨놓았습니다.

   - 코드상으로 유사 pagination 구현한 부분: atoms > book > action.ts, utils > formatter.ts

3. 화면 구현에서 테이블 영역은 화면을 넘어가지 않고 테이블 영역만 스크롤 되게 구현했습니다.

## 기타

1. 원래는 깃 플로우 등의 정책으로 깃을 관리하지만 혼자 작업하는 project여서 main branch 하나로 작업했습니다.
