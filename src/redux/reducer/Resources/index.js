import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  getResource: [],
};

const resourceSlice = createSlice({
  name: 'resource',
  initialState,
  reducers: {
    setResources(state, action) {
      state.getResource = action.payload;
    },
  },
});

export const {setResources} = resourceSlice.actions;
export default resourceSlice.reducer;
