import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../../types';
import Home from '../screens/Home';
import UploadPost from '../screens/UploadPost';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, orientation: 'portrait'}}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="uploadPost" component={UploadPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
