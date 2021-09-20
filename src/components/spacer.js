import * as React from 'react';
import { StyleSheet, View } from 'react-native';

function Spacer({ size = 10, children }) {
  return (
    <View style={{ ...styles.wrapper, ...{ height: size } }}>{children}</View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
});

export default Spacer;
