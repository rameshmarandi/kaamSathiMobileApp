import {createAsyncThunk} from '@reduxjs/toolkit';
import apiService from '../../../API/apiClient';
import APIEndpoint from '../../../API/ApiEndpoints';
import asyncStorageUtil from '../../../utility/asyncStorageUtil';
import StorageKeys from '../../../Config/StorageKeys';
import {setAdmin, setLoginUser} from '.';
import {store} from '../../store';
import {checkIsAdmin} from '../../../Helpers/CommonHelpers';

const registerAPIHander = createAsyncThunk('', async (payload, thunkAPI) => {
  try {
    // const response = await API.portfolioRepository.getportfolioPreview(payload);
  } catch (error) {
    console.log('Something went wrong!');
  }
});
const loginAPIHander = createAsyncThunk(
  APIEndpoint.user.login,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.postPublic(
        APIEndpoint.user.login,
        payload,
      );

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
  registerAPIHander,
  logoutAPIHander,
  loginAPIHander,
  removedUserData,
  forgotPasswordAPIHander,
};
