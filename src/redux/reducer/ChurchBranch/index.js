import {createSlice} from '@reduxjs/toolkit';
import theme from '../../../utility/theme';

const initialState = {
  allChurchBranch: [],
};

const churchBranchSlice = createSlice({
  name: 'churchBranch',
  initialState,
  reducers: {
    setAllChurchBranch(state, action) {
      state.allChurchBranch = action.payload;
    },
  },
});

export const {setAllChurchBranch} = churchBranchSlice.actions;
export default churchBranchSlice.reducer;
