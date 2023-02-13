import { useMemo, useReducer } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Card, Collapse, createTheme, Paper, ThemeProvider } from '@mui/material';

import { getTheme } from 'components/libs/theme';
import { Toolbar } from 'components/widgets/Toolbar';
import { TaskList } from 'components/widgets/TasksList';

import NewsTicker from 'components/widgets/NewsTicker';
import { initTheme, ThemeContext, themeReducer } from 'components/store/theme/slice';
import { initNewsVisibility, NewsContext, newsReducer } from 'components/store/news/slice';
import { TaskProvider } from 'components/store/task/Provider';

const queryClient = new QueryClient();

export function App() {
  // theme state
  const [theme, dispatchTheme] = useReducer(themeReducer, initTheme);
  function toggleTheme() {
    dispatchTheme({ type: 'toggle_theme' });
  }
  // Update the theme only if the mode changes
  const globalTheme = useMemo(() => createTheme(getTheme(theme)), [theme]);

  // news state
  const [isNewsVisible, dispatchNewsVisibility] = useReducer(newsReducer, initNewsVisibility);
  function toggleNewsVisibility() {
    dispatchNewsVisibility({ type: 'toggle_news' });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={globalTheme}>
        <TaskProvider>
          <NewsContext.Provider value={{
            isNewsVisible,
            toggleNewsVisibility,
          }}>
            <Paper
              sx={{
                display: 'flex',
                paddingX: '15px',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                bgColor: 'black',
                borderRadius: 0,
              }}
            >
              <Paper
                sx={{
                  maxWidth: '430px',
                  width: '100%',
                  height: '80vh',
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
                <Toolbar />
                <TaskList />
              </Paper>
              <QueryClientProvider client={queryClient}>
                <Collapse in={isNewsVisible}>
                  <Card sx={{ maxWidth: '100%' }}>
                    <NewsTicker />
                  </Card>
                </Collapse>
              </QueryClientProvider>
            </Paper>
          </NewsContext.Provider>
        </TaskProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}