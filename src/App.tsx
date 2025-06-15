import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router';

import DEFAULT_THEME from './constants/theme';
import GlobalStyle from './components/common/GlobalStyle';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={DEFAULT_THEME}>
        <></>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
