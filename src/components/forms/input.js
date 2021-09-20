import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Caption from '../caption';
import Paragraph from '../paragraph';

function Input(props) {
  const outsideStyles = props.style || {};
  return (
    <React.Fragment>
      {props.label && <Caption>{props.label}</Caption>}
      <TextInput {...props} style={{ ...styles.wrapper, ...outsideStyles }} />
      {props.helperText && <Paragraph>{props.helperText}</Paragraph>}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 40,
    marginVertical: 12,
    borderWidth: 0.8,
    borderRadius: 10,
    padding: 10,
  },
});

export default Input;
