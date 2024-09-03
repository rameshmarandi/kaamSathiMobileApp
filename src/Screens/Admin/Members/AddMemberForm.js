import React, {useState, useRef, useEffect, memo} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  Keyboard,
  BackHandler,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector} from 'react-redux';
import CustomHeader from '../../../Components/CustomHeader';
import MsgConfig from '../../../Config/MsgConfig';
import MasterTextInput from '../../../Components/MasterTextInput';
import {CommonButtonComp} from '../../../Components/commonComp';
import {getResHeight, getResWidth} from '../../../utility/responsive/index';
import PrivacyPolicy from './PrivacyPolicy';
import CustomBottomSheet from '../../../Components/CustomBottomSheet';
import MasterRadioButtonGroup from '../../../Components/MasterRadioButton';
import {MasterCheckBoxGroup} from '../../../Components/MasterCheckBox';
import {
  handleEmailChange,
  handleNumberChange,
  handleTextChange,
} from '../../../Components/InputHandlers';
import {TextInput} from 'react-native-paper';

const Index = props => {
  const {navigation} = props;

  // Get values from Redux state
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  // Local component states
  const [step, setStep] = useState(1); // To track the current step in the form
  const [keyboardHeight, setKeyboardHeight] = useState(getResHeight(0)); // To track the keyboard height
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
  const [bottomSheetContent, setBottomSheetContent] = useState(null);

  const openBottomSheetWithContent = content => {
    // setBottomSheetContent(content);
    bottomSheetRef.current?.open();
  };

  // Set up event listeners for keyboard visibility and back button press
  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     event => {
  //       setKeyboardHeight(event.endCoordinates.height - getResHeight(15));
  //     },
  //   );

  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       setKeyboardHeight(0);
  //     },
  //   );

  //   const handleBackPress = () => {
  //     if (step > 1) {
  //       setStep(step - 1);
  //       return true; // Prevent default behavior (e.g., exiting the app)
  //     }
  //     return false; // Allow default behavior if on the first step
  //   };

  //   BackHandler.addEventListener('hardwareBackPress', handleBackPress);

  //   // Cleanup event listeners on component unmount
  //   return () => {
  //     keyboardDidHideListener.remove();
  //     keyboardDidShowListener.remove();
  //     BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  //   };
  // }, [step]);

  const onAcceptButtonClick = () => {
    console.log(' formikRef.current', formikRef.current.values);

    // return;
    // setKeyboardHeight(0);
    formikRef.current.resetForm(); // Reset the form
    setIsOTPFildVisible(false); // Hide OTP field
    setStep(1); // Reset to step 1
    navigation.goBack(); // Navigate back
  };
  // Handle form submission
  const handleSubmit = values => {
    console.log(values);

    if (step === 3) {
      openBottomSheetWithContent();
      // Final submission
      // console.log('Final Values:', values);
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
      navigation.goBack();
    }
  };

  // Validation schemas for each step
  const stepOneSchema = Yup.object().shape({
    name: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string()
      .required('Mobile number is required')
      .length(10, 'Mobile number must be 10 digits'),
  });

  const stepTwoSchema = Yup.object().shape({
    birthDate: Yup.string().required('Date of birth is required'),
    baptismDate: Yup.string().required('Date of baptism is required'),
  });

  const stepThreeSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Determine the current validation schema based on the step
  const getValidationSchema = () => {
    switch (step) {
      case 1:
        return stepOneSchema;
      case 2:
        return stepTwoSchema;
      case 3:
        return stepThreeSchema;
      default:
        return stepOneSchema;
    }
  };

  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Render the appropriate form fields based on the current step
  const renderStep = (
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
  ) => {
    const isFieldValid = field => touched[field] && !errors[field];

    switch (step) {
      case 1:
        return (
          <>
            {/* <TextInput
              label="Username"
              value={value}
              onChangeText={setValue}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              theme={{
                colors: {
                  primary: isFocused ? 'green' : 'green', // Label color when focused (and underline color)
                  text: 'aqua', // Text color inside the input
                  placeholder: 'green', // Placeholder color when input is empty
                  background: 'pink', // Background color of the input
                  accent: 'purple', // Accent color (like underline when not focused)
                },
              }}
              style={{
                backgroundColor: 'pink',
                color: 'black', // Default text color
              }}
              placeholderTextColor={isFocused || value ? 'red' : 'red'} // Placeholder color when not focused
            /> */}
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
            />

            {isOTPFildVisible && (
              <MasterTextInput
                label="OTP"
                placeholder="Enter email OTP"
                ref={inputRefs.otp}
                keyboardType="numeric"
                value={values.otp}
                maxLength={4}
                // onChangeText={handleChange('otp')}
                onChangeText={text =>
                  formikRef.current.setFieldValue(
                    'otp',
                    handleNumberChange(text),
                  )
                }
                onBlur={handleBlur('otp')}
                onSubmitEditing={() => setStep(2)} // Move to next step on enter
              />
            )}
          </>
        );
      case 2:
        return (
          <>
            <MasterTextInput
              label="Date of birth"
              placeholder="Select birth date"
              isDate={true}
              ref={inputRefs.birthDate}
              value={values.birthDate}
              onChangeText={handleChange('birthDate')}
              onBlur={handleBlur('birthDate')}
              onSubmitEditing={() => inputRefs.baptismDate.current.focus()}
              error={touched.birthDate && errors.birthDate}
            />
            <MasterTextInput
              label="Date of baptism"
              placeholder="Select baptism date"
              isDate={true}
              // timePicker={true}
              ref={inputRefs.baptismDate}
              value={values.baptismDate}
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
              value={'Female'}
              // value={values.gender}
              onDropdownChange={handleChange('gender')}
              onBlur={handleBlur('gender')}
              error={touched.gender && errors.gender}
            />
          </>
        );
      case 3:
        return (
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
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: currentBgColor}}>
      <CustomHeader
        backPress={handleBack}
        screenTitle={MsgConfig.AddMemberForm}
      />

      {/* <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}> */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={{flex: 1, paddingHorizontal: '5%'}}>
          <Formik
            innerRef={formikRef}
            initialValues={{
              name: '',
              email: '',
              mobile: '',
              birthDate: '',
              baptismDate: '',
              password: '',
              otp: '',
              gender: '',
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
              <>
                <ScrollView
                  contentContainerStyle={{flexGrow: 1}}
                  keyboardShouldPersistTaps="handled">
                  <View style={{flex: 1}}>
                    {renderStep(
                      values,
                      handleChange,
                      handleBlur,
                      errors,
                      touched,
                      handleSubmit,
                    )}
                  </View>
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
                // style={[styles.buttonContainer, {bottom: keyboardHeight}]}
                >
                  <CommonButtonComp
                    title={step === 3 ? 'Submit' : 'Next'}
                    onPress={handleSubmit}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    // backgroundColor: 'red',
  },
});

export default memo(Index);
