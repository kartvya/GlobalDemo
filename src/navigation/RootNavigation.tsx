import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import CartScreen from '../screens/cart/CartScreen';
import { HomeScreen } from '../screens/home';
import { RootStackParamList } from '../types';
import CreateProductScreen from '../screens/creatProduct/CreatProductScreen';
import ProductDetailsScreen from '../screens/productDetails/ProductDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen
          name="CreateProductScreen"
          component={CreateProductScreen}
        />
        <Stack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
