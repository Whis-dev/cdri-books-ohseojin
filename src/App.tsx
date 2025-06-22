import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router';

import DEFAULT_THEME from '@/constants/theme';
import GlobalStyle from '@/components/common/GlobalStyle';
import Router from '@/components/common/Router';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <ThemeProvider theme={DEFAULT_THEME}>
          <Router />
        </ThemeProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
