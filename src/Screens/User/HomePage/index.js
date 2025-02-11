import React, {useState, memo, useRef, useEffect} from 'react';

import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Modal,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import theme from '../../../utility/theme';
import {useDispatch, useSelector} from 'react-redux';

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

const uniqueSkills = [
  ...new Set(skilledWorkers.map(worker => worker.skill.toLowerCase())),
]; // Extract unique skills

const plainString = uniqueSkills.join(', ');

const index = memo(props => {
  const {navigation} = props;
  let {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  useEffect(() => {
    InitRender();
  }, []);

  const InitRender = async () => {
    requestUserPermission();

    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.color.darkModeOffBGColor,
      }}>
      <StatusBarComp />

      <CustomHeader
        Hamburger={() => {
          // navigation.openDrawer();
        }}
        onPressNotificaiton={() => {
          navigation.navigate('UserNotification');
        }}
      />

      <View
        style={{
          flex: 1,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={[0, 1, 2, 3, 4]}
            showsVerticalScrollIndicator={false}
            // onScroll={Animated.event(
            //   [{nativeEvent: {contentOffset: {y: scrollY}}}],
            //   {useNativeDriver: false},
            // )}

            contentContainerStyle={{
              // paddingBottom: getResHeight(20),
              // marginTop: getResHeight(6),
              flex: 1,
              // backgroundColor: 'red',
            }}
            renderItem={({item, index}) => {
              switch (index) {
                case 0:
                  return (
                    <>
                      <View
                        style={{
                          paddingTop: getResHeight(2),
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
                case 1:
                  return (
                    <>
                      <View></View>
                      {/* <View
                        style={{
                          paddingVertical: getResHeight(6),
                        }}>
                        <MarqueeComp textRender={`${plainString}`} />
                      </View> */}
                    </>
                  );
                case 2:
                  return (
                    <>
                      <View
                        style={{
                          marginTop: getResHeight(2),
                        }}>
                        <SectionHeaderName
                          sectionName={'Kaamsathi recommends'}
                        />
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
                        <SectionHeaderName
                          sectionName={'Voices of satisfaction'}
                        />
                        <ReviewRatingCard />
                      </View>
                    </>
                  );
                // case 3:
                //   return <></>;
                // case 2:
                //   return (
                //     <>
                //       <View
                //         style={{
                //           marginBottom: getResHeight(40),
                //         }}>
                //         <Text
                //           style={{
                //             fontFamily: theme.font.semiBold,
                //             fontSize: getFontSize(2),
                //             color: theme.color.charcolBlack,
                //             paddingHorizontal: '5%',
                //           }}>
                //           Review
                //         </Text>
                //         <ReviewRatingCard />
                //       </View>
                //     </>
                //   );
              }
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
});

export default index;
