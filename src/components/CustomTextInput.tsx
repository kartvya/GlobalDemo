import {
  View,
  Platform,
  Pressable,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  TextInputProps,
} from 'react-native';
import React, {memo, useState, useCallback} from 'react';

import {IconTypes} from '../types';
import {hp, wp} from '../utils/helpers';
import {colors} from '../assets/colors/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Icons} from './Icons';

interface CustomTextInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftIconType?: IconTypes;
  leftIconName?: string;
  onLeftIconPress?: () => void;
  rightIconType?: IconTypes;
  rightIconName?: string;
  onRightIconPress?: () => void;
  allowNumeric?: boolean;
  allowSpecialChars?: boolean;
  allowSpaces?: boolean;
  secureTextEntry?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  containerStyle,
  inputStyle,
  leftIconType,
  leftIconName,
  onLeftIconPress,
  rightIconType,
  rightIconName,
  onRightIconPress,
  allowNumeric = true,
  allowSpecialChars = true,
  allowSpaces = true,
  secureTextEntry = false,
  ...rest
}) => {
  const isEditable = rest.editable !== false;

  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const onChangeText = rest.onChangeText;

  const filterText = useCallback(
    (text: string) => {
      let result = text;
      if (!allowNumeric) {
        result = result.replace(/[0-9]/g, '');
      }
      if (!allowSpecialChars) {
        result = result.replace(/[^a-zA-Z0-9 ]/g, '');
      }
      if (!allowSpaces) {
        result = result.replace(/\s/g, '');
      }
      return result;
    },
    [allowNumeric, allowSpecialChars, allowSpaces],
  );

  const handleTextChange = useCallback(
    (text: string) => {
      const filtered = filterText(text);
      onChangeText?.(filtered);
    },
    [filterText, onChangeText],
  );

  const toggleSecureEntry = useCallback(() => {
    setIsSecure(prev => !prev);
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      {leftIconType && leftIconName && (
        <Pressable style={styles.leftIconContainer} onPress={onLeftIconPress}>
          <Icons
            size={18}
            type={leftIconType}
            name={leftIconName}
            color={colors.lightGray}
          />
        </Pressable>
      )}

      <TextInput
        {...rest}
        style={[
          styles.inputStyle,
          inputStyle,
          // !isEditable && styles.disabledInputStyle,
        ]}
        secureTextEntry={isSecure}
        placeholderTextColor={colors.lightGray}
        onChangeText={handleTextChange}
      />

      {secureTextEntry ? (
        <Pressable
          style={styles.rightIconContainer}
          onPress={toggleSecureEntry}>
          <Icons
            size={18}
            type="Feather"
            name={isSecure ? 'eye-off' : 'eye'}
            color={colors.lightGray}
          />
        </Pressable>
      ) : (
        rightIconType &&
        rightIconName && (
          <Pressable
            style={styles.rightIconContainer}
            onPress={onRightIconPress}>
            <Icons
              size={18}
              type={rightIconType}
              name={rightIconName}
              color={colors.lightGray}
            />
          </Pressable>
        )
      )}
    </View>
  );
};

export default memo(CustomTextInput);

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    paddingVertical: Platform.OS === 'android' ? hp(1.3) : hp(1.8),
    paddingHorizontal: wp(5),
    color: colors.textColor,
    fontFamily: 'Lexend-Regular',
    textAlignVertical: 'top',
  },
  leftIconContainer: {
    paddingLeft: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    paddingRight: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
