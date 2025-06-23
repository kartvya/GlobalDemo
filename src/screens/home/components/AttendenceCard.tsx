import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {wp} from '../../../utils/helpers';
import {CustomText} from '../../../components';
import {colors} from '../../../assets/colors/colors';
import {commonStyles} from '../../../styles/commonStyle';
import {Icons} from '../../../components/Icons';

interface AttendenceCardProps {
  time: string;
  iconType: string;
  iconName: string;
  titleText: string;
  description: string;
}

const AttendenceCard: React.FC<AttendenceCardProps> = ({
  time,
  iconType,
  iconName,
  titleText,
  description,
}) => {
  return (
    <View style={styles.container}>
      <View style={[commonStyles.rowView, commonStyles.marginBottom3]}>
        <View style={styles.iconContianer}>
          <Icons
            type={iconType}
            name={iconName}
            size={18}
            color={colors.primary}
          />
        </View>
        <CustomText text={titleText} color={'gray'} />
      </View>

      <CustomText
        text={time}
        style={[commonStyles.marginLeft2, commonStyles.marginBottom1]}
        fontSize={18}
        color="black"
      />
      <CustomText
        text={description}
        style={commonStyles.marginLeft2}
        fontSize={14}
        fontWeight={'400'}
        numberOfLines={2}
      />
    </View>
  );
};

export default memo(AttendenceCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 3,
    borderRadius: 15,
    paddingVertical: wp(3),
    paddingHorizontal: wp(3),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  iconContianer: {
    backgroundColor: colors.primarylight,
    padding: wp(2.5),
    borderRadius: 13,
    marginRight: wp(3),
  },
});
