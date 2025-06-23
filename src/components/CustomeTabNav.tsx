import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../assets/colors/colors';
import CustomText from './CustomText';

interface Props {
  tabs: string[];
  onTabPress: (index: number) => void;
}

const CustomTabNav: React.FC<Props> = ({tabs, onTabPress}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePress = (index: number) => {
    setActiveIndex(index);
    onTabPress(index);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <Pressable
          key={tab}
          onPress={() => handlePress(index)}
          style={[styles.tab, index === activeIndex && styles.activeTab]}>
          <CustomText
            style={[
              styles.tabText,
              index === activeIndex ? styles.activeTabText : {},
            ]}
            text={tab}
            numberOfLines={1}
            fontSize={RFValue(11)}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default CustomTabNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    borderRadius: 14,
  },
  tab: {
    borderRadius: 14,
    flex: 1,
    alignItems: 'center',
    height: RFPercentage(5.8),
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#2e85ff',
  },
  tabText: {
    color: colors.gray,
  },
  activeTabText: {
    color: colors.white,
  },
});
