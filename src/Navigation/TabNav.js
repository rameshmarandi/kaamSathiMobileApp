import React, {
  useState,
  useCallback,
  useMemo,
  memo,
  useRef,
  useEffect,
} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Text, Animated, TouchableOpacity} from 'react-native';
import {VectorIcon} from '../Components/VectorIcon';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import {useSelector} from 'react-redux';
import {
  AdminHomeStack,
  ApprovalStack,
  BookMarksStack,
  FamilyStack,
  HistoryStack,
  HomeStack,
  ProfileStack,
} from './StackNav';
import theme from '../utility/theme';
import {useRoute} from '@react-navigation/native';
import {store} from '../redux/store';
import {setCurrentActiveTab} from '../redux/reducer/Auth';

const Tab = createBottomTabNavigator();

const tabArrays = [
  {
    title: 'Home',
    icon: {type: 'Feather', name: 'home'},
    activeIcon: {type: 'Entypo', name: 'home'},
    routeNames: 'HomePage',
    component: HomeStack,
  },
  {
    title: 'My Bookings',
    icon: {type: 'MaterialCommunityIcons', name: 'history'},
    activeIcon: {type: 'MaterialCommunityIcons', name: 'history'},
    routeNames: 'BookedHistory',
    component: HistoryStack,
  },
  {
    title: 'Bookmarks',
    icon: {type: 'Ionicons', name: 'bookmark-outline'},
    activeIcon: {type: 'Ionicons', name: 'bookmark'},
    routeNames: 'BookMarks',
    component: BookMarksStack,
  },
  {
    title: 'Account',
    icon: {type: 'MaterialCommunityIcons', name: 'account-circle-outline'},
    activeIcon: {type: 'MaterialCommunityIcons', name: 'account-circle'},
    routeNames: 'Profile',
    component: ProfileStack,
  },
  // {
  //   title: 'Family',
  //   icon: {type: 'MaterialIcons', name: 'family-restroom'},
  //   activeIcon: {type: 'MaterialIcons', name: 'family-restroom'},
  //   routeNames: 'MyFamily',
  //   component: FamilyStack,
  // },

  // {
  //   title: 'Profile',
  //   icon: {type: 'FontAwesome', name: 'user-o'},
  //   activeIcon: {type: 'FontAwesome', name: 'user'},
  //   routeNames: 'Profile',
  //   component: ProfileStack,
  // },
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
  const {getAllPendingUser} = useSelector(state => state.profile);
  const {currentActiveTab} = useSelector(state => state.user);

  const onPress = useCallback(
    index => {
      // setSelectedTab(index);

      store.dispatch(setCurrentActiveTab(index));
      Animated.timing(animatedValue, {
        toValue: index,
        duration: 100,
        useNativeDriver: false,
      }).start();
      navigation.navigate(tabArrays[index].routeNames);
    },
    [navigation, animatedValue],
  );

  // const animatedBackgroundColor = useMemo(
  //   () =>
  //     animatedValue.interpolate({
  //       inputRange: tabArrays.map((_, i) => i),
  //       outputRange: tabArrays.map(() =>
  //         isDarkMode ? 'rgb(240,248,255)' : 'rgba(0, 0, 0, 0.4)',
  //       ),
  //     }),
  //   [animatedValue, isDarkMode],
  // );

  const animatedBackgroundColor = useMemo(() => {
    const totalTabs = tabArrays.length;

    return animatedValue.interpolate({
      inputRange: tabArrays.map((_, i) => i),
      outputRange: tabArrays.map((_, i) =>
        isDarkMode ? `rgb(240,248,255)` : `rgba(0, 0, 0)`,
      ),
      extrapolate: 'clamp', // Prevents the animation from going beyond the input range
    });
  }, [animatedValue, isDarkMode, selectedTabIndex]);

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: theme.color.secondaryRGBA,
          // isDarkMode ? currentBgColor : '#F5F5F5',
          // borderTopWidth: 0.5,
          // borderTopColor: isDarkMode ? '#F5F5F5' : currentTextColor,
        },
      ]}>
      {tabArrays.map((route, index) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          onPress={() => onPress(index)}
          style={styles.iconContainer}>
          <Animated.View
            style={[
              currentActiveTab === index && styles.selectedTab,
              {
                backgroundColor:
                  currentActiveTab === index
                    ? 'white'
                    : //  theme.color.secondary
                      'transparent',
                // zIndex: -9999999,
              },
            ]}>
            <VectorIcon
              type={
                currentActiveTab === index
                  ? route.activeIcon.type
                  : route.icon.type
              }
              name={
                currentActiveTab === index
                  ? route.activeIcon.name
                  : route.icon.name
              }
              color={
                isDarkMode && currentActiveTab === index
                  ? // ||
                    // (!isDarkMode && currentActiveTab !== index)
                    'black'
                  : theme.color.whiteText
                // theme.color.dimBlack
              }
              style={{
                zIndex: 9999999,
              }}
              size={getFontSize(currentActiveTab === index ? 2.5 : 2.3)}
            />
          </Animated.View>
          <Text
            style={[
              styles.tabText,
              {
                fontFamily:
                  currentActiveTab === index
                    ? theme.font.semiBold
                    : theme.font.regular,
                color:
                  currentActiveTab === index
                    ? '#000000'
                    : theme.color.whiteText,
                // '#d2cece',
                // isDarkMode ? theme.color.black : 'black',
              },
            ]}>
            {route.title}
          </Text>
          {/* {index == 1 && (
            <>
              <View
                style={{
                  position: 'absolute',
                  right:
                    selectedTab === index ? getResWidth(5) : getResWidth(7),
                  top: getResHeight(0.3),
                  height: getResHeight(2.4),
                  width: getResHeight(2.4),
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  borderColor: currentTextColor,
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: theme.font.semiBold,
                    fontSize: getFontSize(1.4),
                  }}>
                  {getAllPendingUser.length}
                </Text>
              </View>
            </>
          )} */}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const TabNav = memo(props => {
  const {navigation} = props;

  const {currentBgColor, currentActiveTab, currentTextColor, isDarkMode} =
    useSelector(state => state.user);

  const tabBarOptions = useMemo(
    () => ({
      initialRouteName: tabArrays[0].routeNames,
      currentBgColor,
      currentTextColor,
      selectedTabIndex: 0,
    }),
    [currentBgColor, currentTextColor],
  );

  // console.log('currentActiveTab', currentActiveTab);
  return (
    <View style={styles.navigatorContainer}>
      <Tab.Navigator
        sceneContainerStyle={styles.sceneContainer}
        screenOptions={({route}) => {
          console.log('navagtion_routes', route.name);
          // return;
          return {
            tabBarStyle: {
              display: route.name == 'HomePage' ? 'none' : 'flex',
            },
          };
        }}
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
    // backgroundColor: 'grey',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: getResHeight(2)},
    // shadowOpacity: 0.25,
    // shadowRadius: 8,
    // elevation: 5.5,
  },
  iconContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: getResHeight(1), // Dynamic padding to adjust for smaller screens
    minWidth: getResHeight(6),
    // backgroundColor: 'red',
  },
  selectedTab: {
    paddingHorizontal: getResHeight(2),
    paddingVertical: getResHeight(0.2),
    borderRadius: 20,
  },
  tabText: {
    fontFamily: theme.font.regular,
    fontSize: getFontSize(1.4),
  },
  sceneContainer: {
    // Additional styles can be added here if needed
  },
});

export default TabNav;
