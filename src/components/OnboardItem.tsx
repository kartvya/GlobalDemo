import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {FunctionComponent, memo} from 'react';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Spacer from './Spacer';
import CustomText from './CustomText';

interface OnboardItemProps {
  data: {
    title: string;
    discription: string;
    image: ImageSourcePropType;
    imageTitle: string;
    backGroundColor: string;
    lightShade: string;
  };
}

const OnboardItem: FunctionComponent<OnboardItemProps> = ({data}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.conatiner, {width}]}>
      <CustomText
        text={data?.title}
        style={[styles.titleTextStle, {color: data.backGroundColor}]}
        numberOfLines={2}
      />
      <Spacer gap={RFPercentage(1)} />
      <CustomText
        text={data?.discription}
        style={[styles.descStyle, {color: data.backGroundColor}]}
        numberOfLines={2}
      />
    </View>
  );
};

export default memo(OnboardItem);

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: 'center',
  },
  titleTextStle: {
    fontSize: RFValue(24),
    marginHorizontal: RFPercentage(3),
    fontFamily: 'Lexend-Bold',
    textAlign: 'center',
  },
  descStyle: {
    fontSize: RFValue(12),
    textAlign: 'center',
    marginHorizontal: RFPercentage(5),
    fontFamily: 'Lexend-Regular',
  },
});
