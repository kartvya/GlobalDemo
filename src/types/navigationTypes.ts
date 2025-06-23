import { Product } from './types';

export type RootStackParamList = {
  HomeScreen: undefined;
  CartScreen: undefined;
  CreateProductScreen: { product?: Product };
  ProductDetailsScreen: { product?: Product };
};

export type BottomTabParamList = {
  Home: undefined;
  Leave: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  LandingPage: undefined;
};
export type HomeStackParamList = {
  HomeScreen: undefined;
};
export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfile: undefined;
  ResetPassword: undefined;
};
