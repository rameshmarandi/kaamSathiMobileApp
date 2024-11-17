import {createAsyncThunk} from '@reduxjs/toolkit';
import apiService from '../../../API/apiClient';
import APIEndpoint from '../../../API/ApiEndpoints';
import {setLangues} from '.';

const createLanguageAPIHander = createAsyncThunk(
  APIEndpoint.language.createLanguage,
  async (payload, thunkAPI) => {
    try {
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

export {createLanguageAPIHander, getLanguageAPIHander};
