import React from 'react';
import {SafeAreaView, StyleSheet, Platform, StatusBar} from 'react-native';
import {colors} from '../constants/theme';

StatusBar.setBarStyle('dark-content');

const Screen = ({children, style}) => (
  <>
    <StatusBar
      backgroundColor={colors.white}
      translucent
      barStyle="dark-content"
    />
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  </>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});
export default Screen;
