import React, {useState, useCallback, memo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure this package is installed

/**
 * MasterCheckBox Component
 *
 * A customizable checkbox component with animation support.
 *
 * Props:
 * - label (string): The text label for the checkbox.
 * - checked (boolean): Indicates whether the checkbox is checked.
 * - onPress (function): Callback function to handle the press event.
 * - selectedColor (string): Color for the selected state. Default is '#007AFF'.
 * - unselectedColor (string): Color for the unselected state. Default is '#C0C0C0'.
 * - disabledColor (string): Color for the disabled state. Default is '#D3D3D3'.
 * - disabled (boolean): If true, the checkbox is disabled.
 *
 * Example usage:
 *
 * <MasterCheckBox
 *   label="Option 1"
 *   checked={true}
 *   onPress={() => console.log('Checkbox Pressed')}
 * />
 */
const MasterCheckBox = ({
  label,
  checked,
  onPress,
  selectedColor = '#007AFF',
  unselectedColor = '#C0C0C0',
  disabledColor = '#D3D3D3',
  disabled = false,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const handlePress = () => {
    if (!disabled) {
      scale.value = withTiming(
        0.8,
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
  };

  // Determine colors based on states
  const borderColor = disabled
    ? disabledColor
    : checked
    ? selectedColor
    : unselectedColor;

  const backgroundColor = disabled
    ? disabledColor
    : checked
    ? selectedColor
    : 'transparent';

  const labelColor = disabled
    ? disabledColor
    : checked
    ? selectedColor
    : unselectedColor;

  return (
    <TouchableOpacity
      style={[styles.container, {opacity: disabled ? 0.5 : 1}]}
      onPress={handlePress}
      disabled={disabled}>
      <View
        style={[
          styles.checkBoxContainer,
          {
            borderColor,
            backgroundColor,
          },
        ]}>
        <Animated.View
          style={[styles.checkBox, animatedStyle, {backgroundColor}]}>
          {checked && (
            <Ionicons
              name="checkmark"
              size={16}
              color="white"
              style={styles.checkMarkIcon}
            />
          )}
        </Animated.View>
      </View>
      <Text style={[styles.label, {color: labelColor}]}>{label}</Text>
    </TouchableOpacity>
  );
};

/**
 * MasterCheckBoxGroup Component
 *
 * A group of checkboxes where multiple checkboxes can be selected at a time.
 *
 * Props:
 * - options (array): Array of option objects with label and value properties.
 * - onSelect (function): Callback function to handle the selection of multiple options.
 * - selectedColor (string): Color for the selected state. Default is '#007AFF'.
 * - unselectedColor (string): Color for the unselected state. Default is '#C0C0C0'.
 * - disabledColor (string): Color for the disabled state. Default is '#D3D3D3'.
 *
 * Example usage:
 *
 * <MasterCheckBoxGroup
 *   options={[
 *     { label: 'Male', value: 'male' },
 *     { label: 'Female', value: 'female' },
 *   ]}
 *   onSelect={(selectedValues) => console.log('Selected:', selectedValues)}
 * />
 */
const MasterCheckBoxGroup = memo(
  ({
    options,
    onSelect,
    selectedColor = '#007AFF',
    unselectedColor = '#C0C0C0',
    disabledColor = '#D3D3D3',
  }) => {
    const [selectedValues, setSelectedValues] = useState([]);

    const handleSelect = useCallback(
      value => {
        setSelectedValues(prevSelectedValues => {
          const newSelectedValues = prevSelectedValues.includes(value)
            ? prevSelectedValues.filter(item => item !== value)
            : [...prevSelectedValues, value];

          onSelect(newSelectedValues);
          return newSelectedValues;
        });
      },
      [onSelect],
    );

    return (
      <View style={styles.groupContainer}>
        {options.map(option => (
          <MasterCheckBox
            key={option.value}
            label={option.label}
            checked={selectedValues.includes(option.value)}
            onPress={() => handleSelect(option.value)}
            selectedColor={selectedColor}
            unselectedColor={unselectedColor}
            disabledColor={disabledColor}
          />
        ))}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkBoxContainer: {
    height: 22,
    width: 22,
    borderRadius: 5, // Rounded corners to match iOS style
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkBox: {
    height: 22,
    width: 22,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMarkIcon: {
    marginLeft: 2, // Adjust this to position the icon properly
  },
  label: {
    fontSize: 16,
  },
  groupContainer: {
    paddingHorizontal: 10,
  },
});

export {MasterCheckBox, MasterCheckBoxGroup};
