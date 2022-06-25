import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import * as colors from '@material-ui/core/colors';
import React from 'react';
import Main from './components/pages/main/Main';

const App: React.FC = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: colors.blue[800],
      },
      type: 'dark',
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
