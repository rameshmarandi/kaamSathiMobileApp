import {createAsyncThunk} from '@reduxjs/toolkit';
import apiService from '../../../API/apiClient';
import APIEndpoint from '../../../API/ApiEndpoints';
import {setResources} from '.';

const createResourceAPIHander = createAsyncThunk(
  APIEndpoint.resource.createResource,
  async (payload, thunkAPI) => {
    try {
      const formData = new FormData();

      for (const key in payload) {
        if (payload[key] !== undefined) {
          if ((key === 'document' || key === 'thumbnil') && payload[key]?.uri) {
            formData.append(key, {
              uri: payload[key].uri,
              name: payload[key].fileName || 'file.pdf', // Default file name
              type: payload[key].type || 'application/pdf', // Default MIME type for PDFs
            });
          } else {
            formData.append(key, payload[key]);
          }
        }
      }

      const response = await apiService.postProtectedFormData(
        APIEndpoint.resource.createResource,
        formData,
      );

      if (response.data.statusCode === 200) {
        thunkAPI.dispatch(getResourceAPIHander());

        return true;
      }
    } catch (error) {
      console.error('Upload Failed', error.response);
      // throw new Error('Failed to upload resource');
    }
  },
);

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
        return true;
      }
    } catch (error) {
      console.error('UploadDailyVersesAPI_Failed', error.response);
    }
  },
);

export {getResourceAPIHander, deleteResourceAPIHander, createResourceAPIHander};
