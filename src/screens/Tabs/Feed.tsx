import React, {useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  ToastAndroid,
  View,
  Animated as RNAnimated,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
import DoubleTouchableOpacity from '../../components/DoubleTouchableOpacity';
import {MXicon} from '../../components/Icons';
import {NormalText, TitleText} from '../../components/Text';
import Wrapper from '../../components/Wrapper';
import {AppDispatch, useAppSelector} from '../../redux/appStore';
import {Post, toggleLike} from '../../redux/slices/userSlice';
import {colors} from '../../utility';
import ParsedText from 'react-native-parsed-text';
import {replaceMentionValues} from 'react-native-controlled-mentions';
import Paginator from '../../components/Paginator';
//@ts-ignore
import Video from 'react-native-video';

const width = Dimensions.get('window').width;

interface RenderItemProps {
  item: Post;
  isVisible: boolean;
}

const MemoizedRenderItem: React.FC<RenderItemProps> = React.memo(
  ({item, isVisible}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isSoundOn, setIsSoundOn] = useState<boolean>(false);
    const videoRef = useRef(null);
    const AnimatedImage = Animated.createAnimatedComponent(Image);
    const scrollX = useSharedValue(0);
    const scale = useSharedValue(0);
    const rStyle = useAnimatedStyle(() => ({
      transform: [{scale: Math.max(scale.value, 0)}],
    }));

    const onDoubleTap = useCallback(() => {
      if (!item.isLiked) {
        runOnJS(handleLikeToggle)(item.id);
      }
      scale.value = withSpring(1, undefined, isFinished => {
        if (isFinished) {
          scale.value = withDelay(500, withSpring(0));
        }
      });
    }, [item]);

    const handleLikeToggle = (itemId: number) => {
      dispatch(toggleLike(itemId));
    };

    const renderText = (matchingString: string, matches: string[]) => {
      return replaceMentionValues(matchingString, ({name}) => `${name}`);
    };

    const handleNamePress = (name: string, matchIndex: number) => {
      ToastAndroid.show(
        `${name} has been tagged to this post!`,
        ToastAndroid.SHORT,
      );
    };

    return (
      <View style={styles.userContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.profileImage}>
            <Image
              source={{uri: item.userProfileImage}}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.userNameContainer}>
            <TitleText>{item.username}</TitleText>
          </View>
        </View>
        {item.description && (
          <View>
            <ParsedText
              style={styles.descriptionText}
              parse={[
                {
                  style: styles.username,
                  onPress: handleNamePress,
                  renderText: renderText,
                  pattern: /[@#]\S*/g,
                },
              ]}
              childrenProps={{allowFontScaling: false}}>
              {item?.description}
            </ParsedText>
          </View>
        )}
        {item.uploadedImages.length > 0 && (
          <DoubleTouchableOpacity
            onPress={() => {}}
            onDoublePress={() => onDoubleTap()}
            doublePressDelay={250}>
            <View style={{flex: 1, alignSelf: 'center'}}>
              <Carousel
                width={width}
                height={RFPercentage(40)}
                autoPlay={false}
                data={item.uploadedImages}
                scrollAnimationDuration={1000}
                style={{
                  marginTop: RFPercentage(1.5),
                }}
                loop={false}
                panGestureHandlerProps={{
                  activeOffsetX: [-10, 0],
                }}
                onProgressChange={(_, absoluteProgress) => {
                  scrollX.value = absoluteProgress * width;
                }}
                onSnapToItem={carouselIndex => {
                  if (isVisible) {
                    runOnJS(setActiveIndex)(carouselIndex);
                  }
                }}
                renderItem={({index, item: imageUrl}) => {
                  const regex = /(?:\.([^.]+))?$/;
                  const match = imageUrl.match(regex);
                  const extension = match ? match[1] : undefined;
                  if (extension === 'mp4') {
                    return (
                      <View>
                        <Video
                          source={{uri: imageUrl}}
                          ref={videoRef}
                          onBuffer={() => console.log('buffring')}
                          onError={() => console.log('error')}
                          style={{width: '100%', height: '100%'}}
                          resizeMode="cover"
                          repeat={true}
                          useTextureView={false}
                          onPlaybackError={(error: any) =>
                            console.error('Video error:', error)
                          }
                          maxBitRate={700000}
                          ignoreSilentSwitch="ignore"
                          paused={
                            !isVisible ||
                            !(activeIndex == 0 || activeIndex == index)
                          }
                          muted={isSoundOn}
                          automaticallyWaitsToMinimizeStalling={false}
                          hideShutterView={true}
                          disableFocus={true}
                        />
                        <Pressable
                          style={styles.soundBtnConatiner}
                          onPress={() => setIsSoundOn(!isSoundOn)}>
                          <MXicon
                            type="Entypo"
                            name={isSoundOn ? 'sound-mute' : 'sound'}
                            color={colors.white}
                            size={RFPercentage(2.2)}
                          />
                        </Pressable>
                      </View>
                    );
                  } else {
                    return (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={{uri: imageUrl}}
                          style={{width: '100%', height: '100%'}}
                          resizeMode="cover"
                        />
                      </View>
                    );
                  }
                }}
              />
            </View>
          </DoubleTouchableOpacity>
        )}
        {item.uploadedImages.length > 1 ? (
          <View style={{marginVertical: RFPercentage(2)}}>
            <Paginator data={item.uploadedImages} scrollX={scrollX} />
          </View>
        ) : (
          <View style={{marginVertical: RFPercentage(1)}} />
        )}
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <AnimatedImage
            source={require('../../assets/images/whiteHeart.png')}
            tintColor={colors.red}
            resizeMode={'contain'}
            style={[
              {
                height: RFPercentage(10),
                width: RFPercentage(10),
                resizeMode: 'contain',
              },
              rStyle,
            ]}
          />
        </View>
        <Pressable
          style={styles.pressebleIconConatiner}
          onPress={() => dispatch(toggleLike(item.id))}>
          <MXicon
            type="FontAwesome"
            name={item.isLiked ? 'heart' : 'heart-o'}
            size={RFPercentage(2.5)}
            color={item.isLiked ? colors.pink : colors.black}
          />
          <NormalText style={{marginHorizontal: RFPercentage(0.8)}}>
            {item.likeCount} Likes
          </NormalText>
        </Pressable>
      </View>
    );
  },
);

const Feed: React.FC = () => {
  const userPost = useAppSelector(state => state.home.posts) as Post[];
  const dispatch = useDispatch<AppDispatch>();
  const flatlistRef = useRef<FlatList<Post>>(null);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<{index: number | null}>;
  }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0]?.index ?? null;
      setVisibleIndex(index);
    }
  };

  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<Post>) => (
      <MemoizedRenderItem item={item} isVisible={index === visibleIndex} />
    ),
    [visibleIndex],
  );

  const viewabilityConfig = {itemVisiblePercentThreshold: 100};

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  return (
    <View style={styles.container}>
      <Wrapper>
        <FlatList
          ref={flatlistRef}
          renderItem={renderItem}
          data={userPost}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View style={{marginVertical: RFPercentage(1)}} />
          )}
          showsVerticalScrollIndicator={false}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
        />
      </Wrapper>
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userContainer: {
    backgroundColor: 'white',
    elevation: 3,
    padding: RFPercentage(1),
  },
  profileImage: {
    height: 40,
    width: 40,
    backgroundColor: 'gray',
    borderRadius: 80,
  },
  userNameContainer: {
    marginHorizontal: RFPercentage(1),
  },
  pressebleIconConatiner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: RFPercentage(1),
    marginBottom: RFPercentage(1),
  },
  paginationDotStyle: {
    width: 9,
    height: 9,
    borderRadius: 30,
  },
  descriptionText: {
    color: colors.black,
    marginVertical: RFPercentage(0.5),
    marginTop: RFPercentage(1),
  },
  username: {
    color: '#E90019',
    fontFamily: 'ComicNeue-Regular',
    fontSize: RFValue(12),
  },
  soundBtnConatiner: {
    position: 'absolute',
    backgroundColor: colors.transAlpha1,
    padding: RFPercentage(1.3),
    borderRadius: 100,
    bottom: 10,
    right: 10,
  },
});
