import {combineReducers} from 'redux';
import authSlice from './Auth/index'; // Import your slice
import profileSlice from './Profile/index'; // Import your slice
import churchBranchSlice from './ChurchBranch/index';
import dailyVersesSlice from './DailyVerses/index';
import languageSlice from './Languages/index';
import resourceSlice from './Resources/index';
const rootReducer = combineReducers({
  user: authSlice,
  profile: profileSlice,
  churchBranch: churchBranchSlice,
  dailyVerses: dailyVersesSlice,
  languges: languageSlice,
  resource: resourceSlice,
  // Add other reducers here
});

export default rootReducer;
