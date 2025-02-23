// CustomSwitch.js
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import theme from '../utility/theme';

const CustomSwitch = ({value, onValueChange}) => {
  const [switchAnim] = useState(new Animated.Value(value ? 1 : 0));

  useEffect(() => {
    Animated.timing(switchAnim, {
      toValue: value ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [value, switchAnim]);

  const translateX = switchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 24], // Adjust based on your switch size
  });

  const backgroundColor = switchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ccc', '#4cd964'],
  });

  const handleToggle = () => {
    onValueChange(!value);
  };

  return (
    <TouchableWithoutFeedback onPress={handleToggle}>
      <Animated.View style={[styles.switchContainer, {backgroundColor}]}>
        <Animated.View
          style={[
            styles.switchCircle,
            {transform: [{translateX}]},
            value && {
              borderWidth: 1.3,
              borderColor: '#27ae60',
            },
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 50,
    height: 28,
    borderRadius: 15,
    padding: 2,
    justifyContent: 'center',
  },
  switchCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
  },
});

export default CustomSwitch;
