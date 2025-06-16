import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router';

import DEFAULT_THEME from '@/constants/theme';
import GlobalStyle from '@/components/common/GlobalStyle';
import Wrapper from '@/components/common/layout/Wrapper';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={DEFAULT_THEME}>
        <Wrapper />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
