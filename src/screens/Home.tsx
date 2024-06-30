import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {RouteData} from '../../types';
import FullscreenImageModal from '../components/FullscreenImageModal';
import {NormalText, TitleText} from '../components/Text';
import {colors} from '../utility';
import Feed from './Tabs/Feed';
import Userlist from './Tabs/Userlist';

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
          borderRadius: 20,
        }}>
        <NormalText
          style={{
            color: colors.black,
            marginVertical: RFPercentage(1),
            fontSize: RFValue(10),
          }}
          numberOfLines={1}>
          {route.title}
        </NormalText>
      </View>
    )}
    style={{backgroundColor: colors.white}}
    labelStyle={{fontSize: 12}}
    inactiveColor="gray"
    indicatorStyle={{
      backgroundColor: colors.primeColor,
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
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <TitleText
        style={{
          textAlign: 'center',
          marginVertical: RFPercentage(1),
          color: colors.black,
        }}>
        Demo Project
      </TitleText>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
      <FullscreenImageModal />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
