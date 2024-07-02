import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Navigator from './navigation/Navigator';
import {appStore, persistor} from './redux/appStore';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
