import React, {FunctionComponent} from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

import {Icons} from './Icons';
import {colors} from '../assets/colors/colors';

interface PaginatorProps {
  data: string[] | object[];
  scrollX: Animated.Value;
  onSkip?: () => void;
  showSkipBtn?: boolean;
  currentIndex?: number;
  isPropertiDetails?: boolean;
}

const Paginator: FunctionComponent<PaginatorProps> = ({
  data,
  scrollX,
  onSkip,
  showSkipBtn,
  currentIndex,
  isPropertiDetails,
}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.dotsConatiner}>
        {data?.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [RFPercentage(2), RFPercentage(8), RFPercentage(2)],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: [colors.primary, colors.primary, colors.primary],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View key={i.toString()} style={{opacity}}>
              <Animated.View
                style={[
                  styles.dot,
                  {
                    backgroundColor,
                    width: dotWidth,
                    height: RFPercentage(0.6),
                  },
                ]}
              />
            </Animated.View>
          );
        })}
      </View>
      {showSkipBtn ? (
        <Pressable style={styles.btnContainer} onPress={onSkip}>
          <Text style={{color: colors.white}}>Skip</Text>
          <Icons
            type="Entypo"
            name="chevron-right"
            size={18}
            color={colors.white}
          />
        </Pressable>
      ) : null}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  dot: {
    backgroundColor: colors.primary,
    borderRadius: RFPercentage(70),
    marginHorizontal: RFPercentage(0.5),
  },
  container: {
    flex: 1,
    height: RFPercentage(2),
    paddingHorizontal: RFPercentage(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextBtnContainer: {
    backgroundColor: colors.primary,
    padding: RFPercentage(1.3),
    borderRadius: RFPercentage(10),
  },
  dotsConatiner: {flexDirection: 'row'},
});
