import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'APP_STORAGE_';

/**
 * Generate a full key with prefix for namespacing.
 * @param {string} key - The original key.
 * @returns {string} - Prefixed key.
 */
const getPrefixedKey = key => `${PREFIX}${key}`;

/**
 * Set data in AsyncStorage
 * @param {string} key - Key without prefix.
 * @param {any} value - Value to store.
 * @returns {Promise<void>}
 */
const setItem = async (key, value) => {
  try {
    const stringValue =
      typeof value === 'string' ? value : JSON.stringify(value);

    await AsyncStorage.setItem(getPrefixedKey(key), stringValue);
  } catch (error) {
    console.error(`AsyncStorage: Error setting item for key: ${key}`, error);
  }
};

/**
 * Get data from AsyncStorage
 * @param {string} key - Key without prefix.
 * @returns {Promise<any|null>}
 */
const getItem = async key => {
  try {
    console.log('GET_Asnc_values', key, getPrefixedKey(key));
    const value = await AsyncStorage.getItem(getPrefixedKey(key));

    // Try parsing JSON; if it fails, assume it's a plain string
    try {
      return value ? JSON.parse(value) : null;
    } catch (jsonError) {
      console.warn(
        `AsyncStorage: Stored value for key ${key} is not JSON, returning as string.`,
      );
      return value; // Return as plain string if JSON parsing fails
    }
  } catch (error) {
    console.error(`AsyncStorage: Error getting item for key: ${key}`, error);
    return null;
  }
};
/**
 * Remove data from AsyncStorage
 * @param {string} key - Key without prefix.
 * @returns {Promise<void>}
 */
const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(getPrefixedKey(key));
  } catch (error) {
    console.error(`AsyncStorage: Error removing item for key: ${key}`, error);
  }
};

/**
 * Clear all app-specific AsyncStorage data or all data
 * @param {boolean} clearAll - If true, clear all AsyncStorage data.
 * @returns {Promise<void>}
 */
const clearStorage = async (clearAll = false) => {
  try {
    if (clearAll) {
      await AsyncStorage.clear();
    } else {
      const keys = await AsyncStorage.getAllKeys();
      const appKeys = keys.filter(key => key.startsWith(PREFIX));
      await AsyncStorage.multiRemove(appKeys);
    }
  } catch (error) {
    console.error('AsyncStorage: Error clearing storage', error);
  }
};

/**
 * Get all keys stored in AsyncStorage with app-specific prefix.
 * @returns {Promise<string[]>}
 */
const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.filter(key => key.startsWith(PREFIX));
  } catch (error) {
    console.error('AsyncStorage: Error getting all keys', error);
    return [];
  }
};

export default {
  setItem,
  getItem,
  removeItem,
  clearStorage,
  getAllKeys,
};
