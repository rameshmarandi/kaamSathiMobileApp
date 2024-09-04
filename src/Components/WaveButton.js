import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {getFontSize, getResHeight} from '../utility/responsive';

const WaveButton = React.memo(props => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const {circleContainer, circleStyle} = props;
  React.useEffect(() => {
    // Scale animation for expanding wave effect
    scale.value = withRepeat(
      withTiming(2, {
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      false,
    );

    // Opacity animation for fading effect
    opacity.value = withRepeat(
      withTiming(0, {
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={
          circleContainer
            ? [
                circleContainer,
                animatedStyle,
                {
                  position: 'absolute',
                },
              ]
            : [
                styles.circle,
                animatedStyle,
                {
                  position: 'absolute',
                },
              ]
        }
      />
      <TouchableOpacity
        style={circleStyle ? circleStyle : [styles.button]}
        // disabled={ci}
        onPress={props.onPress}>
        {circleStyle ? null : (
          <Icon name="plus" size={getFontSize(2.5)} color="#FFF" />
        )}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // flex: 1,
  },
  circle: {
    position: 'absolute',
    width: getResHeight(6), // Adjust size to fit your design
    height: getResHeight(6),
    borderRadius: getResHeight(6) / 2, // Ensure correct border radius for circle
    backgroundColor: 'rgba(0, 150, 255, 0.5)', // Red color with transparency
  },
  button: {
    width: getResHeight(6),
    height: getResHeight(6),
    borderRadius: getResHeight(6) / 2, // Ensure correct border radius for button
    backgroundColor: '#0096FF', // Red color
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WaveButton;
