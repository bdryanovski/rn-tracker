import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import CommonStyle, { Colors } from '../styles/common';

function Card({ style, children }) {
  const outsideStyles = style || {};
  return (
    <View style={{ ...styles.wrapper, ...outsideStyles }}>{children}</View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: Colors.cardColor,
    ...CommonStyle.smallRadius,
    ...CommonStyle.boxShadow,
  },
});

export default Card;
