import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  Platform,
} from 'react-native';
import {MXicon} from './Icons';
import {colors} from '../utility';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

interface CommonSearchbarProps {
  searchText: string;
  onChangeText: (text: string) => void;
  onEndEditing?: () => void;
  onPressFilter?: () => void;
  onPressEqulizer?: () => void;
}

const CommonSearchbar: React.FC<CommonSearchbarProps> = props => {
  const {searchText, onChangeText} = props;

  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <MXicon
          type={'AntDesign'}
          name="search1"
          size={20}
          color={colors.textGray}
          style={{
            position: 'absolute',
            zIndex: 999,
            paddingLeft: RFPercentage(2),
            top: RFPercentage(1.8),
          }}
        />
        <TextInput
          onChangeText={onChangeText}
          style={styles.searchInput}
          placeholder="Search Items"
          placeholderTextColor={'#9E9E9E'}
          defaultValue={searchText}
        />
      </View>
    </View>
  );
};

export default CommonSearchbar;

const styles = StyleSheet.create({
  searchInput: {
    color: colors.black,
    borderRadius: 8,
    borderColor: colors.borderGray,
    fontSize: RFValue(12),
    borderWidth: 1,
    padding: Platform.OS === 'ios' ? 10 : 5,
    marginTop: 5,
    paddingLeft: RFPercentage(5.5),
    fontFamily: 'ComicNeue-Regular',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
