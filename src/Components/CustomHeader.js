import React, {components, createRef, useRef, useState} from 'react';
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
    isDelete,
  } = props;

  let {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  return (
    <>
      <SafeAreaView style={{}}>
        <View
          style={{
            marginTop: getResHeight(1),
            width: '100%',
            paddingHorizontal: '4%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3%',
            borderBottomWidth: Hamburger ? 0.5 : 0,
            borderBottomColor: currentBgColor,
          }}>
          {Hamburger && (
            <Button
              type={'clear'}
              onPress={Hamburger}
              iconPosition="right"
              icon={
                <VectorIcon
                  type={'Ionicons'}
                  name={'menu'}
                  size={getFontSize(4)}
                  color={currentTextColor}
                  style={{}}
                />
              }
              iconContainerStyle={{}}
              containerStyle={[
                {
                  width: getResHeight(5),
                  height: getResHeight(5),
                  justifyContent: 'center',
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
                icon={
                  <VectorIcon
                    type={'Ionicons'}
                    name={'chevron-back'}
                    size={getFontSize(2.5)}
                    color={currentBgColor}
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
                      ? theme.color.dimWhite
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
                  fontSize: getFontSize(2),
                  fontFamily: theme.font.medium,
                  color: currentTextColor,
                  // marginTop:getResHeight(1),
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
              <TouchableOpacity onPress={onPressNotificaiton}>
                <Button
                  type={'clear'}
                  onPress={onPressNotificaiton}
                  iconPosition="right"
                  icon={
                    <VectorIcon
                      type={'MaterialIcons'}
                      name={'notifications'}
                      size={getFontSize(3.5)}
                      color={currentTextColor}
                      style={{}}
                    />
                  }
                  iconContainerStyle={{}}
                  containerStyle={[
                    {
                      width: getResHeight(5),
                      height: getResHeight(5),
                      justifyContent: 'center',
                      //  backgroundColor: `${backgroundColorHandler()}`,
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
                    // currentTextColor,
                    backgroundColor: 'red',
                    // currentBgColor,
                    position: 'absolute',
                    right: '2%',
                    top: '5%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      //  currentTextColor,
                      fontFamily: theme.font.medium,
                      fontSize: getFontSize(1.5),
                    }}>
                    13
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          {rightNumber && (
            <Text style={{color: currentTextColor}}>{rightNumber}</Text>
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
