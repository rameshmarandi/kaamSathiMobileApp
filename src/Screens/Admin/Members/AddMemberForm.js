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
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome'; // For icons

import {useSelector} from 'react-redux';
import CustomHeader from '../../../Components/CustomHeader';
import MsgConfig from '../../../Config/MsgConfig';
import MasterTextInput from '../../../Components/MasterTextInput';
import {
  CommonButtonComp,
  CustomAlertModal,
} from '../../../Components/commonComp';
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
import {store} from '../../../redux/store';
import {
  generateOTPAPIHander,
  registerAPIHander,
} from '../../../redux/reducer/Auth/AuthAPI';
import ToastAlertComp from '../../../Components/ToastAlertComp';
import OTPInput from '../../../Components/OTPInput';
import {dateFormatHander} from '../../../Components/commonHelper';
import FileUploadComponent from '../../../Components/FileUploadComponent';
import {getBranchAPIHander} from '../../../redux/reducer/ChurchBranch/churchBranchAPI';

const AddMemberForm = ({visible, closeModal, navigation}) => {
  const {currentTextColor, currentBgColor} = useSelector(state => state.user);
  const {allChurchBranch} = useSelector(state => state.churchBranch);
  // Local component states
  const [step, setStep] = useState(1); // To track the current step in the form
  const [isOTPFildVisible, setIsOTPFildVisible] = useState(false); // To show/hide the OTP field
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [branchDropdown, setBranchDropdown] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isAcceptBtnLoading, setIsAcceptBtnLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const otpInputRef = useRef(null);
  // References to input fields
  const inputRefs = {
    fullName: useRef(null),
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

  useEffect(() => {
    churchBranchDropdown();
  }, [visible]);

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

  const onAcceptButtonClick = async () => {
    console.log('Accept_button_clicked_before', selectedBranch);

    const {
      baptismDate,
      birthDate,
      churchBranch,
      cpassword,
      email,
      fullName,
      gender,
      isMarried,
      marriageDate,
      mobile,
      otp,
      password,
    } = formikRef.current.values;

    const finalPayload = {
      email,
      fullName,
      mobile,
      DOB: birthDate,
      baptismDate,
      marriageDate,
      isMarried: isMarried === 'Yes' ? true : false,
      gender,
      avatar: selectedImage,
      coverImage: '',
      churchBranchID: selectedBranch?.branchId,
      password,
    };

    console.log(
      'finalPayload_for_regisration_After',
      finalPayload,
      selectedBranch,
    );
    setIsAcceptBtnLoading(true);

    const res = await store.dispatch(registerAPIHander(finalPayload));

    console.log('Register_API_REs_fronte', res);
    if (res.payload == true) {
      setSelectedImage('');
      formikRef.current.resetForm(); // Reset the form
      navigation.navigate('ApplicationUnderReview');
      closeModal();
      setAlertMessage({
        status: 'success',

        alertMsg: 'Registration Successful.',
      });
      setIsAlertVisible(true);
      setIsAcceptBtnLoading(false);

      setIsOTPFildVisible(false); // Hide OTP field
      setStep(1); // Reset to step 1
    } else {
      setSelectedImage('');
      formikRef.current.resetForm(); // Reset the form
      setAlertMessage({
        status: 'error',

        alertMsg:
          'Our service is not available right now. Please try again later.',
      });

      closeModal();

      setIsAlertVisible(true);
      setIsAcceptBtnLoading(false);
      formikRef.current.resetForm(); // Reset the form
      setIsOTPFildVisible(false); // Hide OTP field
      setStep(1); // Reset to step 1
    }
  };

  const handleSubmit = async values => {
    if (step === 3) {
      openBottomSheetWithContent();
      // Final submission
    } else if (step === 1 && !isOTPFildVisible) {
      // setIsOTPFildVisible(true); // Show OTP field
      setIsLoading(true);
      const genOTPPayload = {
        fullName: values.fullName,
        email: values.email,
      };
      const res = await store.dispatch(generateOTPAPIHander(genOTPPayload));

      if (res.payload.message) {
        setAlertMessage({
          status: 'success',

          alertMsg: res.payload.message,
        });

        setIsOTPFildVisible(true);
        setIsAlertVisible(true);
        setIsLoading(false);
      }

      if (res.payload.error.message) {
        setAlertMessage({
          status: 'error',

          alertMsg: res.payload.error.message,
        });
        setIsAlertVisible(true);
        setIsLoading(false);
      }
    } else {
      setStep(step + 1); // Move to the next step
      scrollRef.current?.scrollTo({y: 0, animated: true});
    }
  };

  // Handle back navigation
  const handleBack = () => {
    setIsOTPFildVisible(false);
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

  const openBottomSheetWithContent = content => {
    bottomSheetRef.current?.open();
  };
  const handleImageSuccess = useCallback(imageData => {
    console.log('Image_selected', imageData);
    setSelectedImage(imageData);
  }, []);
  const handleImageSuccess1 = useCallback(imageData => {
    setSelectedImage1(imageData.uri);
  }, []);

  // Handle image error
  const handleImageError = useCallback(
    errorMessage => {
      // closeBottomSheetWithContent();
      ToastAlertComp('error', 'Failed', errorMessage);
    },
    [],
    // [closeBottomSheetWithContent],
  );
  const churchBranchDropdown = () => {
    if (allChurchBranch.length == 0) {
      store.dispatch(getBranchAPIHander());
    } else {
      const dropdownData = allChurchBranch.map(item => ({
        branchId: item.id,
        label: item.churchDetails['Branch name'],
        value: item.churchDetails['Branch name'],
      }));

      setBranchDropdown(dropdownData);
    }
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
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);

    switch (step) {
      case 1:
        return (
          <>
            <MasterTextInput
              label="Full name"
              placeholder="Enter full name"
              ref={inputRefs.fullName}
              value={values.fullName}
              onChangeText={text =>
                formikRef.current.setFieldValue(
                  'fullName',
                  handleTextChange(text),
                )
              }
              onBlur={handleBlur('fullName')}
              onSubmitEditing={() => inputRefs.email.current.focus()}
              error={touched.fullName && errors.fullName}
              isValid={isFieldValid('fullName')}
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
              <OTPInput
                ref={otpInputRef}
                // label="Enter OTP"
                length={5}
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
              //   onChangeText={text =>
              //     formikRef.current.setFieldValue(
              //       'otp',
              //       handleNumberChange(text),
              //     )
              //   }
              //   onBlur={handleBlur('otp')}
              //   onSubmitEditing={() => setStep(2)} // Move to next step on enter
              //   left={
              //     <TextInput.Icon
              //       icon="lock"
              //       color={currentTextColor}
              //       size={getFontSize(3)}
              //     />
              //   }
              // />
            )}
          </>
        );
      case 2:
        return (
          <>
            <FileUploadComponent
              selectedImage={selectedImage?.uri || ''}
              onImageSuccess={handleImageSuccess}
              labelText="Upload profile photo"
              onImageError={handleImageError}
              customHeight={getResHeight(21)}
            />
            <MasterTextInput
              label="Date of birth"
              placeholder="Date of birth "
              topLableName={'Date of Birth'}
              isDate={true}
              // timePicker={true}
              ref={inputRefs.birthDate}
              value={values.birthDate}
              maxDate={new Date()}
              minDate={minDate}
              onChangeText={txt => {
                formikRef.current.setFieldValue('birthDate', txt);
              }}
              onBlur={handleBlur('birthDate')}
              onSubmitEditing={() => inputRefs.baptismDate.current.focus()}
              error={touched.birthDate && errors.birthDate}
            />
            <MasterTextInput
              label="Date of baptism"
              placeholder="Date of baptism"
              topLableName={'Date of Baptism'}
              isDate={true}
              ref={inputRefs.baptismDate}
              value={values.baptismDate}
              onChangeText={txt => {
                formikRef.current.setFieldValue('baptismDate', txt);
              }}
              onBlur={handleBlur('baptismDate')}
              onSubmitEditing={() => setStep(3)} // Move to next step on enter
              error={touched.baptismDate && errors.baptismDate}
            />
            <MasterTextInput
              topLableName={'Are you married ?'}
              isDropdown={true}
              dropdownData={[
                {label: 'Yes', value: 'Yes'},
                {label: 'No', value: 'No'},
              ]}
              value={values.isMarried}
              onDropdownChange={item => {
                formikRef.current.setFieldValue('isMarried', item.value);
              }}
              onBlur={handleBlur('isMarried')}
            />

            {values.isMarried == 'Yes' && (
              <MasterTextInput
                topLableName={'Date of marraige'}
                isDate={true}
                // timePicker={true}
                ref={inputRefs.marriageDate}
                value={values.marriageDate}
                onChangeText={txt => {
                  formikRef.current.setFieldValue('marriageDate', txt);
                }}
                onBlur={handleBlur('marriageDate')}
                onSubmitEditing={() => setStep(3)} // Move to next step on enter
                error={touched.marriageDate && errors.marriageDate}
              />
            )}
            <MasterTextInput
              label="Gender"
              placeholder="Select gender"
              topLableName={'Gender'}
              isDropdown={true}
              dropdownData={[
                {label: 'Male', value: 'male'},
                {label: 'Female', value: 'female'},
              ]}
              value={values.gender}
              // onDropdownChange={() => {
              //   setTimeout(() => {
              //     handleChange('gender');
              //   }, 100);
              // }}

              onDropdownChange={item => {
                formikRef.current.setFieldValue('gender', item.value);
              }}
              onBlur={handleBlur('gender')}
              error={touched.gender && errors.gender}
            />

            {console.log('Branch_list', branchDropdown)}
            <MasterTextInput
              topLableName={'Select church branch'}
              isDropdown={true}
              dropdownData={branchDropdown}
              value={values.churchBranch}
              onDropdownChange={item => {
                setSelectedBranch(item);
                formikRef.current.setFieldValue('churchBranch', item.value);
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

  const handleClose = () => {
    setIsAlertVisible(false);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentBgColor,
      }}>
      <CustomAlertModal
        visible={isAlertVisible}
        message={alertMessage}
        duration={3000} // duration in milliseconds
        onClose={handleClose}
      />
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
              fullName: '',
              email: '',
              mobile: '',
              isMarried: 'No',
              marriageDate: '',
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
                    paddingBottom: '15%',
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
                  {
                    <PrivacyPolicy
                      isLoading={isAcceptBtnLoading}
                      onAccept={onAcceptButtonClick}
                    />
                  }
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
                    isLoading={isLoading}
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
