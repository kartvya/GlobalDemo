import React from 'react';
import {
  View,
  StatusBar,
  StatusBarProps,
  ViewStyle,
  SafeAreaView,
} from 'react-native';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

interface MyStatusBarProps extends StatusBarProps {
  backgroundColor: string;
}

interface Styles {
  statusBar: ViewStyle;
}

const styles: Styles = {
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
};

const MyStatusBar: React.FC<MyStatusBarProps> = ({
  backgroundColor,
  ...props
}) => (
  <SafeAreaView>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </SafeAreaView>
);

export default MyStatusBar;
