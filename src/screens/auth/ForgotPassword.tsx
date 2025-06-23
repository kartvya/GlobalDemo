import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {
  CustomText,
  CustomButton,
  CustomHeader,
  CustomTextInput,
} from '../../components';
import {hp} from '../../utils/helpers';
import {Images} from '../../assets/images';
import {RootStackParamList} from '../../types';
import {commonStyles} from '../../styles/commonStyle';
import ScreenWrapper from '../../components/ScreenWrapper';
import {colors} from '../../assets/colors/colors';

const ForgotPassword = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onRequestPress = () => {
    navigation.goBack();
  };
  return (
    <ScreenWrapper
      conatinerStyle={styles.mainContainer}
      statusBarColor={colors.white}>
      <CustomHeader />

      <View style={styles.container}>
        <CustomText
          text={'Forgot Password'}
          style={commonStyles.paddingVertical2}
          fontSize={28}
        />

        <CustomText
          text={'Enter your Email to Request new Password'}
          fontSize={14}
          color="lightGray"
          style={commonStyles.marginBottom5}
        />
        <Image source={Images.ForgotPassword} style={styles.image} />

        <CustomTextInput
          placeholder="Enter Your Email"
          containerStyle={commonStyles.marginBottom5}
        />

        <CustomButton text="Request" onPress={onRequestPress} />
      </View>
    </ScreenWrapper>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    ...commonStyles.paddingHorizontal5,
  },
  image: {
    height: hp(30),
    width: '100%',
    resizeMode: 'contain',
    ...commonStyles.marginBottom5,
  },
});
