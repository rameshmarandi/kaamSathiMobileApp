import {API_BASE_URL} from '@env';

// Centralized key management for AsyncStorage

const StorageKeys = {
  ACCESS_TOKEN: 'APP_STORAGE_ACCESS_TOKEN',
  REFRESH_TOKEN: 'APP_STORAGE_REFRESH_TOKEN',

  // Add more keys as needed
};

const USER_TYPES = ['super_admin'];
const RESTICTED_PAGES = ['AdminManagment'];
export default {
  ...StorageKeys,

  API_BASE_URL: API_BASE_URL,
  USER_TYPES,
  RESTICTED_PAGES,
};
