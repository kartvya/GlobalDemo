import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../assets/colors/colors';
import { wp } from '../utils/helpers';
import MyStatusBar from './CustomeStatusBar';
import { Icons } from './Icons';
import CustomText from './CustomText';
import Spacer from './Spacer';

interface ScreenWrapperProps {
  children: ReactNode;
  bg?: string;
  conatinerStyle?: ViewStyle;
  statusBarColor?: string;
  showAddBtn?: boolean;
}

const ScreenWrapper = ({
  children,
  bg,
  conatinerStyle,
  statusBarColor,
  showAddBtn = false,
}: ScreenWrapperProps) => {
  return (
    <>
      <MyStatusBar
        backgroundColor={statusBarColor || colors.white}
        barStyle="dark-content"
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor: bg || colors.white,
          },
          conatinerStyle,
        ]}
      >
        {children}
        {showAddBtn && (
          <Pressable style={styles.addBtn}>
            <CustomText
              text={'Add product'}
              color={'white'}
              style={{ fontSize: RFValue(13), fontWeight: 'semibold' }}
            />
            <Spacer gap={5} />
            <Icons
              name={'plus'}
              type="AntDesign"
              color={colors.white}
              size={RFPercentage(3)}
            />
          </Pressable>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipeContainer: {
    position: 'absolute',
    bottom: wp(2),
    left: wp(5),
    right: wp(5),
  },
  swipeButtonContainer: {
    borderRadius: 10,
    borderWidth: 0,
    height: RFPercentage(6),
  },
  swipeButtonRail: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  swipeButtonThumb: {
    borderWidth: 0,
    borderRadius: 10,
  },
  swipeButtonTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addBtn: {
    position: 'absolute',
    zIndex: 999,
    bottom: 25,
    right: 25,
    backgroundColor: colors.primary,
    height: RFPercentage(6),
    width: RFPercentage(20),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default ScreenWrapper;
