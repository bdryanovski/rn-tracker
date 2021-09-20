import * as React from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  View,
  I18nManager,
} from 'react-native';

const INDETERMINATE_DURATION = 2000;
const INDETERMINATE_MAX_WIDTH = 0.6;
const { isRTL } = I18nManager;

import { Colors } from '../styles/common';

function ProgressBar({
  size,
  color,
  indeterminate,
  style,
  progress = 0,
  visible = true,
  ...rest
}) {
  const { current: timer } = React.useRef(new Animated.Value(0));
  const { current: fade } = React.useRef(new Animated.Value(0));
  const [width, setWidth] = React.useState(0);
  const [prevWidth, setPrevWidth] = React.useState(0);

  const indeterminateAnimation =
    React.useRef(Animated.CompositeAnimation) || null > null;

  const { scale } = {
    scale: 1.0,
  };

  const startAnimation = React.useCallback(() => {
    // Show progress bar
    Animated.timing(fade, {
      duration: 200 * scale,
      toValue: 1,
      useNativeDriver: true,
      isInteraction: false,
    }).start();

    // Animate progress bar
    if (indeterminate) {
      if (!indeterminateAnimation.current) {
        indeterminateAnimation.current = Animated.timing(timer, {
          duration: INDETERMINATE_DURATION,
          toValue: 1,
          // Animated.loop does not work if useNativeDriver is true on web
          useNativeDriver: Platform.OS !== 'web',
          isInteraction: false,
        });
      }

      // Reset timer to the beginning
      timer.setValue(0);

      Animated.loop(indeterminateAnimation.current).start();
    } else {
      Animated.timing(timer, {
        duration: 200 * scale,
        toValue: progress ? progress : 0,
        useNativeDriver: true,
        isInteraction: false,
      }).start();
    }
  }, [scale, timer, progress, indeterminate, fade]);

  const stopAnimation = React.useCallback(() => {
    // Stop indeterminate animation
    if (indeterminateAnimation.current) {
      indeterminateAnimation.current.stop();
    }

    Animated.timing(fade, {
      duration: 200 * scale,
      toValue: 0,
      useNativeDriver: true,
      isInteraction: false,
    }).start();
  }, [fade, scale]);

  React.useEffect(() => {
    if (visible) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [visible, startAnimation, stopAnimation]);

  React.useEffect(() => {
    // Start animation the very first time when previously the width was unclear
    if (visible && prevWidth === 0) {
      startAnimation();
    }
  }, [prevWidth, startAnimation, visible]);

  const onLayout = event => {
    setPrevWidth(width);
    setWidth(event.nativeEvent.layout.width);
  };

  const tintColor = color || Colors.progressColor;
  const trackTintColor = Colors.progressBackground;

  return (
    <View
      onLayout={onLayout}
      {...rest}
      accessible
      accessibilityRole="progressbar"
      accessibilityState={{ busy: visible }}
      accessibilityValue={
        indeterminate ? {} : { min: 0, max: 100, now: progress * 100 }
      }
    >
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: trackTintColor, opacity: fade },
          style,
          { height: size || styles.container.height },
        ]}
      >
        <Animated.View
          style={[
            styles.progressBar,
            {
              backgroundColor: tintColor,
              width,
              transform: [
                {
                  translateX: timer.interpolate(
                    indeterminate
                      ? {
                          inputRange: [0, 0.5, 1],
                          outputRange: [
                            (isRTL ? 1 : -1) * 0.5 * width,
                            (isRTL ? 1 : -1) *
                              0.5 *
                              INDETERMINATE_MAX_WIDTH *
                              width,
                            (isRTL ? -1 : 1) * 0.7 * width,
                          ],
                        }
                      : {
                          inputRange: [0, 1],
                          outputRange: [(isRTL ? 1 : -1) * 0.5 * width, 0],
                        },
                  ),
                },
                {
                  // Workaround for workaround for https://github.com/facebook/react-native/issues/6278
                  scaleX: timer.interpolate(
                    indeterminate
                      ? {
                          inputRange: [0, 0.5, 1],
                          outputRange: [
                            0.0001,
                            INDETERMINATE_MAX_WIDTH,
                            0.0001,
                          ],
                        }
                      : {
                          inputRange: [0, 1],
                          outputRange: [0.0001, 1],
                        },
                  ),
                },
              ],
            },
          ]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 4,
    overflow: 'hidden',
    borderRadius: 4,
  },

  progressBar: {
    flex: 1,
  },
});

export default ProgressBar;
