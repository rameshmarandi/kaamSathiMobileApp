import React, {memo, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector} from 'react-redux';
import CustomHeader from '../../../Components/CustomHeader';
import MsgConfig from '../../../Config/MsgConfig';
import MasterTextInput from '../../../Components/MasterTextInput';
import {CommonButtonComp} from '../../../Components/commonComp';
// import validationSchema from '../../../Components/ValidationSchema';

const AddMemberForm = props => {
  const handleSubmit = values => {
    console.log(values);
  };

  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  const [selectedDate, setSelectedDate] = useState('');
  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    mobile: useRef(null),

    birthDate: useRef(null),
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentBgColor,
      }}>
      <CustomHeader
        backPress={() => {
          navigation.goBack();
        }}
        screenTitle={MsgConfig.AddMemberForm}
      />

      <View style={{flex: 1, paddingHorizontal: '5%'}}>
        <Formik
          initialValues={{email: '', password: '', birthDate: ''}}
          // validationSchema={validationSchema.sigupValidation}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <KeyboardAvoidingView
              style={{flex: 1}}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              // keyboardVerticalOffset={Platform.select({ios: 64, android: 0})}
            >
              <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={{flex: 1}}>
                  <MasterTextInput
                    label="Full name"
                    placeholder="Enter full name"
                    ref={inputRefs.name}
                    onSubmitEditing={() => inputRefs.email.current.focus()}
                  />
                  <MasterTextInput
                    label="Email"
                    placeholder="Enter email address"
                    ref={inputRefs.email}
                    onSubmitEditing={() => inputRefs.mobile.current.focus()}
                  />
                  <MasterTextInput
                    label="Mobile"
                    placeholder="Enter number"
                    ref={inputRefs.mobile}
                    // onSubmitEditing={() => inputRefs.email.current.focus()}
                  />
                  <MasterTextInput
                    label="Date of birth"
                    placeholder="Select birth date"
                    isDate={true}
                    ref={inputRefs.dob}
                    value={selectedDate}
                    onChangeText={date => {
                      setSelectedDate(date);
                    }}
                    onSubmitEditing={handleSubmit}
                  />
                  <MasterTextInput
                    label="Date of baptism"
                    placeholder="Select birth baptism"
                    isDate={true}
                    ref={inputRefs.baptism_dob}
                    value={selectedDate}
                    onChangeText={date => {
                      setSelectedDate(date);
                    }}
                    onSubmitEditing={handleSubmit}
                  />
                  <MasterTextInput
                    label="Password"
                    placeholder="Enter your password"
                    secureTextEntry
                    onSubmitEditing={() => inputRefs.birthDate.current.focus()}
                  />
                </View>
              </ScrollView>
              <View style={styles.buttonContainer}>
                <CommonButtonComp title={'Sign up'} onPress={handleSubmit} />
              </View>
            </KeyboardAvoidingView>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    width: '100%',
  },
});

export default memo(AddMemberForm);
