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
  FlatList,
} from 'react-native';
import theme from '../../../utility/theme';
import {useSelector} from 'react-redux';
// import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Button} from 'react-native-elements';
import CustomHeader from '../../../Components/CustomHeader';
import {StatusBarComp} from '../../../Components/commonComp';
import MarqueeComp from '../../../Components/MarqueeComp';
import * as Animatable from 'react-native-animatable';
import MsgConfig from '../../../Config/MsgConfig';
import SectionHeader from '../../../Components/SectionHeader';
import {StyleSheet} from 'react-native';
import {getFontSize, getResHeight} from '../../../utility/responsive';
import messaging from '@react-native-firebase/messaging';
import QuickRouteComp from '../../../Components/QuickRouteComp';
import {ALL_LINKS} from '../../../Config/constants';
import GoogleMapComp from '../../../Components/GoogleMapComp';
import TabViewComp from '../../../Components/TabViewComp';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Platform} from 'react-native';
import {requestUserPermission} from '../../../utility/PermissionContoller';

const {width} = Dimensions.get('window');
const itemWidth = width - 40; // Adjust this according to your layout

const images = [
  'https://i.pinimg.com/originals/34/18/a4/3418a4a2c4d02d5890a8b3bde35d8e3c.jpg',
  'https://dailyverses.net/images/en/kjv/xl/matthew-1-21-2.jpg',
  'https://nenow.in/wp-content/uploads/2022/08/Independence-Day-2022.png',

  'https://im.indiatimes.in/content/2023/Aug/Independence-Day-speech4_64ca45b727e08.jpg',
];

// const SCREEN_WIDTH = Dimensions.get('window').width;
// const PADDING = 5; // Padding on the left and right
// const CARD_WIDTH = SCREEN_WIDTH - 2.3 * PADDING; // Card width minus padding on both sides
// const CARD_HEIGHT = 200; // Adjust the height as needed

// const languageArray = [
//   {key: 'hindi', tabTitle: 'Hindi', bg: 'blue'},
//   {key: 'english', tabTitle: 'English', bg: 'green'},
//   {key: 'marathi', tabTitle: 'Marathi', bg: 'red'},
// ];

const index = memo(props => {
  const {navigation} = props;
  let {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  useEffect(async () => {
    requestUserPermission();
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();

    console.log('Firebase_OTkem', token);
  }, []);
  // const [activeSlide, setActiveSlide] = useState(0);
  // _renderItem = ({item}) => {
  //   return (
  //     <View
  //       style={[
  //         styles.slide,
  //         {
  //           borderRadius: 10,
  //           overflow: 'hidden',
  //         },
  //       ]}>
  //       <Image source={{uri: item}} style={styles.image} />
  //     </View>
  //   );
  // };

  // const FirstRoute = () => <DailyVerbs />;

  // const SecondRoute = () => <DailyVerbs />;

  // const ThirdRoute = () => <DailyVerbs />;

  // const routes = [
  //   {key: 'first', title: 'Hindi'},
  //   {key: 'second', title: 'English'},
  //   {key: 'third', title: 'Marathi'},
  // ];

  // const scenes = {
  //   first: FirstRoute,
  //   second: SecondRoute,
  //   third: ThirdRoute,
  // };

  const BannerCardComp = memo(() => {
    return (
      <>
        <View
          style={
            {
              // paddingHorizontal: '7%',
              // marginTop: '5%',
            }
          }>
          <View
            style={
              {
                // marginBottom: '2%',
              }
            }>
            <SectionHeader sectionTitle={`${MsgConfig.specialDay}`} />
          </View>
          <View
          // style={styles.container}
          >
            {/* <Carousel
        ref={c => (this.carousel = c)}
        data={images}
        renderItem={this._renderItem}
        sliderWidth={width}
        itemWidth={itemWidth}
        loop={true}
        autoplay={true}
        autoplayInterval={4000} // 30 seconds
        onSnapToItem={index =>
          // this.setState({activeSlide: index})
          setActiveSlide(index)
        }
        // contentContainerCustomStyle={{
        //   style: '',
        // }}
      />
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={[
          styles.paginationDot,
          {
            backgroundColor: isDarkMode
              ? theme.color.white
              : theme.color.darkTheme,
          },
        ]}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      /> */}
          </View>
        </View>
        <View style={{}}>
          <View
            style={{
              paddingHorizontal: '7%',
              marginTop: '5%',
            }}>
            <SectionHeader sectionTitle={`${MsgConfig.firstHeaderText}`} />
          </View>
          {/* <View
            style={{
              marginTop: getResHeight(1),
              height: getResHeight(35),
              width: '100%',
            }}>
            <TabViewComp
              routes={routes}
              scenes={scenes}
              indicatorStyle={{
                backgroundColor: 'red',
              }}
              tabBarContainerStyle={{
                backgroundColor: currentBgColor,
                marginBottom: '4%',
              }}
              labelStyle={{
                color: currentTextColor,
                fontFamily: theme.font.semiBold,
              }}
              sceneContainerStyle={{}}
            />
          </View> */}
        </View>
      </>
    );
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentBgColor,
      }}>
      <StatusBarComp />

      <CustomHeader
        Hamburger={() => {
          navigation.openDrawer();
        }}
        onPressNotificaiton={() => {
          navigation.navigate('UserNotification');
        }}
        centerLogo={true}
      />
      <MarqueeComp textRender={`Welcome to Light of Life Ministries , Pune`} />

      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        contentContainerStyle={{
          paddingHorizontal: '5%',
        }}
        renderItem={({item, index}) => {
          switch (index) {
            case 0:
              <BannerCardComp />;

            case 1:
              return <></>;
          }
        }}
      />
    </SafeAreaView>
  );
});

const YoutubeComp = memo(() => {
  return (
    <>
      <YoutubePlayer
        width={'100%'}
        height={getResHeight(200)}
        videoId={
          '0vJq7cWlEOA'
          // extractVideoI(ALL_LINKS.youtubeLink)
        }
        webViewProps={{
          scrollEnabled: false,
          renderToHardwareTextureAndroid: true,
          androidLayerType:
            Platform.OS === 'android' && Platform.Version <= 22
              ? 'hardware'
              : 'none',
        }}
        webViewStyle={{
          width: '100%',
          height: '100%',
          borderRadius: 100,
          marginTop: '5%',
          opacity: 0.99,
        }}
      />
    </>
  );
});

const DailyVerbs = memo(() => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={languageArray}
        keyExtractor={item => item.key}
        horizontal
        bounce={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={{paddingHorizontal: PADDING}}
        renderItem={({item}) => (
          <Animated.View
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              marginHorizontal: PADDING / 2, // Optional: Add margin between cards
              overflow: 'hidden',
              borderRadius: 10,
              backgroundColor: 'red',
            }}>
            <View style={{}}>
              <Image
                source={theme.assets.dailyVerbsBanner}
                resizeMode="cover"
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
            </View>
          </Animated.View>
        )}
      />
    </View>
  );
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   // slide: {
//   //   width: itemWidth,
//   //   height: getResHeight(25), // Adjust this according to your layout
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   // },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   paginationContainer: {
//     paddingVertical: 10,
//   },
//   paginationDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 5,
//   },

//   //Dropdown imle
//   lableStyle: {
//     fontSize: getFontSize(12),
//     fontWeight: '600',
//     fontFamily: theme.font.HelveticaBold,
//     color: '#666666',
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: 'lightgray',
//     width: '100%',
//     height: 50,
//     backgroundColor: '#F8F8F8',
//     borderRadius: 10,
//     paddingHorizontal: '5%',
//   },
//   icon: {
//     marginRight: 5,
//   },
//   item: {
//     padding: 17,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   textItem: {
//     flex: 1,
//     fontSize: 16,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 20,
//     fontSize: 16,
//   },
// });

export default index;
