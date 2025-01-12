import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNav from './TabNav';
import {HomeStack, SettingsStack} from './StackNav';
import DrawerItems from '../Screens/Drawer/DrawerItems';
import {useSelector} from 'react-redux';
import AllScreens from '../Screens/index';
const Drawer = createDrawerNavigator();

export default function DrawerStack(props) {
  const {isAdmin} = props;

  // let isAdmin = true;
  let {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  return (
    <>
      <Drawer.Navigator
        drawerContent={props => <DrawerItems {...props} />}
        swipeable={false}
        screenOptions={{
          drawerStyle: {
            backgroundColor: currentBgColor,
            width: '70%',

            overflow: 'hidden',
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                opacity: current.progress,
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}>
        {isAdmin ? (
          <>
            <Drawer.Screen
              name="Dashboard"
              component={TabNav}
              options={{
                headerShadowVisible: false,
                headerShown: false,
              }}
            />
          </>
        ) : (
          <Drawer.Screen
            name="Home"
            options={{
              headerShadowVisible: false,
              headerShown: false,
            }}
            component={HomeStack}
          />
        )}
      </Drawer.Navigator>
    </>
  );
}
