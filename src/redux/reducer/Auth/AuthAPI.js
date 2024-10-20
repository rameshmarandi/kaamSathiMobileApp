import {createAsyncThunk} from '@reduxjs/toolkit';

const registerAPIHander = createAsyncThunk('', async (payload, thunkAPI) => {
  try {
    // const response = await API.portfolioRepository.getportfolioPreview(payload);
  } catch (error) {
    console.log('Something went wrong!');
  }
});

export {registerAPIHander};
