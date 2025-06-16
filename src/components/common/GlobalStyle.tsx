import { css, Global } from '@emotion/react';

import NotoSansKRMedium from 'fonts/NotoSansKR-Medium.ttf?url';

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: 'Noto Sans KR";
          src: url(${NotoSansKRMedium}) format('ttf');
          font-display: swap;
        }

        * {
          margin: 0;
          padding: 0;
          font-family: 'Noto Sans KR';
        }

        html, body {
          height: 100%;
          width: 100%;
        }

        ol, ul {
          list-style: none;
        }
      `}
    />
  );
}
