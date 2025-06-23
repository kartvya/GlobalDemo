import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {colors} from '../assets/colors/colors';
import {wp} from '../utils/helpers';
import MyStatusBar from './CustomeStatusBar';

interface ScreenWrapperProps {
  children: ReactNode;
  bg?: string;
  conatinerStyle?: ViewStyle;
  statusBarColor?: string;
}

const ScreenWrapper = ({
  children,
  bg,
  conatinerStyle,
  statusBarColor,
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
        ]}>
        {children}
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
});

export default ScreenWrapper;
