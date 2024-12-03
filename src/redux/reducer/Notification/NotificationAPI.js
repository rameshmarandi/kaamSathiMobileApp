import {createAsyncThunk} from '@reduxjs/toolkit';
import apiService from '../../../API/apiClient';
import APIEndpoint from '../../../API/ApiEndpoints';
import {setLangues, setNotification} from '.';
import {decryptData, encryptData} from '../../../utility/CryptoUtils';

const getNotificationAPIHander = createAsyncThunk(
  APIEndpoint.inAppNotifications.getInAppNotifications,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.getProtected(
        APIEndpoint.inAppNotifications.getInAppNotifications,
      );

      if (response.data?.statusCode === 200) {
        const responseData = response.data.data;

        const decruptedPayload = await decryptData(responseData.data);
        console.log('decrypted_payload_not', decruptedPayload);
        await thunkAPI.dispatch(setNotification(decruptedPayload));
      }
    } catch (error) {
      console.error('getNotificationAPIHander_Failed', error.response);
    }
  },
);
const readNotificationAPIHander = createAsyncThunk(
  APIEndpoint.inAppNotifications.markNotificationRead,
  async (payload, thunkAPI) => {
    try {
      const encryptedPayload = await encryptData(payload);

      const response = await apiService.postProtected(
        APIEndpoint.inAppNotifications.markNotificationRead,
        encryptedPayload,
      );

      if (response.data?.statusCode === 200) {
        await thunkAPI.dispatch(getNotificationAPIHander());
      }
    } catch (error) {
      console.error('readNotificationAPIHander_Failed', error.response);
    }
  },
);
const deleteNotificationAPIHander = createAsyncThunk(
  APIEndpoint.inAppNotifications.deleteNotification,
  async (payload, thunkAPI) => {
    try {
      const encryptedPayload = await encryptData(payload);

      const response = await apiService.postProtected(
        APIEndpoint.inAppNotifications.deleteNotification,
        encryptedPayload,
      );

      if (response.data?.statusCode === 200) {
        await thunkAPI.dispatch(getNotificationAPIHander());
        return true;
      }
    } catch (error) {
      console.error('readNotificationAPIHander_Failed', error.response);
    }
  },
);

export {
  getNotificationAPIHander,
  deleteNotificationAPIHander,
  readNotificationAPIHander,
};
