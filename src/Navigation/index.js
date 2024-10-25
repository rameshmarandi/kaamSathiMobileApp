import React from 'react';

import DrawerStack from './DrawerStack';
import {useSelector} from 'react-redux';

export default function MainNavigation(props) {
  // const {isAdmin} = props;
  let {isDarkMode, currentBgColor, isAdmin, currentTextColor} = useSelector(
    state => state.user,
  );

  return (
    <>
      <DrawerStack isAdmin={isAdmin} />
    </>
  );
}
