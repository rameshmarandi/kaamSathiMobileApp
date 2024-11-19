import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  getResHeight,
  getResWidth,
  getFontSize,
} from '../../../utility/responsive';
import {Formik} from 'formik';
import CustomHeader from '../../../Components/CustomHeader';
import {VectorIcon} from '../../../Components/VectorIcon';
import GoogleUIComp from '../../../Components/GoogleMapComp';
import CustomBottomSheet from '../../../Components/CustomBottomSheet';
import {AutoScrollBtnCom} from '../../../Components/AutoScrollBtnCom';
import theme from '../../../utility/theme';
import WaveButton from '../../../Components/WaveButton';
import {ButtonIconComp, CommonButtonComp} from '../../../Components/commonComp';
import MasterTextInput from '../../../Components/MasterTextInput';
import {TextInput} from 'react-native-paper';
import {
  handleNumberChange,
  handleTextChange,
  numberWithDecimal,
  removeSpaces,
} from '../../../Components/InputHandlers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {store} from '../../../redux/store';
import {
  createBranchAPIHander,
  deletBranchAPIHander,
  getBranchAPIHander,
  updateBranchAPIHander,
} from '../../../redux/reducer/ChurchBranch/churchBranchAPI';
import ToastAlertComp from '../../../Components/ToastAlertComp';

import TabViewComp from '../../../Components/TabViewComp';
import {verseResourceCommonStyle} from '../../Styles/verseResourceCommonStyle';
import {UserBioComponent} from '../../../Helpers/CommonCard';
import ConfirmAlert from '../../../Components/ConfirmAlert';
import {RefreshControl} from 'react-native';
import NoDataFound from '../../../Components/NoDataFound';
import {generateMeaningfulAbbreviation} from '../../../Components/commonHelper';

const ChurchMap = React.memo(props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  useEffect(() => {
    setIsLoading(true);
    apiCalling();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const apiCalling = async () => {
    await store.dispatch(getBranchAPIHander());
  };

  const {allChurchBranch} = useSelector(state => state.churchBranch);

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertIcons, setAlertIcons] = useState('');

  const [selectedChurch, setSelectedChurch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const bottomSheetRef = useRef(null);

  const openBottomSheetWithContent = content => {
    bottomSheetRef.current?.open();
  };

  const inputRefs = {
    branchName: useRef(null),
    branchAddress: useRef(null),
    latitude: useRef(null),
    longitude: useRef(null),
  };

  const tabName = [
    {
      tabName: 'Church Map',
    },
    {
      tabName: 'Branch Management',
    },
  ];

  const churchDetailsArray = churchDetails => {
    return Object.entries(churchDetails).map(([key, value]) => ({
      key,
      value,
    }));
  };

  const FirstRoute = () => {
    return (
      <>
        <View
          style={{
            width: '100%',
            height: getResHeight(73),
          }}>
          <GoogleUIComp
            selectedChurch={allChurchBranch}
            allBranchList={allChurchBranch}
          />
        </View>
      </>
    );
  };

  const SecondRoute = () => {
    return (
      <>
        <Text style={styles.headerText}>
          Total branches: {allChurchBranch.length}
        </Text>
        <FlatList
          data={allChurchBranch}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => apiCalling()} />
          }
          ListEmptyComponent={() => {
            return (
              <>
                <View
                  style={{
                    marginTop: getResHeight(-5),
                  }}>
                  <NoDataFound />
                </View>
              </>
            );
          }}
          renderItem={({item}) => (
            <View
              style={[
                styles.cardContainer,
                {
                  borderColor: currentTextColor,
                },
              ]}>
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
                    {generateMeaningfulAbbreviation(
                      item?.churchDetails['Branch name'],
                    )}
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
                  {churchDetailsArray(item.churchDetails).map(
                    (detail, index) => (
                      <View style={styles.detailRow} key={index}>
                        <Text
                          style={[
                            styles.detailKey,
                            {
                              color: currentTextColor,

                              textTransform: 'capitalize',
                            },
                          ]}>
                          {`${detail.key}   : `}
                        </Text>
                        <Text
                          style={[
                            styles.detailValue,
                            {color: currentTextColor},
                          ]}>
                          {detail.value}
                        </Text>
                      </View>
                    ),
                  )}
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
                      onPress={() => {
                        setAlertMsg(
                          'Are you sure you want to delete this branch?',
                        );
                        setSelectedCard(item);
                        setAlertIcons(
                          <VectorIcon
                            type={'MaterialIcons'}
                            name={'delete-forever'}
                            size={getFontSize(5.1)}
                            color={theme.color.error}
                          />,
                        );
                        setShowAlert(true);
                      }}
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
          )}
        />
      </>
    );
  };

  const deletBranchHandler = async () => {
    try {
      setShowAlert(false);
      setIsLoading(true);
      const payload = {
        branchID: selectedCard.id,
      };
      const res = await store.dispatch(deletBranchAPIHander(payload));
      console.log('AFter_De_font_res', res);
      if (res.payload == true) {
        ToastAlertComp('success', 'Branch deleted successfully');
        setIsLoading(false);
      }
    } catch (error) {
      setShowAlert(false);
      setIsLoading(false);

      console.error('Delect_branhc_handler_error', error);
    }
  };

  // Define initial values based on selectedCard
  const initialValues = {
    branchName: selectedCard?.churchDetails?.['Branch name'] || '',
    branchAddress: selectedCard?.churchDetails?.['Branch address'] || '',
    latitude: String(selectedCard?.churchDetails?.latitude || ''),
    longitude: String(selectedCard?.churchDetails?.longitude || ''),
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: currentBgColor}}>
        <CustomHeader
          backPress={() => navigation.goBack()}
          screenTitle="Church Map"
        />

        <ConfirmAlert
          visible={showAlert}
          alertTitle={alertMsg}
          alertIcon={alertIcons}
          onCancel={() => {
            setAlertIcons('');
            setAlertMsg('');
            setShowAlert(false);
          }}
          onConfirm={deletBranchHandler}
        />

        <CustomBottomSheet ref={bottomSheetRef} modalHeight={getResHeight(70)}>
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
                  selectedCard?.id ? 'Update Branch Details' : 'Add New Branch'
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
              enableReinitialize={true} // Enables reinitializing values on prop change
              onSubmit={async values => {
                try {
                  setIsLoading(true);

                  const payload = {
                    branchName: values.branchName,
                    branchAddress: values.branchAddress,
                    latitude: Number(values.latitude),
                    longitude: Number(values.longitude),
                  };

                  let res = '';
                  if (selectedCard?.id) {
                    const updatePayload = {
                      branchID: selectedCard.id,
                      branchName: values.branchName,
                      branchAddress: values.branchAddress,
                      latitude: Number(values.latitude),
                      longitude: Number(values.longitude),
                    };

                    res = await store.dispatch(
                      updateBranchAPIHander(updatePayload),
                    );
                    if (res.payload.statusCode == 200) {
                      bottomSheetRef.current?.close();
                      ToastAlertComp('success', res.payload.message);
                      setIsLoading(false);
                    }
                  } else {
                    // Create branch API
                    res = await store.dispatch(createBranchAPIHander(payload));
                  }

                  if (res.payload.statusCode == 200) {
                    bottomSheetRef.current?.close();
                    ToastAlertComp('success', res.payload.message);
                    setIsLoading(false);
                  }
                  setSelectedCard(null);
                } catch (error) {
                  ToastAlertComp('error', 'Something went wrong');
                  setIsLoading(false);
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
                    <KeyboardAwareScrollView>
                      <MasterTextInput
                        label="Branch name"
                        placeholder="Enter branch name"
                        ref={inputRefs.branchName}
                        value={values.branchName}
                        onChangeText={text =>
                          setFieldValue('branchName', handleTextChange(text))
                        }
                        onBlur={handleBlur('branchName')}
                        onSubmitEditing={() =>
                          inputRefs.branchAddress.current.focus()
                        }
                        error={touched.branchAddress && errors.branchAddress}
                        left={
                          <TextInput.Icon
                            icon="city"
                            color={currentTextColor}
                            size={getFontSize(3.5)}
                          />
                        }
                      />

                      <MasterTextInput
                        label="Branch address"
                        placeholder="Enter branch address"
                        ref={inputRefs.branchAddress}
                        value={values.branchAddress}
                        onChangeText={text =>
                          setFieldValue('branchAddress', removeSpaces(text))
                        }
                        onBlur={handleBlur('branchAddress')}
                        onSubmitEditing={() =>
                          inputRefs.latitude.current.focus()
                        }
                        error={touched.branchAddress && errors.branchAddress}
                        left={
                          <TextInput.Icon
                            icon="map"
                            color={currentTextColor}
                            size={getFontSize(3.5)}
                          />
                        }
                      />
                      <MasterTextInput
                        label="Branch latitude"
                        placeholder="Enter longitude"
                        ref={inputRefs.latitude}
                        value={values.latitude}
                        onChangeText={text =>
                          setFieldValue('latitude', numberWithDecimal(text))
                        }
                        onBlur={handleBlur('latitude')}
                        onSubmitEditing={() =>
                          inputRefs.longitude.current.focus()
                        }
                        error={touched.latitude && errors.latitude}
                        left={
                          <TextInput.Icon
                            icon="target"
                            color={currentTextColor}
                            size={getFontSize(3.5)}
                          />
                        }
                      />
                      <MasterTextInput
                        label="Branch longitude"
                        placeholder="Enter longitude"
                        ref={inputRefs.longitude}
                        value={values.longitude}
                        onChangeText={text =>
                          setFieldValue('longitude', numberWithDecimal(text))
                        }
                        onBlur={handleBlur('longitude')}
                        onSubmitEditing={() =>
                          inputRefs.longitude.current.focus()
                        }
                        error={touched.longitude && errors.longitude}
                        left={
                          <TextInput.Icon
                            icon="target"
                            color={currentTextColor}
                            size={getFontSize(3.5)}
                          />
                        }
                      />
                      <View
                        style={{
                          marginTop: getResHeight(8),
                          width: '100%',
                          alignSelf: 'center',
                          backgroundColor: currentBgColor,
                        }}>
                        <CommonButtonComp
                          title={'Submit'}
                          isLoading={isLoading}
                          onPress={handleSubmit}
                        />
                      </View>
                    </KeyboardAwareScrollView>
                  </>
                );
              }}
            </Formik>
          </View>
        </CustomBottomSheet>

        <View
          style={{
            width: '90%',

            flexDirection: 'row',

            alignSelf: 'center',
            marginVertical: getResHeight(2),
            borderWidth: 1,
            borderColor: currentTextColor,
            borderRadius: getResHeight(4),
            overflow: 'hidden',
          }}>
          {tabName.map((item, index) => {
            return (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setCurrentTabIndex(index);
                  }}
                  style={{
                    width: getResWidth(47.5),
                    alignItems: 'center',
                    paddingVertical: getResHeight(1),
                    borderRadius: getResHeight(3),
                    borderColor: currentTextColor,
                    backgroundColor:
                      currentTabIndex == index
                        ? currentTextColor
                        : currentBgColor,
                  }}>
                  <Text
                    style={{
                      color:
                        currentTabIndex == index
                          ? currentBgColor
                          : currentTextColor,
                      fontFamily:
                        currentTabIndex == index
                          ? theme.font.semiBold
                          : theme.font.regular,
                      fontSize: getFontSize(1.3),
                    }}>
                    {item.tabName}
                  </Text>
                </TouchableOpacity>
              </>
            );
          })}
        </View>
        {currentTabIndex !== 0 && (
          <View style={styles.waveButtonContainer}>
            <WaveButton
              onPress={() => {
                openBottomSheetWithContent();

                setSelectedCard(null);
              }}
            />
          </View>
        )}

        {currentTabIndex == 0 ? (
          <FirstRoute />
        ) : (
          <>
            <SecondRoute />
          </>
        )}
      </SafeAreaView>
    </>
  );
});

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
    marginBottom: getResHeight(1),
  },
  detailKey: {
    fontFamily: theme.font.semiBold,
    fontSize: getFontSize(1.7),
  },
  detailValue: {
    width: getResWidth(40),
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

export default ChurchMap;
