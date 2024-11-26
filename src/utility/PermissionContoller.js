import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// Request notification permission (for iOS)
const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permission granted.');
  } else {
    console.log('Notification permission denied.');
  }
};

const requestAndroidPermission = async permission => {
  try {
    const result = await PermissionsAndroid.request(permission);
    return result === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting Android permission:', error);
    return false;
  }
};

const requestIOSPermission = async permission => {
  try {
    const result = await request(permission);
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting iOS permission:', error);
    return false;
  }
};

const checkPermission = async permission => {
  try {
    const result = await check(permission);
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
};

const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    // For Android 13+ POST_NOTIFICATIONS
    if (Platform.Version >= 33) {
      return await requestAndroidPermission(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
    return true; // Notifications don't require explicit permission on Android < 13
  } else if (Platform.OS === 'ios') {
    // Request iOS notification permissions
    return await requestIOSPermission(PERMISSIONS.IOS.NOTIFICATIONS);
  }
  return false;
};

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    return await requestAndroidPermission(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  } else if (Platform.OS === 'ios') {
    return await requestIOSPermission(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  }
  return false;
};

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    return await requestAndroidPermission(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
  } else if (Platform.OS === 'ios') {
    return await requestIOSPermission(PERMISSIONS.IOS.CAMERA);
  }
  return false;
};

export const requestGalleryPermission = async () => {
  let permission;

  if (Platform.OS === 'ios') {
    permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
  } else {
    permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
  }

  try {
    // Check the current permission status
    const result = await check(permission);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log('This feature is not available on this device.');
        return false;

      case RESULTS.DENIED:
        console.log('Permission denied, requesting...');
        const requestResult = await request(permission);
        if (requestResult === RESULTS.GRANTED) {
          console.log('Permission granted');
          return true;
        } else {
          console.log('Permission denied');
          return false;
        }

      case RESULTS.GRANTED:
        console.log('Permission is already granted');
        return true;

      case RESULTS.BLOCKED:
        console.log(
          'Permission is blocked. You need to enable it in settings.',
        );
        return false;

      default:
        return false;
    }
  } catch (error) {
    console.error('Error checking or requesting permission:', error);
    return false;
  }
};

const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to save files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage Permission Granted');
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        Alert.alert(
          'Permission Denied',
          'Storage permission is required to save files. Please enable it in the app settings.',
        );
        return false;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Permanently Denied',
          'You have permanently denied storage permission. Enable it in the app settings.',
        );
        return false;
      }
    } catch (err) {
      console.warn('Permission Request Error', err);
    }
  } else {
    return true; // No permissions needed for iOS
  }
};

export {
  requestUserPermission,
  requestStoragePermission,
  checkPermission,
  requestNotificationPermission,
  requestLocationPermission,
  requestCameraPermission,
};
