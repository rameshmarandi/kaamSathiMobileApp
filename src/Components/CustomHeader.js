import React, {
  components,
  createRef,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  TextInput as RNInput,
  Platform,
  StyleSheet,
  Text,
  TouchableSensitivity,
  View,
  Image,
  SafeAreaView,
  Animated,
} from 'react-native';
import {Button} from 'react-native-elements';
import {VectorIcon} from './VectorIcon';
import PropTypes from 'prop-types';
import theme from '../utility/theme';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import {backgroundColorHandler, textColorHandler} from './commonHelper';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import WaveButton from './WaveButton';

const CustomHeader = props => {
  const {
    Hamburger,
    backPress,
    onPressNotificaiton,
    backgroundColor,
    screenTitle,
    centerLogo,
    filterIcon,
    rightNumber,
    onPressShare,
    isDelete,
    shareDisabled,
  } = props;

  let {
    isDarkMode,
    isUserOnline,
    userLocation,
    currentBgColor,
    currentTextColor,
    isUserLoggedIn,
  } = useSelector(state => state.user);

  const {unreadCount} = useSelector(
    state => state.notification.getNotification,
  );

  const waveButtonProps = useCallback(
    color => ({
      onPress: () => {
        /* Navigation action */
      },
      circleContainer: {
        width: getResHeight(2),
        height: getResHeight(2),
        borderRadius: getResHeight(2) / 2,
        backgroundColor: color,
      },
      circleStyle: {
        width: getResHeight(2),
        height: getResHeight(2),
        borderRadius: getResHeight(2) / 2,
        backgroundColor: color,
      },
    }),
    [],
  );

  // let isOnline = true;

  const waveButtonPropsFirstRoute = waveButtonProps(theme.color.greenBRGA);
  return (
    <>
      <SafeAreaView style={{}}>
        <View
          style={{
            paddingVertical: getResHeight(0.5),

            width: '100%',
            paddingHorizontal: '4%',
            paddingVertical: '3%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // marginBottom: '3%',
            // borderBottomWidth: Hamburger ? 0.5 : 0,
            borderBottomColor: currentBgColor,
            backgroundColor: isDarkMode
              ? theme.color.dardkModeOnBGColor
              : theme.color.darkModeOffBGColor,
            // borderBottomLeftRadius: 20,
            // borderBottomRightRadius: 20,
          }}>
          {Hamburger && (
            <>
              <TouchableOpacity activeOpacity={0.8} onPress={Hamburger}>
                <View
                  style={[
                    {
                      height: getResHeight(6),
                      width: getResHeight(6),

                      borderRadius: getResHeight(8),
                      overflow: 'hidden',

                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    isUserLoggedIn && {
                      borderWidth: 2,
                      borderColor: isUserOnline
                        ? theme.color.greenBRGA
                        : theme.color.redBRGA,

                      zIndex: -99999,
                      backgroundColor: currentBgColor,
                    },
                  ]}>
                  {!isUserLoggedIn ? (
                    <>
                      <VectorIcon
                        type={'FontAwesome'}
                        name={'user-circle'}
                        size={getFontSize(5.5)}
                        color={theme.color.black}
                        style={{}}
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        source={{
                          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s',
                          height: '100%',
                          width: '100%',
                        }}
                      />
                    </>
                  )}
                </View>

                {isUserLoggedIn && (
                  <View
                    style={[
                      {
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        borderRadius: 100,
                        zIndex: 99999,
                      },
                      !isUserOnline && {
                        backgroundColor: 'red',
                        height: getResHeight(2),
                        width: getResHeight(2),
                      },
                    ]}>
                    {isUserOnline && (
                      <WaveButton {...waveButtonPropsFirstRoute} disabled />
                    )}
                  </View>
                )}
              </TouchableOpacity>
              {userLocation.address !== 'error' && (
                <>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <VectorIcon
                        type={'Ionicons'}
                        name={'location'}
                        size={getFontSize(2.9)}
                        color={'#000000'}
                      />
                      <Text
                        style={{
                          color: theme.color.charcolBlack,
                          paddingTop: getResHeight(0.3),
                          fontSize: getFontSize(1.8),
                          textAlign: 'center',
                          fontFamily: theme.font.medium,
                        }}>
                        Address
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: theme.color.white,

                        marginTop: getResHeight(0.3),
                        textAlign: 'center',
                        fontFamily: theme.font.medium,
                        fontSize: getFontSize(1.3),
                      }}>
                      {userLocation.address.length > 20
                        ? `${userLocation.address.slice(0, 20)}...`
                        : userLocation.address}
                    </Text>
                  </View>
                </>
              )}
            </>
          )}

          {backPress && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Button
                type={'clear'}
                onPress={backPress}
                iconPosition="right"
                activeOpacity={0.8}
                icon={
                  <VectorIcon
                    type={'Ionicons'}
                    name={'chevron-back'}
                    size={getFontSize(2.5)}
                    color={currentTextColor}
                    style={{}}
                  />
                }
                iconContainerStyle={{}}
                containerStyle={[
                  {
                    width: getResHeight(5),
                    height: getResHeight(5),
                    // justifyContent:"center",
                    backgroundColor: currentBgColor,
                    backgroundColor: isDarkMode
                      ? theme.color.darkModeOffBGColor
                      : theme.color.primary,
                    borderRadius: getResHeight(100),
                  },
                ]}
                buttonStyle={[
                  {
                    width: '100%',
                    height: '100%',
                    borderRadius: 100,
                  },
                ]}
              />

              <Text
                style={{
                  fontSize: getFontSize(1.8),
                  fontFamily: theme.font.medium,
                  color: theme.color.white,
                  // color: currentTextColor,
                  marginTop: getResHeight(1),
                  marginLeft: '6%',
                }}>
                {screenTitle}
              </Text>
            </View>
          )}
          {(filterIcon || isDelete) && (
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
              }}>
              <Button
                type={'clear'}
                onPress={filterIcon}
                iconPosition="right"
                icon={
                  <VectorIcon
                    type={isDelete ? 'MaterialIcons' : 'Ionicons'}
                    name={isDelete ? 'delete' : 'filter'}
                    size={getFontSize(3.5)}
                    color={isDelete ? 'red' : currentTextColor}
                    style={{}}
                  />
                }
                iconContainerStyle={{}}
                containerStyle={[
                  {
                    width: getResHeight(5.5),
                    height: getResHeight(5.5),
                    backgroundColor: currentBgColor,

                    borderRadius: getResHeight(100),
                  },
                ]}
                buttonStyle={[
                  {
                    width: '100%',
                    height: '100%',
                    borderRadius: 100,
                  },
                ]}
              />
            </View>
          )}
          {centerLogo && typeof centerLogo == 'boolean' && (
            <Image
              source={theme.assets.church_logo_origianl}
              resizeMode="cover"
              style={{
                width: getResHeight(5),
                height: getResHeight(5),
                borderRadius: getResHeight(100),
              }}
            />
          )}
          {onPressNotificaiton && (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPressNotificaiton}>
                <Button
                  type={'clear'}
                  onPress={onPressNotificaiton}
                  iconPosition="right"
                  icon={
                    <VectorIcon
                      type={'MaterialIcons'}
                      name={'notifications'}
                      size={getFontSize(3.5)}
                      color={theme.color.offWhite}
                      style={{}}
                    />
                  }
                  iconContainerStyle={{}}
                  containerStyle={[
                    {
                      width: getResHeight(5),
                      height: getResHeight(5),
                      justifyContent: 'center',

                      borderRadius: getResHeight(100),
                    },
                  ]}
                  buttonStyle={[
                    {
                      width: '100%',
                      height: '100%',
                      borderRadius: 100,
                    },
                  ]}
                />
                <View
                  style={{
                    height: getResHeight(2.5),
                    width: getResHeight(2.5),
                    borderRadius: getResHeight(100),
                    borderWidth: 0.8,
                    borderColor: 'white',

                    backgroundColor: 'red',

                    position: 'absolute',
                    right: '2%',
                    top: '5%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',

                      fontFamily: theme.font.medium,
                      fontSize: getFontSize(1.5),
                    }}>
                    {unreadCount ? unreadCount : 0}
                  </Text>
                </View>
              </TouchableOpacity>
              {rightNumber && (
                <Text style={{color: currentTextColor}}>{rightNumber}</Text>
              )}
            </>
          )}
          {onPressShare && (
            <>
              <TouchableOpacity
                disabled={shareDisabled}
                activeOpacity={0.8}
                onPress={onPressShare}>
                <Button
                  type={'clear'}
                  onPress={onPressShare}
                  iconPosition="right"
                  icon={
                    <VectorIcon
                      type={'MaterialIcons'}
                      name={'share'}
                      size={getFontSize(3.5)}
                      color={theme.color.offWhite}
                      style={{}}
                    />
                  }
                  iconContainerStyle={{}}
                  containerStyle={[
                    {
                      width: getResHeight(5),
                      height: getResHeight(5),
                      justifyContent: 'center',

                      borderRadius: getResHeight(100),
                    },
                  ]}
                  buttonStyle={[
                    {
                      width: '100%',
                      height: '100%',
                      borderRadius: 100,
                    },
                  ]}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};
CustomHeader.propTypes = {
  screenTitle: PropTypes.string,
  backPress: PropTypes.func,
  filterIcon: PropTypes.func,
  centerLogo: PropTypes.bool,
  Hamburger: PropTypes.func,
  rightNumber: PropTypes.string,
};
export default React.memo(CustomHeader);
