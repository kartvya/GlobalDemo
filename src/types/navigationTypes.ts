export type RootStackParamList = {
  AuthStack: {
    screen: keyof AuthStackParamList;
  };
  BottomTab: {
    screen: keyof BottomTabParamList;
  };
  HomeStack: {
    screen: keyof HomeStackParamList;
  };
  ProfileStack: {
    screen: keyof ProfileStackParamList;
  };
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
