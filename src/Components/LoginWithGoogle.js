import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {getFontSize, getResWidth, getResHeight} from '../utility/responsive';
import theme from '../utility/theme';

const LoginWithGoogle = ({currentTextColor, currentBgColor, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.button,
        {
          backgroundColor: currentTextColor,
          borderColor: currentTextColor,
          borderRadius: getResWidth(10),
          marginBottom: '15%',
        },
      ]}
      onPress={onPress}>
      <Image source={theme.assets.google_img} style={styles.image} />
      <Text
        style={[
          styles.text,
          {
            color: currentBgColor,
            fontSize: getFontSize(1.8),
            marginLeft: getResWidth(2),
          },
        ]}>
        Signin with Google
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '95%',
    paddingVertical: '3%',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    height: getResHeight(3),
    width: getResHeight(3),
  },
  text: {
    fontFamily: theme.font.medium,
  },
});

export default LoginWithGoogle;
