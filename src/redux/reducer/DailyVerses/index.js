import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  getTodayVerses: [],
  getScheduledVerses: [],
};

const dailyVersesSlice = createSlice({
  name: 'dailyVerses',
  initialState,
  reducers: {
    setTodayVerses(state, action) {
      state.getTodayVerses = action.payload;
    },
    setScheduledVerses(state, action) {
      state.getScheduledVerses = action.payload;
    },
  },
});

export const {setTodayVerses, setScheduledVerses} = dailyVersesSlice.actions;
export default dailyVersesSlice.reducer;
