import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    subtitle2: {
      fontSize: '0.75rem',
      textAlign: 'right',
      color: '#bbbbbb',
    },
  },
});

export { theme };
