import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Menu, Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import theme from '../utility/theme';
import {fonts} from 'react-native-elements/dist/config';
import {getFontSize, getResHeight} from '../utility/responsive';

const SmallMenuComp = ({buttonLabel, menuItems, onMenuPress}) => {
  const [visible, setVisible] = useState(false);
  let {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      style={{
        borderRadius: 100,
        // backgroundColor:"red"
      }}
      contentStyle={{
        backgroundColor: currentTextColor,
        // borderWidth:1,
        // borderColor:currentTextColor,
        borderRadius: 10,
        marginVertical: 0,
      }}
      anchor={buttonLabel(openMenu)}>
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          <Menu.Item
            onPress={() => {
              onMenuPress(item);
              closeMenu();
            }}
            titleStyle={{
              margin: 0,
              fontFamily: theme.font.medium,
              fontSize: getFontSize(1.8),
              color: currentBgColor,
              padding: 0,
            }}
            title={item.title}
          />
          {item.isDivider && <Divider />}
        </React.Fragment>
      ))}
    </Menu>
  );
};

export default SmallMenuComp;
