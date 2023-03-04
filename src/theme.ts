import { createTheme, responsiveFontSizes  } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
let theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
