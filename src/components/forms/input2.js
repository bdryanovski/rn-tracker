import React from 'react';
import {
  Text,
  View,
  TextInput,
  Animated,
  Easing,
  Platform,
  StyleSheet,
} from 'react-native';
import { renderNode, patchWebProps } from './helpers';

// https://reactnativeelements.com/docs/input

const renderText = (content, defaultProps, style) =>
  renderNode(Text, content, {
    ...defaultProps,
    style: StyleSheet.flatten([style, defaultProps && defaultProps.style]),
  });

export class Input extends React.Component {
  input;
  shakeAnimationValue = new Animated.Value(0);

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  clear() {
    this.input.clear();
  }

  isFocused() {
    return this.input.isFocused();
  }

  setNativeProps(nativeProps) {
    this.input.setNativeProps(nativeProps);
  }

  shake = () => {
    const { shakeAnimationValue } = this;
    shakeAnimationValue.setValue(0);
    // Animation duration based on Material Design
    // https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
    Animated.timing(shakeAnimationValue, {
      duration: 375,
      toValue: 3,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {
      containerStyle,
      disabled,
      disabledInputStyle,
      inputContainerStyle,
      InputComponent = TextInput,
      inputStyle,
      errorProps,
      errorStyle,
      errorMessage,
      label,
      labelStyle,
      labelProps,
      renderErrorMessage = true,
      style,
      helperMessage,
      helperStyle,
      ...attributes
    } = this.props;

    const translateX = this.shakeAnimationValue.interpolate({
      inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
      outputRange: [0, -15, 0, 15, 0, -15, 0],
    });

    const hideErrorMessage = !renderErrorMessage && !errorMessage;
    const hideHelperMessage = errorMessage;

    return (
      <View style={StyleSheet.flatten([styles.container, containerStyle])}>
        {renderText(
          label,
          { style: labelStyle, ...labelProps },
          {
            fontSize: 16,
            color: 'black',
            ...Platform.select({
              default: {
                fontWeight: 'bold',
              },
            }),
          },
        )}

        <Animated.View
          style={StyleSheet.flatten([
            {
              flexDirection: 'row',
              borderBottomWidth: 1,
              alignItems: 'center',
              borderColor: 'black',
            },
            inputContainerStyle,
            { transform: [{ translateX }] },
          ])}
        >
          <InputComponent
            underlineColorAndroid="transparent"
            editable={!disabled}
            ref={ref => {
              this.input = ref;
            }}
            style={StyleSheet.flatten([
              {
                color: 'black',
                fontSize: 18,
                flex: 1,
                minHeight: 40,
              },
              inputStyle,
              disabled && styles.disabledInput,
              disabled && disabledInputStyle,
              style,
            ])}
            placeholderTextColor={'black'}
            {...patchWebProps(attributes)}
          />
        </Animated.View>

        <Text
          style={StyleSheet.flatten([
            {
              margin: 5,
              fontSize: 12,
            },
            helperStyle || {},
            hideHelperMessage && {
              height: 0,
              margin: 0,
              padding: 0,
            },
          ])}
        >
          {helperMessage}
        </Text>

        <Text
          {...errorProps}
          style={StyleSheet.flatten([
            {
              margin: 5,
              fontSize: 12,
              color: 'red',
            },
            errorStyle || {},
            hideErrorMessage && {
              height: 0,
              margin: 0,
              padding: 0,
            },
          ])}
        >
          {errorMessage}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  disabledInput: {
    opacity: 0.5,
  },
});

export default Input;
