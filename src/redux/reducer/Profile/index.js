import {createSlice} from '@reduxjs/toolkit';
import theme from '../../../utility/theme';

const initialState = {
  allMembers: [],
  getAllPendingUser: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAllMembers(state, action) {
      state.allMembers = action.payload;
    },
    setAllPendingUser(state, action) {
      state.getAllPendingUser = action.payload;
    },
  },
});

export const {setAllMembers, setAllPendingUser} = profileSlice.actions;
export default profileSlice.reducer;
