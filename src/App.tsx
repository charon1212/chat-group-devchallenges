import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import * as colors from '@mui/material/colors';
import React from 'react';
import AppRouter from './components/router/AppRouter';

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
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
