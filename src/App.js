import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router';
import { ThemeProvider } from '@mui/material';
import theme from './style/theme';

// import Spinner from './components/Spinner';
import Header from './components/Header';

const HomePage = lazy(() => import('./pages/Home'));
const UploadPage = lazy(() => import('./pages/Upload'));

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<></>}>
            <Route exact path='/' component={HomePage} />
            <Route path='/upload' component={UploadPage} />
          </Suspense>
        </ThemeProvider>
      </Switch>
    </div>
  );
};

export default App;
