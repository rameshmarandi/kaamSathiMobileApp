import theme from '../utility/theme';

import {useSelector, useDispatch} from 'react-redux';

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
