import React, {useCallback, useRef, memo, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import theme from '../../utility/theme';
import MasterTextInput from '../../Components/MasterTextInput';
import {VectorIcon} from '../../Components/VectorIcon';
import LoginWithGoogle from '../../Components/LoginWithGoogle';
import {Formik} from 'formik';
import {handleNumberChange} from '../../Components/InputHandlers';

import {TextInput} from 'react-native-paper';

import {
  GoogleOneTapSignIn,
  statusCodes,
  isErrorWithCode,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

import {store} from '../../redux/store';
import ToastAlertComp from '../../Components/ToastAlertComp';
import {checkIsAdmin} from '../../Helpers/CommonHelpers';
import {loginValidationSchema} from '../../utility/theme/validation';
import {useFocusEffect} from '@react-navigation/native';
import {getBranchAPIHander} from '../../redux/reducer/ChurchBranch/churchBranchAPI';
import {CustomAlertModal} from '../../Components/commonComp';
import asyncStorageUtil from '../../utility/asyncStorageUtil';
import StorageKeys from '../../Config/StorageKeys';
import CustomButton from '../../Components/CustomButton';
import OTPInput from '../../Components/OTPInput';
import {setIsUserLoggedIn} from '../../redux/reducer/Auth';
import LottieView from 'lottie-react-native';

const AnimatedSlash = memo(() => {
  return (
    <View
      style={{
        height: getResHeight(35),
        width: getResWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        source={require('../../assets/animationLoader/login.json')}
        autoPlay
        loop
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </View>
  );
});

const LoginPage = props => {
  const {navigation} = props;
  const formRef = useRef(null);
  const formSubmitRef = useRef(null);

  const {isDarkMode, isAdmin, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpFiledVisible, setIsOtpFiledVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [addNewMemberModalVisible, setAddNewMemberModalVisible] =
    useState(false);
  const inputRefs = {
    email: useRef(null),
    password: useRef(null),
  };

  const handleClose = () => {
    setIsAlertVisible(false);
  };
  const otpRef = useRef(null);

  // Handle OTP completion
  const handleOTPComplete = ({otp, isConfirmed}) => {
    if (otp.length === 4) {
      if (formSubmitRef.current) {
        formSubmitRef.current(); // ✅ Calls Formik's handleSubmit
      } else {
        console.log('❌ handleSubmit is not ready yet');
      }
    }
  };

  const handleSubmit = async (values, {resetForm}) => {
    setIsLoading(true);

    if (isOtpFiledVisible) {
      setTimeout(() => {
        setIsLoading(false);
        store.dispatch(setIsUserLoggedIn(true));
        navigation.navigate('Home');
      }, 2000);
    } else {
      setTimeout(() => {
        setIsOtpFiledVisible(true);
        setIsLoading(false);
      }, 2000);
    }

    return;
    setIsLoading(true);

    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Form Submitted:', values);
      resetForm(); // Reset form after successful submission
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            // 'red',
            theme.color.whiteBg,
        },
      ]}>
      {/* <View>
        <CustomAlertModal
          visible={isAlertVisible}
          message={alertMessage}
          duration={4000} // duration in milliseconds
          onClose={handleClose}
        />
      </View> */}
      <AnimatedSlash />

      <Formik
        innerRef={formRef}
        initialValues={{phone: '', password: ''}}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
        // onSubmit={async (values, {resetForm}) => {
        //   setIsLoading(true);

        //   if (isOtpFiledVisible) {
        //     setTimeout(() => {
        //       setIsLoading(false);
        //       store.dispatch(setIsUserLoggedIn(true));
        //       navigation.navigate('Home');
        //     }, 2000);
        //   } else {
        //     setTimeout(() => {
        //       setIsOtpFiledVisible(true);
        //       setIsLoading(false);
        //     }, 2000);
        //   }

        //   return;
        //   try {
        //     setIsLoading(true);

        //     // setTimeout(() => {
        //     //   setIsOtpFiledVisible(true);
        //     //   setIsLoading(false);
        //     // }, 2000);

        //     return;
        //     const fcmToken = await asyncStorageUtil.getItem(
        //       StorageKeys.FCM_TOKEN,
        //     );
        //     console.log('FCM_tone_logi', fcmToken);
        //     const payload = {
        //       email: values.email,
        //       password: values.password,
        //       fcmToken: fcmToken,
        //     };
        //     // const apiRes = await store.dispatch(loginAPIHander(payload));

        //     if (apiRes.payload == true) {
        //       setIsLoading(false);
        //       const checkTypeOfUser = await checkIsAdmin();
        //       if (checkTypeOfUser) {
        //         navigation.navigate('Dashboard');
        //       } else {
        //         navigation.navigate('Home');
        //       }
        //       // ToastAlertComp('success', `Login successfully`);
        //       // setAlertMessage({
        //       //   status: 'success',

        //       //   alertMsg: `Logged in successfully.`,
        //       // });
        //       // setIsAlertVisible(true);
        //       setAlertMessage('');
        //       resetForm();
        //     }
        //     if (apiRes.payload.error) {
        //       setAlertMessage({
        //         status: 'error',

        //         alertMsg: `${apiRes.payload.error.message}`,
        //       });
        //       setIsAlertVisible(true);
        //       // ToastAlertComp(
        //       //   'error',

        //       //   `${apiRes.payload.error.message}`,
        //       // );
        //     }
        //   } catch (error) {
        //     // ToastAlertComp(
        //     //   'error',
        //     //   `We are facing some technical issue, please try again later`,
        //     // );

        //     setAlertMessage({
        //       status: 'error',

        //       alertMsg: `We are facing some technical issue, please try again later`,
        //     });
        //     setIsAlertVisible(true);
        //     console.error('login_api_error', error);
        //     setIsLoading(false);
        //   } finally {
        //     setIsLoading(false);
        //   }
        // }}
      >
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
          formSubmitRef.current = handleSubmit;
          const isFieldValid = field => touched[field] && !errors[field];

          // Disable button if there are any errors
          const isLoginDisabled = Object.keys(errors).length > 0;
          useFocusEffect(
            React.useCallback(() => {
              resetForm();
            }, [resetForm]),
          );

          return (
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}>
              <MasterTextInput
                label="Mobile number*"
                placeholder="Enter mobile number"
                ref={inputRefs.phone}
                keyboardType="numeric"
                autoCapitalize="none"
                autoFocus={true}
                maxLength={10}
                value={values.phone}
                onChangeText={text =>
                  setFieldValue('phone', handleNumberChange(text))
                }
                onBlur={handleBlur('phone')}
                error={touched.phone && errors.phone}
                isValid={isFieldValid('phone')}
                left={<TextInput.Icon icon="phone" color={currentTextColor} />}
              />

              {isOtpFiledVisible && (
                <OTPInput
                  ref={otpRef}
                  length={4} // Set the number of OTP digits
                  onComplete={handleOTPComplete} // Callback function when OTP is completed
                  otpText="Enter OTP" // Label for OTP input
                  secureTextEntry={false} // Set true to hide OTP (like a password)
                />
              )}

              <View
                style={{
                  marginTop: getResHeight(5),
                }}>
                <CustomButton
                  title="Login"
                  onPress={handleSubmit}
                  disabled={isLoading || isLoginDisabled}
                  loading={isLoading}
                  leftIcon={
                    <VectorIcon
                      type="MaterialCommunityIcons"
                      name="login"
                      size={24}
                      color={theme.color.white}
                    />
                  }
                />
              </View>

              <View style={styles.separatorContainer}>
                <View
                  style={[
                    styles.separatorLine,
                    {borderColor: currentTextColor},
                  ]}
                />
                <Text
                  style={[
                    styles.separatorText,
                    {
                      backgroundColor: theme.color.whiteBg,
                      color: currentTextColor,
                      fontFamily: theme.font.semiBold,
                      fontSize: getFontSize(1.5),
                    },
                  ]}>
                  OR
                </Text>
              </View>

              {Platform.OS == 'android' && (
                <LoginWithGoogle
                  currentTextColor={theme.color.dimBlack}
                  currentBgColor={theme.color.whiteBg}
                  btnTitle={'Singin with Google'}
                  onPress={async () => {
                    try {
                      await GoogleSignin.hasPlayServices();
                      // const response = await GoogleOneTapSignIn.signIn();
                      const response = await GoogleSignin.signIn();
                      console.log('google_API_es', response);
                      // if (isSuccessResponse(response)) {
                      //   // setState({userInfo: response.data});
                      // } else {
                      //   // sign in was cancelled by user
                      // }
                    } catch (error) {
                      console.log('Failed', error.code, error.message);
                      // if (isErrorWithCode(error)) {
                      //   switch (error.code) {
                      //     case statusCodes.IN_PROGRESS:
                      //       // operation (eg. sign in) already in progress
                      //       break;
                      //     case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                      //       // Android only, play services not available or outdated
                      //       break;
                      //     default:
                      //     // some other error happened
                      //   }
                      // } else {
                      //   // an error that's not related to google sign in occurred
                      // }
                    }
                  }}
                />
              )}

              <View
                style={[
                  styles.registerContainer,
                  {
                    marginTop: '5%',
                  },
                ]}>
                <Text
                  style={{
                    fontFamily: theme.font.medium,
                    color: currentTextColor,
                    fontSize: getFontSize(1.5),
                  }}>
                  Don’t have an account yet? {/* <TouchableOpacity> */}
                  <Text
                    onPress={async () => {
                      navigation.navigate('Registration');
                      // setAddNewMemberModalVisible(true);
                      // await store.dispatch(getBranchAPIHander());
                    }}
                    style={[
                      styles.registerText,
                      {
                        fontFamily: theme.font.semiBold,
                        fontSize: getFontSize(2),
                      },
                    ]}>
                    Register
                  </Text>
                </Text>
              </View>
            </ScrollView>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollViewContent: {
    paddingHorizontal: getResWidth(6),
  },

  welcomeText: {
    fontFamily: theme.font.bold,
    fontSize: getFontSize(2),
  },
  forgotPasswordText: {
    marginTop: getResHeight(1),
    fontFamily: theme.font.medium,
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: '95%',
    paddingVertical: '2.5%',
    borderWidth: 1,
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
    marginLeft: getResWidth(2),
  },
  separatorContainer: {
    marginVertical: getResHeight(5),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  separatorLine: {
    flex: 1,
    borderBottomWidth: 0.4,
    zIndex: -1,
  },
  separatorText: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  registerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: getResHeight(5),
  },
  registerText: {
    fontWeight: 'bold',
  },
});

export default LoginPage;
