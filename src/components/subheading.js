import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import CommonStyle from '../styles/common';

function Headline({ style, children }) {
  const outsideStyles = style || {};
  return (
    <Text style={{ ...styles.wrapper, ...outsideStyles }} alpha={0.87}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...CommonStyle.subheading,
  },
});

export default Headline;
