import {createAsyncThunk} from '@reduxjs/toolkit';
import apiService from '../../../API/apiClient';
import APIEndpoint from '../../../API/ApiEndpoints';
import {setLangues} from '.';

const createLanguageAPIHander = createAsyncThunk(
  APIEndpoint.language.createLanguage,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.postProtected(
        APIEndpoint.language.createLanguage,
        payload,
      );

      console.log('Create_lng', response.data.statusCode);

      if (response.data.statusCode === 200) {
        thunkAPI.dispatch(getLanguageAPIHander());
        return true;
      }
      // return response.data.message;
    } catch (error) {
      console.error('UploadDailyVersesAPI_Failed', error.response);
    }
  },
);
const getLanguageAPIHander = createAsyncThunk(
  APIEndpoint.language.getLanguage,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.getPublic(
        APIEndpoint.language.getLanguage,
      );

      if (response.data.statusCode === 200) {
        const resData = response.data.data;

        thunkAPI.dispatch(setLangues(resData));
      }
      return response.data.message;
    } catch (error) {
      console.error('UploadDailyVersesAPI_Failed', error.response);
    }
  },
);
const updateLanguageAPIHander = createAsyncThunk(
  APIEndpoint.language.updateLanguage,
  async (payload, thunkAPI) => {
    try {
      console.log('Bef_re_pauload', payload);
      const response = await apiService.postProtected(
        APIEndpoint.language.updateLanguage,
        payload,
      );

      console.log('After_Update_res', response);
      if (response.data.statusCode === 200) {
        thunkAPI.dispatch(getLanguageAPIHander());
        return true;
      }
      return response.data.message;
    } catch (error) {
      console.error('UploadDailyVersesAPI_Failed', error.response);
    }
  },
);
const deleteLanguageAPIHander = createAsyncThunk(
  APIEndpoint.language.deleteLanguage,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.postProtected(
        APIEndpoint.language.deleteLanguage,
        payload,
      );

      if (response.data.statusCode === 200) {
        thunkAPI.dispatch(getLanguageAPIHander());
      }
      return response.data.message;
    } catch (error) {
      console.error('UploadDailyVersesAPI_Failed', error.response);
    }
  },
);

export {
  createLanguageAPIHander,
  updateLanguageAPIHander,
  getLanguageAPIHander,
  deleteLanguageAPIHander,
};
