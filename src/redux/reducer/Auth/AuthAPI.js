import {createAsyncThunk} from '@reduxjs/toolkit';
import apiService from '../../../API/apiClient';
import APIEndpoint from '../../../API/ApiEndpoints';
import asyncStorageUtil from '../../../utility/asyncStorageUtil';
import StorageKeys from '../../../Config/StorageKeys';
import {setAdmin, setLoginUser} from '.';
import {store} from '../../store';
import {checkIsAdmin} from '../../../Helpers/CommonHelpers';

const registerAPIHander = createAsyncThunk(
  APIEndpoint.user.register,
  async (payload, thunkAPI) => {
    try {
      const formData = new FormData();

      // Loop through the payload
      for (const key in payload) {
        if (payload[key] !== undefined) {
          // Check if the field is an image, like avatar or coverImage
          if ((key === 'avatar' || key === 'coverImage') && payload[key]?.uri) {
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

      const response = await apiService.postPublicFormData(
        APIEndpoint.user.register,
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
const loginAPIHander = createAsyncThunk(
  APIEndpoint.user.login,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.postPublic(
        APIEndpoint.user.login,
        payload,
      );

      console.log('Login_API_res', response);
      if (response.status === 200) {
        const responseData = response.data;

        await asyncStorageUtil.setItem(
          StorageKeys.ACCESS_TOKEN,
          `${responseData.data.accessToken}`,
        );

        thunkAPI.dispatch(setLoginUser(responseData.data));
        checkIsAdmin();
      }
      return true;
    } catch (error) {
      console.log('Loing_API_Faild', error.response);
      return error.response.data;
    }
  },
);
const logoutAPIHander = createAsyncThunk(
  APIEndpoint.user.logout,
  async (payload, thunkAPI) => {
    try {
      removedUserData();
      console.log('LOgu_API_callined___');
      const response = await apiService.getPublic(APIEndpoint.user.logout);
      console.log('Logout_API_RES', response);

      // if (response.status === 200) {
      //   const responseData = response.data;

      //   await asyncStorageUtil.setItem(
      //     StorageKeys.ACCESS_TOKEN,
      //     responseData.accessToken,
      //   );

      //   thunkAPI.dispatch(setLoginUser(responseData.data));
      // }
      return true;
    } catch (error) {
      return error.response.data;
    }
  },
);
const forgotPasswordAPIHander = createAsyncThunk(
  APIEndpoint.user.forgotPassword,
  async (payload, thunkAPI) => {
    try {
      console.log('LOgu_API_callined___');
      const response = await apiService.postPublic(
        APIEndpoint.user.forgotPassword,
        payload,
      );
      console.log('fotgot_API_RES', response);

      // if (response.status === 200) {
      //   const responseData = response.data;

      //   await asyncStorageUtil.setItem(
      //     StorageKeys.ACCESS_TOKEN,
      //     responseData.accessToken,
      //   );

      //   thunkAPI.dispatch(setLoginUser(responseData.data));
      // }
      return true;
    } catch (error) {
      return error.response.data;
    }
  },
);
const generateOTPAPIHander = createAsyncThunk(
  APIEndpoint.user.generateOtp,
  async (payload, thunkAPI) => {
    try {
      console.log('LOgu_API_callined___', payload);
      const response = await apiService.postPublic(
        APIEndpoint.user.generateOtp,
        payload,
      );
      console.log('generateOTP_API_RES', response);

      if (response.data.statusCode == 200) {
        return response.data;
      }
    } catch (error) {
      console.log('OTP_gen_API_failed', error.response);
      return error.response.data;
    }
  },
);
const removedUserData = async () => {
  try {
    store.dispatch(setAdmin(false));
    await asyncStorageUtil.removeItem(StorageKeys.ACCESS_TOKEN);
    await asyncStorageUtil.removeItem(StorageKeys.REFRESH_TOKEN);
    store.dispatch(setLoginUser({}));
  } catch (error) {
    console.error('Rremoving_all_user_data_error', error);
  }
};
export {
  generateOTPAPIHander,
  registerAPIHander,
  logoutAPIHander,
  loginAPIHander,
  removedUserData,
  forgotPasswordAPIHander,
};
