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
  let {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  return (
    <>
      <Drawer.Navigator
        // initialRouteName={'Home'}
        drawerContent={props => <DrawerItems {...props} />}
        swipeable={false}
        // drawerType="permanent"
        screenOptions={{
          // headerShown: false,
          drawerStyle: {
            backgroundColor: currentBgColor,
            width: '70%',
            // borderBottomRightRadius: 20,
            // borderTopRightRadius:20,
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
            <Drawer.Screen
              name="AdminManagment"
              component={AllScreens.AdminManagment}
              options={{
                headerShadowVisible: false,
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="Members"
              component={AllScreens.Members}
              options={{
                headerShadowVisible: false,
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="AdminContact"
              component={AllScreens.AdminContact}
              options={{
                headerShadowVisible: false,
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="ChurchMap"
              component={AllScreens.ChurchMap}
              options={{
                headerShadowVisible: false,
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="DailyVerse"
              component={AllScreens.DailyVerse}
              options={{
                headerShadowVisible: false,
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="AdminResource"
              component={AllScreens.AdminResource}
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

        <Drawer.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="AddMemberForm"
          component={AllScreens.AddMemberForm}
          options={{
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="FreeResource"
          component={AllScreens.FreeResource}
          options={{
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Events"
          component={AllScreens.Events}
          options={{
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="ContactWithUs"
          component={AllScreens.ContactWithUs}
          options={{
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Feedback"
          component={AllScreens.Feedback}
          options={{
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="UserNotification"
          component={AllScreens.UserNotification}
          options={{
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </>
  );
}
