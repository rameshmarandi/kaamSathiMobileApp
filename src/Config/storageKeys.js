import {API_BASE_URL} from '@env';

// Centralized key management for AsyncStorage

const StorageKeys = {
  ACCESS_TOKEN: 'APP_STORAGE_ACCESS_TOKEN',
  REFRESH_TOKEN: 'APP_STORAGE_REFRESH_TOKEN',

  // Add more keys as needed
};

export default {
  ...StorageKeys,

  API_BASE_URL: API_BASE_URL,
};
