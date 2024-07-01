import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Wrapper from '../../components/Wrapper';
import {useAppSelector} from '../../redux/appStore';
import {Post} from '../../redux/slices/userSlice';
import {colors} from '../../utility';
import PostListItem from '../components/PostListItem';

const Feed = () => {
  const userPost = useAppSelector(state => state.home.posts) as Post[];
  const flatlistRef = useRef<FlatList<Post>>(null);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);

  useEffect(() => {
    if (userPost.length > 0) {
      flatlistRef.current?.scrollToOffset({animated: true, offset: 0});
    }
  }, [userPost.length]);

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
      <PostListItem item={item} isVisible={index === visibleIndex} />
    ),
    [visibleIndex],
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
    fontFamily: 'ComicNeue-Regular',
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
