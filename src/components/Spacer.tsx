/* eslint-disable react/react-in-jsx-scope */
import {memo} from 'react';
import {View} from 'react-native';

interface Iprops {
  gap: number;
}

const Spacer = (props: Iprops) => {
  return <View style={{margin: props.gap}} />;
};

export default memo(Spacer);
