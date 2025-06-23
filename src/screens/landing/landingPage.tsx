import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../assets/colors/colors';
import {Images} from '../../assets/images';
import {CustomButton} from '../../components';
import OnboardItem from '../../components/OnboardItem';
import Paginator from '../../components/Paginator';
import ScreenWrapper from '../../components/ScreenWrapper';
import {landingData} from '../../data/landingData';
import {RootStackParamList} from '../../types';

const AUTO_SCROLL_INTERVAL = 6000;

const LandingPage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const sliderRef = useRef<FlatList<any>>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const viewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: any[]}) => {
      setCurrentIndex(viewableItems[0]?.index || 0);
    },
  ).current;

  const autoScroll = () => {
    if (sliderRef.current) {
      const nextIndex =
        currentIndex < landingData.length - 1 ? currentIndex + 1 : 0;
      sliderRef.current.scrollToIndex({index: nextIndex});
      setCurrentIndex(nextIndex);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset, layoutMeasurement} = event.nativeEvent;
    const index = Math.round(contentOffset.x / layoutMeasurement.width);
    setCurrentIndex(index);
  };

  useEffect(() => {
    intervalRef.current = setInterval(autoScroll, AUTO_SCROLL_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex]);

  const onPressNext = () => {
    try {
      if (currentIndex === landingData.length - 1) {
        navigation.navigate('AuthStack', {screen: 'Login'});
      } else if (sliderRef.current) {
        sliderRef.current.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScreenWrapper
      conatinerStyle={styles.mainContainer}
      statusBarColor={colors.primaryBlueLightest}>
      <View style={styles.imageConatiner}>
        <Image
          source={currentIndex === 0 ? Images.LandingPage : Images.LandingPage1}
          style={styles.landingImageStyle}
        />
      </View>
      <View style={styles.paginatoreConatiner}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Paginator
            data={landingData}
            scrollX={scrollX}
            currentIndex={currentIndex}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={landingData}
            renderItem={({item}) => <OnboardItem data={item} />}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: false,
                listener: handleScroll,
              },
            )}
            keyExtractor={item => item.id.toString()}
            onViewableItemsChanged={viewableItemsChanged}
            scrollEventThrottle={32}
            ref={sliderRef}
          />
        </View>
        <View style={{flex: 0.5, justifyContent: 'center'}}>
          <CustomButton
            text={'Next'}
            containerStyle={{marginHorizontal: RFPercentage(3)}}
            onPress={onPressNext}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.primaryBlueLightest,
  },
  skipBtn: {
    backgroundColor: colors.white,
    alignSelf: 'flex-end',
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(1),
    borderRadius: RFPercentage(3),
    marginRight: RFPercentage(3),
    marginTop: RFPercentage(1),
  },
  paginatoreConatiner: {
    flex: 0.6,
    backgroundColor: colors.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  imageConatiner: {
    flex: 1,
  },
  titleStyle: {
    fontSize: RFValue(24),
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'Poppins-Bold',
    lineHeight: 40,
  },
  descStyle: {
    fontSize: RFValue(16),
    textAlign: 'center',
    marginHorizontal: RFPercentage(2),
    color: colors.white,
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    lineHeight: 25,
  },
  skipButtonText: {
    textAlign: 'right',
    color: colors.white,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Regular',
  },
  landingImageStyle: {
    resizeMode: 'contain',
    height: '135%',
    width: '100%',
    bottom: -20,
  },
});
