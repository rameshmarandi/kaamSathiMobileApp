import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../utility/theme';
import MarqueeView from 'react-native-marquee-view';
import {getFontSize, getResWidth} from '../utility/responsive';
const MarqueeComp = props => {
  const {textRender} = props;
  return (
    <View>
      <MarqueeView
        // speed={0.2}
        style={{
          backgroundColor: theme.color.whiteText,
        }}>
        <Text
          style={{
            fontSize: getFontSize(1.7),
            fontFamily: theme.font.semiBold,
            color: theme.color.charcolBlack,
            textTransform: 'capitalize',
          }}>
          {textRender}
        </Text>
      </MarqueeView>
    </View>
  );
};

export default memo(MarqueeComp);
