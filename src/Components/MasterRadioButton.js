import React, {useState, useCallback, memo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

// Master Radio Button Component
const MasterRadioButton = memo(
  ({
    label,
    lableColor,
    selected,
    onPress,
    selectedColor = '#007AFF',
    unselectedColor = '#C0C0C0',
    disabledColor = '#A0A0A0',
    disabled = false,
  }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{scale: scale.value}],
      };
    }, []);

    const handlePress = useCallback(() => {
      if (!disabled) {
        scale.value = withTiming(
          0.9,
          {duration: 100, easing: Easing.out(Easing.quad)},
          () => {
            scale.value = withTiming(1, {
              duration: 100,
              easing: Easing.out(Easing.quad),
            });
          },
        );
        onPress();
      }
    }, [disabled, onPress, scale]);

    return (
      <TouchableOpacity
        style={[styles.radioContainer, {opacity: disabled ? 0.6 : 1}]}
        onPress={handlePress}
        disabled={disabled}>
        <View
          style={[
            styles.radioOuterCircle,
            {
              borderColor: selected ? selectedColor : unselectedColor,
              backgroundColor: selected ? selectedColor : 'transparent',
            },
          ]}>
          <Animated.View
            style={[
              styles.radioInnerCircle,
              animatedStyle,
              {backgroundColor: selected ? selectedColor : 'transparent'},
            ]}>
            {selected && (
              <View style={[styles.radioDot, {backgroundColor: 'white'}]} />
            )}
          </Animated.View>
        </View>
        <Text
          style={[
            styles.label,
            {
              color: disabled
                ? disabledColor
                : selected
                ? selectedColor
                : lableColor || '#333',
            },
          ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  },
);

// Master Radio Button Group Component
const MasterRadioButtonGroup = memo(
  ({
    options,
    lableColor,
    onSelect,
    selectedColor = '#007AFF',
    unselectedColor = '#C0C0C0',
    disabledColor = '#A0A0A0',
    disabled = false,
  }) => {
    const [selectedValue, setSelectedValue] = useState(null);

    const handleSelect = useCallback(
      value => {
        setSelectedValue(value);
        onSelect(value);
      },
      [onSelect],
    );

    return (
      <View style={styles.groupContainer}>
        {options.map(option => (
          <MasterRadioButton
            key={option.value}
            label={option.label}
            selected={selectedValue === option.value}
            onPress={() => handleSelect(option.value)}
            selectedColor={selectedColor}
            unselectedColor={unselectedColor}
            disabledColor={disabledColor}
            disabled={disabled}
            lableColor={lableColor}
          />
        ))}
      </View>
    );
  },
);

// Styles
const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8, // Adjusted for better spacing
  },
  radioOuterCircle: {
    height: 22, // Adjusted size for iOS styling
    width: 22,
    borderRadius: 11, // Centered circle for better alignment
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12, // Increased spacing from label
  },
  radioInnerCircle: {
    height: 14, // Adjusted size for iOS styling
    width: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 16,
    lineHeight: 20, // Improved line height for readability
  },
  groupContainer: {
    paddingHorizontal: 10, // Adjusted for better layout
  },
});

export default MasterRadioButtonGroup;

/**
 * MasterRadioButton Component
 *
 * A customizable radio button component with animation support.
 *
 * Props:
 * - label (string): The text label for the radio button.
 * - selected (boolean): Indicates whether the radio button is selected.
 * - onPress (function): Callback function to handle the press event.
 * - selectedColor (string): Color for the selected state. Default is '#007AFF'.
 * - unselectedColor (string): Color for the unselected state. Default is '#C0C0C0'.
 * - disabledColor (string): Color for the disabled state. Default is '#A0A0A0'.
 * - disabled (boolean): Indicates whether the radio button is disabled. Default is false.
 *
 * MasterRadioButtonGroup Component
 *
 * A group of radio buttons where only one button can be selected at a time.
 *
 * Props:
 * - options (array): Array of option objects with label and value properties.
 * - onSelect (function): Callback function to handle the selection of an option.
 * - selectedColor (string): Color for the selected state. Default is '#007AFF'.
 * - unselectedColor (string): Color for the unselected state. Default is '#C0C0C0'.
 * - disabledColor (string): Color for the disabled state. Default is '#A0A0A0'.
 * - disabled (boolean): Indicates whether the radio buttons are disabled. Default is false.
 *
 * Example usage:
 *
 * <MasterRadioButtonGroup
 *   options={[
 *     { label: 'Male', value: 'male' },
 *     { label: 'Female', value: 'female' },
 *   ]}
 *   onSelect={(value) => console.log('Selected:', value)}
 * />
 */
