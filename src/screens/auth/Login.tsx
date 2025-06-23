import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { colors } from '../../assets/colors/colors';
import { Images } from '../../assets/images';
import { CustomButton, CustomText, CustomTextInput } from '../../components';
import ScreenWrapper from '../../components/ScreenWrapper';
import Spacer from '../../components/Spacer';
import { useUserLoginMutation } from '../../services/apis/auth/authApi';
import { commonStyles } from '../../styles/commonStyle';
import { LoginFormTypes, RootStackParamList } from '../../types';
import { hp } from '../../utils/helpers';
import { ACTIONCONSTANTS } from '../../services/config/apiConstants';
import { Toast } from 'react-native-toast-notifications';

const Login = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const [form, setForm] = useState<LoginFormTypes>({
    email: 'teststaff@gmail.com',
    password: 'test123',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userLogin] = useUserLoginMutation();

  const handleEmailChange = (text: string) => {
    setForm(prev => ({ ...prev, email: text }));
  };

  const handlePasswordChange = (text: string) => {
    setForm(prev => ({ ...prev, password: text }));
  };

  const loginUser = async () => {
    const credentials = new FormData();
    credentials.append('username', form.email);
    credentials.append('password', form.password);
    try {
      const response = await userLogin(credentials).unwrap();
      dispatch({
        type: ACTIONCONSTANTS.SET_IDENTITY,
        payload: response,
      });
      return response;
    } catch (e) {
      console.log('Login failed:', e);
      throw e;
    }
  };

  const fetchUserInfo = async () => {
    try {
      const userInfo = await getUserInfo().unwrap();
      dispatch({
        type: ACTIONCONSTANTS.SET_IS_AUTHENTICATED,
        payload: true,
      });
      dispatch({
        type: ACTIONCONSTANTS.SET_USERINFO,
        payload: userInfo?.data,
      });
      return userInfo;
    } catch (e) {
      console.log('Fetching user info failed:', e);
      throw e;
    }
  };

  const onLogInPress = async () => {
    setIsLoading(true);
    try {
      await loginUser();
      // await fetchUserInfo();
    } catch (e) {
      Toast.show('Error during login process', {
        placement: 'bottom',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onForgotPasswordPress = () => {
    navigation.navigate('AuthStack', {
      screen: 'ForgotPassword',
    });
  };

  return (
    <ScreenWrapper
      conatinerStyle={styles.mainContainer}
      statusBarColor={colors.white}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        enableOnAndroid={false}
        extraScrollHeight={20}
        extraHeight={20}
        style={styles.container}
      >
        <Spacer gap={hp(2)} />
        <Image source={Images.Logo} style={styles.imageStyle} />
        <Spacer gap={hp(1)} />
        <CustomText text={'Welcome Back 👋'} fontSize={RFValue(24)} />
        <CustomText
          text={'Hello there, login to continue'}
          fontSize={14}
          color="lightGray"
          style={commonStyles.marginBottom5}
        />
        <Spacer gap={hp(2)} />
        <CustomText
          text={'Email'}
          fontSize={RFValue(10)}
          fontWeight={'400'}
          color="primary"
        />
        <CustomTextInput
          placeholder="xyz@gmail.com"
          value={form.email}
          onChangeText={handleEmailChange}
          containerStyle={commonStyles.marginVertical1}
        />
        <Spacer gap={RFPercentage(0.5)} />
        <CustomText
          text={'Password'}
          fontSize={RFValue(10)}
          fontWeight={'400'}
          color="primary"
        />
        <CustomTextInput
          placeholder="Some strong password"
          value={form.password}
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          containerStyle={commonStyles.marginVertical1}
        />
        <View style={styles.forgotTextContainer}>
          <CustomText
            text={'Forgot Password?'}
            color={'primary'}
            onPress={onForgotPasswordPress}
          />
        </View>
        <Spacer gap={hp(2)} />
        <CustomButton
          text="Log In"
          onPress={onLogInPress}
          isLoading={isLoading}
        />
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    ...commonStyles.mainContainer,
    ...commonStyles.paddingHorizontal5,
  },
  imageStyle: {
    height: hp(11),
    width: hp(11),
  },
  forgotTextContainer: {
    alignItems: 'flex-end',
  },
});
