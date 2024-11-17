import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  getLanguage: [],
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLangues(state, action) {
      state.getLanguage = action.payload;
    },
  },
});

export const {setLangues} = languageSlice.actions;
export default languageSlice.reducer;
