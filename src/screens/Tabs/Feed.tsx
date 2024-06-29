import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Feed = () => {
  return (
    <View style={styles.container}>
      <Text>Feed</Text>
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
