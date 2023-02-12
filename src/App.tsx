export function App() {
  return <div></div>;
}
  return (
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
  );
}