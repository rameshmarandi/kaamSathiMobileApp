import {createAsyncThunk} from '@reduxjs/toolkit';
import apiService from '../../../API/apiClient';
import APIEndpoint from '../../../API/ApiEndpoints';
import {setResources} from '.';

const getResourceAPIHander = createAsyncThunk(
  APIEndpoint.resource.getResource,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.getPublic(
        APIEndpoint.resource.getResource,
      );

      if (response.data.statusCode === 200) {
        const resData = response.data.data;

        thunkAPI.dispatch(setResources(resData));
      }
      return response.data.message;
    } catch (error) {
      console.error('UploadDailyVersesAPI_Failed', error.response);
    }
  },
);
const deleteResourceAPIHander = createAsyncThunk(
  APIEndpoint.resource.deleteResouce,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.postProtected(
        APIEndpoint.resource.deleteResouce,
        payload,
      );

      if (response.data.statusCode === 200) {
        thunkAPI.dispatch(getResourceAPIHander());
      }
      return response.data.message;
    } catch (error) {
      console.error('UploadDailyVersesAPI_Failed', error.response);
    }
  },
);

export {getResourceAPIHander, deleteResourceAPIHander};
