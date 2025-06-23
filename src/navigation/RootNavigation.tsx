import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTab from './BottomTab';
import { RootState } from '../redux/store';
import HomeStack from './stacks/HomeStack';
import AuthStack from './stacks/AuthStack';
import { RootStackParamList } from '../types';
import { NavigationContainer } from '@react-navigation/native';
import ProfileStack from './stacks/ProfileStack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.root.authReducer,
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="BottomTab" component={BottomTab} /> */}
        <Stack.Screen name="HomeStack" component={HomeStack} />
        <Stack.Screen name="ProfileStack" component={ProfileStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
