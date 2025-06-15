import { ThemeProvider } from "@emotion/react"

import DEFAULT_THEME from './constants/theme';

function App() {
  return (
   <ThemeProvider theme={DEFAULT_THEME}>
    <></>
   </ThemeProvider>
  )
}

export default App
