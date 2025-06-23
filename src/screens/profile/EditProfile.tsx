import React from 'react';
import {ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../assets/colors/colors';
import {Images} from '../../assets/images/index';
import {CustomHeader} from '../../components';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import CustomTextInput from '../../components/CustomTextInput';
import ScreenWrapper from '../../components/ScreenWrapper';
import {commonStyles} from '../../styles/commonStyle';
import {hp, wp} from '../../utils/helpers';
import {Icons} from '../../components/Icons';

const EditProfile = () => {
  return (
    <ScreenWrapper conatinerStyle={commonStyles.paddingHorizontal5}>
      <CustomHeader text={'Edit Profile'} />
      <View style={styles.imageContianer}>
        <ImageBackground source={Images.DefaultUser} style={styles.userImage}>
          <Pressable style={styles.editIconContainer}>
            <Icons type={'Feather'} name="edit-3" />
          </Pressable>
        </ImageBackground>
      </View>
      <CustomText
        text={'Name'}
        fontSize={RFValue(10)}
        fontWeight={'400'}
        color="primary"
        style={{marginTop: wp(2)}}
      />
      <CustomTextInput
        placeholder="Enter Your name"
        containerStyle={[commonStyles.marginBottom2, commonStyles.marginTop2]}
      />
      <CustomText
        text={'email'}
        fontSize={RFValue(10)}
        fontWeight={'400'}
        color="primary"
        style={{marginTop: wp(2)}}
      />
      <CustomTextInput
        placeholder="Enter Your name"
        containerStyle={[commonStyles.marginBottom2, commonStyles.marginTop2]}
      />
      <CustomButton
        text="Reset"
        // onPress={onRequestPress}
        containerStyle={commonStyles.marginTop3}
      />
    </ScreenWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  imageContianer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: wp(5),
    paddingHorizontal: wp(5),
  },
  userImage: {
    width: hp(10),
    height: hp(10),
    borderRadius: 30,
  },
  editIconContainer: {
    backgroundColor: colors.white,
    elevation: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: wp(1.5),
    borderRadius: 20,
  },
});
