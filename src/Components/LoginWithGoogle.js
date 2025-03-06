import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {getFontSize, getResWidth, getResHeight} from '../utility/responsive';
import theme from '../utility/theme';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// import {GoogleSignin} from '@react-native-google-signin/google-signin';

const LoginWithGoogle = ({
  currentTextColor,
  currentBgColor,
  btnTitle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.button,
        {
          backgroundColor: currentBgColor,
          borderColor: currentTextColor,
          borderRadius: getResWidth(10),
        },
      ]}
      onPress={onPress}>
      <Image source={theme.assets.google_img} style={styles.image} />
      <Text
        style={[
          styles.text,
          {
            color: currentTextColor,
            fontSize: getFontSize(1.8),
            marginLeft: getResWidth(2),
          },
        ]}>
        {btnTitle}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: '2.5%',
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
