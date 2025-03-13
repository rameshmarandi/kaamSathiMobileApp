import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import theme from '../utility/theme';
import {VectorIcon} from './VectorIcon';
import {Formik} from 'formik';
import {loginValidationSchema} from '../utility/theme/validation';
import MasterTextInput from './MasterTextInput';
import {RadioButton, TextInput} from 'react-native-paper';
import CustomButton from './CustomButton';
import {AirbnbRating} from 'react-native-ratings';
import {PrivacyPolicyComponent} from '../Screens/Account/PrivacyPolicy';
import {useTranslation} from 'react-i18next';
import {languageOptions} from '../../i18n';

const HireNowDetailsModal = ({
  isModalVisible,
  selectedDistance = 0,
  onBackdropPress,
  handleSelectDistance,
  onSelectDistance,
}) => {
  const inputRefs = {
    email: useRef(null),
    password: useRef(null),
  };
  const minDate = new Date();
  // minDate.setFullYear(minDate.getFullYear() - 100);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={onBackdropPress} // Close modal when tapping outside
        onSwipeComplete={onBackdropPress} // Swipe down to close
        swipeDirection="down"
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationOutTiming={800}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.modalTitle}>
              Please provide your requirement
            </Text>
            <TouchableOpacity
              onPress={onBackdropPress}
              activeOpacity={0.8}
              style={{
                alignItems: 'flex-end',
                position: 'absolute',
                right: '-1%',
                top: '-35%',
              }}>
              <VectorIcon
                type="Ionicons"
                name="close-circle-sharp"
                size={getFontSize(4)}
                color={theme.color.grey}
              />
            </TouchableOpacity>
          </View>
          <Formik
            initialValues={{email: '', password: '', birthDate: ''}}
            validationSchema={loginValidationSchema}
            onSubmit={async (values, {resetForm}) => {
              //   try {
              //     setIsLoading(true);
              //     const fcmToken = await asyncStorageUtil.getItem(
              //       StorageKeys.FCM_TOKEN,
              //     );
              //     console.log('FCM_tone_logi', fcmToken);
              //     const payload = {
              //       email: values.email,
              //       password: values.password,
              //       fcmToken: fcmToken,
              //     };
              //     const apiRes = await store.dispatch(loginAPIHander(payload));
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
              const isFieldValid = field => touched[field] && !errors[field];

              //   // Disable button if there are any errors
              //   const isLoginDisabled = Object.keys(errors).length > 0;
              //   useFocusEffect(
              //     React.useCallback(() => {
              //       resetForm();
              //     }, [resetForm]),
              //   );

              return (
                <>
                  <ScrollView
                    style={{
                      flex: 1,
                    }}
                    //   contentContainerStyle={}
                    showsVerticalScrollIndicator={false}>
                    <MasterTextInput
                      label="Service Type"
                      placeholder="Select a service type"
                      topLableName={'Service Type'}
                      isDropdown={true}
                      dropdownData={[
                        {label: 'Electrician', value: 'Electrician'},
                        {label: 'Plumber', value: 'Plumber'},
                        {label: 'Carpenter', value: 'Carpenter'},
                      ]}
                      value={values.gender}
                      onDropdownChange={item => {
                        // formikRef.current.setFieldValue('gender', item.value);
                      }}
                      onBlur={handleBlur('gender')}
                      error={touched.gender && errors.gender}
                    />
                    {/* <MasterTextInput
                      label="Service Type*"
                      placeholder="Service Type"
                      ref={inputRefs.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={values.email}
                      onChangeText={
                        text => {}
                        // setFieldValue('email', handleEmailChange(text))
                      }
                      onBlur={handleBlur('email')}
                      onSubmitEditing={() => inputRefs.password.current.focus()}
                      error={touched.email && errors.email}
                      isValid={isFieldValid('email')}
                      left={
                        <TextInput.Icon
                          icon="work"
                          color={theme.color.charcolBlack}
                        />
                      }
                    /> */}

                    <MasterTextInput
                      topLableName={'Urgency Level'}
                      isDropdown={true}
                      dropdownData={[
                        {label: 'Normal', value: 'Normal'},
                        {label: 'Urgent', value: 'Urgent'},
                      ]}
                      value={values.isMarried}
                      onDropdownChange={item => {
                        // formikRef.current.setFieldValue('isMarried', item.value);
                      }}
                      onBlur={handleBlur('isMarried')}
                    />
                    <MasterTextInput
                      topLableName={'Work type'}
                      isDropdown={true}
                      dropdownData={[
                        {label: 'Full Day', value: 'Full Day'},
                        {label: 'Half day', value: 'Half day'},
                      ]}
                      value={values.isMarried}
                      onDropdownChange={item => {
                        // formikRef.current.setFieldValue('isMarried', item.value);
                      }}
                      onBlur={handleBlur('isMarried')}
                    />
                    <MasterTextInput
                      label="Booking Date & Time"
                      placeholder="Booking Date & Time "
                      topLableName={'Booking Date & Time'}
                      isDate={true}
                      timePicker={true}
                      ref={inputRefs.birthDate}
                      value={values.birthDate}
                      maxDate={maxDate}
                      minDate={new Date()}
                      onChangeText={txt => {
                        setFieldValue('birthDate', txt);
                      }}
                      onBlur={handleBlur('birthDate')}
                      onSubmitEditing={() =>
                        inputRefs.baptismDate.current.focus()
                      }
                      error={touched.birthDate && errors.birthDate}
                    />
                  </ScrollView>

                  <CustomButton
                    title={'Confirm'}
                    onPress={() => {
                      // setIsModalVisible(true);
                    }}
                    // disabled
                    // loading={true}
                  />
                </>
              );
            }}
          </Formik>
        </View>
      </Modal>
    </View>
  );
};

const SkilledModal = ({
  isModalVisible,
  selectedDistance = 0,
  onBackdropPress,
  handleSelectDistance,
  onSelectDistance,
}) => {
  const inputRefs = {
    email: useRef(null),
    password: useRef(null),
  };
  const minDate = new Date();
  // minDate.setFullYear(minDate.getFullYear() - 100);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={onBackdropPress} // Close modal when tapping outside
        onSwipeComplete={onBackdropPress} // Swipe down to close
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={300} // Smooth fade-in
        animationOutTiming={500} // Slow fade-out for better visibility
        backdropTransitionOutTiming={500} // Smooth backdrop fade-out
        propagateSwipe={true}
        useNativeDriver={true} // Enable native driver for better performance
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.modalTitle}>
              Please provide your requirement
            </Text>
            <TouchableOpacity
              onPress={onBackdropPress}
              activeOpacity={0.8}
              style={{
                alignItems: 'flex-end',
                position: 'absolute',
                right: '-1%',
                top: '-35%',
              }}>
              <VectorIcon
                type="Ionicons"
                name="close-circle-sharp"
                size={getFontSize(4)}
                color={theme.color.grey}
              />
            </TouchableOpacity>
          </View>
          <Formik
            initialValues={{email: '', password: '', birthDate: ''}}
            validationSchema={loginValidationSchema}
            onSubmit={async (values, {resetForm}) => {
              //   try {
              //     setIsLoading(true);
              //     const fcmToken = await asyncStorageUtil.getItem(
              //       StorageKeys.FCM_TOKEN,
              //     );
              //     console.log('FCM_tone_logi', fcmToken);
              //     const payload = {
              //       email: values.email,
              //       password: values.password,
              //       fcmToken: fcmToken,
              //     };
              //     const apiRes = await store.dispatch(loginAPIHander(payload));
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
              const isFieldValid = field => touched[field] && !errors[field];

              //   // Disable button if there are any errors
              //   const isLoginDisabled = Object.keys(errors).length > 0;
              //   useFocusEffect(
              //     React.useCallback(() => {
              //       resetForm();
              //     }, [resetForm]),
              //   );

              return (
                <>
                  <ScrollView
                    style={{
                      flex: 1,
                    }}
                    //   contentContainerStyle={}
                    showsVerticalScrollIndicator={false}>
                    <MasterTextInput
                      label="Service Type"
                      placeholder="Select a service type"
                      topLableName={'Service Type'}
                      isDropdown={true}
                      dropdownData={[
                        {label: 'Electrician', value: 'Electrician'},
                        {label: 'Plumber', value: 'Plumber'},
                        {label: 'Carpenter', value: 'Carpenter'},
                      ]}
                      value={values.gender}
                      onDropdownChange={item => {
                        // formikRef.current.setFieldValue('gender', item.value);
                      }}
                      onBlur={handleBlur('gender')}
                      error={touched.gender && errors.gender}
                    />
                    {/* <MasterTextInput
                      label="Service Type*"
                      placeholder="Service Type"
                      ref={inputRefs.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={values.email}
                      onChangeText={
                        text => {}
                        // setFieldValue('email', handleEmailChange(text))
                      }
                      onBlur={handleBlur('email')}
                      onSubmitEditing={() => inputRefs.password.current.focus()}
                      error={touched.email && errors.email}
                      isValid={isFieldValid('email')}
                      left={
                        <TextInput.Icon
                          icon="work"
                          color={theme.color.charcolBlack}
                        />
                      }
                    /> */}

                    <MasterTextInput
                      topLableName={'Urgency Level'}
                      isDropdown={true}
                      dropdownData={[
                        {label: 'Normal', value: 'Normal'},
                        {label: 'Urgent', value: 'Urgent'},
                      ]}
                      value={values.isMarried}
                      onDropdownChange={item => {
                        // formikRef.current.setFieldValue('isMarried', item.value);
                      }}
                      onBlur={handleBlur('isMarried')}
                    />
                    <MasterTextInput
                      topLableName={'Work type'}
                      isDropdown={true}
                      dropdownData={[
                        {label: 'Full Day', value: 'Full Day'},
                        {label: 'Half day', value: 'Half day'},
                      ]}
                      value={values.isMarried}
                      onDropdownChange={item => {
                        // formikRef.current.setFieldValue('isMarried', item.value);
                      }}
                      onBlur={handleBlur('isMarried')}
                    />
                    <MasterTextInput
                      label="Booking Date & Time"
                      placeholder="Booking Date & Time "
                      topLableName={'Booking Date & Time'}
                      isDate={true}
                      timePicker={true}
                      ref={inputRefs.birthDate}
                      value={values.birthDate}
                      maxDate={maxDate}
                      minDate={new Date()}
                      onChangeText={txt => {
                        setFieldValue('birthDate', txt);
                      }}
                      onBlur={handleBlur('birthDate')}
                      onSubmitEditing={() =>
                        inputRefs.baptismDate.current.focus()
                      }
                      error={touched.birthDate && errors.birthDate}
                    />
                  </ScrollView>

                  <CustomButton
                    title={'Confirm'}
                    onPress={() => {
                      // setIsModalVisible(true);
                    }}
                    // disabled
                    // loading={true}
                  />
                </>
              );
            }}
          </Formik>
        </View>
      </Modal>
    </View>
  );
};
const ReviewModal = ({isModalVisible, onBackdropPress}) => {
  const getRatingText = rating => {
    if (rating === 1) return 'Very Bad';
    if (rating === 2) return 'Bad';
    if (rating === 3) return 'Average';
    if (rating === 4) return 'Good';
    if (rating === 5) return 'Excellent';
    return '';
  };

  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={onBackdropPress}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={300} // Smooth fade-in
        animationOutTiming={500} // Slow fade-out for better visibility
        backdropTransitionOutTiming={500} // Smooth backdrop fade-out
        propagateSwipe={true}
        useNativeDriver={true} // Enable native driver for better performance
        style={styles.modal}>
        <View style={styles.smallModalCOntent}>
          <Text style={styles.modalTitle}>Leave a Review</Text>
          <TouchableOpacity
            onPress={onBackdropPress}
            style={{
              position: 'absolute',
              right: getResWidth(3),
              top: getResHeight(2),
            }}>
            <VectorIcon
              type="Ionicons"
              name="close-circle-sharp"
              size={getFontSize(4)}
              color={theme.color.grey}
            />
          </TouchableOpacity>

          <Formik
            initialValues={{review: '', rating: 5}}
            onSubmit={values => {
              console.log('Review Submitted:', values);
              onBackdropPress();
            }}>
            {({handleChange, handleSubmit, setFieldValue, values}) => (
              <>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                    }}>
                    <View
                      style={{
                        width: '60%',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}>
                      <AirbnbRating
                        count={5}
                        defaultRating={values.rating}
                        size={24}
                        showRating={false}
                        onFinishRating={rating =>
                          setFieldValue('rating', rating)
                        }
                      />
                    </View>

                    <View
                      style={{
                        width: '50%',
                        justifyContent: 'center',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                      }}>
                      <Text
                        style={[
                          styles.ratingText,
                          {
                            marginLeft: getResWidth(2),
                          },
                        ]}>
                        {getRatingText(values.rating)}
                      </Text>
                    </View>
                  </View>
                  <MasterTextInput
                    label="Write a Review"
                    placeholder="Share your experience..."
                    multiline
                    value={values.review}
                    onChangeText={handleChange('review')}
                    style={styles.textArea}
                  />
                </ScrollView>
                <CustomButton title={'Submit'} onPress={handleSubmit} />
              </>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
};
const TermAndConditionModal = props => {
  const {
    isModalVisible,
    onBackdropPress,
    isCheckBoxMarked,
    isCheckBox,
    setIsCheckBoxMarked,
  } = props;
  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={onBackdropPress}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={300} // Smooth fade-in
        animationOutTiming={500} // Slow fade-out for better visibility
        backdropTransitionOutTiming={500} // Smooth backdrop fade-out
        propagateSwipe={true}
        useNativeDriver={true} // Enable native driver for better performance
        style={styles.modal}>
        <PrivacyPolicyComponent {...props} />
      </Modal>
    </View>
  );
};

const MultiLngModal = ({isModalVisible, onBackdropPress}) => {
  const {t, i18n} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = language => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackButtonPress={onBackdropPress}
      onBackdropPress={onBackdropPress}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={300} // Smooth fade-in
      animationOutTiming={500} // Slow fade-out for better visibility
      backdropTransitionOutTiming={500} // Smooth backdrop fade-out
      propagateSwipe={true}
      useNativeDriver={true} // Enable native driver for better performance
      style={styles.modal}>
      <View style={styles.lngOptionContainer}>
        <Text style={styles.lngHeaderText}>{'Select Language'}</Text>
        <RadioButton.Group
          onValueChange={handleLanguageChange}
          value={selectedLanguage}>
          {languageOptions.map(lang => (
            <TouchableOpacity
              key={lang.code}
              style={styles.lngOptionButton}
              onPress={() => {
                handleLanguageChange(lang.code);

                onBackdropPress();
              }}
              activeOpacity={0.7}>
              <RadioButton
                value={lang.code}
                color={theme.color.secondary} // Color when checked
                uncheckedColor="#ccc" // Color when unchecked
              />
              <Text style={styles.lngOptionText}>{lang.label}</Text>
            </TouchableOpacity>
          ))}
        </RadioButton.Group>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end', // Align modal at the bottom
    margin: 0,
  },

  //Lng modales styles start
  lngOptionContainer: {
    width: '100%',
    paddingTop: getResHeight(2),
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    borderTopLeftRadius: getResHeight(3),
    borderTopRightRadius: getResHeight(3),
  },
  lngHeaderText: {
    fontSize: getFontSize(1.8),
    fontFamily: theme.font.bold,
    // fontWeight: 'bold',
    // marginBottom: 15,
    marginBottom: '3%',
    color: '#333',
  },
  lngOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: getResHeight(0.8),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
  },
  lngOptionText: {
    fontSize: getFontSize(1.4),
    fontFamily: theme.font.semiBold,
    color: '#555',
    marginLeft: '1%', // Added margin for better spacing
  },
  //Lng modales styles end
  modalContent: {
    backgroundColor: '#FFF',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: getResHeight(80), // Set a medium height (40% of the screen height)
    // minHeight: getResHeight(50), // Ensure it doesn't grow too tall
    maxHeight: getResHeight(110), // Ensure it doesn't grow too tall
  },
  smallModalCOntent: {
    backgroundColor: '#FFF',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: getResHeight(40), // Set a medium height (40% of the screen height)
    // minHeight: getResHeight(50), // Ensure it doesn't grow too tall
    maxHeight: getResHeight(60), // Ensure it doesn't grow too tall
  },
  ratingText: {
    fontFamily: theme.font.medium,
    fontSize: getFontSize(1.5),
    color: theme.color.charcolBlack,
  },
  modalTitle: {
    fontSize: getFontSize(1.5),
    fontFamily: theme.font.semiBold,
    marginBottom: getResHeight(1.5),
    textAlign: 'center',
    color: theme.color.charcolBlack,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  itemText: {
    fontSize: getFontSize(1.6),
    paddingVertical: getResHeight(1.3),
    color: theme.color.charcolBlack,
    fontFamily: theme.font.semiBold,
    textAlign: 'center',
  },
});

export {
  HireNowDetailsModal,
  ReviewModal,
  SkilledModal,
  MultiLngModal,
  TermAndConditionModal,
};
