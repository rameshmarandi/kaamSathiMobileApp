import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import VectorIcon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../utility/theme';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import CustomHeader from '../../Components/CustomHeader';
import {useFocusEffect} from '@react-navigation/native';
import MasterTextInput from '../../Components/MasterTextInput';
import {TextInput} from 'react-native-paper';
import CustomButton from '../../Components/CustomButton';

const ChangePassword = ({navigation}) => {
  const [secureOld, setSecureOld] = useState(true);
  const [secureNew, setSecureNew] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });
  const inputRefs = {
    oldPassword: useRef(null),
    newPassword: useRef(null),
    confirmPassword: useRef(null),
  };

  let currentTextColor = theme.color.outlineColor;
  let currentBgColor = theme.color.primary;
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle="Change Password"
      />

      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        // validationSchema={loginValidationSchema}
        onSubmit={async (values, {resetForm}) => {}}>
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

          // Disable button if there are any errors
          const isLoginDisabled = Object.keys(errors).length > 0;
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
                <MasterTextInput
                  label="Old password*"
                  placeholder="Enter your old password"
                  secureTextEntry
                  ref={inputRefs.oldPassword}
                  value={values.oldPassword}
                  onChangeText={handleChange('oldPassword')}
                  onBlur={handleBlur('oldPassword')}
                  onSubmitEditing={handleSubmit}
                  error={touched.oldPassword && errors.oldPassword}
                  left={<TextInput.Icon icon="lock" color={currentTextColor} />}
                />
                <MasterTextInput
                  label="New password*"
                  placeholder="Enter old password"
                  secureTextEntry
                  ref={inputRefs.newPassword}
                  value={values.newPassword}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  onSubmitEditing={handleSubmit}
                  error={touched.newPassword && errors.newPassword}
                  left={<TextInput.Icon icon="lock" color={currentTextColor} />}
                />
                <MasterTextInput
                  label="Confirm password*"
                  placeholder="Enter confirm password"
                  secureTextEntry
                  ref={inputRefs.password}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  onSubmitEditing={handleSubmit}
                  error={touched.password && errors.password}
                  left={<TextInput.Icon icon="lock" color={currentTextColor} />}
                />
              </ScrollView>
              {/* Fixed Logout Button */}
              <View style={styles.logoutContainer}>
                <CustomButton
                  title="Update Password"
                  onPress={() => {}}
                  // disabled
                  // leftIcon={
                  //   <VectorIcon
                  //     type="MaterialCommunityIcons"
                  //     name="logout"
                  //     size={24}
                  //     color={theme.color.white}
                  //   />
                  // }
                />
              </View>
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
    backgroundColor: theme.color.white,
  },
  scrollView: {
    paddingHorizontal: getResWidth(6),
    paddingTop: getResHeight(2),
  },
});

export default ChangePassword;
