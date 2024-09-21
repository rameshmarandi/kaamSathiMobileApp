import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import theme from '../../utility/theme';
import MasterTextInput from '../../Components/MasterTextInput';
import {VectorIcon} from '../../Components/VectorIcon';
import LoginWithGoogle from '../../Components/LoginWithGoogle';
import {Formik} from 'formik';
import {handleEmailChange} from '../../Components/InputHandlers';
import {color} from 'react-native-elements/dist/helpers';
import AddMemberForm from '../Admin/Members/AddMemberForm';
import {TextInput} from 'react-native-paper';

const LoginPage = props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  const [addNewMemberModalVisible, setAddNewMemberModalVisible] =
    useState(false);
  const inputRefs = {
    email: useRef(null),
    password: useRef(null),
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: currentBgColor}]}>
      <View>
        <AddMemberForm
          visible={addNewMemberModalVisible}
          closeModal={() => {
            setAddNewMemberModalVisible(false);
          }}
          navigation={navigation}
        />
      </View>
      <View style={styles.header}>
        <Text style={[styles.greetingText, {color: currentTextColor}]}>
          Hey there,
        </Text>
        <Text style={[styles.welcomeText, {color: currentTextColor}]}>
          Welcome Back
        </Text>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <Formik initialValues={{email: '', password: ''}} onSubmit={() => {}}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => {
            const isFieldValid = field => touched[field] && !errors[field];

            return (
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}>
                <MasterTextInput
                  label="Email*"
                  placeholder="Enter email address"
                  ref={inputRefs.email}
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={text =>
                    setFieldValue('email', handleEmailChange(text))
                  }
                  onBlur={handleBlur('email')}
                  onSubmitEditing={() => inputRefs.password.current.focus()}
                  error={touched.email && errors.email}
                  isValid={isFieldValid('email')}
                  left={
                    <TextInput.Icon icon="email" color={currentTextColor} />
                  }
                />
                <MasterTextInput
                  label="Password*"
                  placeholder="Enter your password"
                  secureTextEntry
                  ref={inputRefs.password}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  onSubmitEditing={handleSubmit}
                  error={touched.password && errors.password}
                  left={<TextInput.Icon icon="lock" color={currentTextColor} />}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('ForgotPassword');
                  }}>
                  <Text
                    style={[
                      styles.forgotPasswordText,
                      {color: currentTextColor},
                    ]}>
                    Forgot password
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[
                    styles.loginButton,
                    {backgroundColor: currentTextColor},
                  ]}
                  onPress={handleSubmit}>
                  <VectorIcon
                    type="MaterialCommunityIcons"
                    name="login"
                    size={getFontSize(3.3)}
                    color={currentBgColor}
                  />
                  <Text
                    style={[styles.loginButtonText, {color: currentBgColor}]}>
                    Login
                  </Text>
                </TouchableOpacity>
                <View style={styles.separatorContainer}>
                  <View
                    style={[
                      styles.separatorLine,
                      {borderColor: currentTextColor},
                    ]}
                  />
                  <Text
                    style={[
                      styles.separatorText,
                      {
                        backgroundColor: currentBgColor,
                        color: currentTextColor,
                        fontFamily: theme.font.semiBold,
                        fontSize: getFontSize(1.5),
                      },
                    ]}>
                    OR
                  </Text>
                </View>
                <LoginWithGoogle
                  currentTextColor={currentTextColor}
                  currentBgColor={currentBgColor}
                  btnTitle={'Singin with Google'}
                  onPress={() => {}}
                />
                <View
                  style={[
                    styles.registerContainer,
                    {
                      marginTop: '5%',
                    },
                  ]}>
                  <Text
                    style={{
                      fontFamily: theme.font.regular,
                      color: currentTextColor,
                      fontSize: getFontSize(1.5),
                    }}>
                    Don’t have an account yet? {/* <TouchableOpacity> */}
                    <Text
                      onPress={() => setAddNewMemberModalVisible(true)}
                      style={[
                        styles.registerText,
                        {
                          fontFamily: theme.font.bold,
                          fontSize: getFontSize(2),
                        },
                      ]}>
                      Register
                    </Text>
                  </Text>
                </View>
              </ScrollView>
            );
          }}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    width: '90%',
    alignSelf: 'center',
  },
  scrollViewContent: {
    // paddingTop: getResHeight(10),
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getResHeight(4),
    marginTop: getResHeight(5),
  },
  greetingText: {
    fontFamily: theme.font.medium,
    fontSize: getFontSize(1.3),
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
    marginVertical: getResHeight(7),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  separatorLine: {
    flex: 1,
    borderBottomWidth: 1,
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
