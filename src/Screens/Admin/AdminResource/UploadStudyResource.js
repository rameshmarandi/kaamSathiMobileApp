import React, {useRef, useState, useCallback, memo} from 'react';
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

const UploadStudyResource = ({
  visible,
  closeBottomSheetWithContent,
  navigation,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const {currentTextColor, currentBgColor} = useSelector(state => state.user);

  const scrollRef = useRef(null);

  // Handle image success
  const handleImageSuccess = useCallback(imageData => {
    setSelectedImage(imageData.uri);
  }, []);
  const handleImageSuccess1 = useCallback(imageData => {
    setSelectedImage1(imageData.uri);
  }, []);

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
  const handleSubmitForm = useCallback(() => {
    closeBottomSheetWithContent();
    setTimeout(() => {
      ToastAlertComp('success', 'Success', 'Post scheduled successfully.');
    }, 1000);
  }, [closeBottomSheetWithContent]);

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
            screenTitle={MsgConfig.uploadResource}
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
                pdfThubnail: '',
                pdfImage: '',
                pdfName: '',
              }}
              onSubmit={handleSubmitForm}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={{}}>
                  <ScrollView
                    contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
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

                    <MasterTextInput
                      label="Click to select date"
                      placeholder="Click to select date"
                      topLableName="Select data and time"
                      value={values.pdfName}
                      onChangeText={handleChange('pdfName')}
                      onBlur={handleBlur('pdfName')}
                      error={touched.pdfName && errors.pdfName}
                    />
                  </ScrollView>

                  <View
                    style={
                      {
                        // paddingHorizontal: '5%',
                        // paddingVertical: ,
                      }
                    }>
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
