import React, {memo, useCallback} from 'react';
import {View, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {Button, Image} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import theme from '../utility/theme';
import {VectorIcon} from './VectorIcon';

// StatusBarComp Component
const StatusBarComp = memo(() => {
  const {isDarkMode} = useSelector(state => state.user);

  return (
    <StatusBar
      animated={true}
      backgroundColor={isDarkMode ? theme.color.darkTheme : theme.color.white}
      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    />
  );
});

// CopyToClipBoard Function
const CopyToClipBoard = text => {
  try {
    Clipboard.setString(`${text}`);
  } catch (error) {
    console.error('clip_board_text_copy_faild', error);
  }
};

// EmptyUserProfile Component
const EmptyUserProfile = memo(({onPress}) => {
  const {isDarkMode, currentTextColor, currentBgColor} = useSelector(
    state => state.user,
  );

  return (
    <View
      style={{
        width: getResHeight(18),
        height: getResHeight(18),
        borderRadius: getResHeight(100),
        backgroundColor: theme.color.dimWhite,
        marginTop: getResHeight(-10),
        borderWidth: 2,
        borderColor: currentTextColor,
        marginLeft: getResWidth(3),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <VectorIcon
        type={'FontAwesome'}
        name={'user'}
        size={getFontSize(8)}
        color={isDarkMode ? theme.color.darkTheme : currentTextColor}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: getResHeight(1),
          right: getResWidth(-1.1),
          zIndex: 999,
        }}>
        <ButtonIconComp
          onPress={onPress}
          icon={
            <VectorIcon
              type={'FontAwesome'}
              name={'camera'}
              size={getFontSize(2.1)}
              color={currentBgColor}
            />
          }
          containerStyle={{
            width: getResHeight(5),
            height: getResHeight(5),
            backgroundColor: currentTextColor,
            borderRadius: getResHeight(100),
          }}
        />
      </TouchableOpacity>
    </View>
  );
});

// ButtonIconComp Component
const ButtonIconComp = memo(props => {
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  const {
    onPress,
    icon,
    iconStyle,
    disabled,
    iconContainerStyle,
    iconPosition,
    containerStyle,
  } = props;

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Button
        type={'clear'}
        disabled={disabled}
        onPress={onPress}
        iconPosition={iconPosition}
        icon={icon}
        iconStyle={iconStyle}
        iconContainerStyle={iconContainerStyle || {}}
        containerStyle={[
          containerStyle || {
            width: getResHeight(5),
            height: getResHeight(5),
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
  );
});

// CommonButtonComp Component
const CommonButtonComp = memo(props => {
  const {
    onPress,
    title,
    icon,
    rightIcon,
    leftIcon,
    isLoading,
    buttonStyle,
    backgroundColor,
    titleStyle,
    disabled,
    containerStyle,
  } = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  return (
    <Button
      title={title}
      onPress={onPress}
      icon={icon}
      titleStyle={[styles.btnTitleStyle, {color: currentBgColor}, titleStyle]}
      disabledStyle={{backgroundColor: theme.color.disabledBtn}}
      disabledTitleStyle={[styles.btnTitleStyle, {color: '#cccccc'}]}
      containerStyle={[
        styles.btnContainerStyle,
        {borderRadius: 100},
        containerStyle,
      ]}
      buttonStyle={[
        {
          width: '100%',
          height: '100%',
          borderRadius: 100,
          backgroundColor: currentTextColor,
        },
        buttonStyle,
      ]}
      {...props}
    />
  );
});

const styles = StyleSheet.create({
  btnTitleStyle: {
    textAlign: 'left',
    fontSize: getFontSize(1.5),
    fontFamily: theme.font.semiBold,
    marginLeft: '5%',
  },
  btnContainerStyle: {
    marginBottom: getResHeight(2),
    width: '100%',
    height: getResHeight(5),
  },
});

export {
  StatusBarComp,
  CopyToClipBoard,
  EmptyUserProfile,
  ButtonIconComp,
  CommonButtonComp,
};
