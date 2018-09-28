import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { YellowBox, StatusBar } from 'react-native';

import Navigation from './app/routes/index';
import store from './app/store';

const persistor = persistStore(store);

const App = () => {
  YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Remote debugger']);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" />
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
