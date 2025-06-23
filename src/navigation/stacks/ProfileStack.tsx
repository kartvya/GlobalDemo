import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EditProfile from '../../screens/profile/EditProfile';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import {ProfileStackParamList} from '../../types/navigationTypes';
import ResetPassword from '../../screens/profile/ResetPassword';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
