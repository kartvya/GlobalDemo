import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {NormalText, TitleText} from '../../components/Text';
import CommonSearchbar from '../../components/CommonSearchbar';
import {createFilter} from 'react-native-search-filter';
import {AppDispatch, useAppSelector} from '../../redux/appStore';
import {Person, toggleFollow} from '../../redux/slices/userSlice';
import {useDispatch} from 'react-redux';

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
        style={styles.followBtnContainer}
        onPress={() => handleToggleFollow(item.id)}>
        <NormalText style={{fontWeight: 'bold', color: '#fff'}}>
          {!item.followed ? 'Follow' : 'Unfollow'}
        </NormalText>
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
        <FlatList
          data={filteredUsers}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{marginVertical: 5}} />}
          contentContainerStyle={{paddingBottom: RFPercentage(2)}}
          keyExtractor={(item: Person) => item.id.toString()}
        />
      ) : (
        <View style={styles.noUsersContainer}>
          <Text style={styles.noUsersText}>No users found</Text>
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
    backgroundColor: 'gray',
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
    fontSize: RFPercentage(3),
    color: 'gray',
  },
});
