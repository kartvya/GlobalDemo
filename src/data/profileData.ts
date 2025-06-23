import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigationTypes';

const navigation = useNavigation<NavigationProp<RootStackParamList>>();

export const profileData = [
  {
    label: 'My Profile',
    onPress: () => {},
    iconName: 'user',
    iconType: 'AntDesign',
  },
  {
    label: 'Settings',
    onPress: () => {},
    iconName: 'setting',
    iconType: 'AntDesign',
  },
  {
    label: 'Reset Password',
    onPress: () => {
      navigation.navigate('ProfileStack', {
        screen: 'ResetPassword',
      });
    },
    iconName: 'lock-reset',
    iconType: 'MaterialCommunityIcons',
  },
  {
    label: 'Terms & Conditions',
    onPress: () => {},
    iconName: 'filetext1',
    iconType: 'AntDesign',
  },
  {
    label: 'Privacy Policy',
    onPress: () => {},
    iconName: 'security',
    iconType: 'MaterialCommunityIcons',
  },
];
