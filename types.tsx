import type {ViewStyle} from 'react-native';

export type RootStackParamList = {
  userlist: undefined;
  feed: undefined;
  home: undefined;
};
export type IconType =
  | 'Fontisto'
  | 'MaterialIcons'
  | 'EvilIcons'
  | 'Feather'
  | 'AntDesign'
  | 'Zocial'
  | 'SimpleLineIcon'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'Entypo'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Octicons';

export type IconProps = {
  type: IconType;
  name: String;
  size?: Number;
  color?: String;
  style?: ViewStyle;
  onPress?: () => void;
};
