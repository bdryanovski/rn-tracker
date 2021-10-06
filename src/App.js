import * as React from 'react';

// React IOS kit
import { ThemeProvider } from 'react-native-ios-kit';

// Redux datalayer
import { Provider as ReduxProvider } from 'react-redux';
import { Store } from './store/store';

// Bootstrap database
import './database/index';

import Navigation from './Navigation';

const AppWithRedux = () => {
  return (
    <ReduxProvider store={Store}>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default AppWithRedux;
