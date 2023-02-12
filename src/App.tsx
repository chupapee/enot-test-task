import { useMemo, useReducer } from 'react';
import { createTheme, Paper, ThemeProvider } from '@mui/material';
import { getTheme } from 'components/libs/theme';
import { initTheme, ThemeContext, themeReducer } from 'components/store';

export function App() {
  return <div></div>;
}
  const [theme, dispatch] = useReducer(themeReducer, initTheme);

  // Update the theme only if the mode changes
  const globalTheme = useMemo(() => createTheme(getTheme(theme)), [theme]);

  return (
    <ThemeContext.Provider value={{ theme, dispatch }}>
      <ThemeProvider theme={globalTheme}>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            bgColor: 'black',
            borderRadius: 0,
          }}
        >
          <Paper
            sx={{
              height: '800px',
              overflowY: 'auto',
              '::-webkit-scrollbar': {
                display: 'none',
              },
              padding: '20px',
              margin: '20px',
              borderRadius: '20px',
              bgcolor: 'primary.main',
            }}
          >
          </Paper>
        </Paper>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}