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

export const formatCurrency = amount => {
  if (isNaN(amount)) return 'Invalid amount';

  // Convert to string and ensure it's a valid number
  const amountStr = parseFloat(amount).toFixed(2).toString();

  // Split integer and decimal parts
  const [integerPart, decimalPart] = amountStr.split('.');

  // Use regex to format the integer part with commas as per Indian numbering
  const formattedInteger = integerPart.replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');

  return `${formattedInteger}`;
  // return `${formattedInteger}.${decimalPart}`;
};

export const generateMeaningfulAbbreviation = phrase => {
  const words = phrase.split(' ').filter(word => word.length > 0);

  if (words.length === 0) return '';

  if (words.length === 1) {
    const word = words[0];
    return word.slice(0, 2).toUpperCase(); // First two letters
  }

  // Generate abbreviation using the first two letters of each important word
  let abbreviation = words.map(word => word.slice(0, 2).toUpperCase()).join('');

  if (abbreviation.length < 4) {
    abbreviation += words[words.length - 1].charAt(1).toUpperCase(); // Add second letter of the last word
  }

  return abbreviation;
};
