import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
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

export {requestUserPermission};
