const defaultData = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
];
import React, {memo} from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import CustomText from './CustomText';
import {colors} from '../assets/colors/colors';
import {hp, wp} from '../utils/helpers';

type Props = {
  dropdownRef?: any;
  placeholder?: string;
  data: any;
  value: any;
  labelField?: string;
  valueField?: string;
  onChange: (value: any) => void;
  tapperStyle?: ViewStyle;
  search?: boolean;
  showPrice?: boolean;
  title?: string;
  titleTextStyle?: StyleProp<TextStyle>;
  errorMsgTextStyle?: StyleProp<TextStyle>;
  errorMsg?: string;
  lableStyle?: StyleProp<TextStyle>;
};
const CustomDropDown: React.FC<Props> = props => {
  const {
    dropdownRef,
    placeholder = 'Select Dropdown item',
    data = defaultData,
    value,
    labelField = 'label',
    valueField = 'value',
    onChange,
    tapperStyle,
    search = false,
    showPrice = false,
    title,
    titleTextStyle,
    errorMsgTextStyle,
    errorMsg,
    lableStyle,
  } = props;

  const renderItem = (item: any) => {
    const label = item[labelField] || '';
    const price = item.Price != null ? Number(item.Price).toFixed(2) : '0.00';

    return (
      <View style={styles.itemContainer}>
        <CustomText style={[styles.itemLabel]} text={label} />
        {showPrice && (
          <CustomText style={styles.itemPrice} text={`€${price}`} />
        )}
      </View>
    );
  };

  return (
    <React.Fragment>
      {title && (
        <CustomText
          text={title}
          style={StyleSheet.flatten([styles.titleTextStyle, titleTextStyle])}
        />
      )}
      <Dropdown
        autoScroll={false}
        searchPlaceholder="Search"
        data={data}
        value={value}
        search={search}
        ref={dropdownRef}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        onChange={onChange}
        style={[styles.tapperStyle, tapperStyle]}
        containerStyle={styles.containerStyle}
        placeholderStyle={[styles.placeholderStyle, lableStyle]}
        inputSearchStyle={styles.searchInputStyle}
        searchPlaceholderTextColor={colors.lightGray}
        selectedTextStyle={lableStyle}
        renderItem={renderItem}
        fontFamily="Lexend-Regular"
        flatListProps={{
          ListEmptyComponent: (
            <View style={styles.emptyContainer}>
              <CustomText style={styles.emptyText} text="No data" />
            </View>
          ),
        }}
      />
    </React.Fragment>
  );
};
export default memo(CustomDropDown);
const styles = StyleSheet.create({
  tapperStyle: {
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: Platform.OS === 'android' ? hp(1.3) : hp(1.8),
    paddingHorizontal: wp(5),
  },
  containerStyle: {
    borderRadius: 10,
    marginTop: Platform.OS === 'ios' ? 0 : -RFPercentage(2),
  },
  placeholderStyle: {
    color: colors.lightGray,
    fontSize: 16,
    flex: 1,
    fontFamily: 'Lexend-Regular',
  },
  searchInputStyle: {
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(1.5),
    borderBottomColor: colors.lightGray,
  },
  itemLabel: {
    color: colors.black,
    flex: 0.8,
    fontFamily: 'Lexend-Regular',
  },
  itemPrice: {
    flex: 0.2,
    color: colors.black,
    textAlign: 'right',
    fontFamily: 'Lexend-Regular',
  },
  titleTextStyle: {
    fontSize: RFValue(8),
    marginBottom: RFPercentage(0.5),
    color: colors.gray,
  },
  emptyContainer: {
    height: RFPercentage(3.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {},
});
