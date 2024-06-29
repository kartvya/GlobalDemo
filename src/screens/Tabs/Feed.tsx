import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch, RootState, useAppSelector} from '../../redux/appStore';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Wrapper from '../../components/Wrapper';
import {NormalText, TitleText} from '../../components/Text';
import Carousel from 'react-native-reanimated-carousel';
import {MXicon} from '../../components/Icons';
import {colors} from '../../utility';
import {Post, toggleLike} from '../../redux/slices/userSlice';
import DoubleTouchableOpacity from '../../components/DoubleTouchableOpacity';
import Pagination from '../../components/pagination/Pagination';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const width = Dimensions.get('window').width;

interface RenderItemProps {
  item: Post;
}

const MemoizedRenderItem: React.FC<RenderItemProps> = React.memo(({item}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeIndex, setActiveIndex] = useState(0);
  // const AnimatedImage = Animated.createAnimatedComponent(Image);
  // const scale = useSharedValue(0);
  // const rStyle = useAnimatedStyle(() => ({
  //   transform: [{scale: Math.max(scale.value, 0)}],
  // }));

  // const onDoubleTap = useCallback(() => {
  //   scale.value = withSpring(1, undefined, isFinished => {
  //     if (isFinished) {
  //       scale.value = withDelay(500, withSpring(0));
  //       runOnJS(handleLikeToggle)(item.id);
  //     }
  //   });
  // }, []);

  // const handleLikeToggle = (itemId: number) => {
  //   dispatch(toggleLike(itemId));
  // };
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
      {/* <DoubleTouchableOpacity
        onPress={() => {}}
        onDoublePress={() => onDoubleTap()}
        doublePressDelay={250}> */}
      <View style={{flex: 1, alignSelf: 'center'}}>
        <Carousel
          width={width}
          height={RFPercentage(30)}
          autoPlay={false}
          data={item.uploadedImages}
          scrollAnimationDuration={1000}
          style={{
            marginTop: RFPercentage(1.5),
          }}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 0],
          }}
          onSnapToItem={carouselIndex => setActiveIndex(carouselIndex)}
          renderItem={({index, item: imageUrl}) => (
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
          )}
        />
      </View>
      {/* </DoubleTouchableOpacity> */}
      {item.uploadedImages.length > 1 && (
        <View style={{marginVertical: RFPercentage(2)}}>
          <Pagination
            dotsLength={item.uploadedImages.length}
            activeDotIndex={activeIndex}
            dotColor={colors.black}
            dotStyle={styles.paginationDotStyle}
            inactiveDotColor={colors.textGray}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            color={colors.white}
          />
        </View>
      )}
      {/* <View
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
      </View> */}
      <View style={styles.likeConatiner}>
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
            {item.likeCount}
          </NormalText>
        </Pressable>
        <View
          style={{
            height: RFPercentage(3),
            width: 1,
            backgroundColor: colors.black,
          }}
        />
        <Pressable style={styles.pressebleIconConatiner}>
          <MXicon
            type="FontAwesome"
            name="comment-o"
            size={RFPercentage(2.5)}
            color={colors.black}
          />
        </Pressable>
      </View>
    </View>
  );
});

const Feed: React.FC = () => {
  const userPost = useAppSelector(state => state.home.posts) as Post[];
  const dispatch = useDispatch<AppDispatch>();
  const flatlistRef = useRef<FlatList<Post>>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<{index: number | null}>;
  }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0]?.index ?? null;
      setActiveIndex(index);
    }
  };

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<Post>) => <MemoizedRenderItem item={item} />,
    [],
  );

  const viewabilityConfig = {itemVisiblePercentThreshold: 30};

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
  likeConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pressebleIconConatiner: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDotStyle: {
    width: 9,
    height: 9,
    borderRadius: 30,
  },
});
