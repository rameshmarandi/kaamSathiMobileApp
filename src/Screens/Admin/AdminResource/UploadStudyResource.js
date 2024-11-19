import React, {useRef, useState, useCallback, memo, useEffect} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import {
  getResHeight,
  getFontSize,
  getResWidth,
} from '../../../utility/responsive';

import {
  CommonButtonComp,
  CustomAlertModal,
} from '../../../Components/commonComp';

import MasterTextInput from '../../../Components/MasterTextInput';
import FileUploadComponent from '../../../Components/FileUploadComponent';
import CustomHeader from '../../../Components/CustomHeader';
import MsgConfig from '../../../Config/MsgConfig';
import {store} from '../../../redux/store';
import {
  createLanguageAPIHander,
  deleteLanguageAPIHander,
  getLanguageAPIHander,
  updateLanguageAPIHander,
} from '../../../redux/reducer/Languages/languageAPI';
import {createResourceAPIHander} from '../../../redux/reducer/Resources/resourcesAPI';
import TabViewComp from '../../../Components/TabViewComp';
import {verseResourceCommonStyle} from '../../Styles/verseResourceCommonStyle';
import NoDataFound from '../../../Components/NoDataFound';
import theme from '../../../utility/theme';
import {VectorIcon} from '../../../Components/VectorIcon';
import WaveButton from '../../../Components/WaveButton';
import {generateMeaningfulAbbreviation} from '../../../Components/commonHelper';
import {ActivityIndicator} from 'react-native';
import ConfirmAlert from '../../../Components/ConfirmAlert';
import {RefreshControl} from 'react-native';
import CustomBottomSheet from '../../../Components/CustomBottomSheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {handleTextChange} from '../../../Components/InputHandlers';
import {TextInput} from 'react-native-paper';

const UploadStudyResource = ({
  visible,
  closeBottomSheetWithContent,
  navigation,
}) => {
  const {currentTextColor, currentBgColor} = useSelector(state => state.user);
  const [languageDropdown, setLanguageDropdown] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertIcons, setAlertIcons] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isUploadModalVisislbe, setIsUploadModalVisislbe] = useState(false);

  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const {getLanguage} = useSelector(state => state.languges);
  useEffect(() => {
    APIHandler();
  }, [visible]);

  useEffect(() => {
    setIsLoading(false);
    APIHandler();
  }, [currentTabIndex]);
  const inputRefs = {
    lanuage: useRef(null),
  };
  const formRef = useRef();

  const APIHandler = async () => {
    await store.dispatch(getLanguageAPIHander());
    extractLanguage();
  };

  const bottomSheetRef = useRef(null);

  const openBottomSheetWithContent = content => {
    bottomSheetRef.current?.open();
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

  // Handle image error
  const handleImageError = useCallback(
    errorMessage => {},
    [closeBottomSheetWithContent],
  );
  const handleImageError1 = useCallback(
    errorMessage => {},
    [closeBottomSheetWithContent],
  );

  // Handle form submission
  const handleSubmitForm = async (values, {resetForm}) => {
    try {
      setIsLoading(true);
      const {document, thumbnil, language} = values;

      const sanitizedFileName =
        Array.isArray(document) && document[0].name
          ? document[0].name.replace(/\s+/g, '_') // Replace spaces with underscores
          : 'default_file_name.pdf'; // Provide a default name if none exists

      const payload = {
        thumbnil: thumbnil,
        document: {
          fileName: sanitizedFileName,
          type: Array.isArray(document) && document[0].type,
          uri: Array.isArray(document) && document[0].uri,
        },
        languageId: language?.languageId,
      };

      console.log('Bapyla_Before_subt', payload);

      const res = await store.dispatch(createResourceAPIHander(payload));

      if (res.payload == true) {
        setAlertMessage({
          status: 'success',

          alertMsg: 'Resource created successfully',
        });
        setIsAlertVisible(true);
        // resetForm();

        setIsLoading(false);

        setTimeout(() => {
          closeBottomSheetWithContent();
          setAlertMessage('');
          setIsAlertVisible(false);
        }, 1500);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsAlertVisible(false);
  };

  const FirstRoute = () => (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: currentBgColor,
          justifyContent: 'center',
          alignItems: 'center', // Align modal to the center
        }}>
        {languageDropdown.length == 0 ? (
          <>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: getResHeight(-10),
              }}>
              <VectorIcon
                type={'FontAwesome'}
                name={'language'}
                size={getFontSize(8)}
                color={'white'}
              />
              <Text
                style={{
                  color: currentTextColor,
                  fontFamily: theme.font.medium,
                  fontSize: getFontSize(1.8),
                  textAlign: 'center',
                  lineHeight: 24,
                  marginTop: getResHeight(1.4),
                }}>
                {`Language unavailable. \nPlease create a language to proceed with adding study resources.`}
              </Text>
            </View>
          </>
        ) : (
          <>
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
                      topLableName={'Select language'}
                      isDropdown={true}
                      dropdownData={languageDropdown}
                      value={values.language}
                      onDropdownChange={item => {
                        setFieldValue('language', item);
                      }}
                      onBlur={handleBlur('language')}
                      error={touched.language && errors.language}
                    />

                    <FileUploadComponent
                      selectedImage={values.thumbnil.uri || ''}
                      onImageSuccess={img => {
                        setFieldValue('thumbnil', img);
                      }}
                      labelText="Please select pdf thumbnail"
                      onImageError={handleImageError}
                      customHeight={getResHeight(21)}
                    />
                    <FileUploadComponent
                      selectedImage={values.document || ''}
                      onImageSuccess={img => {
                        setFieldValue('document', img);
                      }}
                      labelText="Please select PDF"
                      isDocumentPicker={true}
                      allowedTypes={['application/pdf']}
                      onImageError={handleImageError1}
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
          </>
        )}
      </View>
    </>
  );

  const onDeletePress = async item => {
    // Alert.alert('Are you really sure');
    await store.dispatch(
      deleteLanguageAPIHander({
        _id: item._id,
      }),
    );
  };

  const initialValues = {
    language: selectedCard?.language || '',
  };

  const SecondRoute = props => {
    return (
      <>
        <View>
          <FlatList
            data={getLanguage}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => APIHandler()}
              />
            }
            ListEmptyComponent={() => {
              return (
                <>
                  <View
                    style={{
                      marginTop: getResHeight(-10),
                    }}>
                    <NoDataFound />
                  </View>
                </>
              );
            }}
            renderItem={({item, index}) => {
              return (
                <>
                  <View
                    style={[
                      styles.cardContainer,
                      {
                        borderColor: currentTextColor,
                      },
                    ]}>
                    <View
                      style={{
                        height: getResHeight(4),
                        width: getResHeight(4),
                        borderRadius: getResHeight(100),
                        borderWidth: 1,
                        borderColor: theme.color.green,

                        justifyContent: 'center',
                        alignItems: 'center',

                        position: 'absolute',
                        top: getResHeight(1),
                        left: getResWidth(2),
                      }}>
                      <Text
                        style={{
                          color: currentTextColor,
                          fontSize: getFontSize(1.4),
                          fontFamily: theme.font.bold,
                        }}>
                        {index + 1}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.profileContainer,
                        {
                          paddingVertical: getResHeight(1.5),
                        },
                      ]}>
                      <View
                        style={[
                          styles.profileCircle,
                          {
                            backgroundColor: currentBgColor,
                            borderColor: theme.color.green,
                          },
                        ]}>
                        <Text
                          style={{
                            color: currentTextColor,
                            fontFamily: theme.font.semiBold,
                            fontSize: getFontSize(1.6),
                          }}>
                          {generateMeaningfulAbbreviation(item.language)}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.detailsContainer,
                        {
                          borderColor: currentTextColor,
                        },
                      ]}>
                      <View
                        style={{
                          padding: '5%',
                        }}>
                        <View style={styles.detailRow} key={index}>
                          <Text
                            style={[
                              styles.detailKey,
                              {
                                color: currentTextColor,

                                textTransform: 'capitalize',
                              },
                            ]}>
                            Language :
                          </Text>
                          <Text
                            style={[
                              styles.detailValue,
                              {
                                color: currentTextColor,
                                textTransform: 'capitalize',
                              },
                            ]}>
                            {item.language}
                          </Text>
                        </View>
                        <View style={styles.detailRow} key={index}>
                          <Text
                            style={[
                              styles.detailKey,
                              {
                                color: currentTextColor,

                                textTransform: 'capitalize',
                              },
                            ]}>
                            Created by :
                          </Text>
                          <Text
                            style={[
                              styles.detailValue,
                              {
                                color: currentTextColor,
                                textTransform: 'capitalize',
                              },
                            ]}>
                            {item?.createdByName}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.actionButtons}>
                      {isLoading && item.id === selectedCard?.id ? (
                        <>
                          <ActivityIndicator
                            size={getFontSize(2.5)}
                            color={currentTextColor}
                          />
                        </>
                      ) : (
                        <>
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedCard(item);
                              bottomSheetRef.current?.open();
                              inputRefs.lanuage?.current?.focus();
                            }}
                            disabled={isLoading}
                            activeOpacity={0.8}>
                            <VectorIcon
                              type={'MaterialCommunityIcons'}
                              name="circle-edit-outline"
                              size={getFontSize(3.5)}
                              color={currentTextColor}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            disabled={isLoading}
                            onPress={() => onDeletePress(item)}
                            activeOpacity={0.8}>
                            <VectorIcon
                              type={'MaterialCommunityIcons'}
                              name="delete-empty-outline"
                              size={getFontSize(4)}
                              color={theme.color.error}
                            />
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </View>
                </>
              );
            }}
          />
        </View>
      </>
    );
  };

  const scenes = {
    first: FirstRoute,
    second: SecondRoute,
  };
  const [routes, setRoutes] = useState([
    {key: 'first', title: `Upload Resource`},
    {key: 'second', title: 'Language'},
  ]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'red',
      }}>
      <Modal
        visible={visible}
        animationType="fade"
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

          <CustomBottomSheet
            ref={bottomSheetRef}
            modalHeight={getResHeight(40)}>
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: currentTextColor,
                    fontFamily: theme.font.semiBold,
                    fontSize: getFontSize(1.8),
                  }}>
                  {`${
                    selectedCard?._id ? 'Update language' : 'Add new lanauge'
                  } `}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    bottomSheetRef.current?.close();
                    setIsLoading(false);
                  }}>
                  <VectorIcon
                    type={'MaterialCommunityIcons'}
                    name="close"
                    size={getFontSize(3.5)}
                    color={currentTextColor}
                  />
                </TouchableOpacity>
              </View>
              <Formik
                initialValues={initialValues}
                innerRef={formRef}
                enableReinitialize={true} // Enables reinitializing values on prop change
                onSubmit={async values => {
                  try {
                    setIsLoading(true);
                    let res = '';
                    if (selectedCard._id) {
                      const lngPayload = {
                        language: values.language,
                        language_id: selectedCard?._id,
                      };

                      res = await store.dispatch(
                        updateLanguageAPIHander(lngPayload),
                      );
                    } else {
                      const payload = {
                        language: values.language,
                      };
                      res = await store.dispatch(
                        createLanguageAPIHander(payload),
                      );
                    }

                    if (res.payload === true) {
                      setSelectedCard('');

                      bottomSheetRef.current?.close();
                      setIsLoading(false);
                    }
                  } catch (error) {
                    setIsLoading(false);
                    console.error('create_langauge_aPI_error', error);
                  }
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  setFieldValue,
                  errors,
                  touched,
                }) => {
                  return (
                    <>
                      <View
                        style={{
                          marginTop: getResHeight(2),
                        }}>
                        <MasterTextInput
                          label="Lanauge name"
                          placeholder="Enter langage name"
                          onChangeText={text =>
                            setFieldValue('language', handleTextChange(text))
                          }
                          ref={inputRefs.lanuage}
                          value={values.language}
                          onBlur={handleBlur('language')}
                          left={
                            <TextInput.Icon
                              icon=""
                              color={currentTextColor}
                              size={getFontSize(3.5)}
                            />
                          }
                        />
                      </View>

                      <View
                        style={{
                          marginTop: getResHeight(14),

                          width: '100%',

                          alignSelf: 'center',
                          backgroundColor: currentBgColor,
                        }}>
                        {console.log(
                          'initialValues.language',
                          initialValues.language,
                        )}
                        <CommonButtonComp
                          disabled={
                            isLoading ||
                            !values.language || // Disable if the language field is empty
                            !!errors.language // Disable if there are validation errors
                          }
                          title={selectedCard?._id ? 'Update' : 'Submit'}
                          isLoading={isLoading}
                          onPress={handleSubmit}
                        />
                      </View>
                    </>
                  );
                }}
              </Formik>
            </View>
          </CustomBottomSheet>
          <CustomAlertModal
            visible={isAlertVisible}
            message={alertMessage}
            duration={1500} // duration in milliseconds
            onClose={handleClose}
          />
          <ConfirmAlert
            visible={isConfirmModalVisible}
            onCancel={() => setIsConfirmModalVisible(false)}
            alertTitle={alertMessage}
            isBtnLoading={isBtnLoading}
            alertIcon={alertIcons}
            onConfirm={async () => {
              try {
              } catch (error) {}
            }}
          />
          <Text
            style={{
              color: theme.color.green,
              fontSize: getFontSize(1.8),
              fontFamily: theme.font.medium,
              marginLeft: getResWidth(5),
              marginTop: getResHeight(1),
            }}>{`Total lanauge : ${getLanguage.length}`}</Text>
          <TabViewComp
            routes={routes}
            scenes={scenes}
            indicatorStyle={verseResourceCommonStyle.indicatorStyle}
            tabBarContainerStyle={[
              verseResourceCommonStyle.tabBar,
              {backgroundColor: currentBgColor},
            ]}
            onIndexChange={setCurrentTabIndex}
            labelStyle={[
              verseResourceCommonStyle.labelStyle,
              {color: currentTextColor},
            ]}
          />

          {currentTabIndex == 1 && (
            <>
              <View style={styles.floatingButton}>
                <WaveButton
                  onPress={() => {
                    setSelectedCard('');

                    bottomSheetRef.current?.open();
                    inputRefs.lanuage?.current?.focus();
                  }}
                />
              </View>
            </>
          )}
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: getResHeight(7),
    right: getResWidth(7),
  },
  headerText: {
    color: theme.color.green,
    fontFamily: theme.font.semiBold,
    fontSize: getFontSize(1.8),
    marginLeft: getResWidth(5),
    marginVertical: getResHeight(1),
  },
  waveButtonContainer: {
    position: 'absolute',
    bottom: getResHeight(7),
    right: getResWidth(7),
    zIndex: 99,
  },
  cardContainer: {
    width: getResWidth(90),
    alignSelf: 'center',
    // padding: '5%',
    borderWidth: 1,
    borderRadius: getResHeight(1.7),
    marginBottom: getResHeight(2),
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileCircle: {
    height: getResHeight(10),
    width: getResHeight(10),
    borderWidth: 1,
    borderRadius: getResHeight(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    borderTopWidth: 1,
  },
  detailRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: getResHeight(1),
  },
  detailKey: {
    fontFamily: theme.font.semiBold,
    fontSize: getFontSize(1.7),
  },
  detailValue: {
    width: getResWidth(40),
    marginLeft: getResWidth(4),
    fontFamily: theme.font.semiBold,
    fontSize: getFontSize(1.6),
  },
  actionButtons: {
    flexDirection: 'row',
    width: getResWidth(18),
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    right: getResWidth(3),
    top: getResHeight(2),
  },
});

export default memo(UploadStudyResource);
