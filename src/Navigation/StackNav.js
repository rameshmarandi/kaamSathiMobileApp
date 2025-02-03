import React from 'react';
import AllScreens from '../Screens/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {transitionCard, screenOptions} from './NavigationSettings';

const Stack = createNativeStackNavigator();

export function HomeStack(props) {
  return (
    <>
      <Stack.Navigator screenOptions={{...transitionCard, ...screenOptions}}>
        <Stack.Screen name={'HomePage'} component={AllScreens.HomePage} />
        <Stack.Screen name={'SearchOnMap'} component={AllScreens.SearchOnMap} />
        <Stack.Screen
          name={'EmployeeProfileDetails'}
          component={AllScreens.EmployeeProfileDetails}
        />
        <Stack.Screen
          name={'EmployeeFound'}
          component={AllScreens.EmployeeFound}
        />
      </Stack.Navigator>
    </>
  );
}
export function AdminHomeStack(props) {
  return (
    <>
      <Stack.Navigator screenOptions={{...transitionCard, ...screenOptions}}>
        <Stack.Screen
          initialRouteName={'AdminDashboard'}
          name={'Dashboard'}
          component={AllScreens.AdminDashboard}
          // options={screenOptions}
        />
      </Stack.Navigator>
    </>
  );
}

export function ApprovalStack() {
  return (
    <>
      <Stack.Navigator screenOptions={{...transitionCard, ...screenOptions}}>
        <Stack.Screen
          name={'ApprovalScreen'}
          component={AllScreens.Approval}
          // options={screenOptions}
        />
      </Stack.Navigator>
    </>
  );
}
