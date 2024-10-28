import {createSlice} from '@reduxjs/toolkit';
import theme from '../../../utility/theme';

const initialState = {
  allMembers: [],
  getAllPendingUser: [],
  allAdmins: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAllMembers(state, action) {
      state.allMembers = action.payload;
    },
    setAllAdmins(state, action) {
      state.allAdmins = action.payload;
    },
    setAllPendingUser(state, action) {
      state.getAllPendingUser = action.payload;
    },
  },
});

export const {setAllMembers, setAllPendingUser, setAllAdmins} =
  profileSlice.actions;
export default profileSlice.reducer;
