import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Userlist from './Tabs/Userlist';
import Feed from './Tabs/Feed';
import {NormalText, TitleText} from '../components/Text';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {RouteData} from '../../types';
import {colors} from '../utility';
import FullscreenImageModal from '../components/FullscreenImageModal';
import MyStatusBar from '../components/CustomeStatusBar';

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
            color: colors.white,
            marginVertical: RFPercentage(1),
            fontSize: RFValue(10),
          }}
          numberOfLines={1}>
          {route.title}
        </NormalText>
      </View>
    )}
    style={{backgroundColor: colors.primeColor}}
    labelStyle={{fontSize: 12}}
    inactiveColor="gray"
    indicatorStyle={{
      backgroundColor: colors.white,
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
    <>
      <MyStatusBar
        backgroundColor={colors.primeColor}
        barStyle="light-content"
        translucent={false}
      />
      <View style={{flex: 1, backgroundColor: colors.primeColor}}>
        <TitleText
          style={{
            textAlign: 'center',
            marginVertical: RFPercentage(1),
            color: colors.white,
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
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
