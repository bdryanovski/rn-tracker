import * as React from 'react';
import { View, StyleSheet } from 'react-native';

function ScreenWrapper({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
});

export default ScreenWrapper;
