import React, {memo, useCallback, useEffect} from 'react';
import {
  View,
  StatusBar,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Modal,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {Button} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import theme from '../utility/theme';
import {VectorIcon} from './VectorIcon';
import RNFetchBlob from 'react-native-blob-util';
import {verseResourceCommonStyle} from '../Screens/Styles/verseResourceCommonStyle';
import WaveButton from './WaveButton';
const trimText = (text, maxLength = 10) => {
  return text?.length > maxLength ? text.substring(0, maxLength) + '...' : text;
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
const EmptyUserProfile = memo(props => {
  const {isDarkMode, currentTextColor, currentBgColor} = useSelector(
    state => state.user,
  );
  const {onPress, onViewProfile, avatarURL} = props;
  console.log('avatarURL', avatarURL);

  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <TouchableOpacity onPress={onViewProfile} activeOpacity={0.8}>
        <View
          style={{
            width: getResHeight(18),
            height: getResHeight(18),
            borderRadius: getResHeight(100),
            backgroundColor: theme.color.dimWhite,
            marginTop: getResHeight(-10),
            borderWidth: getResHeight(0.4),
            borderColor: currentTextColor,
            marginLeft: getResWidth(3),
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            // zIndex: -999,
          }}>
          {/* <TouchableOpacity> */}
          {avatarURL ? (
            <Image
              source={{
                uri: `${avatarURL}`,
              }}
              style={{
                height: '100%',
                width: '100%',
                // overflow: 'hidden',
                // zIndex: -999,
              }}
            />
          ) : (
            <>
              <VectorIcon
                type={'FontAwesome'}
                name={'user'}
                size={getFontSize(8)}
                color={isDarkMode ? theme.color.darkTheme : currentTextColor}
              />
            </>
          )}
          {/* </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPress}
        style={{
          bottom: getResHeight(-2),
          right: getResWidth(10),
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
    loaderColor,
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
      loading={isLoading}
      titleStyle={[styles.btnTitleStyle, {color: currentBgColor}, titleStyle]}
      loadingProps={{color: loaderColor || currentBgColor}}
      disabledStyle={{backgroundColor: theme.color.dimWhite}}
      disabledTitleStyle={[
        styles.btnTitleStyle,
        {
          color: '#2f2b2b',
        },
      ]}
      containerStyle={[
        styles.btnContainerStyle,
        {borderRadius: 100},
        containerStyle,
      ]}
      disabled={isLoading || disabled}
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

const CustomAlertModal = ({visible, message, duration = 3000, onClose}) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose(); // Call the onClose function to hide the modal after the specified duration
      }, duration);

      return () => clearTimeout(timer); // Clean up the timer on unmount or when visible changes
    }
  }, [visible, duration, onClose]);
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  const {status, alertMsg} = message;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalView,
            {
              backgroundColor: currentBgColor,
              borderWidth: 1,
              borderColor: currentTextColor,
            },
          ]}>
          <View
            style={{
              marginBottom: '5%',
            }}>
            {status == 'success' ? (
              <VectorIcon
                type={'FontAwesome5'}
                name={'check-circle'}
                size={getFontSize(5.3)}
                color={theme.color.green}
              />
            ) : status == 'error' ? (
              <VectorIcon
                type={'AntDesign'}
                name={'closecircleo'}
                size={getFontSize(5.3)}
                color={theme.color.error}
              />
            ) : (
              ''
            )}
          </View>

          <Text style={[styles.messageText, {color: currentTextColor}]}>
            {alertMsg}
          </Text>

          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.8}
            style={{
              position: 'absolute',
              right: getResWidth(3),
              top: getResHeight(1),
            }}>
            <View
              style={{
                marginBottom: '5%',
              }}>
              <VectorIcon
                type={'Ionicons'}
                name={'close'}
                size={getFontSize(3.3)}
                color={currentTextColor}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  btnTitleStyle: {
    textAlign: 'left',
    fontSize: getFontSize(1.5),
    fontFamily: theme.font.semiBold,
    marginLeft: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '0.7%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: getResWidth(80),
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: getResHeight(2),
    marginBottom: getResHeight(5),
    borderRadius: 10,
    elevation: 5,
  },
  messageText: {
    fontSize: getFontSize(1.5),

    fontFamily: theme.font.semiBold,
    textAlign: 'center',
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
  CustomAlertModal,
};
