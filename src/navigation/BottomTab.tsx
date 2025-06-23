import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { colors } from '../assets/colors/colors';
import { Icons } from '../components/Icons';
import { HomeScreen } from '../screens/home';
import { ProfileScreen } from '../screens/profile';
import { BottomTabParamList } from '../types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const HomeTabBarIcon = ({ color }: { color: string }) => (
  <Icons type="AntDesign" name="home" size={20} color={color} />
);

const LeaveTabBarIcon = ({ color }: { color: string }) => (
  <Icons type="Feather" name="calendar" size={20} color={color} />
);

const ProfileTabBarIcon = ({ color }: { color: string }) => (
  <Icons type="Feather" name="user" size={20} color={color} />
);

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeTabBarIcon,
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ProfileTabBarIcon,
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomTab;
