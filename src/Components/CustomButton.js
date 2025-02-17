import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import theme from '../utility/theme';

const CustomButton = ({
  title = 'Hire Now',
  onPress,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
}) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled || loading}
        style={[
          styles.hireButton,
          (disabled || loading) && styles.disabledButton,
        ]}>
        {loading ? (
          <ActivityIndicator size="small" color={theme.color.charcolBlack} />
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {leftIcon && leftIcon}
              <Text
                style={[
                  styles.hireButtonText,
                  leftIcon && {
                    marginLeft: getResWidth(1),
                  },
                ]}>
                {title}
              </Text>
              {rightIcon && rightIcon}
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: getResHeight(1.5),
    backgroundColor: theme.color.white,
  },
  hireButton: {
    width: getResWidth(90),
    alignSelf: 'center',
    backgroundColor: theme.color.secondary,
    borderRadius: getResHeight(1),
    paddingVertical: getResHeight(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  hireButtonText: {
    fontSize: getFontSize(1.8),
    fontFamily: theme.font.semiBold,
    color: theme.color.white,
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: theme.color.grey, // Adjust the disabled color as per your theme
    opacity: 0.6,
  },
});

export default CustomButton;
