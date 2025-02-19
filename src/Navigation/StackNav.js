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
// export function AdminHomeStack(props) {
//   return (
//     <>
//       <Stack.Navigator screenOptions={{...transitionCard, ...screenOptions}}>
//         <Stack.Screen
//           initialRouteName={'AdminDashboard'}
//           name={'Dashboard'}
//           component={AllScreens.AdminDashboard}
//           // options={screenOptions}
//         />
//       </Stack.Navigator>
//     </>
//   );
// }
export function HistoryStack(props) {
  return (
    <>
      <Stack.Navigator screenOptions={{...transitionCard, ...screenOptions}}>
        <Stack.Screen
          initialRouteName={'BookedHistory'}
          name={'BookedHistory'}
          component={AllScreens.BookedHistory}
          // options={screenOptions}
        />
      </Stack.Navigator>
    </>
  );
}
export function BookMarksStack(props) {
  return (
    <>
      <Stack.Navigator screenOptions={{...transitionCard, ...screenOptions}}>
        <Stack.Screen
          initialRouteName={'BookMarks'}
          name={'BookMarks'}
          component={AllScreens.BookMarks}
          // options={screenOptions}
        />
      </Stack.Navigator>
    </>
  );
}

// Profile,
// BookedHistory,
// BookMarks
export function ProfileStack({navigation, route}) {
  return (
    <>
      <Stack.Navigator screenOptions={{...transitionCard, ...screenOptions}}>
        <Stack.Screen
          name={'Profile'}
          component={AllScreens.Profile}
          // options={screenOptions}
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
      </Stack.Navigator>
    </>
  );
}
