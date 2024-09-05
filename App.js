import {View, Text, Image, SafeAreaView, StatusBar, LogBox} from 'react-native';
import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootNavigation from './src/Navigation';
import {PaperProvider} from 'react-native-paper';

import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

// import AllScreens from './src/Screens/index';
import {createStackNavigator} from '@react-navigation/stack';

// import NavigationService, { setNavigator } from "./src/Services/NavigationService.js"
import {getFontSize, getResHeight} from './src/utility/responsive';
import {persistor, store} from './src/utility/store';
import theme from './src/utility/theme';
import {setNavigator} from './src/Services/NavigationService';
import {toastConfig} from './src/Components/StaticDataHander';

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs(true);

const App = () => {
  StatusBar.setBarStyle('light-content');
  StatusBar.setBackgroundColor(theme.color.darkTheme); // Set your desired background color

  const [isLoading, setIsLoading] = useState(true);
  const [isLogedIn, setIsLogedIn] = useState(true);
  // const []
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <InitialRender />
      ) : (
        <AllNavContainer isLogedIn={isLogedIn} />
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
  const {isLogedIn} = props;
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
            <NavigationContainer onReady={onNavigationReady}>
              <RootNavigation
                isLogedIn={isLogedIn}
                //  isAdmin = {isAdmin}
              />
            </NavigationContainer>
            {/* </MenuProvider> */}
          </PersistGate>
        </PaperProvider>
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
};
export default App;
