import {FlashList} from '@shopify/flash-list';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {createFilter} from 'react-native-search-filter';
import {useDispatch} from 'react-redux';
import CommonSearchbar from '../../components/CommonSearchbar';
import {NormalText, TitleText} from '../../components/Text';
import {AppDispatch, useAppSelector} from '../../redux/appStore';
import {Person, toggleFollow} from '../../redux/slices/userSlice';
import {colors} from '../../utility';

interface RenderItemProps {
  item: Person;
  handleToggleFollow: (id: number) => void;
}

const MemoizedRenderItem = React.memo(
  ({item, handleToggleFollow}: RenderItemProps) => (
    <View style={styles.userContainer}>
      <View style={styles.userContainer}>
        <Image source={{uri: item.profileImage}} style={styles.userImage} />
        <View style={styles.userNameContainer}>
          <TitleText>{item.name}</TitleText>
          <NormalText>{item.subname}</NormalText>
        </View>
      </View>
      <Pressable
        style={[
          styles.followBtnContainer,
          {backgroundColor: !item.followed ? colors.primeColor : colors.black},
        ]}
        onPress={() => handleToggleFollow(item.id)}>
        <TitleText style={{color: colors.white}}>
          {!item.followed ? 'Follow' : 'Unfollow'}
        </TitleText>
      </Pressable>
    </View>
  ),
);

const Userlist = () => {
  const userList = useAppSelector(state => state.home.people);
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<Person[]>(userList);

  const KEYS_TO_FILTERS = ['name', 'subname'];

  useEffect(() => {
    const filteredData = userList.filter(createFilter(value, KEYS_TO_FILTERS));
    setFilteredUsers(filteredData);
  }, [value, userList]);

  const handleToggleFollow = useCallback(
    (id: number) => {
      dispatch(toggleFollow(id));
    },
    [dispatch],
  );

  const renderItem = useCallback(
    ({item}: {item: Person}) => (
      <MemoizedRenderItem item={item} handleToggleFollow={handleToggleFollow} />
    ),
    [handleToggleFollow],
  );

  return (
    <View style={styles.container}>
      <View style={{marginVertical: RFPercentage(1)}}>
        <CommonSearchbar
          onChangeText={val => {
            setValue(val);
          }}
          searchText={value}
        />
      </View>
      {filteredUsers.length > 0 ? (
        <FlashList
          data={filteredUsers}
          renderItem={renderItem}
          estimatedItemSize={200}
          keyExtractor={(item: Person) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View style={{marginVertical: RFPercentage(1)}} />
          )}
          contentContainerStyle={{paddingBottom: RFPercentage(2)}}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noUsersContainer}>
          <TitleText style={styles.noUsersText}>No users found</TitleText>
        </View>
      )}
    </View>
  );
};

export default Userlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: RFPercentage(2),
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userImage: {
    backgroundColor: 'gray',
    height: 40,
    width: 40,
    borderRadius: 90,
  },
  userNameContainer: {
    marginHorizontal: RFPercentage(1),
  },
  followBtnContainer: {
    borderRadius: 6,
    height: RFPercentage(4),
    width: RFPercentage(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  noUsersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUsersText: {
    color: colors.textGray,
  },
});
