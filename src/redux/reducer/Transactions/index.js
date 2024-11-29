import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  getTransactionHistory: [],
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactionHistory(state, action) {
      state.getTransactionHistory = action.payload;
    },
  },
});

export const {setTransactionHistory} = transactionSlice.actions;
export default transactionSlice.reducer;
