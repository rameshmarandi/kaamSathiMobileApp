import {combineReducers} from 'redux';
import authSlice from './Auth/index'; // Import your slice
import profileSlice from './Profile/index'; // Import your slice
import churchBranchSlice from './ChurchBranch/index';
import dailyVersesSlice from './DailyVerses/index';
const rootReducer = combineReducers({
  user: authSlice,
  profile: profileSlice,
  churchBranch: churchBranchSlice,
  dailyVerses: dailyVersesSlice,
  // Add other reducers here
});

export default rootReducer;
