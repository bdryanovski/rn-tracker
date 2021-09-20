import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

import CommonStyle from '../styles/common';

export default function Button(props) {
  const { style, onPress, title = 'Save' } = props;
  return (
    <Pressable style={{ ...styles.button, ...(style || {}) }} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0.45,
    color: 'white',
  },
});
