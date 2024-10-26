import {combineReducers} from 'redux';
import authSlice from './Auth/index'; // Import your slice
import profileSlice from './Profile/index'; // Import your slice
const rootReducer = combineReducers({
  user: authSlice,
  profile: profileSlice,
  // Add other reducers here
});

export default rootReducer;
