import React, {useState, useRef, useEffect, memo, useCallback} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  Keyboard,
  Text,
  Modal,
  BackHandler,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome'; // For icons

import {useSelector} from 'react-redux';
import CustomHeader from '../../../Components/CustomHeader';
import MsgConfig from '../../../Config/MsgConfig';
import MasterTextInput from '../../../Components/MasterTextInput';
import {CommonButtonComp} from '../../../Components/commonComp';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive/index';
import PrivacyPolicy from './PrivacyPolicy';
import CustomBottomSheet from '../../../Components/CustomBottomSheet';
import {
  handleEmailChange,
  handleNumberChange,
  handleTextChange,
} from '../../../Components/InputHandlers';
import {TextInput} from 'react-native-paper';
import {VectorIcon} from '../../../Components/VectorIcon';
import theme from '../../../utility/theme';
import {
  passConfirmPassValidation,
  stepOneSchema,
  stepTwoSchema,
} from '../../../utility/theme/validation';
import {
  PasswordCheckItem,
  usePasswordValidation,
} from '../../../utility/PasswordUtils';

const AddMemberForm = ({visible, closeModal, navigation}) => {
  const {currentTextColor, currentBgColor} = useSelector(state => state.user);

  const getValidationSchema = () => {
    switch (step) {
      case 1:
        return stepOneSchema;
      case 2:
        return stepTwoSchema;
      case 3:
        return passConfirmPassValidation;
      default:
        return stepOneSchema;
    }
  };

  const onAcceptButtonClick = () => {
    formikRef.current.resetForm(); // Reset the form
    setIsOTPFildVisible(false); // Hide OTP field
    setStep(1); // Reset to step 1

    closeModal();
  };

  const handleSubmit = values => {
    console.log(values);

    if (step === 3) {
      openBottomSheetWithContent();
      // Final submission
    } else if (step === 1 && !isOTPFildVisible) {
      setIsOTPFildVisible(true); // Show OTP field
    } else {
      setStep(step + 1); // Move to the next step
      scrollRef.current?.scrollTo({y: 0, animated: true});
    }
  };

  // Handle back navigation
  const handleBack = () => {
    if (step > 1) {
      if (step === 1) {
        formikRef.current.resetForm(); // Reset form when returning to step 1
      }
      setStep(step - 1);
    } else {
      closeModal();
    }
  };

  const handleImageError1 = useCallback(
    errorMessage => {
      // closeBottomSheetWithContent();
      ToastAlertComp('error', 'Failed', errorMessage);
    },
    [closeModal],
  );

  // Handle form submission
  const handleSubmitForm = useCallback(() => {
    closeModal();
    setTimeout(() => {
      ToastAlertComp('success', 'Success', 'Post scheduled successfully.');
    }, 1000);
  }, [closeModal]);

  // Local component states
  const [step, setStep] = useState(1); // To track the current step in the form
  const [isOTPFildVisible, setIsOTPFildVisible] = useState(false); // To show/hide the OTP field

  // References to input fields
  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    mobile: useRef(null),
    birthDate: useRef(null),
    baptismDate: useRef(null),
    password: useRef(null),
  };

  // Reference for Formik
  const formikRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const scrollRef = useRef(null);

  const openBottomSheetWithContent = content => {
    bottomSheetRef.current?.open();
  };
  const renderStep = (
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
  ) => {
    const passwordValidations = usePasswordValidation(values.password); // Hook for validation

    const isFieldValid = field => touched[field] && !errors[field];

    switch (step) {
      case 1:
        return (
          <>
            <MasterTextInput
              label="Full name"
              placeholder="Enter full name"
              ref={inputRefs.name}
              value={values.name}
              onChangeText={text =>
                formikRef.current.setFieldValue('name', handleTextChange(text))
              }
              onBlur={handleBlur('name')}
              onSubmitEditing={() => inputRefs.email.current.focus()}
              error={touched.name && errors.name}
              isValid={isFieldValid('name')}
              left={
                <TextInput.Icon
                  icon="account"
                  color={currentTextColor}
                  size={getFontSize(3.5)}
                />
              }
            />
            <MasterTextInput
              label="Email"
              placeholder="Enter email address"
              ref={inputRefs.email}
              keyboardType="email-address"
              value={values.email}
              onChangeText={text =>
                formikRef.current.setFieldValue(
                  'email',
                  handleEmailChange(text),
                )
              }
              onBlur={handleBlur('email')}
              onSubmitEditing={() => inputRefs.mobile.current.focus()}
              error={touched.email && errors.email}
              isValid={isFieldValid('email')}
              left={
                <TextInput.Icon
                  icon="email"
                  color={currentTextColor}
                  size={getFontSize(3)}
                />
              }
            />

            <MasterTextInput
              label="Mobile"
              placeholder="Enter number"
              ref={inputRefs.mobile}
              keyboardType="numeric"
              value={values.mobile}
              maxLength={10}
              onChangeText={text =>
                formikRef.current.setFieldValue(
                  'mobile',
                  handleNumberChange(text),
                )
              }
              onBlur={handleBlur('mobile')}
              onSubmitEditing={() => setStep(2)} // Move to next step on enter
              error={touched.mobile && errors.mobile}
              isValid={isFieldValid('mobile')}
              left={
                <TextInput.Icon
                  icon={'phone'}
                  color={currentTextColor}
                  size={getFontSize(3)}
                />
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
                  formikRef.current.setFieldValue(
                    'otp',
                    handleNumberChange(text),
                  )
                }
                onBlur={handleBlur('otp')}
                onSubmitEditing={() => setStep(2)} // Move to next step on enter
                left={
                  <TextInput.Icon
                    icon="lock"
                    color={currentTextColor}
                    size={getFontSize(3)}
                  />
                }
              />
            )}
          </>
        );
      case 2:
        return (
          <>
            <MasterTextInput
              label="Date of birth"
              placeholder="Date of birth "
              isDate={true}
              // timePicker={true}
              ref={inputRefs.birthDate}
              value={values.birthDate}
              onChangeText={handleChange('birthDate')}
              onBlur={handleBlur('birthDate')}
              onSubmitEditing={() => inputRefs.baptismDate.current.focus()}
              error={touched.birthDate && errors.birthDate}
            />
            <MasterTextInput
              label="Date of baptism"
              placeholder="Date of baptism"
              isDate={true}
              // timePicker={true}
              ref={inputRefs.baptismDate}
              value={values.baptismDate}
              // value={dateFormatHander(values.baptismDate, 'DD/MM/YYYY') }
              onChangeText={handleChange('baptismDate')}
              onBlur={handleBlur('baptismDate')}
              onSubmitEditing={() => setStep(3)} // Move to next step on enter
              error={touched.baptismDate && errors.baptismDate}
            />

            <MasterTextInput
              label="Gender"
              placeholder="Select gender"
              isDropdown={true}
              dropdownData={[
                {label: 'Male', value: 'male'},
                {label: 'Female', value: 'female'},
              ]}
              // value={'Female'}
              value={values.gender}
              onDropdownChange={() => {
                setTimeout(() => {
                  handleChange('gender');
                }, 100);
              }}
              onBlur={handleBlur('gender')}
              error={touched.gender && errors.gender}
            />
            <MasterTextInput
              label="Church branch"
              placeholder="Select church branch"
              isDropdown={true}
              dropdownData={[
                {label: 'Ambegano', value: 'ambegano'},
                {label: 'Pimple guruv', value: 'pimpleguruv'},
                {label: 'Beed', value: 'beed'},
              ]}
              // value={'Female'}
              value={values.churchBranch}
              onDropdownChange={() => {
                setTimeout(() => {
                  handleChange('churchBranch');
                }, 100);
              }}
              onBlur={handleBlur('churchBranch')}
              error={touched.churchBranch && errors.churchBranch}
            />
          </>
        );
      case 3:
        return (
          <>
            <MasterTextInput
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              ref={inputRefs.password}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              onSubmitEditing={handleSubmit}
              error={touched.password && errors.password}
              left={
                <TextInput.Icon
                  icon="lock"
                  color={currentTextColor}
                  size={getFontSize(3)}
                />
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
              left={<TextInput.Icon icon="lock" color={currentTextColor} />}
            />
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
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentBgColor,
      }}>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        style={{
          flex: 1,
        }}
        onRequestClose={handleBack} // Handle back press on Android
        // transparent={true}
      >
        <KeyboardAvoidingView
          style={{
            flex: 1,

            backgroundColor: currentBgColor, // Semi-transparent background
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust offset if needed
        >
          <CustomHeader
            backPress={handleBack}
            screenTitle={MsgConfig.AddMemberForm}
          />

          <Formik
            innerRef={formikRef}
            initialValues={{
              name: '',
              email: '',
              mobile: '',
              birthDate: '',
              baptismDate: '',
              password: '',
              cpassword: '',
              otp: '',
              gender: '',
              churchBranch: '',
            }}
            validationSchema={getValidationSchema()}
            onSubmit={handleSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View
                style={{
                  flex: 1,
                }}>
                <ScrollView
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                  }}
                  showsVerticalScrollIndicator={false}>
                  {renderStep(
                    values,
                    handleChange,
                    handleBlur,
                    errors,
                    touched,
                    handleSubmit,
                  )}
                </ScrollView>
                <CustomBottomSheet
                  ref={bottomSheetRef}
                  modalHeight={getResHeight(86)}>
                  {<PrivacyPolicy onAccept={onAcceptButtonClick} />}
                </CustomBottomSheet>

                <View
                  style={{
                    width: getResWidth(20),
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: '5%',
                  }}>
                  {[0, 1, 2].map((item, index) => (
                    <View
                      style={{
                        width: getResWidth(5),
                        height: getResHeight(0.7),
                        borderRadius: 10,
                        backgroundColor:
                          step == index + 1 ? currentTextColor : 'grey',
                      }}></View>
                  ))}
                </View>
                <View
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    backgroundColor: currentBgColor,
                  }}>
                  <CommonButtonComp
                    title={step === 3 ? 'Submit' : 'Next'}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default memo(AddMemberForm);
