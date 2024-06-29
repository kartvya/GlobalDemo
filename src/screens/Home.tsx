import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Userlist from './Tabs/Userlist';
import Feed from './Tabs/Feed';
import {NormalText} from '../components/Text';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {RouteData} from '../../types';

const renderScene = SceneMap({
  first: Feed,
  second: Userlist,
});

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    renderLabel={() => null}
    renderIcon={({route}: {route: RouteData}) => (
      <View
        style={{
          paddingHorizontal: 50,
          borderRadius: 20,
        }}>
        <NormalText
          style={{
            color: 'black',
            marginVertical: RFPercentage(1),
            fontSize: RFValue(10),
          }}
          numberOfLines={1}>
          {route.title}
        </NormalText>
      </View>
    )}
    style={{backgroundColor: 'white'}}
    labelStyle={{fontSize: 12}}
    inactiveColor="gray"
    indicatorStyle={{
      backgroundColor: 'white',
    }}
  />
);

const Home = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Posts'},
    {key: 'second', title: 'People'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
    />
  );
};

export default Home;

const styles = StyleSheet.create({});
