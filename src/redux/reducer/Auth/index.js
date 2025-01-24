import {createSlice} from '@reduxjs/toolkit';
import theme from '../../../utility/theme';

const initialState = {
  isDarkMode: true, // Assuming you have user data,
  isAdmin: false,
  userLocation: {
    coordinate: '',
    address: '',
  },
  loginUser: [],
  currentTextColor: theme.color.charcolBlack,
  currentBgColor: theme.color.white,
  logedInuserType: '',
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDarkMode(state, action) {
      state.isDarkMode = action.payload;
    },
    setLoginUser(state, action) {
      state.loginUser = action.payload;
    },
    setTextColor(state, action) {
      state.currentTextColor = action.payload;
    },
    setUserLocation(state, action) {
      state.userLocation = {
        coordinate: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
        address: action.payload.address,
      };
    },
    setBackgroundColor(state, action) {
      state.currentBgColor = action.payload;
    },
    setAdmin(state, action) {
      state.isAdmin = action.payload;
    },
    setLogedInUserType(state, action) {
      state.logedInuserType = action.payload;
    },
  },
});

export const {
  setLoginUser,
  setDarkMode,
  setAdmin,
  setTextColor,
  setLogedInUserType,
  setUserLocation,
  setBackgroundColor,
} = authSlice.actions;
export default authSlice.reducer;
