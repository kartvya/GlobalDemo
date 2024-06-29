import React from 'react';
import {StyleSheet, View, TextInput, TextInputProps} from 'react-native';
import {MXicon} from './Icons';
import {colors} from '../utility';
import {RFPercentage} from 'react-native-responsive-fontsize';

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
          type={'EvilIcons'}
          name="search"
          size={27}
          color={colors.black}
          style={{
            position: 'absolute',
            zIndex: 999,
            paddingLeft: RFPercentage(1),
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
    fontSize: 16,
    borderWidth: 1,
    padding: 7,
    marginTop: 5,
    paddingLeft: RFPercentage(4.5),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
