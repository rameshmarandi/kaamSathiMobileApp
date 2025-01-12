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

import {requestUserPermission} from '../../../utility/PermissionContoller';

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.color.darkModeOffBGColor,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <StatusBarComp />
      <CustomHeader
      // Hamburger={() => {
      //   navigation.openDrawer();
      // }}
      // onPressNotificaiton={() => {
      //   navigation.navigate('UserNotification');
      // }}
      // centerLogo={true}
      />

      <Text
        style={{
          color: theme.color.charcolBlack,
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
          // backgroundColor: theme.color.primary,
        }}>
        www.kaamsathi.in
      </Text>
    </SafeAreaView>
  );
});

export default index;
