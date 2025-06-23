import React, {memo} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {hp, wp} from '../../../utils/helpers';
import {Images} from '../../../assets/images';
import {CustomText} from '../../../components';
import {colors} from '../../../assets/colors/colors';
import {commonStyles} from '../../../styles/commonStyle';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {AuthState} from '../../../redux/reducers/AuthReducer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../types';
import {Icons} from '../../../components/Icons';

interface HomeHeaderProps {}

const HomeHeader: React.FC<HomeHeaderProps> = ({}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {userInfo} = useSelector(
    (state: RootState) => state.root.authReducer,
  ) as AuthState;

  return (
    <View style={styles.container}>
      <Pressable
        style={commonStyles.rowView}
        onPress={() => navigation.navigate('BottomTab', {screen: 'Profile'})}>
        <Image source={Images.DefaultUser} style={styles.userImage} />
        <View>
          <CustomText
            text={userInfo?.firstname + ' ' + userInfo?.lastname}
            fontSize={16}
            fontWeight={'600'}
            numberOfLines={1}
          />
          <CustomText
            text={userInfo?.role_name}
            fontSize={14}
            fontWeight={'400'}
            numberOfLines={1}
          />
        </View>
      </Pressable>
      <TouchableOpacity
        style={styles.bellContainer}
        onPress={() =>
          navigation.navigate('HomeStack', {screen: 'NotificationScreen'})
        }>
        <Icons type={'Fontisto'} name={'bell'} size={22} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(HomeHeader);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userImage: {
    width: hp(5),
    height: hp(5),
    borderRadius: 30,
    elevation: 1,
    ...commonStyles.marginRight3,
  },
  bellContainer: {
    padding: wp(2.5),
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: colors.white,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
