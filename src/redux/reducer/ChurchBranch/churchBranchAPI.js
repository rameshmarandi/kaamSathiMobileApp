import {createAsyncThunk} from '@reduxjs/toolkit';
import apiService from '../../../API/apiClient';
import APIEndpoint from '../../../API/ApiEndpoints';
import {store} from '../../store';
import {setAllChurchBranch} from '.';
import {decryptData, encryptData} from '../../../utility/CryptoUtils';

const createBranchAPIHander = createAsyncThunk(
  APIEndpoint.chruchBranch.createBranch,
  async (payload, thunkAPI) => {
    try {
      const encryptedPayload = await encryptData(payload);
      const response = await apiService.postProtected(
        APIEndpoint.chruchBranch.createBranch,
        encryptedPayload,
      );

      if (response.data.statusCode === 200) {
        thunkAPI.dispatch(getBranchAPIHander());
        return response.data;
      }
    } catch (error) {
      console.log('Loing_API_Faild', error.response);
      return error.response.data;
    }
  },
);
const updateBranchAPIHander = createAsyncThunk(
  APIEndpoint.chruchBranch.updateBranch,
  async (payload, thunkAPI) => {
    try {
      const encryptedPayload = await encryptData(payload);

      const response = await apiService.postProtected(
        APIEndpoint.chruchBranch.updateBranch,
        encryptedPayload,
      );

      if (response.data.statusCode === 200) {
        thunkAPI.dispatch(getBranchAPIHander());
        return response.data;
      }
    } catch (error) {
      console.log('Loing_API_Faild', error.response);
      return error.response.data;
    }
  },
);
const getBranchAPIHander = createAsyncThunk(
  APIEndpoint.chruchBranch.getAllBranches,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.getPublic(
        APIEndpoint.chruchBranch.getAllBranches,
      );

      if (response.data.statusCode == 200) {
        const responseData = response.data.data;

        const decryptedPayload = await decryptData(responseData.data);

        const afterFormatMembersData = formatUsersData(decryptedPayload);
        store.dispatch(setAllChurchBranch(afterFormatMembersData.reverse()));
      }
    } catch (error) {
      console.log('getBranch_API_Faild', error.response);
      return error.response.data;
    }
  },
);
const deletBranchAPIHander = createAsyncThunk(
  APIEndpoint.chruchBranch.deleteBranch,
  async (payload, thunkAPI) => {
    try {
      const encryptedPayload = await encryptData(payload);
      const response = await apiService.postProtected(
        APIEndpoint.chruchBranch.deleteBranch,
        encryptedPayload,
      );

      if (response.data.statusCode == 200) {
        const responseData = response.data.data;

        const decryptedPayload = await decryptData(responseData.data);

        const afterFormatMembersData = formatUsersData(decryptedPayload);

        store.dispatch(setAllChurchBranch(afterFormatMembersData));
        return true;
      }
    } catch (error) {
      console.log('deletBranchAPIHander_API_Faild', error.response);
      return error.response.data;
    }
  },
);

const formatUsersData = users => {
  return users.map((item, index) => ({
    id: item._id,

    churchDetails: {
      'Branch name': item.branchName,
      'Branch address': item.branchAddress ? item.branchAddress : 'N/A',
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
    },
  }));
};
export {
  createBranchAPIHander,
  getBranchAPIHander,
  updateBranchAPIHander,
  deletBranchAPIHander,
};
