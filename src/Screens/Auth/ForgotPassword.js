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
import {
  PasswordCheckItem,
  usePasswordValidation,
} from '../../utility/PasswordUtils';
import {forgotPasswordValidation} from '../../utility/theme/validation';
import {useFocusEffect} from '@react-navigation/native';
import OTPInput from '../../Components/OTPInput';
const ForgotPassword = props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  const passwordInputRef = useRef(null);
  const otpInputRef = useRef(null);

  const [isOTPFildVisible, setIsOTPFildVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const inputRefs = {
    email: useRef(null),
    password: useRef(null),
  };

  const verifyOtpExternally = () => {
    if (otpInputRef.current) {
      otpInputRef.current.verifyOtp(); // Trigger OTP verification
    }
  };

  const handleOtpComplete = ({otp, isConfirmed}) => {
    console.log('Is_confirmed:', otp);
    if (isConfirmed) {
      // if (isVerifyMPINVisible) {
      //   verifyMPINApiHandler(otp);
      // }
      // if (isSetMPINVisible) {
      //   // setMPINApiHandler(otp);
      // }
      console.log('OTP confirmed successfully:', otp);
      // Handle the successful OTP confirmation here
    } else {
      console.log('OTP does not match:', otp);
      // Handle the failed OTP confirmation here
    }
  };

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
          // validationSchema={forgotPasswordValidation}

          validationSchema={forgotPasswordValidation} // Ensure this is set
          validateOnChange={true} // Change this to true for immediate validation
          validateOnBlur={true} // Change this to true for validation on blur
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
            resetForm,
            setFieldValue,
          }) => {
            const passwordValidations = usePasswordValidation(values.password); // Hook for validation
            const isLoginDisabled = Object.keys(errors).length > 0;

            const isFieldValid = field => touched[field] && !errors[field];
            useFocusEffect(
              React.useCallback(() => {
                resetForm();
              }, [resetForm]),
            );
            if (values.email == '') {
              setIsOTPFildVisible(false);
            }
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
                  onChangeText={text => {
                    setFieldValue('email', handleEmailChange(text));
                  }}
                  onBlur={handleBlur('email')}
                  error={touched.email && errors.email}
                  isValid={isFieldValid('email')}
                  left={
                    <TextInput.Icon icon="email" color={currentTextColor} />
                  }
                />

                {isOTPFildVisible && (
                  <OTPInput
                    ref={otpInputRef}
                    // label="Enter OTP"
                    length={4}
                    onComplete={handleOtpComplete}
                    // otpText="0"
                  />
                  // <MasterTextInput
                  //   label="OTP"
                  //   placeholder="Enter email OTP"
                  //   ref={inputRefs.otp}
                  //   keyboardType="numeric"
                  //   value={values.otp}
                  //   maxLength={4}
                  //   autoFocus
                  //   onChangeText={text =>
                  //     setFieldValue('otp', handleNumberChange(text))
                  //   }
                  //   onBlur={handleBlur('otp')}
                  //   left={
                  //     <TextInput.Icon
                  //       icon="lock"
                  //       color={currentTextColor}
                  //       size={getFontSize(3)}
                  //     />
                  //   }
                  // />
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
                      // ref={inputRefs.cpassword}
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
                  disabled={isLoginDisabled || isLoading}
                  style={[
                    styles.loginButton,
                    {backgroundColor: currentTextColor},
                    isLoading ||
                      (isLoginDisabled && {
                        opacity: 0.8,
                      }),
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    width: '95%',
    alignSelf: 'center',
  },
  scrollViewContent: {
    paddingHorizontal: '5%',
  },
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
    width: '100%',
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
