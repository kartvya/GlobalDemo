// DateSelectionScrollView.tsx
import React, {useState, useEffect, useRef} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {CustomText} from '../../../components';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Spacer from '../../../components/Spacer';
import {colors} from '../../../assets/colors/colors';

dayjs.extend(utc);

interface Props {
  onDateChange: (date: string) => void;
}

const DateSelectionScrollView = ({onDateChange}: Props) => {
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().utc().format('YYYY-MM-DD'),
  );
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const last7Days = Array.from({length: 7}, (_, i) =>
      dayjs()
        .utc()
        .subtract(6 - i, 'day')
        .format('YYYY-MM-DD'),
    );
    setDates(last7Days);

    // Scroll to the end after a slight delay
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: true});
    }, 100);
  }, []);

  useEffect(() => {
    onDateChange(selectedDate); // notify parent
  }, [selectedDate]);

  const renderDateItem = (date: string) => {
    const isSelected = selectedDate === date;
    const dayNumber = dayjs.utc(date).format('DD');
    const dayName = dayjs.utc(date).format('ddd');

    return (
      <TouchableOpacity
        key={date}
        style={[
          styles.dateContainer,
          isSelected && styles.selectedDateContainer,
        ]}
        onPress={() => setSelectedDate(date)}>
        <CustomText
          color="black"
          text={dayNumber}
          style={[styles.dateText, isSelected && styles.selectedDateText]}
          fontSize={RFValue(16)}
        />
        <CustomText
          color="gray"
          text={dayName}
          style={[styles.dayText, isSelected && styles.selectedDayText]}
          fontSize={RFValue(10)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        data={dates}
        renderItem={({item}) => renderDateItem(item)}
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Spacer gap={RFPercentage(0.5)} />}
      />
    </View>
  );
};

export default DateSelectionScrollView;

const styles = StyleSheet.create({
  container: {},
  dateContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: colors.gray,
    height: RFPercentage(8),
    width: RFPercentage(8),
    justifyContent: 'center',
  },
  selectedDateContainer: {
    backgroundColor: '#007BFF',
  },
  dateText: {},
  dayText: {},
  selectedDateText: {
    color: '#fff',
  },
  selectedDayText: {
    color: '#fff',
  },
});
