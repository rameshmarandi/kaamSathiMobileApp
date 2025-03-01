import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  Linking,
  LogBox,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LottieView from 'lottie-react-native';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootNavigation from './src/Navigation';
import {PaperProvider} from 'react-native-paper';
import {ReactionProvider} from 'react-native-reactions';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

// import AllScreens from './src/Screens/index';
import {createStackNavigator} from '@react-navigation/stack';

// import NavigationService, { setNavigator } from "./src/Services/NavigationService.js"
import {getFontSize, getResHeight} from './src/utility/responsive';
import {persistor, store} from './src/redux/store';
import theme from './src/utility/theme';
import {setNavigator} from './src/Services/NavigationService';
import {toastConfig} from './src/Components/StaticDataHander';
import messaging from '@react-native-firebase/messaging';
import {
  checkIsAdmin,
  checkIsUserLoggedIn,
  generateFCMToken,
} from './src/Helpers/CommonHelpers';
import {
  requestLocationPermission,
  requestMultiplePermissions,
  requestNotificationPermission,
} from './src/utility/PermissionContoller';
import DefaultPopup, {
  renderCustomPopup,
} from './src/Components/DefaultNotificationPopup';
import Sound from 'react-native-sound';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {handleDarkMode} from './src/Components/commonHelper';
const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs(true);

import Geocoder from 'react-native-geocoding';
import {GOOGLE_MAP_KEY} from './src/Config/constants';
import {NavigationRef} from './src/Navigation/NavigationService';

const App = () => {
  StatusBar.setBackgroundColor(theme.color.dardkModeOnBGColor); // Set your desired background color
  const popupRef = useRef();
  const rootDetRef = useRef();
  let {isDarkMode, currentBgColor, currentTextColor} = store.getState().user;
  // useSelector(
  //   state => state.user,
  // );
  const [isLoading, setIsLoading] = useState(true);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      StatusBar.setBarStyle('light-content');
    } else {
      StatusBar.setBarStyle('light-content');
    }
  }, [isDarkMode]);
  // const []
  useEffect(() => {
    if (Platform.OS === 'android') {
      Geocoder.init(GOOGLE_MAP_KEY);
      handleDarkMode();
      checkIsAuthUser();
      InitRender();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const InitRender = async () => {
    requestMultiplePermissions();

    generateFCMToken();
  };

  const checkIsAuthUser = async () => {
    const isUserLoggedIn = await checkIsUserLoggedIn();

    setIsLogedIn(isUserLoggedIn);
    checkIsAdmin().then(checkTypOfAdmin => {
      setIsAdmin(checkTypOfAdmin);
    });
  };
  // useEffect(() => {
  //   // Subscribe to foreground messages
  //   const unsubscribeForeground = messaging().onMessage(remoteMessage => {
  //     handleForegroundMessage(remoteMessage); // Handling foreground message outside useEffect
  //   });

  //   // Handle background and notification opening
  //   // handleNotificationOpen();

  //   return () => {
  //     unsubscribeForeground();
  //     Linking.removeAllListeners();
  //   };
  // }, []);

  // Function to handle foreground messages
  // const handleForegroundMessage = remoteMessage => {
  //   console.log('Message received in foreground:', remoteMessage);

  //   // Play the sound
  //   playSound();

  //   // Show popup
  //   _showPopup(remoteMessage);
  // };

  // Function to play the sound
  // const playSound = () => {
  //   const sound = new Sound('church_bell.wav', Sound.MAIN_BUNDLE, error => {
  //     if (error) {
  //       console.log('Failed to load the sound', error);
  //       return;
  //     }
  //     sound.play(success => {
  //       if (!success) {
  //         console.log('Sound playback failed');
  //       }
  //     });
  //   });
  // };

  // Function to show the popup
  // const _showPopup = remoteMessage => {
  //   try {
  //     const {data, notification} = remoteMessage;

  //     console.log('INSIDE_showPopup', remoteMessage);
  //     let img = '';

  //     if (Platform.OS === 'ios' && data.fcm_options?.image) {
  //       img = data.fcm_options.image;
  //     } else if (Platform.OS === 'android' && notification.android?.imageUrl) {
  //       img = notification.android.imageUrl;
  //     }

  //     popupRef.current.show({
  //       title: notification.title,
  //       body: notification.body,
  //       appIconSource: img ? {uri: img} : theme.assets.SplashLogo,
  //       slideOutTime: 3900,
  //       onPress: () => onPressMessage(remoteMessage),
  //     });
  //   } catch (err) {
  //     console.error('popup error', err);
  //   }
  // };

  // Function to handle notification press
  // const onPressMessage = remoteMessage => {
  //   console.log('Popup pressed, handle action', remoteMessage);
  // };

  // Function to handle background notifications and app open
  // const handleNotificationOpen = () => {
  //   const backgroundMessageHandler = messaging().setBackgroundMessageHandler(
  //     remoteMessage => {
  //       console.log('Message handled in the background!', remoteMessage);
  //     },
  //   );

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     onPressMessage(remoteMessage);
  //   });

  //   return backgroundMessageHandler;
  // };

  return (
    <>
      {isLoading ? (
        <InitialRender />
      ) : (
        <>
          <AllNavContainer isLogedIn={isLogedIn} isAdmin={true} />
          {/* <DefaultPopup
            ref={popupRef}
            renderPopupContent={renderCustomPopup}
            shouldChildHandleResponderStart={true}
            shouldChildHandleResponderMove={true}
          /> */}
        </>
      )}
    </>
  );
};
function AnimatedSlash() {
  return (
    <>
      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.color.dardkModeOnBGColor,
        }}>
        <Image
          source={theme.assets.church_logo_origianl}
          resizeMode="center"
          style={{
            height: getResHeight(10),
            width: getResHeight(10),
            position: 'absolute',
          }}
        />
        <Text
          style={{
            color: theme.color.charcolBlack,
            paddingTop: '30%',
            fontSize: getFontSize(1.5),
            fontFamily: theme.font.bold,
          }}>
          Loading..
        </Text>
      </View>
    </>
  );
}

const InitialRender = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <AnimatedSlash />
      </View>
    </>
  );
};

const AllNavContainer = props => {
  const {isLogedIn, isAdmin} = props;
  // const navigationRef = React.useRef();

  const navigationRef = React.useRef(); // Ensure useRef is imported correctly

  const onNavigationReady = () => {
    console.log('navigationRef', navigationRef);
    // setNavigator(navigationRef.current)
    // NavigationServic.setNavigator(navigationRef.current);
  };

  const theme = {
    // ...MD3LightTheme,

    // Specify a custom property
    custom: 'property',

    // Specify a custom property in nested object
    colors: {
      // ...MD3LightTheme.colors,
      brandPrimary: '#fefefe',
      brandSecondary: 'red',
    },
  };

  return (
    <>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <PersistGate persistor={persistor}>
            {/* <MenuProvider> */}
            <ReactionProvider>
              <GestureHandlerRootView style={{flex: 1}}>
                <NavigationContainer
                  onReady={onNavigationReady}
                  ref={NavigationRef}
                  onStateChange={state => {
                    const currentRoute = state;

                    console.log('Active Screen:', currentRoute);
                  }}>
                  <RootNavigation isLogedIn={isLogedIn} />
                </NavigationContainer>
              </GestureHandlerRootView>
            </ReactionProvider>
            {/* </MenuProvider> */}
          </PersistGate>
        </PaperProvider>
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
};
export default App;
