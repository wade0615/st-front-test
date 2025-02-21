import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    error: {
      main: '#F24545'
    },
    secondary: {
      main: 'rgba(47, 128, 237, 0.05)',
      contrastText: '#2F80ED'
    },
    primary: {
      main: '#2F80ED'
    }
  }
});

export default muiTheme;
