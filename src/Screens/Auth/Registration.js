import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import {Formik} from 'formik';
import {useFocusEffect} from '@react-navigation/native';
import theme from '../../utility/theme';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import MasterTextInput from '../../Components/MasterTextInput';
import CustomButton from '../../Components/CustomButton';
import {VectorIcon} from '../../Components/VectorIcon';
import {TextInput} from 'react-native-paper';
import {
  handleEmailChange,
  handleNumberChange,
  handleTextChange,
} from '../../Components/InputHandlers';
import OTPInput from '../../Components/OTPInput';
import StepProgressBarComp from '../../Components/StepProgressBarComp';
import RegistrationHeader from './RegistrationHeader';
import SkillInput from './SkillInput';
import {skilledWorkers} from '../../Components/StaticDataHander';

const COLORS = {
  primary: '#FF6B35',
  secondary: '#FF1D15',
  background: '#F8F9FA',
  text: '#2D3142',
  muted: '#ADB5BD',
};

const Registration = props => {
  const {navigation} = props;
  const {contact} = props.route.params;
  const formRef = useRef(null);
  const [isOtpFiledVisible, setIsOtpFiledVisible] = useState(false);
  const formSubmitRef = useRef(null);
  const otpRef = useRef(null);
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const formData = {
    experience: '0-1',
  };

  const handleNext = () => step < totalSteps && setStep(prev => prev + 1);
  const handleBack = () => step > 1 && setStep(prev => prev - 1);

  const inputRefs = {
    email: useRef(null),
  };

  const handleSubmit = async (values, {resetForm}) => {
    if (isOtpFiledVisible) {
      setIsOtpFiledVisible(false);
    } else {
      setIsOtpFiledVisible(true);
      handleNext();
    }
  };

  const handleOTPComplete = ({otp}) => {
    if (otp.length === 4 && formSubmitRef.current) {
      setIsOtpFiledVisible(false);
      formSubmitRef.current();
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.color.whiteBg}}>
      <StepProgressBarComp step={step} totalSteps={totalSteps} />

      {step == 1 && (
        <View style={{marginTop: '5%'}}>
          <RegistrationHeader
            mainText="Registration with"
            firstWord="Kaam"
            secondWord="sathi"
            mainTextStyle={{color: '#000'}}
            firstWordStyle={{fontSize: getFontSize(3)}}
            secondWordStyle={{fontSize: getFontSize(3)}}
          />
        </View>
      )}

      <Formik
        innerRef={formRef}
        initialValues={{
          contact: contact ? contact : '',
          fullName: '',
          email: '',
          otp: '',
          userRole: '',
          experience: '0-1Year',
        }}
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

          useFocusEffect(
            React.useCallback(() => {
              resetForm();
            }, [resetForm]),
          );

          return (
            <>
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}>
                {step == 1 && (
                  <>
                    <MasterTextInput
                      label="Mobile number*"
                      placeholder="Enter mobile number"
                      ref={inputRefs.contact}
                      keyboardType="number-pad"
                      autoCapitalize="none"
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
                    <MasterTextInput
                      label="Full name"
                      placeholder="Enter full name"
                      ref={inputRefs.fullName}
                      autoCapitalize="none"
                      autoFocus={true}
                      value={values.fullName}
                      onChangeText={text =>
                        setFieldValue('fullName', handleTextChange(text))
                      }
                      onBlur={handleBlur('fullName')}
                      error={touched.fullName && errors.fullName}
                      isValid={isFieldValid('fullName')}
                      left={
                        <TextInput.Icon
                          icon="account"
                          color={theme.color.outlineColor}
                        />
                      }
                    />
                    <MasterTextInput
                      label="Email*"
                      placeholder="Enter email"
                      ref={inputRefs.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={values.email}
                      onChangeText={text =>
                        setFieldValue('email', handleEmailChange(text))
                      }
                      onBlur={handleBlur('email')}
                      error={touched.email && errors.email}
                      isValid={isFieldValid('email')}
                      left={
                        <TextInput.Icon
                          icon="email"
                          color={theme.color.outlineColor}
                        />
                      }
                    />

                    {isOtpFiledVisible && (
                      <OTPInput
                        ref={otpRef}
                        length={4}
                        onComplete={handleOTPComplete}
                        otpText="Enter OTP"
                      />
                    )}

                    <View style={{marginTop: getResHeight(5)}}>
                      <CustomButton
                        title={
                          step == 1 && isOtpFiledVisible ? 'Verify OTP' : 'Next'
                        }
                        onPress={handleSubmit}
                        rightIcon={
                          <VectorIcon
                            type="MaterialCommunityIcons"
                            name="arrow-right"
                            size={getFontSize(2.5)}
                            color={theme.color.white}
                          />
                        }
                      />
                    </View>
                  </>
                )}

                {step === 2 && (
                  <View style={styles.stepContainer}>
                    <Text style={styles.header}>Professional Details 💼</Text>
                    <Text style={styles.subHeader}>
                      Help us understand your expertise
                    </Text>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Select Your Role</Text>
                      <View style={[styles.pickerContainer, styles.elevated]}>
                        <Picker
                          selectedValue={values.userRole}
                          onValueChange={value =>
                            setFieldValue('userRole', value)
                          }>
                          <Picker.Item label="Worker (Labour)" value="worker" />
                          <Picker.Item
                            label="Skilled Worker"
                            value="skilledWorker"
                          />
                        </Picker>
                      </View>
                    </View>

                    {values.userRole === 'skilledWorker' && (
                      <View style={styles.inputGroup}>
                        <Text style={styles.label}>Primary Skills</Text>
                        {/* <SkillInput
                          skilledWorkers={skilledWorkers}
                          // selectedSkills={values.skills}
                          // setSelectedSkills={skills =>
                          //   setFieldValue('skills', skills)
                          // }
                        /> */}
                      </View>
                    )}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Years of Experience</Text>
                      <View style={[styles.pickerContainer, styles.elevated]}>
                        <Picker
                          selectedValue={values.experience}
                          onValueChange={value => {
                            setFieldValue('experience', value);
                          }}>
                          <Picker.Item label="0-1 years" value="0-1" />
                          <Picker.Item label="1-3 years" value="1-3" />
                          <Picker.Item label="3-5 years" value="3-5" />
                          <Picker.Item label="5+ years" value="5+" />
                        </Picker>
                      </View>
                    </View>
                  </View>
                )}
              </ScrollView>

              {step !== 1 && (
                <View style={styles.footer}>
                  <TouchableOpacity
                    onPress={handleBack}
                    style={styles.buttonArrow}>
                    <VectorIcon
                      type="MaterialCommunityIcons"
                      name="arrow-left"
                      size={getFontSize(2.5)}
                      color={theme.color.white}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleNext}
                    style={styles.buttonArrow}>
                    <VectorIcon
                      type="MaterialCommunityIcons"
                      name="arrow-right"
                      size={getFontSize(2.5)}
                      color={theme.color.white}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: getResWidth(6),
  },
  stepContainer: {
    marginBottom: 40,
  },
  header: {
    fontSize: getFontSize(1.8),
    fontFamily: theme.font.semiBold,
    color: theme.color.charcolBlack,
  },
  subHeader: {
    fontSize: getFontSize(1.4),
    fontFamily: theme.font.regular,
    color: theme.color.charcolBlack,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 8,
    fontFamily: 'Inter-Medium',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  elevated: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonArrow: {
    height: getResHeight(6),
    width: getResHeight(6),
    backgroundColor: theme.color.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getResHeight(100),
  },
  footer: {
    paddingHorizontal: '5%',
    paddingBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Registration;
