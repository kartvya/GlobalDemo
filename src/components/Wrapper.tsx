import React, {ReactNode} from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {colors} from '../utility';
import {MXicon} from './Icons';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({children}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const onPressSpiral = () => {
    navigation.navigate('uploadPost');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      {children}
      <TouchableOpacity
        onPress={onPressSpiral}
        hitSlop={styles.hitSlopStyle}
        style={styles.spiralContainer}>
        <MXicon
          type="AntDesign"
          name={'plus'}
          color={colors.white}
          size={RFPercentage(4)}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  spiralContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primeColor,
    borderRadius: 90,
  },
  hitSlopStyle: {
    top: 15,
    right: 15,
    bottom: 15,
    left: 15,
  },
});

export default Wrapper;
