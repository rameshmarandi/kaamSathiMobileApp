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
  logoutAPIHander,
  registerAPIHander,
} from '../../../redux/reducer/Auth/AuthAPI';
import ToastAlertComp from '../../../Components/ToastAlertComp';
import OTPInput from '../../../Components/OTPInput';
import {dateFormatHander} from '../../../Components/commonHelper';
import FileUploadComponent from '../../../Components/FileUploadComponent';
import {getBranchAPIHander} from '../../../redux/reducer/ChurchBranch/churchBranchAPI';
import {
  addFamilyAPIHander,
  deleteFamilyAPIHander,
} from '../../../redux/reducer/Profile/ProfileAPI';

const AddFamilyForm = ({visible, closeModal, navigation}) => {
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
  };

  // Reference for Formik
  const formikRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const scrollRef = useRef(null);

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

  const handleSubmit = async values => {
    try {
      // console.log('AFTER_SUB', values, selectedImage);

      setIsLoading(true);
      const {
        baptismDate,
        birthDate,

        fullName,
        gender,
        isMarried,
        marriageDate,
        relationToUser,
      } = values;

      const finalPayload = {
        fullName,

        DOB: birthDate,
        baptismDate,
        marriageDate,
        relationToUser,
        isMarried: isMarried === 'Yes' ? true : false,
        gender,
        avatar: selectedImage,
      };

      const res = await store.dispatch(addFamilyAPIHander(finalPayload));
      console.log('Font_EDs', res.payload, res.payload.statusCode);

      if (res.payload === true) {
        setAlertMessage({
          status: 'success',

          alertMsg: 'Family member added successfully',
        });
        setIsLoading(false);
        setIsAlertVisible(true);
        setIsAlertVisible(false);
        closeModal();
        setSelectedImage(null);
      } else if (
        res.payload.statusCode == 401 &&
        res.payload.error.message == 'Invalid access token'
      ) {
        const res = await store.dispatch(logoutAPIHander());
        ToastAlertComp('success', `Logout successfully`);
        navigation.navigate('Login');
        closeModal();
        setSelectedImage(null);
      } else {
        setAlertMessage({
          status: 'error',

          alertMsg:
            'We are facing some technical issue, please try again later',
        });

        setIsAlertVisible(true);
      }
    } catch (err) {
      setIsLoading(false);
      console.error('Add_member_font_end_error', err);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    closeModal();
  };

  const openBottomSheetWithContent = content => {
    bottomSheetRef.current?.open();
  };
  const handleImageSuccess = useCallback(imageData => {
    setSelectedImage(imageData);
  }, []);

  // Handle image error
  const handleImageError = useCallback(errorMessage => {
    ToastAlertComp('error', 'Failed', errorMessage);
  }, []);

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
            // paddingBottom: 500,

            backgroundColor: currentBgColor, // Semi-transparent background
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust offset if needed
        >
          <CustomHeader
            backPress={handleBack}
            screenTitle={MsgConfig.addFamilyForm}
          />

          <Formik
            innerRef={formikRef}
            initialValues={{
              fullName: '',
              gender: '',
              isMarried: 'No',
              marriageDate: '',
              birthDate: '',
              baptismDate: '',
              relationToUser: '',
            }}
            // validationSchema={getValidationSchema()}
            onSubmit={handleSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => {
              const isFieldValid = field => touched[field] && !errors[field];
              const minDate = new Date();
              minDate.setFullYear(minDate.getFullYear() - 100);

              return (
                <View
                  style={{
                    flex: 1,
                  }}>
                  <ScrollView
                    style={{
                      flex: 1,
                      width: '90%',
                      alignSelf: 'center',
                      paddingBottom: '85%',
                    }}
                    showsVerticalScrollIndicator={false}>
                    <FileUploadComponent
                      selectedImage={selectedImage?.uri || ''}
                      onImageSuccess={handleImageSuccess}
                      labelText="Upload profile photo"
                      onImageError={handleImageError}
                      customHeight={getResHeight(21)}
                    />
                    <View
                      style={{
                        marginTop: '5%',
                      }}>
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
                    </View>

                    <MasterTextInput
                      placeholder="Select family member "
                      topLableName={
                        'What is your relationship with the family member?'
                      }
                      isDropdown={true}
                      dropdownData={[
                        {label: 'Parent', value: 'parent'},
                        {label: 'Spouse', value: 'spouse'},
                        {label: 'Child', value: 'child'},
                        {label: 'Sibling', value: 'sibling'},
                        {label: 'Other', value: 'other'},
                      ]}
                      value={values.relationToUser}
                      onDropdownChange={item => {
                        formikRef.current.setFieldValue(
                          'relationToUser',
                          item.value,
                        );
                      }}
                      onBlur={handleBlur('relationToUser')}
                      error={touched.relationToUser && errors.relationToUser}
                    />
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
                      onDropdownChange={item => {
                        formikRef.current.setFieldValue('gender', item.value);
                      }}
                      onBlur={handleBlur('gender')}
                      error={touched.gender && errors.gender}
                    />

                    <MasterTextInput
                      topLableName={'Is he/she married?'}
                      isDropdown={true}
                      dropdownData={[
                        {label: 'Yes', value: 'Yes'},
                        {label: 'No', value: 'No'},
                      ]}
                      value={values.isMarried}
                      onDropdownChange={item => {
                        formikRef.current.setFieldValue(
                          'isMarried',
                          item.value,
                        );
                      }}
                      onBlur={handleBlur('isMarried')}
                    />

                    {values.isMarried == 'Yes' && (
                      <MasterTextInput
                        topLableName={'Date of marraige'}
                        placeholder="Date of marraige "
                        isDate={true}
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
                      label="Date of birth"
                      placeholder="Date of birth "
                      topLableName={'Date of birth'}
                      isDate={true}
                      // timePicker={true}
                      ref={inputRefs.birthDate}
                      value={values.birthDate}
                      // maxDate={new Date()}
                      // minDate={minDate}
                      onChangeText={txt => {
                        formikRef.current.setFieldValue('birthDate', txt);
                      }}
                      onBlur={handleBlur('birthDate')}
                      onSubmitEditing={() =>
                        inputRefs.baptismDate.current.focus()
                      }
                      error={touched.birthDate && errors.birthDate}
                    />
                    <MasterTextInput
                      label="Date of baptism"
                      placeholder="Date of baptism"
                      topLableName={'Date of baptism'}
                      isDate={true}
                      ref={inputRefs.baptismDate}
                      value={values.baptismDate}
                      onChangeText={txt => {
                        formikRef.current.setFieldValue('baptismDate', txt);
                      }}
                      isMendotary={false}
                      onBlur={handleBlur('baptismDate')}
                      onSubmitEditing={() => setStep(3)} // Move to next step on enter
                      error={touched.baptismDate && errors.baptismDate}
                    />
                  </ScrollView>

                  <View
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      backgroundColor: currentBgColor,
                    }}>
                    <CommonButtonComp
                      title={'Submit'}
                      isLoading={isLoading}
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default memo(AddFamilyForm);
