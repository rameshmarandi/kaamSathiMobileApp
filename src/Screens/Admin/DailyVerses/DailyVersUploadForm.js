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
import {
  CommonButtonComp,
  CustomAlertModal,
} from '../../../Components/commonComp';
import ToastAlertComp from '../../../Components/ToastAlertComp';
import MasterTextInput from '../../../Components/MasterTextInput';
import FileUploadComponent from '../../../Components/FileUploadComponent';
import CustomHeader from '../../../Components/CustomHeader';
import MsgConfig from '../../../Config/MsgConfig';
import {store} from '../../../redux/store';
import {uploadDailyVersesAPIHander} from '../../../redux/reducer/DailyVerses/dailyVersesAPI';
import {Text} from 'react-native';
import theme from '../../../utility/theme';

const DailyVersUploadForm = ({visible, onRequestClose, navigation}) => {
  const {currentTextColor, currentBgColor} = useSelector(state => state.user);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle image error
  const handleImageError = useCallback(
    errorMessage => {
      onRequestClose();
      ToastAlertComp('error', 'Failed', errorMessage);
    },
    [onRequestClose],
  );
  const handleImageError1 = useCallback(
    errorMessage => {
      onRequestClose();
      ToastAlertComp('error', 'Failed', errorMessage);
    },
    [onRequestClose],
  );

  // Handle form submission
  const handleSubmitForm = async values => {
    try {
      setIsLoading(true);
      const paylord = {
        hindiImg: values.hindiImg,
        englishImg: values.englishImg,
        marathiImg: values.marathiImg,
        scheduleDate: values.scheduleDate,
      };
      const res = await store.dispatch(uploadDailyVersesAPIHander(paylord));
      if (res.payload === true) {
        onRequestClose();
        setAlertMessage({
          status: 'success',

          alertMsg: 'Daily verses scheduled successfully',
        });
        setIsLoading(false);
        setIsAlertVisible(true);
      }
    } catch (error) {
      console.error('User_back_api_faild:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClose = () => {
    setIsAlertVisible(false);
  };

  const NoteComp = memo(() => (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        paddingBottom: '5%',
        borderBottomWidth: 1,
        borderBottomColor: currentTextColor,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: currentTextColor,
            fontFamily: theme.font.semiBold,
            fontSize: getFontSize(1.8),
          }}>
          Note :{' '}
        </Text>
        <Text
          style={{
            color: currentTextColor,
            fontFamily: theme.font.medium,
            fontSize: getFontSize(1.5),
          }}>
          Post will be scheduled everyday at 6 AM
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: currentTextColor,
            fontFamily: theme.font.semiBold,
            fontSize: getFontSize(1.8),
          }}>
          Poster size :
        </Text>
        <Text
          style={{
            color: currentTextColor,
            fontFamily: theme.font.medium,
            fontSize: getFontSize(1.5),
          }}>
          150 * 150 px
        </Text>
      </View>
    </View>
  ));
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
        onRequestClose={onRequestClose} // Handle back press on Android
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
            backPress={onRequestClose}
            screenTitle={MsgConfig.uploadResource}
          />
          <View>
            <CustomAlertModal
              visible={isAlertVisible}
              message={alertMessage}
              duration={3000} // duration in milliseconds
              onClose={handleClose}
            />
          </View>
          <NoteComp />
          <View
            style={{
              flex: 1,
              backgroundColor: currentBgColor,
              justifyContent: 'center',
              alignItems: 'center', // Align modal to the center
            }}>
            <Formik
              initialValues={{
                hindiImg: '',
                englishImg: '',
                marathiImg: '',
                scheduleDate: '',
              }}
              onSubmit={handleSubmitForm}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
              }) => (
                <View style={{}}>
                  <ScrollView
                    contentContainerStyle={{
                      flexGrow: 1,
                      paddingBottom: getResHeight(10),
                      marginTop: '5%',
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    <MasterTextInput
                      label="Schedule Date"
                      placeholder="Schedule Date"
                      topLableName="Schedule Date"
                      value={values.scheduleDate}
                      isDate={true}
                      // timePicker={true}
                      onChangeText={handleChange('scheduleDate')}
                      onBlur={handleBlur('scheduleDate')}
                      error={touched.scheduleDate && errors.scheduleDate}
                    />
                    <FileUploadComponent
                      selectedImage={values.hindiImg.uri || ''}
                      onImageSuccess={img => {
                        setFieldValue('hindiImg', img);
                      }}
                      labelText="Select hindi poster"
                      onImageError={handleImageError}
                      customHeight={getResHeight(21)}
                    />
                    <FileUploadComponent
                      selectedImage={values.englishImg.uri || ''}
                      onImageSuccess={img => {
                        setFieldValue('englishImg', img);
                      }}
                      labelText="Select english poster"
                      onImageError={handleImageError}
                      customHeight={getResHeight(21)}
                    />
                    <FileUploadComponent
                      selectedImage={values.marathiImg.uri || ''}
                      onImageSuccess={img => {
                        setFieldValue('marathiImg', img);
                      }}
                      labelText="Select marathi poster"
                      onImageError={handleImageError}
                      customHeight={getResHeight(21)}
                    />
                  </ScrollView>

                  <View style={{}}>
                    <CommonButtonComp
                      isLoading={isLoading}
                      title="Submit"
                      onPress={handleSubmit}
                    />
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

export default memo(DailyVersUploadForm);
