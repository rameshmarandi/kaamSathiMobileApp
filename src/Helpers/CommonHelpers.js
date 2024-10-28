import {useSelector} from 'react-redux';

import asyncStorageUtil from '../utility/asyncStorageUtil';
import {store} from '../redux/store';
import {setAdmin, setLogedInUserType} from '../redux/reducer/Auth';
import moment from 'moment';
import StorageKeys from '../Config/StorageKeys';

export const updateState = newState =>
  setState(prevState => ({...prevState, ...newState}));

export const checkIsUserLoggedIn = async () => {
  try {
    const isUserLoggedIn = await asyncStorageUtil.getItem(
      `${StorageKeys.ACCESS_TOKEN}`,
    );

    if (isUserLoggedIn) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error checking user login status:', error);
  }
};
export const checkIsAdmin = async () => {
  // Destructure necessary values from the Redux store
  const {loginUser} = store.getState().user;

  // Check if loginUser is defined and has a user object
  if (loginUser && loginUser.user) {
    const userRole = loginUser.user.role; // Get the user's role
    store.dispatch(setLogedInUserType(userRole));
    // Check if the role matches either SUPER_ADMIN or BRANCH_ADMIN
    if (userRole === 'super_admin' || userRole === 'branch_admin') {
      store.dispatch(setAdmin(true));

      return true; // User is an admin
    } else {
      store.dispatch(setAdmin(false));
      return false; // User is not an admin
    }
  } else {
    return false; // No user is logged in
  }
};

export const DateFormator = (date, format) => {
  if (!date) {
    return ''; // Return empty string if no date is provided
  }

  return moment(date).format(format);
};
