import React, {useRef, useState, useCallback, memo} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import {getResHeight, getFontSize} from '../../../utility/responsive';
import {VectorIcon} from '../../../Components/VectorIcon';
import {CommonButtonComp} from '../../../Components/commonComp';
import ToastAlertComp from '../../../Components/ToastAlertComp';
import MasterTextInput from '../../../Components/MasterTextInput';
import FileUploadComponent from '../../../Components/FileUploadComponent';

const DailyVersUploadForm = ({closeBottomSheetWithContent}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const {currentTextColor} = useSelector(state => state.user);

  const scrollRef = useRef(null);
  const inputRefs = {scheduleData: useRef(null)};

  // Handle image success
  const handleImageSuccess = useCallback(imageData => {
    setSelectedImage(imageData.uri);
  }, []);

  // Handle image error
  const handleImageError = useCallback(
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
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <TouchableOpacity
        onPress={closeBottomSheetWithContent}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 99,
        }}>
        <VectorIcon
          type="FontAwesome"
          name="close"
          size={getFontSize(3)}
          color={currentTextColor}
        />
      </TouchableOpacity>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={{flex: 1}}>
          <Formik
            initialValues={{posterImage: '', scheduleData: ''}}
            onSubmit={handleSubmitForm}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={{flex: 1, marginTop: getResHeight(4)}}>
                <FileUploadComponent
                  selectedImage={selectedImage}
                  onImageSuccess={handleImageSuccess}
                  labelText="Please select the poster"
                  onImageError={handleImageError}
                />

                <MasterTextInput
                  label="Click to select date"
                  placeholder="Click to select date"
                  topLableName="Select data and time"
                  isDate
                  timePicker
                  minDate={new Date()}
                  ref={inputRefs.scheduleData}
                  value={values.scheduleData}
                  onChangeText={handleChange('scheduleData')}
                  onBlur={handleBlur('scheduleData')}
                  error={touched.scheduleData && errors.scheduleData}
                />

                <View
                  style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: 10,
                  }}>
                  <CommonButtonComp title="Submit" onPress={handleSubmit} />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default memo(DailyVersUploadForm);
