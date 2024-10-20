import AsyncStorage from '@react-native-async-storage/async-storage';
// import StorageKeys from './storageKeys';

/**
 * AsyncStorage Utility - Production-Grade Implementation
 * Provides methods for setting, getting, removing, and clearing AsyncStorage data
 * Uses centralized key management for consistency
 */

const PREFIX = 'APP_STORAGE_';

/**
 * Set data in AsyncStorage
 * @param {string} key - The key from storageKeys.js
 * @param {any} value - The value to store (automatically stringified if necessary)
 * @returns {Promise<void>}
 */
const setItem = async (key, value) => {
  try {
    const stringValue =
      typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    console.error(`AsyncStorage: Error setting item for key: ${key}`, error);
  }
};

/**
 * Get data from AsyncStorage
 * @param {string} key - The key from storageKeys.js
 * @returns {Promise<any|null>}
 */
const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`AsyncStorage: Error getting item for key: ${key}`, error);
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 * @param {string} key - The key from storageKeys.js
 * @returns {Promise<void>}
 */
const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`AsyncStorage: Error removing item for key: ${key}`, error);
  }
};

/**
 * Clear all app-specific AsyncStorage data (using a namespaced prefix)
 * @param {boolean} clearAll - If true, clear all AsyncStorage data, not just app-specific
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
 * Get all keys stored in AsyncStorage (filtered by app-specific prefix)
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
