import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  getNotification: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.getNotification = action.payload;
    },
  },
});

export const {setNotification} = notificationSlice.actions;
export default notificationSlice.reducer;
