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
import DailyVersesComp from '../../ScreenComp/DailyVersesComp';
import {fetch} from 'react-native-ssl-pinning';
// import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import BannerComponent from '../../../Components/BannerComponent';
const {width} = Dimensions.get('window');
const itemWidth = width - 40; // Adjust this according to your layout

const images = [
  'https://i.pinimg.com/originals/34/18/a4/3418a4a2c4d02d5890a8b3bde35d8e3c.jpg',
  'https://dailyverses.net/images/en/kjv/xl/matthew-1-21-2.jpg',
  'https://nenow.in/wp-content/uploads/2022/08/Independence-Day-2022.png',

  'https://im.indiatimes.in/content/2023/Aug/Independence-Day-speech4_64ca45b727e08.jpg',
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const PADDING = 5; // Padding on the left and right
const CARD_WIDTH = SCREEN_WIDTH - 2.3 * PADDING; // Card width minus padding on both sides
const CARD_HEIGHT = 200; // Adjust the height as needed

const languageArray = [
  {key: 'hindi', tabTitle: 'Hindi', bg: 'blue'},
  {key: 'english', tabTitle: 'English', bg: 'green'},
  {key: 'marathi', tabTitle: 'Marathi', bg: 'red'},
];

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

    console.log('Firebase_OTkem', token);
  };

  _renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.slide,
          {
            borderRadius: 10,
            overflow: 'hidden',
          },
        ]}>
        <Image source={{uri: item}} style={styles.image} />
      </View>
    );
  };

  const FirstRoute = () => <DailyVerbs />;

  const SecondRoute = () => <DailyVerbs />;

  const ThirdRoute = () => <DailyVerbs />;

  const routes = [
    {key: 'first', title: 'Hindi'},
    {key: 'second', title: 'English'},
    {key: 'third', title: 'Marathi'},
  ];

  const scenes = {
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  };

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
            style={{
              marginBottom: '2%',
            }}>
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
      </>
    );
  });
  const data = [
    {
      title: 'Beautiful Mountain',
      image:
        'https://i.ytimg.com/vi/CnefZWMWhiI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCW0MXmRO8rKbU427-zJeOJuBpWjg',
    },
    {
      title: 'Sunny Beach',
      image:
        'https://madhuedits.com/wp-content/uploads/2024/03/Birthday-Flex-Design-1024x683.jpg',
    },
    {
      title: 'Lush Forest',
      image:
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/anniversary-wishes-design-template-77af685489e36388b7fbb71150a950a1_screen.jpg?ts=1691182808',
    },
    {
      title: 'Lush Forest',
      image:
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/happy-anniversary-greeting-card-template-design-c6a8f53d14bd693cbb85c241972e425d_screen.jpg?ts=1637015305',
    },
    {
      title: 'Lush Forest',
      image:
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wedding-anniversary-design-template-581d885ccff3403b6006f1c97f7783c8_screen.jpg?ts=1706256093',
    },
    // {
    //   title: 'Lush Forest',
    //   image:""
    //        },
    // {
    //   title: 'Lush Forest',
    //   image:""
    //        },
    // {
    //   title: 'Lush Forest',
    //   image:""
    //        },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentBgColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <StatusBarComp />
      <CustomHeader
        Hamburger={() => {
          navigation.openDrawer();
        }}
        onPressNotificaiton={() => {
          navigation.navigate('UserNotification');
        }}
        centerLogo={true}
      /> */}

      <Text
        style={{
          color: 'white',
          fontSize: 20,
          fontFamily: theme.font.extraBold,
          textAlign: 'center',
        }}>
        Welcome to KaamSathi{'\n'}
      </Text>
      <Text
        style={{
          color: 'red',
          fontSize: 13,
          fontFamily: theme.font.regular,
          textAlign: 'center',
          textDecorationLine: 'underline',
        }}>
        www.kaamsathi.in
      </Text>
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
