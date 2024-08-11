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
  Text,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector} from 'react-redux';
import CustomHeader from '../../../Components/CustomHeader';
import MsgConfig from '../../../Config/MsgConfig';
import MasterTextInput from '../../../Components/MasterTextInput';
import {CommonButtonComp} from '../../../Components/commonComp';
import {getResHeight} from '../../../utility/responsive/index';

const Index = props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  const [step, setStep] = useState(1); // State to track the current step
  const [keyboardHeight, setKeyboardHeight] = useState(0); // Track keyboard height
  const [isOTPFildVisible, setIsOTPFildVisible] = useState(false);
  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    mobile: useRef(null),
    birthDate: useRef(null),
    baptismDate: useRef(null),
    password: useRef(null),
  };
  const formikRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        setKeyboardHeight(event.endCoordinates.height - getResHeight(35));
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    const handleBackPress = () => {
      if (step > 1) {
        setStep(step - 1);
        return true; // Prevent default behavior (e.g., exiting the app)
      }
      return false; // Allow default behavior (e.g., exiting the app if on the first step)
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [step]);

  const handleSubmit = values => {
    console.log(values);
    // Navigate to next step or handle final submission
    if (step === 3) {
      // Final submission
      console.log('Final Values:', values);
    } else {
      setIsOTPFildVisible(true);
      // setStep(step + 1); // Move to the next step
    }
  };

  const handleBack = () => {
    if (step > 1) {
      if (step === 1) {
        // Reset form values when going back to step 1
        formikRef.current.resetForm();
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

  const getValidationSchema = () => {
    if (step === 1) return stepOneSchema;
    if (step === 2) return stepTwoSchema;
    if (step === 3) return stepThreeSchema;
  };

  const renderStep = (
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
  ) => {
    switch (step) {
      case 1:
        return (
          <>
            <MasterTextInput
              label="Full name"
              placeholder="Enter full name"
              ref={inputRefs.name}
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              onSubmitEditing={() => inputRefs.email.current.focus()}
              error={touched.name && errors.name}
            />
            <MasterTextInput
              label="Email"
              placeholder="Enter email address"
              ref={inputRefs.email}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              onSubmitEditing={() => inputRefs.mobile.current.focus()}
              error={touched.email && errors.email}
            />
            <MasterTextInput
              label="Mobile"
              placeholder="Enter number"
              ref={inputRefs.mobile}
              keyboardType={'numeric'}
              value={values.mobile}
              maxLength={10}
              onChangeText={handleChange('mobile')}
              onBlur={handleBlur('mobile')}
              onSubmitEditing={() => setStep(2)} // Move to next step on enter
              error={touched.mobile && errors.mobile}
            />
            {isOTPFildVisible && (
              <MasterTextInput
                label="OTP"
                placeholder="Enter email otp"
                ref={inputRefs.mobile}
                keyboardType={'numeric'}
                value={values.mobile}
                maxLength={4}
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                onSubmitEditing={() => setStep(2)} // Move to next step on enter
                error={touched.mobile && errors.mobile}
              />
            )}
          </>
        );
      case 3:
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
              ref={inputRefs.baptismDate}
              value={values.baptismDate}
              onChangeText={handleChange('baptismDate')}
              onBlur={handleBlur('baptismDate')}
              onSubmitEditing={() => setStep(3)} // Move to next step on enter
              error={touched.baptismDate && errors.baptismDate}
            />
          </>
        );
      case 4:
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentBgColor,
      }}>
      <CustomHeader
        backPress={handleBack}
        screenTitle={MsgConfig.AddMemberForm}
      />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust based on header height if needed
      >
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
                <View
                  style={[styles.buttonContainer, {bottom: keyboardHeight}]}>
                  <CommonButtonComp
                    title={step === 3 ? 'Submit' : 'Next'}
                    onPress={handleSubmit}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: '100%',
    // paddingBottom: 10,
  },
});

export default memo(Index);
