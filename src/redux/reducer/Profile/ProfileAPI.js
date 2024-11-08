import {createAsyncThunk} from '@reduxjs/toolkit';
import apiService from '../../../API/apiClient';
import APIEndpoint from '../../../API/ApiEndpoints';

import {
  setAdmin,
  setAllAdmins,
  setAllMembers,
  setAllPendingUser,
  setLoginUser,
  setMyAllFamilyMembers,
  setMyProfile,
} from '.';
import {
  calculateAge,
  capitalizeFirstLetter,
  checkIsAdmin,
  DateFormator,
} from '../../../Helpers/CommonHelpers';
import {decryptData} from '../../../utility/CryptoUtils';

const getAllMembersAPIHander = createAsyncThunk(
  APIEndpoint.admin.getAllMembers,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.getProtected(
        APIEndpoint.admin.getAllMembers,
      );

      // const responseData = decryptData(response.data.data); // Decrypt Data

      if (response.status === 200) {
        const responseData = response.data;
        const afterFormatMembersData = formatUsersData(responseData.data);

        thunkAPI.dispatch(setAllMembers(afterFormatMembersData.reverse()));
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

        thunkAPI.dispatch(setAllAdmins(afterFormatMembersData.reverse()));
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
  return users.map((user, index) => {
    console.log('Fall_Members_list', user.isFamilyMember);

    let UserBio = {
      'Full name': user.fullName,

      Gender: capitalizeFirstLetter(user.gender),
      // 'Church branch': '-', // Replace hre with church name
      'Date of birth': `${DateFormator(
        user.DOB,
        'DD MMM YYYY',
      )} ( ${calculateAge(user.DOB)} years old )`, // Format date as needed
      'Date of baptism': DateFormator(user.baptismDate, 'DD MMM YYYY') || 'N/A', // Format date as needed
      'Date of marriage':
        DateFormator(user.marriageDate, 'DD MMM YYYY') || 'N/A', // Format date as needed
      // Format date as needed
      Mobile: user.mobile || 'N/A',
      Email: user.email || 'N/A',
    };

    if (user.isFamilyMember) {
      UserBio = {
        ...UserBio,
        'Added by': capitalizeFirstLetter(user.familyMemberAddedBy),
        Relationship: capitalizeFirstLetter(user.relationToUser),
      };
    }
    return {
      id: user._id,
      avatar: user.avatar,
      branchName: user.branchName,
      role: user.role,
      isBlocked: user.isBlocked,
      isFamilyMemberUser: user.isFamilyMember,
      userBio: UserBio,
    };
  });
};
const formatFamilyMemberData = users => {
  return users.map((user, index) => {
    return {
      id: user._id,
      avatar: user.avatar,
      branchName: user.branchName,
      role: user.role,
      isBlocked: user.isBlocked,
      userBio: {
        'Full name': capitalizeFirstLetter(user.fullName),
        'Added by': capitalizeFirstLetter(user.familyMemberAddedBy),
        Relationship: capitalizeFirstLetter(user.relationToUser),
        // 'Church branch': '-', // Replace hre with church name
        Gender: capitalizeFirstLetter(user.gender),
        'Date of birth': `${DateFormator(
          user.DOB,
          'DD MMM YYYY',
        )} ( ${calculateAge(user.DOB)} years old )`, // Format date as needed
        'Date of baptism':
          DateFormator(user.baptismDate, 'DD MMM YYYY') || 'N/A', // Format date as needed
        'Date of marriage':
          DateFormator(user.marriageDate, 'DD MMM YYYY') || 'N/A', // Format date as needed
      },
    };
  });
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
const myProfileAPIHander = createAsyncThunk(
  APIEndpoint.admin.myProfile,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.getProtected(
        APIEndpoint.admin.myProfile,
      );
      console.log('My_Fapi_forils', response, response.data.statusCode);
      if (response.data.statusCode === 200) {
        const responseData = response.data;
        thunkAPI.dispatch(setMyProfile(responseData));
        console.log('My_Fapi', responseData);
        const afterFormatMembersData = formatFamilyMemberData(
          responseData.data.familyMembers,
        );

        thunkAPI.dispatch(
          setMyAllFamilyMembers(afterFormatMembersData.reverse()),
        );
      }
      return response.data.message;
    } catch (error) {
      console.log('blockMemberAPIHander_API_Faild', error.response);
      return error.response.data;
    }
  },
);
const updateProfilePicAPIHander = createAsyncThunk(
  APIEndpoint.admin.updateProfilePic,
  async (payload, thunkAPI) => {
    try {
      const formData = new FormData();

      // Loop through the payload
      for (const key in payload) {
        if (payload[key] !== undefined) {
          // Check if the field is an image, like avatar or coverImage
          if ((key === 'avatar' || key === 'coverImage') && payload[key]?.uri) {
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

      // Determine the API endpoint based on the payload key
      const apiEndpoint =
        'coverImage' in payload
          ? APIEndpoint.admin.updateCoverImage // Use a different endpoint for coverImage
          : APIEndpoint.admin.updateProfilePic;

      const response = await apiService.postProtectedFormData(
        apiEndpoint,
        formData,
      );
      console.log('_AFte_UPDATE_PROFILE', response, response.data.statusCode);
      if (response.data.statusCode === 200) {
        await thunkAPI.dispatch(myProfileAPIHander());
        return true;
      }
      return response.data.message;
    } catch (error) {
      console.log('blockMemberAPIHander_API_Faild', error.response);
      return error.response.data;
    }
  },
);

// Family API methods

const addFamilyAPIHander = createAsyncThunk(
  APIEndpoint.family.registerFamily,
  async (payload, thunkAPI) => {
    try {
      const formData = new FormData();

      // Loop through the payload
      for (const key in payload) {
        if (payload[key] !== undefined) {
          // Check if the field is an image, like avatar or coverImage
          if ((key === 'avatar' || key === 'coverImage') && payload[key]?.uri) {
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
        APIEndpoint.family.registerFamily,
        formData,
      );

      // Handle response
      console.log(
        'add_family_API_SES',
        response.data,
        response.data.statusCode,
      );
      if (response.data.statusCode === 200) {
        await thunkAPI.dispatch(myProfileAPIHander());
        return true; // Successfully registered
      }
    } catch (error) {
      console.log('register_API_Failed', error.response);
      return error.response.data;
    }
  },
);
const deleteFamilyAPIHander = createAsyncThunk(
  APIEndpoint.family.deleteFamily,
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.postProtected(
        APIEndpoint.family.deleteFamily,
        payload,
      );

      // Handle response
      console.log('registerAPIHandler_API_res', response.data);
      if (response.data.statusCode === 200) {
        await thunkAPI.dispatch(myProfileAPIHander());
        return true; // Successfully registered
      }
    } catch (error) {
      console.log('register_API_Failed', error.response);
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
  myProfileAPIHander,
  updateProfilePicAPIHander,

  // Family API HANDLERS
  addFamilyAPIHander,
  deleteFamilyAPIHander,
};
