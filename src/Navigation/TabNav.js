import React, {useState, useCallback, useMemo, memo, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Text, Animated, TouchableOpacity} from 'react-native';
import {VectorIcon} from '../Components/VectorIcon';
import {getFontSize, getResHeight} from '../utility/responsive';
import {useSelector} from 'react-redux';
import {AdminHomeStack, ApprovalStack, ProfileStack} from './StackNav';
import theme from '../utility/theme';

const Tab = createBottomTabNavigator();

const tabArrays = [
  {
    title: 'Home',
    icon: {type: 'Feather', name: 'home'},
    activeIcon: {type: 'Entypo', name: 'home'},
    routeNames: 'Dashboard',
    component: AdminHomeStack,
  },
  {
    title: 'Approval',
    icon: {type: 'Ionicons', name: 'checkmark-circle-outline'},
    activeIcon: {type: 'Ionicons', name: 'checkmark-circle-sharp'},
    routeNames: 'ApprovalScreen',
    component: ApprovalStack,
  },
  {
    title: 'Profile',
    icon: {type: 'FontAwesome', name: 'user-o'},
    activeIcon: {type: 'FontAwesome', name: 'user'},
    routeNames: 'Profile',
    component: ProfileStack,
  },
];

const CustomTabBar = ({
  navigation,
  selectedTabIndex,
  currentBgColor,
  currentTextColor,
  isDarkMode,
}) => {
  const [selectedTab, setSelectedTab] = useState(selectedTabIndex);
  const animatedValue = useRef(new Animated.Value(selectedTabIndex)).current;

  const onPress = useCallback(
    index => {
      setSelectedTab(index);
      Animated.timing(animatedValue, {
        toValue: index,
        duration: 100,
        useNativeDriver: false,
      }).start();
      navigation.navigate(tabArrays[index].routeNames);
    },
    [navigation, animatedValue],
  );

  const animatedBackgroundColor = useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: tabArrays.map((_, i) => i),
        outputRange: tabArrays.map(() =>
          isDarkMode ? 'rgb(240,248,255)' : 'rgba(0, 0, 0, 0.4)',
        ),
      }),
    [animatedValue, isDarkMode],
  );

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: isDarkMode ? currentBgColor : '#F5F5F5',
          borderTopWidth: 0.5,
          borderTopColor: isDarkMode ? '#F5F5F5' : currentTextColor,
        },
      ]}>
      {tabArrays.map((route, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPress(index)}
          style={styles.iconContainer}>
          <Animated.View
            style={[
              selectedTab === index && styles.selectedTab,
              {
                backgroundColor:
                  selectedTab === index
                    ? animatedBackgroundColor
                    : 'transparent',
              },
            ]}>
            <VectorIcon
              type={
                selectedTab === index ? route.activeIcon.type : route.icon.type
              }
              name={
                selectedTab === index ? route.activeIcon.name : route.icon.name
              }
              color={
                (isDarkMode && selectedTab === index) ||
                (!isDarkMode && selectedTab !== index)
                  ? 'black'
                  : 'white'
              }
              size={getFontSize(selectedTab === index ? 2.6 : 2.5)}
            />
          </Animated.View>
          <Text
            style={[
              styles.tabText,
              {
                fontFamily:
                  selectedTab === index
                    ? theme.font.semiBold
                    : theme.font.medium,
                color: isDarkMode ? 'white' : 'black',
              },
            ]}>
            {route.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const TabNav = memo(() => {
  const {currentBgColor, currentTextColor, isDarkMode} = useSelector(
    state => state.user,
  );

  const tabBarOptions = useMemo(
    () => ({
      initialRouteName: tabArrays[0].routeNames,
      currentBgColor,
      currentTextColor,
      selectedTabIndex: 0,
    }),
    [currentBgColor, currentTextColor],
  );

  return (
    <View style={styles.navigatorContainer}>
      <Tab.Navigator
        sceneContainerStyle={styles.sceneContainer}
        tabBar={navigation => (
          <CustomTabBar
            {...navigation}
            {...tabBarOptions}
            currentBgColor={currentBgColor}
            currentTextColor={currentTextColor}
            isDarkMode={isDarkMode}
          />
        )}>
        {tabArrays.map((e, i) => (
          <Tab.Screen
            key={i}
            name={e.routeNames}
            component={e.component}
            options={{headerShown: false}}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
});

const styles = StyleSheet.create({
  navigatorContainer: {
    flex: 1,
  },
  tabBar: {
    height: getResHeight(8),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'grey',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: getResHeight(2)},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5.5,
  },
  iconContainer: {
    height: getResHeight(8),
    width: getResHeight(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTab: {
    paddingHorizontal: getResHeight(2),
    paddingVertical: getResHeight(0.2),
    borderRadius: 20,
  },
  tabText: {
    fontFamily: theme.font.regular,
    fontSize: getFontSize(1.5),
  },
  sceneContainer: {
    // Additional styles can be added here if needed
  },
});

export default TabNav;
