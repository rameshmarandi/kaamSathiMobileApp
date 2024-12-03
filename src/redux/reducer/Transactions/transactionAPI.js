import {createAsyncThunk} from '@reduxjs/toolkit';
import apiService from '../../../API/apiClient';
import APIEndpoint from '../../../API/ApiEndpoints';
import {setTransactionHistory} from '.';
import {decryptData, encryptData} from '../../../utility/CryptoUtils';
import {getNotificationAPIHander} from '../Notification/NotificationAPI';

const createTransactionAPIHandler = createAsyncThunk(
  APIEndpoint.transaction.createTransaction,
  async (payload, thunkAPI) => {
    try {
      const encryptedPayload = await encryptData(payload);

      const response = await apiService.postProtected(
        APIEndpoint.transaction.createTransaction,
        encryptedPayload,
      );

      if (response.data.statusCode === 200) {
        thunkAPI.dispatch(getTranscHistoryAPIHandler());
        await thunkAPI.dispatch(getNotificationAPIHander());
      }
      return response.data.message;
    } catch (error) {
      console.error('UploadDailyVersesAPI_Failed', error.response);
    }
  },
);
const getTranscHistoryAPIHandler = createAsyncThunk(
  APIEndpoint.transaction.getTransactionHistory,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.getProtected(
        APIEndpoint.transaction.getTransactionHistory,
      );

      if (response.data.statusCode === 200) {
        const resData = response.data.data;

        const decruptedPayload = await decryptData(resData.data);

        thunkAPI.dispatch(setTransactionHistory(decruptedPayload));
      }
      return response.data.message;
    } catch (error) {
      console.error('UploadDailyVersesAPI_Failed', error.response);
    }
  },
);
const generateInvoiceAPIHandler = createAsyncThunk(
  APIEndpoint.transaction.generateInvoice,
  async (payload, thunkAPI) => {
    try {
      const encryptedPayload = await encryptData(payload);

      const response = await apiService.postProtected(
        APIEndpoint.transaction.generateInvoice,
        encryptedPayload,
      );

      if (response.data.statusCode === 200) {
        let resData = response.data.data;

        const decruptedPayload = await decryptData(resData.data);

        return {
          statusCode: 200,
          htmlContent: decruptedPayload,
        };
      } else {
        return false;
      }
    } catch (error) {
      console.error('UploadDailyVersesAPI_Failed', error.response);
      return false;
    }
  },
);

export {
  getTranscHistoryAPIHandler,
  createTransactionAPIHandler,
  generateInvoiceAPIHandler,
};
