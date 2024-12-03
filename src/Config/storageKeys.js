import {API_BASE_URL, IS_ENCRYPT, RAZORPAY_KEY} from '@env';

// Centralized key management for AsyncStorage

const StorageKeys = {
  ACCESS_TOKEN: 'APP_STORAGE_ACCESS_TOKEN',
  REFRESH_TOKEN: 'APP_STORAGE_REFRESH_TOKEN',
  FCM_TOKEN: 'APP_STORAGE_FCM_TOKEN',

  // Add more keys as needed
};

const USER_TYPES = ['super_admin'];
const RESTICTED_PAGES = ['AdminManagment'];
export default {
  ...StorageKeys,

  API_BASE_URL: 'https://10.0.2.2:8000/api/v1',
  // API_BASE_URL,
  USER_TYPES,
  RESTICTED_PAGES,
  RAZORPAY_KEY,
  IS_ENCRYPT: false,
};
