import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNav from './TabNav';
import {HomeStack, SettingsStack} from './StackNav';
import DrawerItems from '../Screens/Drawer/DrawerItems';
import {useSelector} from 'react-redux';
import AllScreens from '../Screens/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenOptions, transitionCard} from './NavigationSettings';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
export default function DrawerStack(props) {
  // const {isAdmin} = props;

  let isAdmin = true;
  //  true; // registerd user

  let {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  // first

  return (
    <>
      {/* {isAdmin ? (
        <>
          <TabNav />
        </>
      ) : (
        <> */}
      {/* <TabNav /> */}
      <Stack.Navigator screenOptions={{...transitionCard, ...screenOptions}}>
        <Stack.Screen
          name="Home"
          options={{
            headerShadowVisible: false,
            headerShown: false,
          }}
          component={TabNav}
        />
        {/* auth stack  start*/}
        <Stack.Screen name={'LoginPage'} component={AllScreens.LoginPage} />
        <Stack.Screen
          name={'Registration'}
          component={AllScreens.Registration}
        />
        {/* auth stack  end*/}
        <Stack.Screen name={'SearchOnMap'} component={AllScreens.SearchOnMap} />
        <Stack.Screen
          name={'EmployeeProfileDetails'}
          component={AllScreens.EmployeeProfileDetails}
        />

        <Stack.Screen
          name={'EmployeeFound'}
          component={AllScreens.EmployeeFound}
        />

        <Stack.Screen
          name={'ProfileDetails'}
          component={AllScreens.ProfileDetails}
          options={screenOptions}
        />
        <Stack.Screen
          name={'EditProfile'}
          component={AllScreens.EditProfile}
          options={screenOptions}
        />
        <Stack.Screen
          name={'HelpSupport'}
          component={AllScreens.HelpSupport}
          options={screenOptions}
        />
        <Stack.Screen
          name={'ChangePassword'}
          component={AllScreens.ChangePassword}
          options={screenOptions}
        />
        <Stack.Screen
          name={'PaymentHistory'}
          component={AllScreens.PaymentHistory}
          options={screenOptions}
        />
        <Stack.Screen
          name={'PrivacyPolicy'}
          component={AllScreens.PrivacyPolicy}
          options={screenOptions}
        />
        <Stack.Screen
          name={'Notification'}
          component={AllScreens.Notification}
          options={screenOptions}
        />
      </Stack.Navigator>
      {/* </>
      )} */}
      {/* <Drawer.Navigator
        drawerContent={props => <DrawerItems {...props} />}
        swipeable={false}
        screenOptions={{
          gestureEnabled: false,
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
          
        )}
      </Drawer.Navigator> */}
    </>
  );
}
