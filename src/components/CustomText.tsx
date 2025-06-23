import {
  Text,
  TextProps,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {memo, useMemo} from 'react';

import {ColorTypes} from '../types';
import {colors} from '../assets/colors/colors';

interface CustomTextProps extends TextProps {
  text: string | number | any;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  fontFamily?: string;
  color?: keyof ColorTypes;
  style?: TextStyle | TextStyle[];
  onPress?: () => void;
}

const CustomText: React.FC<CustomTextProps> = props => {
  const {
    text,
    fontSize = 15,
    fontWeight = '500',
    fontFamily = 'Lexend-Regular',
    color = 'textColor',
    style,
    onPress,
    ...rest
  } = props;

  const combineStyle = useMemo(
    () =>
      StyleSheet.flatten([
        {
          fontSize,
          fontWeight,
          fontFamily,
          color: colors[color],
        },
        style,
      ]),
    [fontSize, fontWeight, fontFamily, color, style],
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={combineStyle} {...rest}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <Text style={combineStyle} {...rest}>
        {text}
      </Text>
    );
  }
};

export default memo(CustomText);
