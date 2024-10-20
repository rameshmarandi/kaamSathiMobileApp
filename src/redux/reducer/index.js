import {combineReducers} from 'redux';
import authSlice from './Auth/index'; // Import your slice

const rootReducer = combineReducers({
  user: authSlice,
  // Add other reducers here
});

export default rootReducer;
