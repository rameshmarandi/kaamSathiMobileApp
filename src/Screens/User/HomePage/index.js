import React, {useState, memo, useRef, useCallback, useEffect} from 'react';

import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import theme from '../../../utility/theme';
import {useSelector} from 'react-redux';

import CustomHeader from '../../../Components/CustomHeader';
import {StatusBarComp} from '../../../Components/commonComp';
import MarqueeComp from '../../../Components/MarqueeComp';

import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import messaging from '@react-native-firebase/messaging';

import {requestUserPermission} from '../../../utility/PermissionContoller';
import SearchBarComp from '../../../Components/SearchBarComp';
import {skilledWorkers} from '../../../Components/StaticDataHander';
import BannerComponent from '../../../Components/BannerComponent';
import ReviewRatingCard from '../../../Components/ReviewRatingCard';
import {SectionHeaderName} from '../../../Helpers/CommonCard';
import TopSkilledProfessonals from './TopSkilledProfessonals';
import {useFocusEffect} from '@react-navigation/native';
import {store} from '../../../redux/store';
import {setCurrentActiveTab} from '../../../redux/reducer/Auth';
import {showLoginAlert} from '../../../utility/AlertService';
import {defaultIndexCount} from '../../../Navigation/TabNav';

const uniqueSkills = [
  ...new Set(skilledWorkers.map(worker => worker.skill.toLowerCase())),
]; // Extract unique skills

const plainString = uniqueSkills.join(', ');

const index = memo(props => {
  const {navigation} = props;
  let {isDarkMode, isUserLoggedIn, currentBgColor, currentTextColor} =
    useSelector(state => state.user);
  const flatListRef = useRef(null);

  // Scroll to top when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      store.dispatch(setCurrentActiveTab(defaultIndexCount.home));
      Animated.timing(headerHeight, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({animated: true, offset: 0});
      }
    }, []),
  );

  useEffect(() => {
    InitRender();
  }, []);

  const InitRender = async () => {
    // requestUserPermission();
    // await messaging().registerDeviceForRemoteMessages();
    // const token = await messaging().getToken();
  };

  // Handle Scroll Event
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const headerHeight = useRef(new Animated.Value(1)).current; // 1: Visible, 0: Hidden

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false},
  );

  // Detect Scroll Direction
  const handleMomentumScrollEnd = event => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (currentScrollY > lastScrollY.current + 10) {
      // Scrolling down → Hide Header
      Animated.timing(headerHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (currentScrollY < lastScrollY.current - 5) {
      // Slight scroll up → Show Header
      Animated.timing(headerHeight, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    lastScrollY.current = currentScrollY;
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.color.whiteBg,
      }}>
      <StatusBarComp />

      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          },
          {
            transform: [
              {
                translateY: headerHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-60, 0],
                }),
              },
            ],
          },
        ]}>
        <CustomHeader
          Hamburger={() => {
            if (isUserLoggedIn == false) {
              showLoginAlert();
            } else {
              navigation.navigate('Profile');
            }
          }}
          onPressNotificaiton={() => {
            if (isUserLoggedIn == false) {
              showLoginAlert();
            } else {
              navigation.navigate('Notification');
            }
          }}
        />
      </Animated.View>

      <Animated.FlatList
        data={[0, 2, 3, 4, 5, 6]}
        ref={flatListRef}
        keyExtractor={item => item.toString()} // Ensures unique keys
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: getResHeight(12),
          paddingBottom: getResHeight(10),
        }}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          //old UI
          switch (index) {
            case 0:
              return (
                <>
                  <View
                    style={{
                      paddingBottom: getResHeight(0.5),
                    }}>
                    <MarqueeComp textRender={`${plainString}`} />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      marginBottom: '10%',
                    }}
                    onPress={() => {
                      props.navigation.navigate('SearchOnMap');
                    }}>
                    <SearchBarComp
                      placeholder="Search skilled professionals..."
                      disabled={true}
                    />
                  </TouchableOpacity>
                </>
              );
            case 2:
              return (
                <>
                  <View
                    style={{
                      marginTop: getResHeight(2),
                    }}>
                    <SectionHeaderName sectionName={'Kaamsathi recommends'} />
                    <BannerComponent {...props} />
                  </View>
                </>
              );
            case 3:
              return (
                <>
                  <View>
                    <SectionHeaderName
                      sectionName={'Top skilled professionals near you'}
                    />
                    <TopSkilledProfessonals />
                  </View>
                </>
              );
            case 4:
              return (
                <>
                  <View>
                    <SectionHeaderName sectionName={'Voices of satisfaction'} />
                    <ReviewRatingCard />
                  </View>
                </>
              );
          }
        }}
      />
    </SafeAreaView>
  );
});

export default index;
