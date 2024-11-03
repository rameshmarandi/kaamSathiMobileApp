import React, {useState, useEffect, memo} from 'react';
import {
  Text,
  View,
  Switch,
  SafeAreaView,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import MsgConfig from '../../Config/MsgConfig';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import {
  textColorHandler,
  backgroundColorHandler,
} from '../../Components/commonHelper';
import theme from '../../utility/theme';
import {Button} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {
  setAdmin,
  setBackgroundColor,
  setDarkMode,
  setTextColor,
} from '../../redux/reducer/Auth';
import {styles} from './DrawerItem.style';
import {VectorIcon} from '../../Components/VectorIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CommonButtonComp} from '../../Components/commonComp';
import CustomSwitch from '../../Components/CustomSwitch';
import asyncStorageUtil from '../../utility/asyncStorageUtil';
import StorageKeys from '../../Config/StorageKeys';
import ConfirmAlert from '../../Components/ConfirmAlert';
import {logoutAPIHander} from '../../redux/reducer/Auth/AuthAPI';
import {store} from '../../redux/store';
import {checkIsUserLoggedIn} from '../../Helpers/CommonHelpers';
import ToastAlertComp from '../../Components/ToastAlertComp';

const DrawerItems = ({navigation}) => {
  const dispatch = useDispatch();
  let {isDarkMode, currentBgColor, loginUser, isAdmin, currentTextColor} =
    useSelector(state => state.user);
  const [isCofirmAlertVisible, setIsCofirmAlertVisible] = useState(false);
  let iconFontSize = getFontSize(3);
  let navRoute = [
    {
      id: 1,
      lable: MsgConfig.home,
      route: 'HomePage',
      icon: (
        <VectorIcon
          type={'Entypo'}
          name={'home'}
          //  size ={iconFontSize}
          size={getFontSize(3)}
          color={currentTextColor}
        />
      ),
    },
    {
      id: 1,
      lable: MsgConfig.myProfile,
      route: 'SpecialMoment',
      // route: 'CProfile',
      route: '',
      icon: (
        <VectorIcon
          type={'FontAwesome'}
          name={'user'}
          //  size ={iconFontSize}
          size={getFontSize(2.9)}
          color={currentTextColor}
        />
      ),
    },

    {
      id: 2,
      lable: MsgConfig.freeResource,
      route: 'FreeResource',

      icon: (
        <VectorIcon
          type={'FontAwesome5'}
          name={'compress-arrows-alt'}
          size={iconFontSize}
          // size={getFontSize(21)}
          color={currentTextColor}
        />
      ),
    },

    {
      id: 3,
      lable: MsgConfig.prayerRequest,
      // route: 'HomePage',
      route: '',
      icon: (
        <VectorIcon
          type={'FontAwesome5'}
          name={'pray'}
          //  size ={iconFontSize}
          size={getFontSize(3.3)}
          color={currentTextColor}
        />
      ),
    },
    {
      id: 4,
      lable: MsgConfig.event,
      route: 'Events',

      icon: (
        <VectorIcon
          type={'MaterialIcons'}
          name={'event-note'}
          size={iconFontSize}
          color={currentTextColor}
        />
      ),
    },

    {
      id: 5,
      lable: MsgConfig.contactWithUs,
      route: 'ContactWithUs',

      icon: (
        <VectorIcon
          type={'MaterialIcons'}
          name={'contact-mail'}
          size={iconFontSize}
          color={currentTextColor}
        />
      ),
    },
    {
      id: 6,
      lable: MsgConfig.feedBack,
      route: 'Feedback',

      icon: (
        <VectorIcon
          type={'MaterialIcons'}
          name={'feedback'}
          size={iconFontSize}
          color={currentTextColor}
        />
      ),
    },
    {
      id: 7,
      lable: MsgConfig.setting,
      // route: 'HomePage',
      route: '',

      icon: (
        <VectorIcon
          type={'Ionicons'}
          name={'settings'}
          size={iconFontSize}
          color={currentTextColor}
        />
      ),
    },
    // {
    //   id: 8,
    //   lable: MsgConfig.darkmode,
    //   // route: 'HomePage',
    //   from: 'darkMode',
    //   route: '',

    //   icon: (
    //     <VectorIcon
    //       type={'MaterialCommunityIcons'}
    //       name={isDarkMode ? 'lightbulb-on' : 'lightbulb-on-outline'}
    //       // size={iconFontSize}
    //       size={getFontSize(3.3)}
    //       color={currentTextColor}
    //     />
    //   ),
    // },
  ];

  const handleDarkMode = async () => {
    dispatch(setDarkMode(!isDarkMode));
    console.log('isDarkMode', isDarkMode);
    if (isDarkMode) {
      dispatch(setTextColor(theme.color.primary));
      dispatch(setBackgroundColor(theme.color.white));
    } else {
      dispatch(setTextColor(theme.color.white));
      dispatch(setBackgroundColor(theme.color.darkTheme));
    }

    // navigation.closeDrawer();
  };
  const handleSetAdmin = async () => {
    dispatch(setAdmin(!isAdmin));

    navigation.closeDrawer();
  };

  const confirmBtnHandler = async () => {
    try {
      setIsCofirmAlertVisible(false);

      const res = await store.dispatch(logoutAPIHander());
      ToastAlertComp('success', `Logout successfully`);
    } catch (error) {
      console.error('Logout_api_error', error);
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <>
        <View
          style={[
            item.from == 'darkMode' && {
              flexDirection: 'row',
              alignItems: 'center',

              width: '70%',
            },
            {
              marginTop: index === 0 ? '5%' : 0,
            },
          ]}>
          <Button
            title={item.lable}
            disabled={item.from == 'darkMode'}
            onPress={() => {
              if (item.id === 8) {
                handleDarkMode(); // Functional for dark/Night mode
              } else {
                navigation.navigate(item.route);
              }

              // navigation.closeDrawer();
            }}
            icon={item.icon}
            disabledTitleStyle={[
              styles.btnTitleStyle,
              {color: currentTextColor},
            ]}
            titleStyle={[styles.btnTitleStyle, {color: currentTextColor}]}
            containerStyle={[
              styles.btnContainerStyle,
              {alignItems: 'flex-start'},
            ]}
            disabledStyle={[
              styles.buttonStyle,
              {backgroundColor: currentBgColor},
            ]}
            buttonStyle={[
              styles.buttonStyle,
              {backgroundColor: currentBgColor},
            ]}
            letfIcon
          />
          {/* {item.from == 'darkMode' && (
            <CustomSwitch value={isDarkMode} onValueChange={handleDarkMode} />
          )} */}
        </View>
      </>
    );
  };

  const isUserValid = loginUser?.user && Object.keys(loginUser.user).length > 0;

  const {fullName, avatar} = loginUser?.user || {};

  return (
    <SafeAreaView
      style={[styles.drawerContainer, {backgroundColor: currentBgColor}]}>
      <ConfirmAlert
        visible={isCofirmAlertVisible}
        alertTitle={'Are you sure you want to log out ?'}
        onCancel={() => setIsCofirmAlertVisible(false)}
        alertIcon={
          <VectorIcon
            type={'Entypo'}
            name={'log-out'}
            size={getFontSize(4)}
            color={theme.color.error}
          />
        }
        onConfirm={confirmBtnHandler}
      />
      <View
        style={[
          styles.imageContainer,
          {
            backgroundColor: currentBgColor,
            borderBottomWidth: 0.9,
            borderBottomColor: currentTextColor,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <View
          style={[
            !isUserValid && {justifyContent: 'center', alignItems: 'center'},
            {
              height: getResHeight(8),
              width: getResHeight(8),
              borderRadius: getResHeight(100),
              marginVertical: '5%',
              overflow: 'hidden',
            },
          ]}>
          <Image
            source={avatar ? {uri: avatar} : theme.assets.church_logo_origianl}
            resizeMode="cover"
            style={{height: '100%', width: '100%', borderRadius: 100}}
          />
        </View>
        {isUserValid && (
          <>
            <View
              style={{
                marginLeft: '5%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: currentTextColor,
                  fontFamily: theme.font.bold,
                  width: getResWidth(30),
                }}>
                {fullName ? fullName : ''}
              </Text>

              <View
                style={{
                  marginLeft: '5%',
                }}>
                <VectorIcon
                  type={'MaterialIcons'}
                  name={'verified'}
                  size={getFontSize(3)}
                  color={theme.color.green}
                />
              </View>
            </View>
          </>
        )}
      </View>
      <View style={{flex: 1, backgroundColor: backgroundColorHandler()}}>
        <FlatList
          data={navRoute}
          renderItem={renderItem}
          keyExtractor={item => item.id?.toString()}
        />
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          position: 'absolute',
          bottom: '2%',
        }}>
        <CommonButtonComp
          title={isUserValid ? 'Log out' : 'Are you a member?'}
          onPress={() => {
            if (isUserValid) {
              setIsCofirmAlertVisible(true);
            } else {
              navigation.navigate('LoginPage');
            }

            navigation.closeDrawer();
          }}
          iconLeft
          icon={
            <VectorIcon
              type={isUserValid ? 'Feather' : 'FontAwesome'}
              name={isUserValid ? 'log-out' : 'lock'}
              size={isUserValid ? getFontSize(3) : getFontSize(2.5)}
              color={currentBgColor}
            />
          }
        />
        <View style={{paddingHorizontal: '5%'}}>
          <Text
            style={{
              alignSelf: 'center',
              color: currentTextColor,
              marginBottom: '5%',
              fontFamily: theme.font.medium,
            }}>
            V 1.0.0
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DrawerItems;
// export default memo(DrawerItems);
