export const getTheme = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    primary: {
      ...(mode === 'dark'
        ? {
            main: '#222',
            light: '#282828',
            contrastText: '#f4f4f4',
          }
        : {
            main: '#f4f4f4',
            light: '#f1f1f1',
            contrastText: '#222',
          }),
    },
    secondary: {
      ...(mode === 'dark'
        ? {
            main: '#f4f4f4',
            dark: '#DB663D',
            contrastText: '#fff',
          }
        : {
            main: '#222',
            dark: '#DB663D',
            contrastText: '#fff',
          }),
    },
  },
  typography: {
    fontFamily: 'Rubik, sans-serif',
    fontSize: 19,
    fontWeightRegular: 500,
    fontWeightBold: 600,
    fontWeightLight: 400,
  },
});