import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../assets/colors/colors';
import {CustomButton, CustomText} from '../../../components';
import {Icons} from '../../../components/Icons';
import {hp} from '../../../utils/helpers';

interface Props {
  isClockedIn: boolean;
  loading: boolean;
  onToggle: () => void;
  timeSinceLastLogin: string;
  lastClockInTime: string;
}

const AttendanceToggleButton: React.FC<Props> = ({
  isClockedIn,
  loading,
  onToggle,
  timeSinceLastLogin,
  lastClockInTime,
}) => {
  if (isClockedIn) {
    return (
      <View style={styles.clockOutContainerStyle}>
        <Pressable
          onPress={onToggle}
          disabled={loading}
          style={styles.clockOutBtnStyle}>
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <CustomText text="Clock Out" color="white" />
          )}
        </Pressable>
        <View style={styles.clockOutTimeStyle}>
          <CustomText text={timeSinceLastLogin} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icons
              type={'Feather'}
              name="arrow-down-left"
              color={'green'}
              size={RFValue(9)}
            />
            <CustomText
              text={lastClockInTime}
              color="gray"
              fontSize={RFValue(9)}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <CustomButton text="Clock In" onPress={onToggle} isLoading={loading} />
  );
};

const styles = StyleSheet.create({
  clockOutContainerStyle: {
    borderWidth: 2,
    height: hp(5.8),
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    borderColor: colors.primary,
  },
  clockOutBtnStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },
  clockOutTimeStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AttendanceToggleButton;
