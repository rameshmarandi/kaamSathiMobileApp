import {createSlice} from '@reduxjs/toolkit';
import theme from '../../../utility/theme';

const initialState = {
  allMembers: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAllMembers(state, action) {
      state.allMembers = action.payload;
    },
  },
});

export const {setAllMembers} = profileSlice.actions;
export default profileSlice.reducer;
