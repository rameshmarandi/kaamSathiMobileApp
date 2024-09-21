import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import theme from '../../utility/theme';
import MasterTextInput from '../../Components/MasterTextInput';
import {TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  handleEmailChange,
  handleNumberChange,
} from '../../Components/InputHandlers';
import Icon from 'react-native-vector-icons/FontAwesome'; // For icons

// Custom Hook for password validation with debounce
const usePasswordValidation = (password, delay = 500) => {
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

    return () => clearTimeout(handler); // Clean up
  }, [password, delay]);

  return validations;
};

// useEffect(() => {
//   setIsOTPFildVisible(false);
//   setIsChangePasswordVisible(false);
// }, []);
// PasswordCheckItem Component for each validation point
const PasswordCheckItem = ({isValid, label}) => (
  <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
    <Icon
      name={isValid ? 'check-circle' : 'times-circle'}
      size={20}
      color={isValid ? theme.color.green : theme.color.error}
    />
    <Text style={{marginLeft: 10}}>{label}</Text>
  </View>
);

const ForgotPassword = props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  const [isOTPFildVisible, setIsOTPFildVisible] = useState(false);
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const inputRefs = {
    email: useRef(null),
    password: useRef(null),
  };

  // Validation Schema for Formik
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    otp: Yup.string()
      .length(4, 'OTP must be 4 digits')
      .when('isOTPFildVisible', {
        is: true,
        then: Yup.string().required('OTP is required'),
      }),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      )
      .when('isChangePasswordVisible', {
        is: true,
        then: Yup.string().required('Password is required'),
      }),
    cpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .when('isChangePasswordVisible', {
        is: true,
        then: Yup.string().required('Confirm password is required'),
      }),
  });

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: currentBgColor}]}>
      <View style={styles.header}>
        <Text style={[styles.greetingText, {color: currentTextColor}]}>
          Hey there,
        </Text>
        <Text style={[styles.welcomeText, {color: currentTextColor}]}>
          Reset your password
        </Text>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <Formik
          initialValues={{email: '', password: '', cpassword: '', otp: ''}}
          validationSchema={validationSchema}
          onSubmit={(values, {resetForm}) => {
            if (isChangePasswordVisible) {
              resetForm(); // Reset form after submission
              setIsChangePasswordVisible(false);
              setIsOTPFildVisible(false);
              navigation.navigate('LoginPage');
            } else if (isOTPFildVisible) {
              setIsChangePasswordVisible(true);
              setIsOTPFildVisible(false);
            } else {
              setIsOTPFildVisible(true);
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => {
            const passwordValidations = usePasswordValidation(values.password); // Hook for validation

            const isFieldValid = field => touched[field] && !errors[field];

            return (
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}>
                <MasterTextInput
                  label="Email*"
                  placeholder="Enter email address"
                  ref={inputRefs.email}
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={text =>
                    setFieldValue('email', handleEmailChange(text))
                  }
                  onBlur={handleBlur('email')}
                  error={touched.email && errors.email}
                  isValid={isFieldValid('email')}
                  left={
                    <TextInput.Icon icon="email" color={currentTextColor} />
                  }
                />

                {isOTPFildVisible && (
                  <MasterTextInput
                    label="OTP"
                    placeholder="Enter email OTP"
                    ref={inputRefs.otp}
                    keyboardType="numeric"
                    value={values.otp}
                    maxLength={4}
                    onChangeText={text =>
                      setFieldValue('otp', handleNumberChange(text))
                    }
                    onBlur={handleBlur('otp')}
                    left={
                      <TextInput.Icon
                        icon="lock"
                        color={currentTextColor}
                        size={getFontSize(3)}
                      />
                    }
                  />
                )}
                {touched.otp && errors.otp && (
                  <Text style={styles.errorText}>{errors.otp}</Text>
                )}

                {isChangePasswordVisible && (
                  <>
                    <MasterTextInput
                      label="Password*"
                      placeholder="Enter your password"
                      secureTextEntry
                      ref={inputRefs.password}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={touched.password && errors.password}
                      left={
                        <TextInput.Icon icon="lock" color={currentTextColor} />
                      }
                    />

                    <MasterTextInput
                      label="Confirm Password*"
                      placeholder="Enter confirm password"
                      secureTextEntry
                      ref={inputRefs.cpassword}
                      value={values.cpassword}
                      onChangeText={handleChange('cpassword')}
                      onBlur={handleBlur('cpassword')}
                      error={touched.cpassword && errors.cpassword}
                      left={
                        <TextInput.Icon icon="lock" color={currentTextColor} />
                      }
                    />

                    {/* Password Validation Feedback */}
                    <View
                      style={{
                        marginTop: '5%',
                      }}>
                      <PasswordCheckItem
                        isValid={passwordValidations.hasUppercase}
                        label="At least one uppercase letter"
                      />
                      <PasswordCheckItem
                        isValid={passwordValidations.hasLowercase}
                        label="At least one lowercase letter"
                      />
                      <PasswordCheckItem
                        isValid={passwordValidations.hasNumber}
                        label="At least one number"
                      />
                      <PasswordCheckItem
                        isValid={passwordValidations.hasSpecialChar}
                        label="At least one special character (@, $, %, etc.)"
                      />
                      <PasswordCheckItem
                        isValid={passwordValidations.minLength}
                        label="Minimum 6 characters"
                      />
                    </View>
                  </>
                )}
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[
                    styles.loginButton,
                    {backgroundColor: currentTextColor},
                  ]}
                  onPress={handleSubmit}>
                  <Text
                    style={[styles.loginButtonText, {color: currentBgColor}]}>
                    {isOTPFildVisible ? 'Verify' : 'Submit'}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            );
          }}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    width: '90%',
    alignSelf: 'center',
  },
  scrollViewContent: {},
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getResHeight(4),
    marginTop: getResHeight(5),
  },
  greetingText: {
    fontFamily: theme.font.medium,
    fontSize: getFontSize(1.3),
  },
  welcomeText: {
    fontFamily: theme.font.bold,
    fontSize: getFontSize(2),
  },
  loginButton: {
    width: '95%',
    paddingVertical: '2.5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: getResWidth(10),
    marginTop: getResHeight(10),
  },
  loginButtonText: {
    fontFamily: theme.font.medium,
    fontSize: getFontSize(1.8),
  },
  errorText: {
    color: 'red',
    fontSize: getFontSize(1.2),
    marginTop: getResHeight(0.5),
  },
});

export default ForgotPassword;
