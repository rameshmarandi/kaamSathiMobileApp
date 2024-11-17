import React, {useRef, useState, useCallback, memo, useEffect} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  Platform,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import {getResHeight, getFontSize} from '../../../utility/responsive';
import {VectorIcon} from '../../../Components/VectorIcon';
import {CommonButtonComp} from '../../../Components/commonComp';
import ToastAlertComp from '../../../Components/ToastAlertComp';
import MasterTextInput from '../../../Components/MasterTextInput';
import FileUploadComponent from '../../../Components/FileUploadComponent';
import CustomHeader from '../../../Components/CustomHeader';
import MsgConfig from '../../../Config/MsgConfig';
import {store} from '../../../redux/store';
import {getLanguageAPIHander} from '../../../redux/reducer/Languages/languageAPI';

const UploadStudyResource = ({
  visible,
  closeBottomSheetWithContent,
  navigation,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const {currentTextColor, currentBgColor} = useSelector(state => state.user);
  const [languageDropdown, setLanguageDropdown] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const {getLanguage} = useSelector(state => state.languges);
  useEffect(() => {
    APIHandler();
  }, [visible]);

  const APIHandler = async () => {
    await store.dispatch(getLanguageAPIHander());
    extractLanguage();
  };

  const extractLanguage = () => {
    const capitalize = str => str.replace(/\b\w/g, char => char.toUpperCase());

    const dropdownData = getLanguage.map(item => ({
      languageId: item._id,
      label: capitalize(item.language),
      value: item.language,
    }));

    setLanguageDropdown(dropdownData);
  };
  // Handle image success
  const handleImageSuccess = useCallback(imageData => {
    setSelectedImage(imageData.uri);
  }, []);
  const handleImageSuccess1 = useCallback(imageData => {
    setSelectedImage1(imageData.uri);
  }, []);

  console.log('GeT_LNG_AT_SDF', languageDropdown);

  // Handle image error
  const handleImageError = useCallback(
    errorMessage => {
      closeBottomSheetWithContent();
      ToastAlertComp('error', 'Failed', errorMessage);
    },
    [closeBottomSheetWithContent],
  );
  const handleImageError1 = useCallback(
    errorMessage => {
      closeBottomSheetWithContent();
      ToastAlertComp('error', 'Failed', errorMessage);
    },
    [closeBottomSheetWithContent],
  );

  // Handle form submission
  const handleSubmitForm = useCallback(
    values => {
      console.log('');
      // closeBottomSheetWithContent();
      // setTimeout(() => {
      //   ToastAlertComp('success', 'Success', 'Post scheduled successfully.');
      // }, 1000);
    },
    [closeBottomSheetWithContent],
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Modal
        visible={visible}
        animationType="fade"
        style={{
          flex: 1,
        }}
        onRequestClose={closeBottomSheetWithContent} // Handle back press on Android
        transparent={true}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            backgroundColor: currentBgColor, // Semi-transparent background
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust offset if needed
        >
          <CustomHeader
            backPress={closeBottomSheetWithContent}
            screenTitle={MsgConfig.uploadStudyResource}
          />

          <View
            style={{
              flex: 1,
              backgroundColor: currentBgColor,
              justifyContent: 'center',
              alignItems: 'center', // Align modal to the center
            }}>
            <Formik
              initialValues={{
                thumbnil: '',
                document: '',
                language: '',
              }}
              onSubmit={handleSubmitForm}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                setFieldValue,
                touched,
              }) => (
                <View style={{}}>
                  <ScrollView
                    contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    <MasterTextInput
                      topLableName={'Select church branch'}
                      isDropdown={true}
                      dropdownData={languageDropdown}
                      value={values.language}
                      onDropdownChange={item => {
                        setSelectedBranch(item);
                        setFieldValue('language', item.value);
                      }}
                      onBlur={handleBlur('language')}
                      error={touched.language && errors.language}
                    />

                    <FileUploadComponent
                      selectedImage={selectedImage}
                      onImageSuccess={handleImageSuccess}
                      labelText="Please select pdf thumbnail"
                      onImageError={handleImageError}
                      customHeight={getResHeight(21)}
                    />
                    <FileUploadComponent
                      selectedImage={selectedImage1}
                      onImageSuccess={handleImageSuccess1}
                      labelText="Please select PDF"
                      onImageError={handleImageError1}
                      customHeight={getResHeight(21)}
                    />
                  </ScrollView>

                  <View style={{}}>
                    <CommonButtonComp title="Submit" onPress={handleSubmit} />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default memo(UploadStudyResource);
