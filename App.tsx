import React from 'react';
import 'react-native-gesture-handler';
import MainNavigation from './src/navigation/MainNavigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store/store';
import pushNotification from './src/services/pushNotificationService';

const App = () => {

  pushNotification();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  );
  
};

export default App;
