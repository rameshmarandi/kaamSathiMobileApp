import {createAsyncThunk} from '@reduxjs/toolkit';
import apiService from '../../../API/apiClient';
import APIEndpoint from '../../../API/ApiEndpoints';
import asyncStorageUtil from '../../../utility/asyncStorageUtil';
import StorageKeys from '../../../Config/StorageKeys';
import {setLoginUser} from '.';

const registerAPIHander = createAsyncThunk('', async (payload, thunkAPI) => {
  try {
    // const response = await API.portfolioRepository.getportfolioPreview(payload);
  } catch (error) {
    console.log('Something went wrong!');
  }
});
const loginAPIHander = createAsyncThunk(
  'user/login',
  async (payload, thunkAPI) => {
    try {
      console.log('LOGIN_REs_payload', payload);
      const response = await apiService.postPublic(
        APIEndpoint.user.login,
        payload,
      );
      if (response.status === 200) {
        const responseData = response.data;

        await asyncStorageUtil.setItem(
          StorageKeys.ACCESS_TOKEN,
          responseData.accessToken,
        );

        thunkAPI.dispatch(setLoginUser(responseData.data));
      }
      return true;
    } catch (error) {
      console.error('Login_api_failed', error);
      return dalse;
    } finally {
    }
  },
);

export {registerAPIHander, loginAPIHander};
