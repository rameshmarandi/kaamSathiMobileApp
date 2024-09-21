// PasswordUtils.js
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from './theme';

// Custom Hook: usePasswordValidation
export const usePasswordValidation = (password, delay = 500) => {
  const [validations, setValidations] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    minLength: false,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setValidations({
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[@$!%*?&]/.test(password),
        minLength: password.length >= 6,
      });
    }, delay);

    return () => clearTimeout(handler); // Cleanup
  }, [password, delay]);

  return validations;
};

// Component: PasswordCheckItem
export const PasswordCheckItem = ({isValid, label}) => (
  <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
    <Icon
      name={isValid ? 'check-circle' : 'times-circle'}
      size={20}
      color={isValid ? theme.color.green : theme.color.error}
    />
    <Text style={{marginLeft: 10}}>{label}</Text>
  </View>
);
