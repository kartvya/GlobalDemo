import {
  View,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';
import React, {memo, useMemo} from 'react';
import {hp} from '../utils/helpers';
import CustomText from './CustomText';
import {colors} from '../assets/colors/colors';
import {ColorTypes, IconTypes} from '../types';
import {commonStyles} from '../styles/commonStyle';
import {RFValue} from 'react-native-responsive-fontsize';
import {Icons} from './Icons';

interface CustomButtonProps extends TouchableOpacityProps {
  text?: string;
  isLoading?: boolean;
  buttonWidth?: number;
  leftIconName?: string;
  leftIcontype?: IconTypes;
  containerStyle?: ViewStyle;
  textColor?: keyof ColorTypes;
  backgroundColor?: keyof ColorTypes;
}

const CustomButton: React.FC<CustomButtonProps> = props => {
  const {
    text = '',
    isLoading,
    buttonWidth,
    leftIcontype,
    leftIconName,
    containerStyle,
    textColor = 'white',
    backgroundColor = 'primary',
    ...rest
  } = props;

  const dynamicStyle = useMemo(
    () => ({
      width: buttonWidth,
      backgroundColor: colors[backgroundColor],
    }),
    [buttonWidth, backgroundColor],
  );

  return (
    <TouchableOpacity
      {...rest}
      style={[styles.container, containerStyle, dynamicStyle]}
      disabled={isLoading || rest.disabled}>
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <View style={commonStyles.rowView}>
          {leftIcontype && leftIconName && (
            <View style={commonStyles.marginRight2}>
              <Icons
                size={16}
                type={leftIcontype}
                name={leftIconName}
                color={colors[textColor]}
              />
            </View>
          )}
          <CustomText
            text={text}
            color={textColor}
            style={styles.btnTextStyle}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default memo(CustomButton);

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: hp(5.8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextStyle: {
    fontFamily: 'Lexend-Medium',
    fontSize: RFValue(12),
  },
});
