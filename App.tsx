import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigator from './src/navigation/Navigator';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {appStore, persistor} from './src/redux/appStore';

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

const styles = StyleSheet.create({});
