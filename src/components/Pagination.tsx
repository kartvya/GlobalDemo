import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {colors} from '../utility';

type PaginationSize = 'small' | 'medium' | 'large';

interface AnimatedDotProps {
  index: number;
  style: ViewStyle;
  progress: Animated.SharedValue<number>;
  multiplier: number;
  scaleDots: boolean;
}

const DEFAULT_SIZE = 15;

function clamp(value: number, lowerBound: number, upperBound: number): number {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
}

function AnimatedDot({
  index,
  style,
  progress,
  multiplier,
  scaleDots,
}: AnimatedDotProps) {
  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      clamp(progress.value, 0, 1 - multiplier),
      [
        index * multiplier - multiplier,
        index * multiplier,
        index * multiplier + multiplier,
      ],
      [0.25, 1, 0.25],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [
        {
          scale: scaleDots ? interpolate(opacity, [0.25, 1], [0.5, 1]) : 1,
        },
      ],
    };
  });

  return (
    <Animated.View
      key={`onboarding-pagination-dot-${index}`}
      style={[style, animatedStyles]}
    />
  );
}

interface PaginationProps {
  progress: Animated.SharedValue<number>;
  numberOfPages: number;
  scaleDots?: boolean;
  dotStyles?: ViewStyle;
  containerStyles?: ViewStyle;
  size?: PaginationSize;
}

export function Pagination({
  progress,
  numberOfPages,
  scaleDots = false,
  dotStyles = {},
  containerStyles = {},
  size = 'medium',
}: PaginationProps) {
  const multiplier = 1 / numberOfPages;

  function returnSize(): ViewStyle {
    switch (size) {
      case 'small':
        return {
          width: DEFAULT_SIZE * 0.6,
          height: DEFAULT_SIZE * 0.6,
        };
      case 'large':
        return {
          width: DEFAULT_SIZE * 1.2,
          height: DEFAULT_SIZE * 1.2,
        };
      default:
        return {
          width: DEFAULT_SIZE,
          height: DEFAULT_SIZE,
        };
    }
  }

  function renderDots(): JSX.Element[] {
    let dots: JSX.Element[] = [];
    const dotSize = returnSize(); // Store the size style object
    for (let i = 0; i < numberOfPages; i++) {
      dots.push(
        <AnimatedDot
          key={`pagination-${i}`}
          index={i}
          scaleDots={scaleDots}
          multiplier={multiplier}
          progress={progress}
          style={[
            styles.dotStyle, // Use the predefined dotStyle
            dotStyles,
            dotSize, // Apply the size style object directly
          ]}
        />,
      );
    }
    return dots;
  }

  return (
    <View style={[styles.dotContainer, containerStyles]}>{renderDots()}</View>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotStyle: {
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
    borderRadius: 50,
    marginHorizontal: 5,
    backgroundColor: colors.black,
  },
});
