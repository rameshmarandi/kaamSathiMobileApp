import React, {useCallback, useRef, memo, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import theme from '../../utility/theme';
import MasterTextInput from '../../Components/MasterTextInput';
import {VectorIcon} from '../../Components/VectorIcon';

import {Formik} from 'formik';
import {handleNumberChange} from '../../Components/InputHandlers';

import {TextInput} from 'react-native-paper';

import {store} from '../../redux/store';

import {loginValidationSchema} from '../../utility/theme/validation';
import {useFocusEffect} from '@react-navigation/native';

import CustomButton from '../../Components/CustomButton';
import OTPInput from '../../Components/OTPInput';
import {setIsUserLoggedIn} from '../../redux/reducer/Auth';
import LottieView from 'lottie-react-native';
import RegistrationHeader from './RegistrationHeader';
import DocumentScanner from '../../Components/DocumentScanner';
import {KeyboardAvoidingView} from 'react-native';

import LanguageSelector, {useLanguage} from '../../Hooks/LanguageSelector';
import {useTranslation} from 'react-i18next';
import {MultiLngModal} from '../../Components/ModalsComponent';

const AnimatedSlash = memo(() => {
  return (
    <View
      style={{
        height: getResHeight(30),
        width: getResWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -99999,

        marginTop: getResHeight(-2),
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
  // const [mode, setMode] = useState('face');
  const [mode, setMode] = useState('document');

  const [isLoading, setIsLoading] = useState(false);
  const [isOtpFiledVisible, setIsOtpFiledVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isMultiLngModalVisible, setMultiLngModalVisible] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');

  const {t, i18n} = useTranslation();
  const langSelectorRef = useRef();
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
        Keyboard.dismiss();
        formSubmitRef.current(); // ✅ Calls Formik's handleSubmit
        // if(values.contact)
      } else {
        console.log('❌ handleSubmit is not ready yet');
      }
    }
  };

  const handleSubmit = async (values, {resetForm}) => {
    setIsLoading(true);

    if (isOtpFiledVisible) {
      // console.log('Clues', values);

      let defaultContact = '7887706698';
      if (values.contact == defaultContact) {
        setTimeout(() => {
          setIsLoading(false);
          store.dispatch(setIsUserLoggedIn(true));
          navigation.navigate('Home');
        }, 2000);
      } else {
        navigation.navigate('Registration', {
          contact: values.contact,
        });

        setIsOtpFiledVisible(false);

        setIsLoading(false);
      }
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
      {/* <MultiLngModal
        isModalVisible={isMultiLngModalVisible}
        onBackdropPress={() => {
          setMultiLngModalVisible(false);
        }}
      />
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => {
            // changeLanguage('bn');
            // i18n.changeLanguage('en');
            setMultiLngModalVisible(true);
          }}
          style={{
            width: '13%',
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
          }}>
          <Text>English</Text>
          <VectorIcon
            type="MaterialCommunityIcons"
            name={'chevron-down'}
            size={24}
            color={theme.color.charcolBlack}
          />
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-end',
          paddingHorizontal: '5%',
          paddingTop: '5%',

          alignItems: 'flex-end',
        }}>
        <LanguageSelector ref={langSelectorRef} />
      </View>
      {/* <DocumentScanner mode={mode} /> */}
      <Formik
        innerRef={formRef}
        initialValues={{contact: '', password: ''}}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}>
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
            <>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                style={{
                  flex: 1,
                }}>
                <ScrollView
                  // style={styles.scrollView}
                  keyboardShouldPersistTaps="always"
                  contentContainerStyle={{
                    flex: 1,
                  }}
                  showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      //
                    }}>
                    <View style={{}}>
                      <RegistrationHeader
                        mainText={t('loginWelcomeMsg')}
                        firstWord={t('welcomeMsgFirstHalf')}
                        secondWord={t('welcomeMsgSecondHalf')}
                        mainTextStyle={{color: '#000'}}
                        firstWordStyle={{fontSize: getFontSize(3)}}
                        secondWordStyle={{
                          fontSize: getFontSize(3),
                        }}
                      />
                      <AnimatedSlash />
                    </View>
                    <View
                      style={{
                        paddingHorizontal: getResWidth(6),
                      }}>
                      <MasterTextInput
                        label={t('loginLabel')}
                        placeholder={t('loginPlaceHolder')}
                        ref={inputRefs.contact}
                        keyboardType="numeric"
                        autoCapitalize="none"
                        // autoFocus={true}
                        maxLength={10}
                        value={values.contact}
                        onChangeText={text =>
                          setFieldValue('contact', handleNumberChange(text))
                        }
                        onBlur={handleBlur('contact')}
                        error={touched.contact && errors.contact}
                        isValid={isFieldValid('contact')}
                        left={
                          <TextInput.Icon
                            icon="phone"
                            color={theme.color.outlineColor}
                          />
                        }
                      />

                      {isOtpFiledVisible && (
                        <OTPInput
                          ref={otpRef}
                          length={4} // Set the number of OTP digits
                          onComplete={handleOTPComplete} // Callback function when OTP is completed
                          otpText={t('otpLabel')} // Label for OTP input
                          secureTextEntry={false} // Set true to hide OTP (like a password)
                        />
                      )}
                    </View>
                  </View>
                </ScrollView>
                <View
                  style={{
                    marginTop: getResHeight(5),
                    paddingHorizontal: getResWidth(6),
                    paddingBottom: getResHeight(6),
                  }}>
                  <CustomButton
                    title={
                      isOtpFiledVisible ? t('verifyOTP') : t('loginBtnMsg')
                    }
                    onPress={handleSubmit}
                    disabled={isLoading || isLoginDisabled}
                    loading={isLoading}
                    leftIcon={
                      <VectorIcon
                        type="MaterialCommunityIcons"
                        name={isOtpFiledVisible ? 'shield-check' : 'login'}
                        size={24}
                        color={theme.color.white}
                      />
                    }
                  />
                </View>
              </KeyboardAvoidingView>
            </>
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
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: getResWidth(6),

    paddingBottom: getResHeight(6),
    zIndex: 99,
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
