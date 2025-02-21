import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import baseMuiTheme from 'config/mui.theme.config';
import { Provider } from 'react-redux';
import store from './store';

import router from './routes/router';

import './App.css';

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={baseMuiTheme}>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
