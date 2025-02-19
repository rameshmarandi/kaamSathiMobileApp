import React, {useState, memo, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import theme from '../utility/theme';

const initialLayout = {width: Dimensions.get('window').width};

const TabViewComp = memo(
  ({
    routes,
    scenes,
    indicatorStyle,
    sceneContainerStyle,
    tabBarContainerStyle,
    labelStyle,
    onIndexChange,
  }) => {
    const [index, setIndex] = useState(0);
    const flatListRef = useRef(null);

    const renderScene = SceneMap(scenes);

    const handleIndexChange = useCallback(
      newIndex => {
        setIndex(newIndex);
        flatListRef.current?.scrollToIndex({
          index: newIndex,
          animated: true,
          viewPosition: 0.5,
        });
        if (onIndexChange) onIndexChange(newIndex);
      },
      [onIndexChange],
    );

    const renderTabBar = () => (
      <View style={[styles.tabBarContainer, tabBarContainerStyle]}>
        <FlatList
          ref={flatListRef}
          data={routes}
          horizontal
          keyExtractor={(item, idx) => idx.toString()}
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: getResWidth(50),
            offset: getResWidth(50) * index,
            index,
          })}
          renderItem={({item, index: tabIndex}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.tabItem,
                index === tabIndex && styles.activeTab,
                index !== tabIndex && {
                  borderBottomColor: theme.color.dimGrey,
                  borderBottomWidth: 2,
                  // marginRight:
                  // tabIndex === routes.length - 1 ? 0 : getResWidth(2),
                },
              ]}
              onPress={() => handleIndexChange(tabIndex)}>
              <Text
                style={[
                  styles.tabLabel,
                  labelStyle,
                  index === tabIndex && styles.activeLabel,
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );

    return (
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        animationEnabled
        onIndexChange={handleIndexChange}
        sceneContainerStyle={sceneContainerStyle}
        initialLayout={initialLayout}
      />
    );
  },
);

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: getResHeight(8),
    backgroundColor: 'transparent',
  },
  tabItem: {
    paddingVertical: getResHeight(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    width: getResWidth(50),
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.color.secondary,
  },
  tabLabel: {
    fontSize: getFontSize(1.5),
    fontFamily: theme.font.medium,
    textTransform: 'capitalize',
    color: theme.color.grey,
  },
  activeLabel: {
    color: theme.color.charcolBlack,
    fontSize: getFontSize(1.5),
    fontFamily: theme.font.semiBold,
  },
});

export default TabViewComp;
