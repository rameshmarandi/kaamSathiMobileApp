import React, {useState, memo, useRef} from 'react';
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

const TabViewComp = memo(props => {
  const {
    routes,
    scenes,
    indicatorStyle,
    sceneContainerStyle,
    tabBarContainerStyle,
    labelStyle,
    onIndexChange,
  } = props;

  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null); // Reference for FlatList

  const renderScene = SceneMap(scenes);

  // Custom TabBar with scroll-to-active functionality
  const renderTabBar = () => (
    <View style={[styles.tabBarContainer, tabBarContainerStyle]}>
      <FlatList
        ref={flatListRef}
        data={routes}
        horizontal
        keyExtractor={(item, idx) => idx.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index: tabIndex}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.tabItem,
              index === tabIndex && styles.activeTab,

              {
                paddingHorizontal:
                  routes.length == 2
                    ? getResWidth(11)
                    : routes.length == 3
                    ? getResWidth(10)
                    : getResWidth(8),
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

  const handleIndexChange = newIndex => {
    setIndex(newIndex);

    flatListRef.current?.scrollToIndex({
      index: newIndex,
      animated: true,
      viewPosition: 0.5, // Center the active tab in the viewport
    });

    if (onIndexChange) {
      onIndexChange(newIndex);
    }
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      animationEnabled
      onIndexChange={handleIndexChange}
      sceneContainerStyle={[sceneContainerStyle]}
      initialLayout={initialLayout}
    />
  );
});

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: getResHeight(6),
    backgroundColor: 'transparent', // Default background
  },
  tabItem: {
    paddingVertical: getResHeight(1), // Same padding for all tabs
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'white', // Default active underline color
  },
  tabLabel: {
    fontSize: getFontSize(1.8),
    fontFamily: theme.font.regular,
    // color:
    textTransform: 'capitalize',
  },
  activeLabel: {
    color: 'white', // Default active label color
    fontSize: getFontSize(1.8),
    fontFamily: theme.font.bold,
  },
});

export default TabViewComp;
