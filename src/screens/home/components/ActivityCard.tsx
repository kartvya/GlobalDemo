import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../assets/colors/colors';
import {CustomText} from '../../../components';
import {Icons} from '../../../components/Icons';
import Spacer from '../../../components/Spacer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface ActivityCardPayload {
  item: any;
}

const ActivityCard: FC<ActivityCardPayload> = ({item}) => {
  const checkInTime = dayjs.utc(item.check_in).local().format('hh:mm A');
  const checkOutTime = item.check_out
    ? dayjs.utc(item.check_out).local().format('hh:mm A')
    : '--';
  const date = item?.date ? dayjs(item.date).format('MMMM D, YYYY') : '--';

  let status = 'Pending';
  if (item?.check_in && item?.check_out) {
    status = 'Completed';
  } else if (item?.check_in && !item?.check_out) {
    status = 'Ongoing';
  }
  return (
    <View style={styles.container}>
      <View style={styles.iconContianer}>
        <Icons
          type={'Feather'}
          name={'clock'}
          size={25}
          color={colors.primary}
        />
      </View>
      <Spacer gap={RFPercentage(1)} />
      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <CustomText text={'Clock In'} fontSize={RFValue(12)} color="black" />
          <CustomText text={checkInTime} fontSize={RFValue(12)} color="black" />
        </View>
        <Spacer gap={RFPercentage(0.2)} />
        <View style={styles.row}>
          <CustomText text={'Clock Out'} fontSize={RFValue(12)} color="black" />
          <CustomText
            text={checkOutTime}
            fontSize={RFValue(12)}
            color="black"
          />
        </View>
        <Spacer gap={RFPercentage(0.3)} />
        <View style={styles.row}>
          <CustomText text={date} fontSize={RFValue(9)} color="gray" />
          <CustomText text={status} fontSize={RFValue(9)} color="gray" />
        </View>
      </View>
    </View>
  );
};

export default ActivityCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 3,
    borderRadius: 15,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    height: RFPercentage(10),
    paddingHorizontal: RFPercentage(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContianer: {
    backgroundColor: colors.primarylight,
    borderRadius: 13,
    height: RFPercentage(7),
    width: RFPercentage(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
