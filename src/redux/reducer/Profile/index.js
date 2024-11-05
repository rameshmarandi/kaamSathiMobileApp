import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  allMembers: [],
  getAllPendingUser: [],
  allAdmins: [],
  myFamilyMembers: [],
  myProfile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAllMembers(state, action) {
      state.allMembers = action.payload;
    },
    setMyAllFamilyMembers(state, action) {
      state.myFamilyMembers = action.payload;
    },
    setAllAdmins(state, action) {
      state.allAdmins = action.payload;
    },
    setMyProfile(state, action) {
      state.myProfile = action.payload;
    },

    setAllPendingUser(state, action) {
      state.getAllPendingUser = action.payload;
    },
  },
});

export const {
  setAllMembers,

  setMyAllFamilyMembers,
  setAllPendingUser,
  setAllAdmins,
  setMyProfile,
} = profileSlice.actions;
export default profileSlice.reducer;
