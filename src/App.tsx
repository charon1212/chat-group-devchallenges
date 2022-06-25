import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import * as colors from '@mui/material/colors';
import React from 'react';
import Main from './components/pages/main/Main';

const App: React.FC = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: colors.blue[800],
      },
      mode: 'dark',
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Main /> */}
      <Main />
    </ThemeProvider>
  );
};

export default App;
