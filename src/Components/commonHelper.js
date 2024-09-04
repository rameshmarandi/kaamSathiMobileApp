import theme from '../utility/theme';

import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

export const backgroundColorHandler = () => {
  let {isDarkMode} = useSelector(state => state.user);
  if (isDarkMode) {
    return theme.color.darkTheme;
  } else {
    return theme.color.white;
  }
};
export const checkIsDarkMode = () => {
  let {isDarkMode} = useSelector(state => state.user);
  if (isDarkMode) {
    return true;
  } else {
    return false;
  }
};

export const textColorHandler = () => {
  let {isDarkMode} = useSelector(state => state.user);
  if (isDarkMode) {
    return theme.color.white;
  } else {
    return theme.color.primary;
  }
};

export const dateFormatHander = (date, format) => {
  // Check if the date is valid
  if (!moment(date).isValid()) {
    return 'Invalid date';
  }

  // Return the formatted date
  return moment(date).format(format);
};
