import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import Userlist from './Userlist';
import Feed from './Feed';

const renderScene = SceneMap({
  first: Userlist,
  second: Feed,
});

const Home = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'People'},
    {key: 'second', title: 'Posts'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

export default Home;

const styles = StyleSheet.create({});
