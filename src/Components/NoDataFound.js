import {View, Text} from 'react-native';
import React from 'react';
import theme from '../utility/theme';
import {getResHeight, getResWidth} from '../utility/responsive';
import LottieView from 'lottie-react-native';

const NoDataFound = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.color.darkTheme,
      }}>
      <LottieView
        source={require('../assets/animationLoader/noDataLottie.json')}
        autoPlay
        loop
        style={{
          height: getResHeight(80),
          width: getResWidth(80),
        }}
      />
    </View>
  );
};

export default NoDataFound;
