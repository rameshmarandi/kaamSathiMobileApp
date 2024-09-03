import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define permission keys
const PERMISSIONS_KEYS = {
  CAMERA: 'CAMERA',
  GALLERY: 'GALLERY',
  // Add more permission keys as needed
};

// Define platform-specific permissions
const PLATFORM_PERMISSIONS = {
  [PERMISSIONS_KEYS.CAMERA]: {
    android: PERMISSIONS.ANDROID.CAMERA,
    ios: PERMISSIONS.IOS.CAMERA,
  },
  [PERMISSIONS_KEYS.GALLERY]: {
    android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    // PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  },
};

// Helper function to validate key
const validateKey = key => Object.values(PERMISSIONS_KEYS).includes(key);

// Function to request permission
const requestPermission = async key => {
  if (!validateKey(key)) {
    console.error('Invalid permission key.');
    return false;
  }

  const permission = PLATFORM_PERMISSIONS[key][Platform.OS];

  try {
    const result = await request(permission);
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting permission:', error);
    return false;
  }
};

// Function to get permission status
const getPermissionStatus = async key => {
  if (!validateKey(key)) {
    console.error('Invalid permission key.');
    return null;
  }

  const permission = PLATFORM_PERMISSIONS[key][Platform.OS];

  try {
    const result = await check(permission);
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error checking permission status:', error);
    return null;
  }
};

// Function to save permission status
const savePermissionStatus = async (key, status) => {
  if (!validateKey(key)) {
    console.error('Invalid permission key.');
    return;
  }

  try {
    await AsyncStorage.setItem(`permission_${key}`, JSON.stringify(status));
  } catch (error) {
    console.error('Error saving permission status:', error);
  }
};

// Function to get saved permission status
const getSavedPermissionStatus = async key => {
  if (!validateKey(key)) {
    console.error('Invalid permission key.');
    return null;
  }

  try {
    const status = await AsyncStorage.getItem(`permission_${key}`);
    return status ? JSON.parse(status) : null;
  } catch (error) {
    console.error('Error retrieving saved permission status:', error);
    return null;
  }
};

// Function to handle permission
const handlePermission = async key => {
  const savedStatus = await getSavedPermissionStatus(key);

  if (savedStatus === null) {
    const granted = await requestPermission(key);
    await savePermissionStatus(key, granted);
    return granted;
  }

  return savedStatus;
};

// Export permission keys and manager functions
export {PERMISSIONS_KEYS, getPermissionStatus, handlePermission};
