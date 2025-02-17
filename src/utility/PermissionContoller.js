import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {store} from '../redux/store';
import {setUserLocation} from '../redux/reducer/Auth';
import {getAsyncData, storeAsyncData} from '../API/AuthService';
import StorageKeys from '../Config/StorageKeys';

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

const requestMultiplePermissions = async () => {
  const isLocationPermission = await getAsyncData(
    StorageKeys.LOCATION_PERMISSION,
  );

  console.log('isPermission_enalbed', isLocationPermission);

  if (isLocationPermission == true) {
    return;
  } else {
    if (Platform.OS === 'android') {
      const permissions = [
        'android.permission.POST_NOTIFICATIONS',
        'android.permission.ACCESS_FINE_LOCATION',
        'android.permission.ACCESS_COARSE_LOCATION',
      ];
      const result = await PermissionsAndroid.requestMultiple(permissions);

      // Check if all permissions were granted
      const allGranted = permissions.every(
        permission => result[permission] === PermissionsAndroid.RESULTS.GRANTED,
      );

      console.log('Permission_android', allGranted);
      if (allGranted) {
        storeAsyncData(StorageKeys.LOCATION_PERMISSION, true);
        store.dispatch(
          setUserLocation({latitude: '', longitude: '', address: 'Fetching..'}),
        );
        // Geolocation.getCurrentPosition(
        //   position => {
        //     console.log('GEO_current_lOCATION', position);
        //   },
        //   error => {
        //     // See error code charts below.
        //     console.log(error.code, error.message);
        //   },
        //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        // );

        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            // setLocation({latitude, longitude});
            console.log('my_Latitude:', {latitude, longitude});

            // First, dispatch the coordinates without the address
            store.dispatch(setUserLocation({latitude, longitude, address: ''}));

            // Fetch address from coordinates
            Geocoder.from({latitude, longitude})
              .then(json => {
                const formattedAddress = json.results[0].formatted_address;
                // setAddress(formattedAddress);
                console.log('my_current_address', formattedAddress);

                // Dispatch both coordinates and the address
                store.dispatch(
                  setUserLocation({
                    latitude,
                    longitude,
                    address: formattedAddress,
                  }),
                );
              })
              .catch(error => {
                // console.warn(error)

                // First, dispatch the coordinates without the address
                store.dispatch(
                  setUserLocation({
                    latitude: 'error',
                    longitude: 'error',
                    address: '',
                  }),
                );
              });
          },
          error => {
            // First, dispatch the coordinates without the address
            store.dispatch(
              setUserLocation({
                latitude: 'error',
                longitude: 'error',
                address: '',
              }),
            );

            console.error(error);
            Alert.alert('Error', 'Unable to retrieve your location.');
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      }
      return;

      if (Platform.Version >= 33) {
        try {
          // Request multiple permissions
          const result = await PermissionsAndroid.requestMultiple(permissions);

          // Check if all permissions were granted
          const allGranted = permissions.every(
            permission =>
              result[permission] === PermissionsAndroid.RESULTS.GRANTED,
          );

          return allGranted;
        } catch (err) {
          console.error('Failed to request permissions:', err);
          return false;
        }
      }
      return true; // Permissions not required explicitly for Android < 13
    } else if (Platform.OS === 'ios') {
      // Request iOS permissions one by one
      const notificationPermission = await requestIOSPermission(
        PERMISSIONS.IOS.NOTIFICATIONS,
      );
      const locationPermission = await requestIOSPermission(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );

      // Check if both iOS permissions were granted
      return (
        notificationPermission === 'granted' && locationPermission === 'granted'
      );
    }
    storeAsyncData(StorageKeys.LOCATION_PERMISSION, false);
    return false;
  }
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
  // requestNotificationPermission,
  // requestLocationPermission,
  requestMultiplePermissions,
  requestCameraPermission,
};
