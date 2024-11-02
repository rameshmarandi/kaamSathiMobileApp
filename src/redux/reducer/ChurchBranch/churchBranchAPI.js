import {createAsyncThunk} from '@reduxjs/toolkit';
import apiService from '../../../API/apiClient';
import APIEndpoint from '../../../API/ApiEndpoints';
import {store} from '../../store';
import {setAllChurchBranch} from '.';

const createBranchAPIHander = createAsyncThunk(
  APIEndpoint.chruchBranch.createBranch,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.postProtected(
        APIEndpoint.chruchBranch.createBranch,
        payload,
      );

      console.log('API_CREATE_RES', response.status, response.data);

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
      const response = await apiService.postProtected(
        APIEndpoint.chruchBranch.updateBranch,
        payload,
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
        const afterFormatMembersData = formatUsersData(response.data.data);
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
      const response = await apiService.postProtected(
        APIEndpoint.chruchBranch.deleteBranch,
        payload,
      );

      console.log(
        'response.data.statusCode_at_dete',
        response.data.statusCode,
        response.data.data,
        response.data.data.length,
      );
      if (response.data.statusCode == 200) {
        const afterFormatMembersData = formatUsersData(response.data.data);

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
