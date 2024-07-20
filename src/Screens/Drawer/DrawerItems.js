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
  setAsyncValue,
  getAsyncValue,
} from '../../Components/commonHelper';
import theme from '../../utility/theme';
import {Button} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {
  setAdmin,
  setBackgroundColor,
  setDarkMode,
  setTextColor,
} from '../../reducer/Auth';
import {styles} from './DrawerItem.style';
import {VectorIcon} from '../../Components/VectorIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CommonButtonComp} from '../../Components/commonComp';

const DrawerItems = ({navigation}) => {
  const dispatch = useDispatch();
  let {isDarkMode, currentBgColor, isAdmin, currentTextColor} = useSelector(
    state => state.user,
  );

  // useEffect(() => {
  //   // const fetchDarkMode = async () => {
  //   //   const res = await getAsyncValue('darkMode');
  //   //   setDarkMode(res === 'true');
  //   // };
  //   // fetchDarkMode();
  // }, []);

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
          // size={getFontSize(25)}
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
          // size={getFontSize(25)}
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
          // size={getFontSize(25)}
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
          // size={getFontSize(25)}
          color={currentTextColor}
        />
      ),
    },
    {
      id: 8,
      lable: MsgConfig.darkmode,
      // route: 'HomePage',
      route: '',

      icon: (
        <VectorIcon
          type={'MaterialCommunityIcons'}
          name={isDarkMode ? 'lightbulb-on' : 'lightbulb-on-outline'}
          // size={iconFontSize}
          size={getFontSize(3.3)}
          color={currentTextColor}
        />
      ),
    },
    {
      id: 9,
      lable: 'Set Admin',
      // route: 'HomePage',
      route: '',

      icon: (
        <VectorIcon
          type={'MaterialIcons'}
          name={'admin-panel-settings'}
          // size={iconFontSize}
          size={getFontSize(3.3)}
          color={currentTextColor}
        />
      ),
    },
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

  const renderItem = ({item, index}) => {
    return (
      <>
        <View
          style={{
            marginTop: index === 0 ? '5%' : 0,
          }}>
          <Button
            title={item.lable}
            onPress={() => {
              if (item.id === 8) {
                handleDarkMode(); // Functional for dark/Night mode
              } else if (item.id === 9) {
                handleSetAdmin(); // Functional for dark/Night mode
              } else {
                navigation.navigate(item.route);
              }

              // navigation.closeDrawer();
            }}
            icon={item.icon}
            titleStyle={[styles.btnTitleStyle, {color: currentTextColor}]}
            containerStyle={[
              styles.btnContainerStyle,
              {alignItems: 'flex-start'},
            ]}
            buttonStyle={[
              styles.buttonStyle,
              {backgroundColor: currentBgColor},
            ]}
            letfIcon
          />
        </View>
      </>
    );
  };
  console.log('isAdmin', isAdmin);
  return (
    <SafeAreaView
      style={[styles.drawerContainer, {backgroundColor: currentBgColor}]}>
      <View
        style={[
          styles.imageContainer,
          {
            backgroundColor: currentBgColor,
            borderBottomWidth: 0.9,
            borderBottomColor: currentTextColor,
          },
        ]}>
        <View
          style={{
            height: getResHeight(8),
            width: getResHeight(8),
            borderRadius: getResHeight(100),
            marginVertical: '5%',
          }}>
          <Image
            source={theme.assets.church_logo_origianl}
            resizeMode="cover"
            style={{height: '100%', width: '100%'}}
          />
        </View>

        <View
          style={{
            marginLeft: '5%',
          }}>
          <Text
            style={{
              color: currentTextColor,
              fontFamily: theme.font.bold,
            }}>
            Ramesh Marandi
          </Text>
        </View>
      </View>
      <View style={{flex: 1, backgroundColor: backgroundColorHandler()}}>
        <FlatList
          data={navRoute}
          renderItem={renderItem}
          keyExtractor={item => item.id?.toString()}
        />

        <View style={{marginTop: '15%', paddingHorizontal: '5%'}}>
          <Text
            style={{
              alignSelf: 'center',
              color: currentTextColor,
              fontFamily: theme.font.medium,
            }}>
            V 1.0.0
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          position: 'absolute',
          bottom: '2%',
        }}>
        <CommonButtonComp
          // title={'Log Out'}
          title={'Are you a member?'}
          onPress={() => {
            // navigation.navigate("Login")
            // navigation.closeDrawer();
          }}
          iconLeft
          // loading = {true}
          icon={
            <VectorIcon
              // type={'AntDesign'}
              type={'FontAwesome'}
              // name={'logout'}
              name={'lock'}
              size={getFontSize(2)}
              color={currentBgColor}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default DrawerItems;
// export default memo(DrawerItems);
