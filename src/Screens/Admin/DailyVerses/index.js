import React, {useState, useRef, useCallback, memo, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import CustomHeader from '../../../Components/CustomHeader';
import ConfirmAlert from '../../../Components/ConfirmAlert';
import CustomBottomSheet from '../../../Components/CustomBottomSheet';
import {VectorIcon} from '../../../Components/VectorIcon';
import theme from '../../../utility/theme';
import MsgConfig from '../../../Config/MsgConfig';
import {
  ButtonIconComp,
  CommonButtonComp,
  CommonImageCard,
  CustomAlertModal,
  StatusBarComp,
} from '../../../Components/commonComp';
import WaveButton from '../../../Components/WaveButton';
import TabViewComp from '../../../Components/TabViewComp';
import ToastAlertComp from '../../../Components/ToastAlertComp';
import MasterDeleteSelect from '../../../Components/MasterDeleteSelect';
import DailyVersUploadForm from './DailyVersUploadForm';
import {verseResourceCommonStyle} from '../../Styles/verseResourceCommonStyle';
import StorageKeys from '../../../Config/StorageKeys';
import {store} from '../../../redux/store';
import {
  deleteSchedulePostAPIHander,
  getDailyVersesAPIHander,
  getScheduleVersesAPIHander,
  publishNowPostAPIHander,
} from '../../../redux/reducer/DailyVerses/dailyVersesAPI';
import {RefreshControl} from 'react-native';
import NoDataFound from '../../../Components/NoDataFound';
import {dateFormatHander} from '../../../Components/commonHelper';
import SmallMenuComp from '../../../Components/SmallMenuComp';
import ImageView from 'react-native-image-viewing';

let handleMunuData = [];
const Index = memo(({navigation}) => {
  const {currentBgColor, currentTextColor, logedInuserType} = useSelector(
    state => state.user,
  );
  const {getScheduledVerses, dailyVerses} = useSelector(
    state => state.dailyVerses,
  );

  const [routes, setRoutes] = useState([
    {key: 'first', title: `Today's Verses`},
    {key: 'second', title: 'Upcoming'},
  ]);

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isUploadResModalOpen, setIsUploadResModalOpen] = useState(false);
  const [isLoginPressed, setIsLongPressed] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [alertText, setAlertText] = useState(null);
  const [selectedCard, setSelectedCard] = useState([]);

  const [isImageViewerModal, setIsImageViewerModal] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState('');
  const [nextPostDate, setNextPostDate] = useState('');
  const [selectedMenuID, setSelectedMenuID] = useState('');
  const [alertIcons, setAlertIcons] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    APIHandler();
  }, []);
  useEffect(() => {
    if (getScheduledVerses.length > 0) {
      setNextPostDate(getScheduledVerses[0]);
    } else {
      setNextPostDate('');
    }
  }, [getScheduledVerses]);
  useEffect(() => {
    // Check if the user is not a super admin
    if (!StorageKeys.USER_TYPES.includes(logedInuserType)) {
      // Remove the route at index 1 (the 'Upcoming' route)
      setRoutes(prevRoutes => prevRoutes.filter((_, index) => index !== 1));
    }
  }, [logedInuserType]);

  useEffect(() => {
    if (!StorageKeys.USER_TYPES.includes(logedInuserType)) {
      routes.slice(1, 2);
    }
  }, []);

  const handleMunuData = userDetails => {
    if (currentTabIndex == 0) {
      return [{id: 5, title: 'Delete'}];
    }
    if (currentTabIndex == 1) {
      return [
        // {id: 4, title: 'Update'},
        {id: 7, title: 'Publish now'},
        {id: 5, title: 'Delete'},
      ];
    }
  };

  const APIHandler = async () => {
    try {
      await store.dispatch(getDailyVersesAPIHander());
      await store.dispatch(getScheduleVersesAPIHander());
    } catch (error) {
      console.error('Daily_verse_API_ERROR', error);
    }
  };
  const openBottomSheetWithContent = useCallback(() => {
    setIsUploadResModalOpen(true);
  }, []);

  const waveButtonProps = useCallback(
    color => ({
      onPress: () => {
        /* Navigation action */
      },
      circleContainer: {
        width: getResHeight(2),
        height: getResHeight(2),
        borderRadius: getResHeight(2) / 2,
        backgroundColor: color,
      },
      circleStyle: {
        width: getResHeight(2),
        height: getResHeight(2),
        borderRadius: getResHeight(2) / 2,
        backgroundColor: color,
      },
    }),
    [],
  );

  const waveButtonPropsFirstRoute = waveButtonProps('rgba(17, 255, 0, 0.985)');
  const waveButtonPropsSecondRoute = waveButtonProps(
    'rgba(255, 157, 0, 0.985)',
  );

  const handleCardPress = useCallback(
    index => {
      if (isLoginPressed) {
        setSelectedCard(prevSelectedCard =>
          prevSelectedCard.includes(index)
            ? prevSelectedCard.filter(selectedItem => selectedItem !== index)
            : [...prevSelectedCard, index],
        );
      } else {
        // openBottomSheetWithContent();
      }
    },
    [isLoginPressed],
  );

  const handleLongPress = useCallback(index => {
    setSelectedCard([index]);
    setIsLongPressed(true);
  }, []);

  const MenuItemOnPressHandler = item => {
    setSelectedMenuID(item);
    switch (item.id) {
      case 5:
        setAlertIcons(
          <VectorIcon
            type={'MaterialIcons'}
            name={'delete-forever'}
            size={getFontSize(5.1)}
            color={theme.color.error}
          />,
        );
        setAlertText('Are you sure you want to\n delete this post?');

        setIsConfirmModalVisible(true);
        break;

      case 7:
        setAlertIcons(
          <VectorIcon
            type={'Ionicons'}
            name={'checkmark-circle'}
            size={getFontSize(5.1)}
            color={theme.color.green}
          />,
        );
        setAlertText('Are you sure you want to\n publish this post now?');

        setIsConfirmModalVisible(true);
        break;
    }
  };

  const submitOnConfirm = async () => {
    console.log('selectedMenuID', selectedCard);

    setIsLoading(true);

    if (selectedMenuID.id == 5) {
      setIsConfirmModalVisible(false);
      const res = await store.dispatch(
        deleteSchedulePostAPIHander({
          scheduleID: selectedCard._id,
        }),
      );
      if (res.payload === true) {
        setAlertMessage({
          status: 'success',

          alertMsg: 'Schedule post deleted successfully',
        });
        setIsAlertVisible(true);
        setSelectedMenuID('');
        setIsConfirmModalVisible(false);
        setNextPostDate('');
      }
    } else if (selectedMenuID.id == 7) {
      setIsConfirmModalVisible(false);
      const res = await store.dispatch(
        publishNowPostAPIHander({
          id: selectedCard._id,
        }),
      );
      if (res.payload === true) {
        setAlertMessage({
          status: 'success',

          alertMsg: 'Daily verse published successfully',
        });
        setIsAlertVisible(true);
        setSelectedMenuID('');
        setIsConfirmModalVisible(false);
        setNextPostDate('');
      }
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    setIsAlertVisible(false);
  };

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <>
          <View
            style={{
              borderWidth: 1,
              borderColor: currentTextColor,

              borderRadius: getResHeight(2),
              marginBottom: getResHeight(2),
              overflow: 'hidden',
            }}>
            <View
              style={[
                verseResourceCommonStyle.cardHeader,
                {
                  paddingLeft: getResWidth(3.5),
                  paddingRight: getResWidth(1.5),
                  borderBottomWidth: 1,
                  borderBottomColor: currentTextColor,
                  paddingVertical: getResHeight(1.6),
                },
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {currentTabIndex == 0 ? (
                  <WaveButton {...waveButtonPropsFirstRoute} disabled />
                ) : (
                  <WaveButton {...waveButtonPropsSecondRoute} disabled />
                )}

                <Text
                  style={[
                    verseResourceCommonStyle.boldText,
                    {
                      color: currentTextColor,
                      marginLeft: 10,
                    },
                  ]}>
                  {currentTabIndex == 0 ? 'Live' : 'Going to live on'}
                </Text>
              </View>

              <View
                style={{
                  zIndex: 9999,
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: getResHeight(3.5),
                }}>
                <Text
                  style={[
                    verseResourceCommonStyle.regularText,
                    {color: theme.color.green},

                    (isLoading || currentTabIndex == 0) && {
                      marginRight: '5%',
                    },
                  ]}>
                  {dateFormatHander(item.scheduleDate, 'DD MMM YYYY hh:mm A')}
                </Text>

                {currentTabIndex !== 0 && (
                  <>
                    {isLoading && item.id == selectedCard?.id ? (
                      <ActivityIndicator
                        size={getFontSize(2.5)}
                        color={currentTextColor}
                      />
                    ) : (
                      <SmallMenuComp
                        buttonLabel={openMenu => (
                          <ButtonIconComp
                            onPress={() => {
                              setSelectedCard(item);
                              openMenu();
                            }}
                            icon={
                              <VectorIcon
                                type={'Entypo'}
                                name={'dots-three-vertical'}
                                size={getFontSize(2.1)}
                                color={currentTextColor}
                              />
                            }
                            containerStyle={{
                              width: getResHeight(5),
                              height: getResHeight(5),
                              borderRadius: getResHeight(100),
                            }}
                          />
                        )}
                        menuItems={handleMunuData(item)}
                        onMenuPress={MenuItemOnPressHandler}
                      />
                    )}
                  </>
                )}
              </View>
            </View>
            <View
              style={{
                padding: '3%',
              }}>
              {item.images.map((image, index) => {
                console.log(image, 'profilges');
                return (
                  <>
                    <View
                      style={{
                        marginBottom: '4%',
                      }}>
                      <Text
                        style={{
                          color: currentTextColor,

                          fontFamily: theme.font.semiBold,
                          fontSize: getFontSize(1.8),
                          marginBottom: '3%',
                        }}>
                        {image.language}
                      </Text>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                          setViewImageUrl(image.imageUrl);
                          setIsImageViewerModal(true);
                        }}>
                        <View style={verseResourceCommonStyle.imageContainer}>
                          <Image
                            source={{uri: image.imageUrl}}
                            resizeMode="cover"
                            style={verseResourceCommonStyle.image}
                          />
                        </View>
                      </TouchableOpacity>

                      {currentTabIndex == 0 && (
                        <View
                          style={{
                            paddingHorizontal: getResWidth(1.9),
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginTop: getResHeight(1.2),
                              borderBottomWidth: 0.5,
                              borderBottomColor: currentTextColor,

                              paddingBottom: getResHeight(1.4),
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <VectorIcon
                                type={'Ionicons'}
                                name={'eye'}
                                size={getFontSize(3.1)}
                                color={currentTextColor}
                              />
                              <Text
                                style={{
                                  color: currentTextColor,
                                  fontSize: getFontSize(1.8),
                                  fontFamily: theme.font.medium,
                                  marginLeft: getResWidth(1.9),
                                  marginTop: getResHeight(1),
                                }}>
                                {image.viewCount}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  color: currentTextColor,
                                  fontFamily: theme.font.medium,

                                  fontSize: getFontSize(1.8),
                                  marginRight: getResWidth(3),
                                }}>
                                {image.comments.length}
                              </Text>
                              <VectorIcon
                                type={'MaterialCommunityIcons'}
                                name={'message'}
                                size={getFontSize(3.1)}
                                color={currentTextColor}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginTop: getResHeight(1.4),
                            }}>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              style={styles.likeContainer}>
                              <VectorIcon
                                type={'AntDesign'}
                                name={'like1'}
                                size={getFontSize(2)}
                                color={'#ffffff'}
                              />
                              <Text style={styles.likeText}>Like</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              style={styles.likeContainer}
                              onPress={() => {
                                navigation.navigate('CommentSection');
                              }}>
                              <Text style={styles.likeText}>Comment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              style={styles.likeContainer}>
                              <VectorIcon
                                type={'MaterialCommunityIcons'}
                                name={'share'}
                                size={getFontSize(3)}
                                color={'white'}
                              />
                              <Text style={styles.likeText}>Share</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                  </>
                );
              })}
            </View>
          </View>
        </>
      );
    },
    [
      currentBgColor,
      currentTextColor,
      selectedCard,
      handleCardPress,
      handleLongPress,
      waveButtonPropsSecondRoute,
    ],
  );

  const FirstRoute = () => (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={APIHandler} />
      }>
      <FlatList
        data={dailyVerses}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => APIHandler(false)}
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
        contentContainerStyle={verseResourceCommonStyle.flatListContainer}
      />
    </ScrollView>
  );

  const SecondRoute = () => (
    <>
      <DailyVersUploadForm
        visible={isUploadResModalOpen}
        onRequestClose={() => {
          setIsUploadResModalOpen(false);
        }}
        navigation={navigation}
      />
      <FlatList
        data={getScheduledVerses}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => APIHandler(false)}
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
        contentContainerStyle={verseResourceCommonStyle.flatListContainer}
      />
    </>
  );

  const scenes = {
    first: FirstRoute,
    second: SecondRoute,
  };
  // Image viewer
  const images = [
    {
      uri: viewImageUrl,
    },
  ];

  console.log('dailyVerses_Atap', dailyVerses);
  return (
    <SafeAreaView
      style={[
        verseResourceCommonStyle.safeArea,
        {backgroundColor: currentBgColor},
      ]}>
      <StatusBarComp />

      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle={MsgConfig.dailyVerse}
      />
      <CustomAlertModal
        visible={isAlertVisible}
        message={alertMessage}
        duration={1500} // duration in milliseconds
        onClose={handleClose}
      />
      <ConfirmAlert
        visible={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        alertTitle={alertText}
        alertIcon={alertIcons}
        onConfirm={submitOnConfirm}
      />

      <ImageView
        images={images}
        imageIndex={0}
        visible={isImageViewerModal}
        onRequestClose={() => setIsImageViewerModal(false)}
      />
      {StorageKeys.USER_TYPES.includes(logedInuserType) && (
        <>
          <View style={verseResourceCommonStyle.tabViewContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: theme.color.green,
                  fontFamily: theme.font.bold,
                  fontSize: getFontSize(1.8),
                }}>
                Total posts : {getScheduledVerses.length}
              </Text>
              {nextPostDate !== '' && nextPostDate.scheduleDate !== '' && (
                <Text
                  style={{
                    color: theme.color.green,
                    fontFamily: theme.font.bold,
                    fontSize: getFontSize(1.8),
                  }}>
                  Next post on :{' '}
                  {dateFormatHander(nextPostDate.scheduleDate, 'DD MMM YYYY')}
                </Text>
              )}
            </View>
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
          </View>
        </>
      )}
      {StorageKeys.USER_TYPES.includes(logedInuserType) && (
        <>
          {currentTabIndex !== 0 && !isLoginPressed && (
            <View
              style={{
                position: 'absolute',
                bottom: getResHeight(7),
                right: getResWidth(7),
              }}>
              <WaveButton onPress={openBottomSheetWithContent} />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeText: {
    color: 'white',
    fontFamily: theme.font.medium,
    marginLeft: '7%',
    marginTop: '4%',
  },
});
export default Index;
