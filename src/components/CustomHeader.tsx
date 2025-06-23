import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../assets/colors/colors';
import {commonStyles} from '../styles/commonStyle';
import {RootStackParamList} from '../types';
import {wp} from '../utils/helpers';
import CustomText from './CustomText';
import {Icons} from './Icons';

interface CustomHeaderProps {
  text?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({text}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{width: 40}}>
        <Icons type={'FontAwesome'} name={'angle-left'} size={30} />
      </TouchableOpacity>
      <CustomText text={text} style={styles.text} fontSize={RFValue(15)} />
      <View style={{width: 40}} />
    </View>
  );
};

export default memo(CustomHeader);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    ...commonStyles.flex1,
  },
});
