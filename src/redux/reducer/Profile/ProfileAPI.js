import {createAsyncThunk} from '@reduxjs/toolkit';
import apiService from '../../../API/apiClient';
import APIEndpoint from '../../../API/ApiEndpoints';
import asyncStorageUtil from '../../../utility/asyncStorageUtil';
import StorageKeys from '../../../Config/StorageKeys';
import {setAdmin, setAllMembers, setLoginUser} from '.';
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

const formatUsersData = users => {
  return users.map((user, index) => ({
    id: user._id,
    avatar: user.avatar,
    userBio: {
      'Full name': user.fullName,
      'Church branch': '-', // Replace hre with church name
      'Date of birth': DateFormator(user.DOB, 'DD MMM YYYY'), // Format date as needed
      'Date of baptism': DateFormator(user.baptismDate, 'DD MMM YYYY'), // Format date as needed
      'Date of marriage': DateFormator(user.marriageDate, 'DD MMM YYYY'), // Format date as needed
      Mobile: user.mobile,
      Email: user.email,
    },
  }));
};

export {getAllMembersAPIHander};
