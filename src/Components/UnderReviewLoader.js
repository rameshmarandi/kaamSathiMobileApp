import {View, Text} from 'react-native';
import React from 'react';
import theme from '../utility/theme';
import {getResHeight, getResWidth} from '../utility/responsive';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';

const UnderReviewLoader = () => {
  const {isDarkMode, currentBgColor, isAdmin, currentTextColor} = useSelector(
    state => state.user,
  );

  return (
    <View
      style={{
        // flex: 1,

        backgroundColor: 'transparent',
      }}>
      <LottieView
        source={require('../assets/animationLoader/UnderReview.json')}
        autoPlay
        loop
        style={{
          height: getResHeight(25),
          width: getResWidth(55),
        }}
      />
    </View>
  );
};

export default UnderReviewLoader;
