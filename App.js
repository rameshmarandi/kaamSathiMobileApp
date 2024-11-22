import {View, Text, Image, SafeAreaView, StatusBar, LogBox} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {checkIsAdmin, checkIsUserLoggedIn} from './src/Helpers/CommonHelpers';
import {requestNotificationPermission} from './src/utility/PermissionContoller';

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs(true);

const App = () => {
  StatusBar.setBarStyle('light-content');
  StatusBar.setBackgroundColor(theme.color.darkTheme); // Set your desired background color

  const [isLoading, setIsLoading] = useState(true);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // const []
  useEffect(() => {
    checkIsAuthUser();
    InitRender();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const InitRender = async () => {
    requestNotificationPermission();
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();

    console.log('Firebase_OTkem : ', token);
  };

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * This function checks if a user is logged in and if the user is an admin.
   * If the user is logged in, it sets the isLogedIn state to true.
   * If the user is an admin, it sets the isAdmin state to true.
/******  556be213-7252-441e-a922-7412f7229fd0  *******/ const checkIsAuthUser =
    async () => {
      const isUserLoggedIn = await checkIsUserLoggedIn();

      setIsLogedIn(isUserLoggedIn);
      checkIsAdmin().then(checkTypOfAdmin => {
        setIsAdmin(checkTypOfAdmin);
      });
    };
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {isLoading ? (
        <InitialRender />
      ) : (
        <AllNavContainer isLogedIn={isLogedIn} isAdmin={isAdmin} />
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
          backgroundColor: theme.color.darkTheme,
        }}>
        <LottieView
          source={require('./src/assets/animationLoader/wave-animation.json')}
          autoPlay
          loop
          style={{
            height: '100%',
            width: '100%',
          }}
        />

        <Image
          source={theme.assets.church_logo_origianl}
          resizeMode="center"
          style={{
            height: getResHeight(10),
            width: getResHeight(10),
            position: 'absolute',
          }}
        />
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
        <Text
          style={{
            width: '100%',
            alignSelf: 'center',
            fontSize: getFontSize(1.5),
            fontFamily: theme.font.semiBold,
            color: 'white',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'absolute',
            bottom: '5%',
            zIndex: 9999,
          }}>
          Light Of Life Ministries
        </Text>
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
  return (
    <>
      <Provider store={store}>
        <PaperProvider>
          <PersistGate persistor={persistor}>
            {/* <MenuProvider> */}
            <ReactionProvider>
              <NavigationContainer onReady={onNavigationReady}>
                <RootNavigation isLogedIn={isLogedIn} />
              </NavigationContainer>
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
