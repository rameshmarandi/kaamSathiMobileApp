import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  getTodayVerses: [],
  getScheduledVerses: [],
  dailyVerses: [],
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
    setDailyVerses(state, action) {
      state.dailyVerses = action.payload;
    },
  },
});

export const {setTodayVerses, setScheduledVerses, setDailyVerses} =
  dailyVersesSlice.actions;
export default dailyVersesSlice.reducer;
