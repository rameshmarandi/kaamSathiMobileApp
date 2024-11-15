import {createAsyncThunk} from '@reduxjs/toolkit';
import apiService from '../../../API/apiClient';
import APIEndpoint from '../../../API/ApiEndpoints';
import {store} from '../../store';
import {setDailyVerses, setScheduledVerses} from '.';

const uploadDailyVersesAPIHander = createAsyncThunk(
  APIEndpoint.dailyVerses.uploadPoster,
  async (payload, thunkAPI) => {
    try {
      const formData = new FormData();

      // Loop through the payload
      for (const key in payload) {
        if (payload[key] !== undefined) {
          // Check if the field is an image, like avatar or coverImage
          if (
            (key === 'hindiImg' ||
              key === 'englishImg' ||
              key === 'marathiImg') &&
            payload[key]?.uri
          ) {
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

      const response = await apiService.postProtectedFormData(
        APIEndpoint.dailyVerses.uploadPoster,

        formData,
      );
      console.log('API_SES', response, response.data);
      if (response.data.statusCode === 200) {
        thunkAPI.dispatch(getScheduleVersesAPIHander());
        return true;
      }
    } catch (error) {
      console.error('register_API_Failed', error.response);
      // return error.response.data;
    }
  },
);
const getScheduleVersesAPIHander = createAsyncThunk(
  APIEndpoint.dailyVerses.getSchdulePoster,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.getProtected(
        APIEndpoint.dailyVerses.getSchdulePoster,
      );
      console.log('API_SES_schedues', response.data);
      if (response.data.statusCode === 200) {
        thunkAPI.dispatch(setScheduledVerses(response.data.data));
        return true;
      }
    } catch (error) {
      // console.error('register_API_Failed', error.response);
      // return error.response.data;
    }
  },
);
const getDailyVersesAPIHander = createAsyncThunk(
  APIEndpoint.dailyVerses.getDailyVersePoster,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.getProtected(
        APIEndpoint.dailyVerses.getDailyVersePoster,
      );
      console.log('API_SES_schedues', response.data);
      if (response.data.statusCode === 200) {
        thunkAPI.dispatch(setDailyVerses(response.data.data));
        return true;
      }
    } catch (error) {
      // console.error('register_API_Failed', error.response);
      // return error.response.data;
    }
  },
);
const deleteSchedulePostAPIHander = createAsyncThunk(
  APIEndpoint.dailyVerses.deletePoster,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.postProtected(
        APIEndpoint.dailyVerses.deletePoster,
        payload,
      );
      console.log('API_SES_schedues', response.data);
      if (response.data.statusCode === 200) {
        thunkAPI.dispatch(getScheduleVersesAPIHander());
        return true;
      }
    } catch (error) {
      console.error('register_API_Failed', error.response);
      // return error.response.data;
    }
  },
);

export {
  uploadDailyVersesAPIHander,
  getScheduleVersesAPIHander,
  deleteSchedulePostAPIHander,
  getDailyVersesAPIHander,
};
