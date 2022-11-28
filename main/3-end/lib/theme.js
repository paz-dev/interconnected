import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#031a2f' },
    secondary: { main: '#031a2f' },
    mode: 'dark',
    background: { default: '#031a2f' },
    text: {
      primary: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'fantasy',
    button: {
      textTransform: 'none',
    },
  },
});

export { theme };
