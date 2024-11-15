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
export const getShortTimeAgo = date => {
  const now = moment();
  const duration = moment.duration(now.diff(date));

  if (duration.asMinutes() < 1) {
    return 'Just now';
  } else if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())} min ago`; // e.g., 5m
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())} h ago`; // e.g., 3h
  } else if (duration.asDays() < 7) {
    return `${Math.floor(duration.asDays())} d ago`; // e.g., 1d
  } else if (duration.asWeeks() < 4) {
    return `${Math.floor(duration.asWeeks())} w ago`; // e.g., 2w
  } else if (duration.asMonths() < 12) {
    return `${Math.floor(duration.asMonths())} mo ago`; // e.g., 1mo
  } else {
    return `${Math.floor(duration.asYears())} y ago`; // e.g., 1y
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

export const checkIsNotEmptyArray = (arr = []) => {
  return Array.isArray(arr) && arr.length > 0;
};
