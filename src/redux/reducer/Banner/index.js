import {createSlice} from '@reduxjs/toolkit';
import theme from '../../../utility/theme';

const initialState = {
  getBanner: [],
  adminGetBanner: [],
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setGetBanner(state, action) {
      state.getBanner = action.payload;
    },
    setAdminGetBanner(state, action) {
      state.adminGetBanner = action.payload;
    },
  },
});

export const {setGetBanner, setAdminGetBanner} = bannerSlice.actions;
export default bannerSlice.reducer;
