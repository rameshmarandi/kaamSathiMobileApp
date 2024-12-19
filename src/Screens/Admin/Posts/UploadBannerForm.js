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
import moment from 'moment';
import {createBannerAPIHander} from '../../../redux/reducer/Banner/BannerAPI';
import {handleTextChange} from '../../../Components/InputHandlers';
import {TextInput} from 'react-native-paper';

const UploadBannerForm = ({visible, onRequestClose, navigation}) => {
  const {currentTextColor, currentBgColor} = useSelector(state => state.user);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formikRef = useRef(null);
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
        bannerImage: values.bannerImage,
        caption: values.caption,
      };
      if (values.isSchdule == 1) {
        paylord.scheduledDate = values.scheduledDate;
      }
      console.log('isGandle_Sbumits', paylord);
      const res = await store.dispatch(createBannerAPIHander(paylord));

      if (res.payload === true) {
        setAlertMessage({
          status: 'success',

          alertMsg: 'Banner created successfully',
        });
        setIsLoading(false);
        setIsAlertVisible(true);
        onRequestClose();
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
            screenTitle={MsgConfig.uploadMomentsPhoto}
          />
          <View>
            <CustomAlertModal
              visible={isAlertVisible}
              message={alertMessage}
              duration={3000} // duration in milliseconds
              onClose={handleClose}
            />
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: currentBgColor,
              justifyContent: 'center',
              alignItems: 'center', // Align modal to the center
            }}>
            <Formik
              innerRef={formikRef}
              initialValues={{
                bannerImage: '',
                caption: '',
                isSchdule: '',
                scheduledDate: '',
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
              }) => {
                const isFieldValid = field => touched[field] && !errors[field];
                return (
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
                        topLableName={'Select publish time'}
                        isDropdown={true}
                        dropdownData={[
                          {
                            // branchId: item.id,
                            label: 'Published Now',
                            value: '0',
                          },
                          {
                            // branchId: item.id,
                            label: 'Schedule',
                            value: '1',
                          },
                        ]}
                        //   value={'Published Now'}
                        value={values.isSchdule}
                        onDropdownChange={item => {
                          setSelectedBranch(item);
                          formikRef.current.setFieldValue(
                            'isSchdule',
                            item.value,
                          );
                        }}
                        onBlur={handleBlur('isSchdule')}
                        error={touched.isSchdule && errors.isSchdule}
                      />

                      {values.isSchdule == 1 && (
                        <MasterTextInput
                          label="Schedule Date"
                          placeholder="Schedule Date"
                          topLableName="Schedule Date"
                          value={values.scheduledDate}
                          isDate={true}
                          // timePicker={true}
                          minDate={moment().subtract(1, 'days').toDate()}
                          onChangeText={handleChange('scheduledDate')}
                          onBlur={handleBlur('scheduledDate')}
                          error={touched.scheduledDate && errors.scheduledDate}
                        />
                      )}

                      <FileUploadComponent
                        selectedImage={values.bannerImage?.uri || ''}
                        onImageSuccess={img => {
                          setFieldValue('bannerImage', img);
                        }}
                        labelText="Select banner poster"
                        onImageError={handleImageError}
                        customHeight={getResHeight(21)}
                      />
                      <View
                        style={{
                          marginTop: '5%',
                        }}>
                        <MasterTextInput
                          label="Enter captions"
                          placeholder="Enter captions"
                          value={values.caption}
                          onChangeText={text =>
                            setFieldValue('caption', handleTextChange(text))
                          }
                          maxLength={60}
                          onBlur={handleBlur('caption')}
                          error={touched.caption && errors.caption}
                          isValid={isFieldValid('caption')}
                          left={
                            <TextInput.Icon
                              icon="message"
                              color={currentTextColor}
                              size={getFontSize(3.5)}
                            />
                          }
                        />
                      </View>
                    </ScrollView>

                    <View style={{}}>
                      <CommonButtonComp
                        isLoading={isLoading}
                        title="Submit"
                        onPress={handleSubmit}
                      />
                    </View>
                  </View>
                );
              }}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default memo(UploadBannerForm);
