import React, {useState, useFocusEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import Animated from 'react-native-reanimated';
import VectorIcon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../utility/theme';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import CustomHeader from '../../Components/CustomHeader';
import MasterTextInput from '../../Components/MasterTextInput';
import CustomButton from '../../Components/CustomButton';
import {TextInput} from 'react-native-paper';
const EditProfile = ({navigation}) => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImagePick = () => {
    launchImageLibrary({}, response => {
      if (!response.didCancel && response.assets?.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const profileFields = [
    {id: '1', name: 'fullName', label: 'Full Name', keyboardType: 'default'},
    {id: '2', name: 'email', label: 'Email', keyboardType: 'email-address'},
  ];

  let currentTextColor = theme.color.outlineColor;
  let currentBgColor = theme.color.primary;
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedHeader navigation={navigation} />
      <ProfileImagePicker
        profileImage={profileImage}
        onPickImage={handleImagePick}
      />
      <View style={{paddingHorizontal: getResWidth(4)}}>
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
            // useFocusEffect(
            //   React.useCallback(() => {
            //     resetForm();
            //   }, [resetForm]),
            // );

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
                    // ref={inputRefs.oldPassword}
                    value={values.oldPassword}
                    onChangeText={handleChange('oldPassword')}
                    onBlur={handleBlur('oldPassword')}
                    onSubmitEditing={handleSubmit}
                    error={touched.oldPassword && errors.oldPassword}
                    left={
                      <TextInput.Icon icon="lock" color={currentTextColor} />
                    }
                  />
                  <MasterTextInput
                    label="New password*"
                    placeholder="Enter old password"
                    secureTextEntry
                    // ref={inputRefs.newPassword}
                    value={values.newPassword}
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    onSubmitEditing={handleSubmit}
                    error={touched.newPassword && errors.newPassword}
                    left={
                      <TextInput.Icon icon="lock" color={currentTextColor} />
                    }
                  />
                  <MasterTextInput
                    label="Confirm password*"
                    placeholder="Enter confirm password"
                    secureTextEntry
                    // ref={inputRefs.password}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    onSubmitEditing={handleSubmit}
                    error={touched.password && errors.password}
                    left={
                      <TextInput.Icon icon="lock" color={currentTextColor} />
                    }
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
        {/* <Formik
          initialValues={{fullName: '', email: ''}}
          validationSchema={Yup.object({
            fullName: Yup.string().required('Full Name is required'),
            email: Yup.string()
              .email('Invalid email')
              .required('Email is required'),
          })}
          onSubmit={values => console.log('Form Data:', values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <FlatList
                data={profileFields}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <View>
                    <Text style={styles.label}>{item.label}</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType={item.keyboardType}
                      onChangeText={handleChange(item.name)}
                      onBlur={handleBlur(item.name)}
                      value={values[item.name]}
                    />
                    {touched[item.name] && errors[item.name] && (
                      <Text style={styles.errorText}>{errors[item.name]}</Text>
                    )}
                  </View>
                )}
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSubmit}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik> */}
      </View>
    </SafeAreaView>
  );
};

const AnimatedHeader = ({navigation}) => {
  return (
    <CustomHeader
      backPress={() => navigation.goBack()}
      screenTitle="Edit Profile"
    />
  );
};

const ProfileImagePicker = ({profileImage, onPickImage}) => {
  return (
    <View style={styles.profileContainer}>
      <TouchableOpacity onPress={onPickImage} style={styles.imageWrapper}>
        <Image
          source={{uri: profileImage || 'https://via.placeholder.com/150'}}
          style={styles.profileImage}
        />
        <View style={styles.iconContainer}>
          <VectorIcon
            name="camera-alt"
            size={getFontSize(2.4)}
            color={theme.color.primary}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white,
    // padding: getResHeight(4),
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: getResHeight(4),
    paddingTop: getResHeight(2),
  },
  imageWrapper: {position: 'relative'},
  profileImage: {
    height: getResHeight(20),
    width: getResHeight(20),
    backgroundColor: theme.color.grey,
    borderRadius: getResHeight(100),
    // borderWidth: 1,
  },
  iconContainer: {
    position: 'absolute',
    bottom: getResHeight(0.5),
    right: getResHeight(0.5),
    height: getResHeight(4),
    width: getResHeight(4),
    borderRadius: getResHeight(2),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.color.primary,
    borderWidth: 2,
  },
  label: {
    fontSize: getFontSize(2),
    fontWeight: '600',
    color: theme.color.charcolBlack,
    marginBottom: getResHeight(1),
  },
  input: {
    backgroundColor: 'white',
    padding: getResHeight(1.5),
    borderRadius: getResHeight(1),
    fontSize: getFontSize(2),
    marginBottom: getResHeight(2),
    borderWidth: 1,
    borderColor: theme.color.charcolBlack,
    color: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: getFontSize(1.5),
    marginBottom: getResHeight(2),
  },
  saveButton: {
    backgroundColor: theme.color.primary,
    padding: getResHeight(2),
    borderRadius: getResHeight(1.5),
    alignItems: 'center',
    marginTop: getResHeight(2),
  },
  saveButtonText: {fontSize: getFontSize(2), color: 'white', fontWeight: '600'},
});

export default EditProfile;
