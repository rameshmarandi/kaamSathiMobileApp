import React, {useState, memo} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

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

  const renderScene = SceneMap(scenes);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={indicatorStyle}
      style={tabBarContainerStyle}
      labelStyle={[labelStyle, {textTransform: 'capitalize'}]}
    />
  );
  const handleIndexChange = newIndex => {
    setIndex(newIndex);
    // Call the parent callback function to notify of index change
    if (onIndexChange) {
      onIndexChange(newIndex);
    }
  };
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
      // onIndexChange={setIndex}
      sceneContainerStyle={sceneContainerStyle}
      initialLayout={initialLayout}
    />
  );
});

export default TabViewComp;
