import React, {memo} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {RootStackParamList} from '../../../types';
import {MXicon} from '../../components/Icons';
import {colors} from '../../utility';
import {TitleText} from '../../components/Text';
import MyStatusBar from '../../components/MyStatusBar';

interface HeaderProps {
  uploadImage: () => void;
}

const Header: React.FC<HeaderProps> = ({uploadImage}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <>
      <MyStatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable onPress={() => navigation.goBack()}>
            <MXicon
              type="AntDesign"
              name="close"
              color={colors.black}
              size={RFPercentage(3)}
            />
          </Pressable>
          <TitleText
            style={{marginHorizontal: RFPercentage(2), color: colors.black}}>
            New post
          </TitleText>
        </View>
        <Pressable onPress={uploadImage}>
          <MXicon
            type="AntDesign"
            name={'check'}
            color={colors.black}
            size={RFPercentage(3)}
          />
        </Pressable>
      </View>
    </>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(2),
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
