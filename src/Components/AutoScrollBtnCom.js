import React, {useRef, useState, useEffect, useCallback, memo} from 'react';
import {FlatList, View, TouchableOpacity, Text} from 'react-native';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import theme from '../utility/theme';
import {useSelector} from 'react-redux';
import {generateMeaningfulAbbreviation} from './commonHelper';

// Main component wrapped in memo for performance optimization
export const AutoScrollBtnCom = memo(props => {
  const {data, selectedTab, onPress, navigation} = props;

  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scroll the FlatList to the selected index when currentIndex or selectedTab changes
  useEffect(() => {
    if (flatListRef.current && data?.length > 0) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
        viewOffset: currentIndex,
        viewPosition: 0.5, // Adjust view position to center item
      });
    }
  }, [currentIndex, selectedTab, data]);

  // Handle button press and scroll to next item
  const handlePress = useCallback(
    (item, index) => {
      if (index === data.length - 1) {
        onPress(item, index);
      } else {
        setCurrentIndex(index + 1);
        onPress(item, index);
      }
    },
    [data.length, onPress],
  );

  // Memoized renderItem function for FlatList
  const renderItem = useCallback(
    ({item, index}) => {
      // const {coverurl, name} = item;
      const isSelected = index == selectedTab;

      return (
        <View
          style={{
            marginTop: '5%',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => handlePress(item, index)}
              style={[
                styles.touchable,

                {
                  margin: 10,
                  backgroundColor: currentBgColor,
                  borderWidth: 1,
                  borderColor: isSelected
                    ? currentTextColor
                    : theme.color.outlineColor,
                },
              ]}>
              <Text
                numberOfLines={3}
                style={{
                  fontSize: getFontSize(2),
                  fontFamily: isSelected ? theme.font.bold : theme.font.medium,
                  color: isSelected ? currentTextColor : theme.color.dimWhite,
                }}>
                {generateMeaningfulAbbreviation(
                  item?.churchDetails['Branch name'],
                )}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: getFontSize(1.6),
                marginTop: '2%',
                textAlign: 'center',
                fontFamily: isSelected ? theme.font.bold : theme.font.medium,
                color: isSelected ? currentTextColor : theme.color.dimWhite,
              }}>
              {item.churchDetails['Branch name']}
            </Text>
          </View>
        </View>
      );
    },
    [handlePress, selectedTab], // Dependencies for memoization
  );

  // Extract a unique key for each item in the FlatList
  const keyExtractor = useCallback(
    (item, index) => `${index}-${item.title}`,
    [],
  );

  // Pre-calculate item height/width for FlatList optimization
  const getItemLayout = useCallback(
    (data, index) => ({
      length: getResWidth(100) / 5,
      offset: (getResWidth(100) / 5) * index,
      index,
    }),
    [],
  );

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      horizontal
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.containerStyle}
      initialScrollIndex={currentIndex}
      initialNumToRender={5} // Render 5 items initially for better performance
      getItemLayout={getItemLayout} // Optimized layout rendering
    />
  );
});

// Styles for the component
const styles = {
  containerStyle: {
    marginHorizontal: '4%',
  },
  touchable: {
    height: getResWidth(20),
    width: getResWidth(20),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: getResHeight(100),
  },

  title: {
    ...theme.styles.homeTitle,
  },
};
