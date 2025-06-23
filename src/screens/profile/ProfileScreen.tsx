import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../assets/colors/colors';
import {Images} from '../../assets/images';
import {CustomText} from '../../components';
import {Icons} from '../../components/Icons';
import ScreenWrapper from '../../components/ScreenWrapper';
import Spacer from '../../components/Spacer';
import {AuthState} from '../../redux/reducers/AuthReducer';
import {RootState} from '../../redux/store';
import {ACTIONCONSTANTS} from '../../services/config/apiConstants';
import {commonStyles} from '../../styles/commonStyle';
import {RootStackParamList} from '../../types';
import {hp} from '../../utils/helpers';
// import {profileData} from '../../data/profileData';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {userInfo} = useSelector(
    (state: RootState) => state.root.authReducer,
  ) as AuthState;

  const profileData = [
    {
      label: 'My Profile',
      onPress: () => {},
      iconName: 'user',
      iconType: 'AntDesign',
    },
    {
      label: 'Settings',
      onPress: () => {},
      iconName: 'setting',
      iconType: 'AntDesign',
    },
    {
      label: 'Reset Password',
      onPress: () => {
        navigation.navigate('ProfileStack', {
          screen: 'ResetPassword',
        });
      },
      iconName: 'lock-reset',
      iconType: 'MaterialCommunityIcons',
    },
    {
      label: 'Terms & Conditions',
      onPress: () => {},
      iconName: 'filetext1',
      iconType: 'AntDesign',
    },
    {
      label: 'Privacy Policy',
      onPress: () => {},
      iconName: 'security',
      iconType: 'MaterialCommunityIcons',
    },
  ];

  const handleLogout = () => {
    dispatch({
      type: ACTIONCONSTANTS.CLEAR_IDENTITY,
    });
  };

  const onEditProfilePressed = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScreenWrapper
      conatinerStyle={StyleSheet.flatten([
        commonStyles.mainContainer,
        commonStyles.paddingHorizontal5,
      ])}
      statusBarColor={colors.white}>
      <View style={styles.centeredContainer}>
        <Image source={Images.DefaultUser} style={styles.userImage} />
        <Spacer gap={RFPercentage(1)} />
        <CustomText
          text={userInfo?.firstname + ' ' + userInfo?.lastname}
          fontSize={16}
          fontWeight={'600'}
          numberOfLines={1}
          color="black"
        />
        <CustomText
          text={userInfo?.role_name}
          fontSize={16}
          fontWeight={'400'}
          numberOfLines={1}
        />
        <Spacer gap={RFPercentage(1)} />
        <Pressable
          style={styles.editProfileButton}
          onPress={() =>
            navigation.navigate('ProfileStack', {
              screen: 'EditProfile',
            })
          }>
          <CustomText
            text={'Edit Profile'}
            fontSize={16}
            numberOfLines={1}
            color="white"
            style={styles.btnTextStyle}
          />
        </Pressable>
        <Spacer gap={RFPercentage(1)} />
        <View style={{width: '100%'}}>
          {profileData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              style={styles.optionRow}>
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  <Icons
                    //@ts-ignore
                    type={item.iconType}
                    name={item.iconName}
                    color={colors.black}
                    size={RFPercentage(2)}
                  />
                </View>
                <Spacer gap={RFPercentage(1)} />
                <CustomText
                  text={item.label}
                  fontSize={14}
                  color="black"
                  style={styles.optionText}
                />
              </View>
              <Icons
                type="AntDesign"
                name="right"
                size={RFPercentage(2)}
                color={colors.gray}
              />
            </TouchableOpacity>
          ))}

          <Pressable onPress={handleLogout} style={styles.logoutRow}>
            <View style={styles.optionLeft}>
              <View style={styles.logoutIconContainer}>
                <Icons
                  type={'MaterialCommunityIcons'}
                  name={'logout'}
                  color={colors.errorRed}
                  size={RFPercentage(2)}
                />
              </View>
              <Spacer gap={RFPercentage(1)} />
              <CustomText
                text="Log out"
                fontSize={14}
                color={'errorRed'}
                style={styles.optionText}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  userImage: {
    width: hp(10),
    height: hp(10),
    borderRadius: 30,
  },
  btnTextStyle: {
    fontFamily: 'Lexend-Medium',
    fontSize: RFValue(12),
  },
  centeredContainer: {
    alignItems: 'center',
  },
  editProfileButton: {
    width: '100%',
    height: hp(5.8),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  arrowIcon: {
    width: 12,
    height: 12,
    tintColor: '#999',
  },
  optionText: {
    fontSize: RFValue(13),
    fontFamily: 'Lexend-Regular',
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    tintColor: colors.errorRed,
  },
  iconContainer: {
    backgroundColor: colors.backgroundGray,
    height: RFPercentage(5),
    width: RFPercentage(5),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  logoutIconContainer: {
    backgroundColor: colors.lightPink,
    height: RFPercentage(5),
    width: RFPercentage(5),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
