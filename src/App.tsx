import { useMemo, useReducer } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Card, createTheme, Paper, ThemeProvider } from '@mui/material';

import { getTheme } from 'components/libs/theme';
import { Toolbar } from 'components/widgets/Toolbar';
import { TaskList } from 'components/widgets/TasksList';
import { initTheme, ThemeContext, themeReducer } from 'components/store';
import NewsTicker from 'components/widgets/NewsTicker';

const queryClient = new QueryClient();

export function App() {
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
            minHeight: '100vh',
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
            <Toolbar />
            <TaskList />
          </Paper>
          <QueryClientProvider client={queryClient}>
            <Card sx={{ maxWidth: '450px', width: '100%' }}>
              <NewsTicker />
            </Card>
          </QueryClientProvider>
        </Paper>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}