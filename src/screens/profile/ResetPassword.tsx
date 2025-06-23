import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {Images} from '../../assets/images/index';
import CustomButton from '../../components/CustomButton';
import CustomHeader from '../../components/CustomHeader';
import CustomTextInput from '../../components/CustomTextInput';
import ScreenWrapper from '../../components/ScreenWrapper';
import {commonStyles} from '../../styles/commonStyle';
import {RootStackParamList} from '../../types/navigationTypes';
import {hp, wp} from '../../utils/helpers';

const ResetPassword = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onRequestPress = () => {
    navigation.goBack();
  };
  return (
    <ScreenWrapper>
      <CustomHeader text="Reset Password" />
      <Image source={Images.ForgotPassword} style={styles.image} />

      <CustomTextInput
        placeholder="Enter Your Email"
        containerStyle={[commonStyles.marginBottom5, {marginHorizontal: wp(5)}]}
      />

      <CustomButton
        text="Reset"
        onPress={onRequestPress}
        containerStyle={{marginHorizontal: wp(5)}}
      />
    </ScreenWrapper>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  image: {
    height: hp(40),
    width: '100%',
    resizeMode: 'contain',
    ...commonStyles.marginBottom5,
    marginTop: hp(3),
  },
});
