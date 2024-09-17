import React, {memo, useCallback} from 'react';
import {
  View,
  StatusBar,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {Button, Image} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import theme from '../utility/theme';
import {VectorIcon} from './VectorIcon';
import RNFetchBlob from 'react-native-blob-util';
import {verseResourceCommonStyle} from '../Screens/Styles/verseResourceCommonStyle';
import WaveButton from './WaveButton';
const trimText = (text, maxLength = 10) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

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

export const CommonImageCard = memo(
  ({
    backgroundColor,
    borderColor,
    textColor,
    onLongPress,
    isFooterVisilbe,
    onCardPress,
    waveButtonProps,
    scheduleText,
    date,
    imageSource,
    isSelected,
  }) => {
    const {isDarkMode, currentTextColor, currentBgColor} = useSelector(
      state => state.user,
    );
    return (
      <TouchableOpacity
        onLongPress={onLongPress}
        onPress={onCardPress}
        activeOpacity={0.8}>
        <View
          style={[
            verseResourceCommonStyle.card,

            !isFooterVisilbe && {paddingBottom: '4%'},
            {
              backgroundColor,

              borderColor,
            },
          ]}>
          {isSelected && (
            <View
              style={[
                verseResourceCommonStyle.overlay,
                {backgroundColor: 'rgba(255, 255, 255, 0.5)'},
              ]}
            />
          )}
          <View style={verseResourceCommonStyle.cardHeader}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <WaveButton {...waveButtonProps} disabled />
              <Text
                style={[
                  verseResourceCommonStyle.boldText,
                  {
                    color: textColor,
                    marginLeft: 10,
                  },
                ]}>
                {scheduleText}
              </Text>
            </View>
            <Text
              style={[
                verseResourceCommonStyle.regularText,
                {color: textColor},
              ]}>
              {date}
            </Text>
          </View>
          <View style={verseResourceCommonStyle.imageContainer}>
            <Image
              source={
                // imageSource
                // imageSource !== 'undefined' && imageSource.includes('https://')
                //   ? {uri: imageSource}
                //   :
                imageSource
              }
              resizeMode="cover"
              style={verseResourceCommonStyle.image}
            />
          </View>
          {isFooterVisilbe && (
            <>
              <View
                style={{
                  marginVertical: getResHeight(1),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <VectorIcon
                    type={'Ionicons'}
                    name={'eye'}
                    size={getFontSize(3.3)}
                    color={currentTextColor}
                  />
                  <Text
                    style={{
                      color: currentTextColor,
                      fontFamily: theme.font.medium,
                      fontSize: getFontSize(1.8),
                      marginLeft: getResWidth(2),
                    }}>
                    12
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: currentTextColor,
                      fontFamily: theme.font.medium,
                      fontSize: getFontSize(1.8),
                    }}>
                    12 Comments
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  },
);

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

export const CheckFilePermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (
        granted['android.permission.POST_NOTIFICATIONS'] &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE']
      ) {
        // user granted permissions
        return true;
      } else {
        // user didn't grant permission... handle with toastr, popup, something...
        return false;
      }
    } catch (err) {
      console.log('err', err);
      // unexpected error
      return false;
    }
  } else {
    // platform is iOS
    return true;
  }
};

export function downloadFileHandler(pathUrl, fileName) {
  let filePath = RNFetchBlob.fs.dirs.DocumentDir;
  filePath = filePath + fileName;
  return new Promise((resolve, reject) => {
    RNFetchBlob.config({
      fileCache: true,
      title: fileName,
      path: filePath,
      appendExt: 'pdf',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: fileName,
        description: 'File downloaded by download manager.',
        mime: 'application/pdf',
      },
    })
      .fetch('GET', pathUrl)
      .then(result => {
        if (Platform.OS == 'ios') {
          filePath = result.path();
          console.log('result', filePath);
          let options = {
            type: 'application/pdf',
            url: filePath,
            saveToFiles: true,
          };
          Share.open(options)
            .then(resp => resolve(result))
            .catch(reject);
        } else {
          resolve(result);
        }
      })
      .catch(e => {
        reject(e);
      });
  });
}

export {
  StatusBarComp,
  CopyToClipBoard,
  EmptyUserProfile,
  ButtonIconComp,
  CommonButtonComp,
  trimText,
};
