import {createAsyncThunk} from '@reduxjs/toolkit';
import apiService from '../../../API/apiClient';
import APIEndpoint from '../../../API/ApiEndpoints';
import asyncStorageUtil from '../../../utility/asyncStorageUtil';
import StorageKeys from '../../../Config/StorageKeys';
import {setAdminGetBanner, setGetBanner} from '.';
import {store} from '../../store';

import {decryptData, encryptData} from '../../../utility/CryptoUtils';

const createBannerAPIHander = createAsyncThunk(
  APIEndpoint.bannerModule.createBanner,
  async (payload, thunkAPI) => {
    try {
      const formData = new FormData();

      // Loop through the payload
      for (const key in payload) {
        if (payload[key] !== undefined) {
          // Check if the field is an image, like avatar or coverImage
          if (key === 'bannerImage' && payload[key]?.uri) {
            formData.append(key, {
              uri: payload[key].uri.startsWith('file://')
                ? payload[key].uri
                : `file://${payload[key].uri}`, // Ensure URI has correct format
              name: payload[key].fileName || 'image.jpg', // Provide default name if not set
              type: payload[key].type || 'image/jpeg', // Default MIME type if not set
            });
          } else {
            formData.append(key, payload[key]);
          }
        }
      }
      //   const encryptedPayload = await encryptData(formData);

      //   console.log('register_payload_ecry', encryptedPayload);
      const response = await apiService.postPublicFormData(
        APIEndpoint.bannerModule.createBanner,
        // encryptedPayload,
        formData,
      );

      // Handle response
      console.log('registerAPIHandler_API_res', response.data);
      if (response.data.statusCode === 200) {
        return true; // Successfully registered
      }
    } catch (error) {
      console.log('register_API_Failed', error.response?.data || error.message);
      return error.response.data;
    }
  },
);

const getBannerAPIHander = createAsyncThunk(
  APIEndpoint.bannerModule.getBanner,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.getProtected(
        APIEndpoint.bannerModule.getBanner,
      );
      console.log('API_SES_schedues', response.data);
      if (response.data?.statusCode === 200) {
        const responseData = response.data.data;

        const responseDeData = decryptData(responseData.data);

        thunkAPI.dispatch(setGetBanner(responseDeData));
      }
      return true;
    } catch (error) {
      console.error('getBannerAPIHander_API_Failed', error.response);
      return error.response.data;
    }
  },
);
const adminGetBannerAPIHander = createAsyncThunk(
  APIEndpoint.bannerModule.getAdminBanner,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.getProtected(
        APIEndpoint.bannerModule.getAdminBanner,
      );

      if (response.data?.statusCode === 200) {
        const responseData = response.data;

        const responseDeData = decryptData(responseData.data);

        thunkAPI.dispatch(setAdminGetBanner(responseDeData));
      }
      return true;
    } catch (error) {
      console.error('getBannerAPIHander_API_Failed', error.response);
      return error.response.data;
    }
  },
);

export {createBannerAPIHander, getBannerAPIHander, adminGetBannerAPIHander};
