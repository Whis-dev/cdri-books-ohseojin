import { css, Global } from '@emotion/react';

import NotoSansKRMedium from 'fonts/NotoSansKR-Medium.ttf?url';

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: 'Noto Sans KR';
          src: url(${NotoSansKRMedium}) format('ttf');
          font-display: swap;
        }

        * {
          margin: 0;
          padding: 0;
          font-family: 'Noto Sans KR';

          scrollbar-width: thin;
        }

        html,
        body {
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        header {
          display: flex;
          width: calc(100% - 320px);
          height: 80px;
          padding: 0px 160px;
          align-items: center;
        }

        main {
          width: 960px;
          height: calc(100vh - 80px - 160px);
          margin: 0 auto;
          padding: 80px 0px;
          overflow: hidden;
        }

        a {
          text-decoration: none;
        }

        ol,
        ul {
          list-style: none;
        }

        i {
          font-style: normal;
        }

        button {
          &:hover {
            cursor: pointer;
          }
        }
      `}
    />
  );
}
