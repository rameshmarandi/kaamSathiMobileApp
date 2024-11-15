import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  getTodayVerses: [],
  getScheduledVerses: [],
  dailyVerses: [],
  selectedDailyVerse: null,
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
    setSelectedDailyVerse(state, action) {
      state.selectedDailyVerse = action.payload;
    },
  },
});

export const {
  setTodayVerses,
  setSelectedDailyVerse,
  setScheduledVerses,
  setDailyVerses,
} = dailyVersesSlice.actions;
export default dailyVersesSlice.reducer;
