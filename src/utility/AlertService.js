import {Alert} from 'react-native';
import {NavigationRef} from '../Navigation/NavigationService';

export const showLoginAlert = () => {
  Alert.alert(
    'Login Required',
    'You need to log in to access this section. Do you want to log in now?',
    [
      {text: 'No', style: 'cancel'},
      {
        text: 'Yes',
        onPress: () => NavigationRef.current?.navigate('LoginPage'),
      },
    ],
  );
};
