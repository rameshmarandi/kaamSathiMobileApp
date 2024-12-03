import {combineReducers} from 'redux';
import authSlice from './Auth/index'; // Import your slice
import profileSlice from './Profile/index'; // Import your slice
import churchBranchSlice from './ChurchBranch/index';
import dailyVersesSlice from './DailyVerses/index';
import languageSlice from './Languages/index';
import resourceSlice from './Resources/index';
import transactionSlice from './Transactions/index';
import notificationSlice from './Notification/index';
const rootReducer = combineReducers({
  user: authSlice,
  profile: profileSlice,
  churchBranch: churchBranchSlice,
  dailyVerses: dailyVersesSlice,
  languges: languageSlice,
  resource: resourceSlice,
  transaction: transactionSlice,
  notification: notificationSlice,
  // Add other reducers here
});

export default rootReducer;
