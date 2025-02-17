import axios from 'axios';

import asyncStorageUtil from '../utility/asyncStorageUtil';
import StorageKeys from '../Config/StorageKeys';
import APIEndpoint from './ApiEndpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get the access token from AsyncStorage
export const getToken = async () => {
  try {
    const token = await asyncStorageUtil.getItem(`${StorageKeys.ACCESS_TOKEN}`);
    console.log('Async_stoken_', token);

    return token;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

// Refresh the access token using the refresh token
export const refreshAccessToken = async () => {
  try {
    const refreshToken = await getToken();
    console.log('RefreshToken_At_Start', refreshToken);
    if (!refreshToken) throw new Error('No refresh token available');

    // Make the request to refresh the token
    const response = await axios.post(
      `${StorageKeys.API_BASE_URL}${APIEndpoint.user.refreshToken}`,
      {
        refreshToken,
      },
    );
    const {accessToken} = response.data;

    if (accessToken) {
      // Store the new access token

      await asyncStorageUtil.setItem(StorageKeys.ACCESS_TOKEN, accessToken);
      return accessToken;
    }

    return null;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};

export const storeAsyncData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error(`Error storing data for key: ${key}`, error);
    return false;
  }
};

export const getAsyncData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error retrieving data for key: ${key}`, error);
    return null;
  }
};
