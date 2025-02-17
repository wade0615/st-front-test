import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import baseMuiTheme from 'config/mui.theme.config';

import router from './routes/router';

import './App.css';

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={baseMuiTheme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
