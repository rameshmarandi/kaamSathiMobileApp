import React, {useState, useRef, useEffect, memo, useCallback} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  Keyboard,
  Modal,
  BackHandler,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
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

const AddMemberForm = ({visible, closeModal, navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const {currentTextColor, currentBgColor} = useSelector(state => state.user);

  // Handle image success
  const handleImageSuccess = useCallback(imageData => {
    setSelectedImage(imageData.uri);
  }, []);
  const handleImageSuccess1 = useCallback(imageData => {
    setSelectedImage1(imageData.uri);
  }, []);

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

  const onAcceptButtonClick = () => {
    console.log(' formikRef.current', formikRef.current.values);

    // return;
    // setKeyboardHeight(0);
    formikRef.current.resetForm(); // Reset the form
    setIsOTPFildVisible(false); // Hide OTP field
    setStep(1); // Reset to step 1
    // navigation.goBack(); // Navigate back
    closeModal();
  };

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

  //   // References to input fields

  // Handle image error
  const handleImageError = useCallback(
    errorMessage => {
      closeModal();
      ToastAlertComp('error', 'Failed', errorMessage);
    },
    [closeModal],
  );

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
      setTimeout(() => {
        closeModal();
        setSelectedImage;
      }, 1300);
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
            left={
              <TextInput.Icon
                icon="lock"
                color={currentTextColor}
                size={getFontSize(3)}
              />
            }
          />
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

          {/* <View
            style={
              {
                // flex: 1,
                // // backgroundColor: currentBgColor,
                // justifyContent: 'center',
                // alignItems: 'center', // Align modal to the center
              }
            }> */}
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
              <View
                style={{
                  flex: 1,
                  // width: '100%',
                  // // height: '100%',
                  // backgroundColor: currentBgColor,
                  // justifyContent: 'center',
                  // alignItems: 'center', // Align modal to the center
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
                    // backgroundColor: 'red',
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
