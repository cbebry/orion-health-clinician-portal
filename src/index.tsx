import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticationProvider } from './providers/Authentication';
import App from './App';
import theme from './theme';

import fetchMock from 'fetch-mock';
import initFetchMock from './vendor/initFetchMock';
initFetchMock(fetchMock);

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
      <BrowserRouter>
        <AuthenticationProvider>
          <App />
        </AuthenticationProvider>
      </BrowserRouter>
  </ThemeProvider>,
);
