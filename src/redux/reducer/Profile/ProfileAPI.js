import {createAsyncThunk} from '@reduxjs/toolkit';
import apiService from '../../../API/apiClient';
import APIEndpoint from '../../../API/ApiEndpoints';
import asyncStorageUtil from '../../../utility/asyncStorageUtil';
import StorageKeys from '../../../Config/StorageKeys';
import {
  setAdmin,
  setAllAdmins,
  setAllMembers,
  setAllPendingUser,
  setLoginUser,
} from '.';
import {store} from '../../store';
import {checkIsAdmin, DateFormator} from '../../../Helpers/CommonHelpers';

const getAllMembersAPIHander = createAsyncThunk(
  APIEndpoint.admin.getAllMembers,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.getProtected(
        APIEndpoint.admin.getAllMembers,
      );

      if (response.status === 200) {
        const responseData = response.data;
        const afterFormatMembersData = formatUsersData(responseData.data);

        thunkAPI.dispatch(setAllMembers(afterFormatMembersData));
      }
      return true;
    } catch (error) {
      console.log('Get_all_members_API_Faild', error.response);
      return error.response.data;
    }
  },
);
const getAllAdminsAPIHander = createAsyncThunk(
  APIEndpoint.admin.getAllBranchAdmins,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.getProtected(
        APIEndpoint.admin.getAllBranchAdmins,
      );

      if (response.status === 200) {
        const responseData = response.data;
        const afterFormatMembersData = formatUsersData(responseData.data);

        thunkAPI.dispatch(setAllAdmins(afterFormatMembersData));
      }
      return true;
    } catch (error) {
      console.log('Get_all_members_API_Faild', error.response);
      thunkAPI.dispatch(setAllAdmins([]));
      return error.response.data;
    }
  },
);
const getNewApplicationAPIHander = createAsyncThunk(
  APIEndpoint.admin.getNewApplication,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.getProtected(
        APIEndpoint.admin.getNewApplication,
      );

      if (response.status === 200) {
        const responseData = response.data.data;

        thunkAPI.dispatch(setAllPendingUser(responseData));
      }
      return true;
    } catch (error) {
      console.log('getNewApplicationAPIHander_API_Faild', error.response);
      return error.response.data;
    }
  },
);

const updateApplicationStatusAPIHander = createAsyncThunk(
  APIEndpoint.admin.updateApplicationStatus,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.postProtected(
        APIEndpoint.admin.updateApplicationStatus,
        payload,
      );

      if (response.status === 200) {
        const responseData = response.data.data;

        thunkAPI.dispatch(setAllPendingUser(responseData));
      }
      return true;
    } catch (error) {
      console.log('updateApplicationStatusAPIHander_API_Faild', error.response);
      return error.response.data;
    }
  },
);

const formatUsersData = users => {
  return users.map((user, index) => ({
    id: user._id,
    avatar: user.avatar,
    branchName: user.branchName,
    role: user.role,
    isBlocked: user.isBlocked,
    userBio: {
      'Full name': user.fullName,
      // 'Church branch': '-', // Replace hre with church name
      'Date of birth': DateFormator(user.DOB, 'DD MMM YYYY'), // Format date as needed
      'Date of baptism': DateFormator(user.baptismDate, 'DD MMM YYYY'), // Format date as needed
      'Date of marriage': DateFormator(user.marriageDate, 'DD MMM YYYY'), // Format date as needed
      Mobile: user.mobile,
      Email: user.email,
    },
  }));
};

const updateUserRolesAPIHander = createAsyncThunk(
  APIEndpoint.admin.updateUserRoles,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.postProtected(
        APIEndpoint.admin.updateUserRoles,
        payload,
      );
      if (response.status === 200) {
        thunkAPI.dispatch(getAllMembersAPIHander());
        thunkAPI.dispatch(getAllAdminsAPIHander());
      }
      return true;
    } catch (error) {
      console.log('updateUserRolesAPIHander_API_Faild', error.response);
      return error.response.data;
    }
  },
);
const deleteUserAPIHander = createAsyncThunk(
  APIEndpoint.admin.deleteUser,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.postProtected(
        APIEndpoint.admin.deleteUser,
        payload,
      );
      if (response.status === 200) {
        thunkAPI.dispatch(getAllMembersAPIHander());
        thunkAPI.dispatch(getAllAdminsAPIHander());
      }
      return true;
    } catch (error) {
      console.log('updateUserRolesAPIHander_API_Faild', error.response);
      return error.response.data;
    }
  },
);
const blockUserAPIHander = createAsyncThunk(
  APIEndpoint.admin.blockMember,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.postProtected(
        APIEndpoint.admin.blockMember,
        payload,
      );
      console.log('User_Blocked_response', response.data.message);
      if (response.status === 200) {
        thunkAPI.dispatch(getAllMembersAPIHander());
        thunkAPI.dispatch(getAllAdminsAPIHander());
      }
      return response.data.message;
    } catch (error) {
      console.log('blockMemberAPIHander_API_Faild', error.response);
      return error.response.data;
    }
  },
);
export {
  getAllMembersAPIHander,
  getNewApplicationAPIHander,
  updateApplicationStatusAPIHander,
  getAllAdminsAPIHander,
  updateUserRolesAPIHander,
  deleteUserAPIHander,
  blockUserAPIHander,
};
