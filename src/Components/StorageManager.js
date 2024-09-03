import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper function to validate keys and values
const validateKey = key => typeof key === 'string' && key.trim() !== '';
const validateValue = value => value !== null && value !== undefined;

// Function to set data in AsyncStorage
export const setItem = async (key, value) => {
  if (!validateKey(key)) {
    console.error('Invalid key. Key must be a non-empty string.');
    return;
  }

  if (!validateValue(value)) {
    console.error('Invalid value. Value cannot be null or undefined.');
    return;
  }

  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting item in AsyncStorage:', error);
  }
};

// Function to get data from AsyncStorage
export const getItem = async key => {
  if (!validateKey(key)) {
    console.error('Invalid key. Key must be a non-empty string.');
    return null;
  }

  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting item from AsyncStorage:', error);
    return null;
  }
};

// Function to remove data from AsyncStorage
export const removeItem = async key => {
  if (!validateKey(key)) {
    console.error('Invalid key. Key must be a non-empty string.');
    return;
  }

  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing item from AsyncStorage:', error);
  }
};

// Function to clear all data in AsyncStorage
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

// Function to get all keys from AsyncStorage
export const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    console.error('Error getting all keys from AsyncStorage:', error);
    return [];
  }
};

// Function to check if a key exists in AsyncStorage
export const keyExists = async key => {
  if (!validateKey(key)) {
    console.error('Invalid key. Key must be a non-empty string.');
    return false;
  }

  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  } catch (error) {
    console.error('Error checking if key exists in AsyncStorage:', error);
    return false;
  }
};
