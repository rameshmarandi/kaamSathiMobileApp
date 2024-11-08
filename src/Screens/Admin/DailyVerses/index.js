import React, {useState, useRef, useCallback, memo, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet,
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
import {getScheduleVersesAPIHander} from '../../../redux/reducer/DailyVerses/dailyVersesAPI';
import {RefreshControl} from 'react-native';
import NoDataFound from '../../../Components/NoDataFound';
import {dateFormatHander} from '../../../Components/commonHelper';
import SmallMenuComp from '../../../Components/SmallMenuComp';

const Index = memo(({navigation}) => {
  const {currentBgColor, currentTextColor, logedInuserType} = useSelector(
    state => state.user,
  );
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isUploadResModalOpen, setIsUploadResModalOpen] = useState(false);
  const [isLoginPressed, setIsLongPressed] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [alertText, setAlertText] = useState(null);
  const [selectedCard, setSelectedCard] = useState([]);
  const {getScheduledVerses} = useSelector(state => state.dailyVerses);

  const bottomSheetRef = useRef(null);
  useEffect(() => {
    APIHandler();
  }, []);
  const APIHandler = async () => {
    try {
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

  const scheduleData = [
    {id: 1, date: '12 October 2024 | 06 AM'},
    {id: 2, date: '14 October 2024 | 07 PM'},
    {id: 3, date: '16 October 2024 | 05 AM'},
    {id: 4, date: '18 October 2024 | 08 PM'},
    {id: 5, date: '20 October 2024 | 09 AM'},
    {id: 6, date: '22 October 2024 | 10 PM'},
    {id: 7, date: '24 October 2024 | 11 AM'},
    {id: 8, date: '26 October 2024 | 12 PM'},
    {id: 9, date: '28 October 2024 | 01 PM'},
    {id: 10, date: '30 October 2024 | 02 PM'},
  ];

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
  const handleMunuData = userDetails => {
    return [
      {id: 4, title: 'Update'},
      {id: 5, title: 'Delete'},
    ];
  };
  const renderItem = useCallback(
    ({item, index}) => {
      console.log('Schedied', item.scheduleDate);

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
                <WaveButton {...waveButtonPropsSecondRoute} disabled />
                <Text
                  style={[
                    verseResourceCommonStyle.boldText,
                    {
                      color: currentTextColor,
                      marginLeft: 10,
                    },
                  ]}>
                  {'Going to live on'}
                </Text>
              </View>
              <Text
                style={[
                  verseResourceCommonStyle.regularText,
                  {color: theme.color.green},
                ]}>
                {dateFormatHander(item.scheduleDate, 'DD MMM YYYY hh:mm A')}
              </Text>
              <View
                style={{
                  // position: 'absolute',
                  // top: getResHeight(1.4),
                  // right: getResWidth(2),
                  zIndex: 9999,
                }}>
                {/* {isLoading && item.id == selectedCard?.id ? (
                  <ActivityIndicator
                    size={getFontSize(2.5)}
                    color={currentTextColor}
                  />
                ) : ( */}
                <SmallMenuComp
                  buttonLabel={openMenu => (
                    <ButtonIconComp
                      onPress={() => {
                        // setSelectedCard(item);
                        // openMenu();
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
                  // onMenuPress={MenuItemOnPressHandler}
                />
                {/* )} */}
              </View>
            </View>
            {item.images.map((image, index) => {
              console.log(image, 'profilges');
              return (
                <>
                  <Text
                    style={{
                      color: currentTextColor,
                      marginVertical: getResHeight(1.5),
                      paddingLeft: getResWidth(3),
                      fontFamily: theme.font.semiBold,
                    }}>
                    {image.language}
                  </Text>
                  <View style={verseResourceCommonStyle.imageContainer}>
                    <Image
                      // source={{uri: 'https://dummyimage.com/600x700/000/fff'}}
                      source={{uri: image.imageUrl}}
                      resizeMode="cover"
                      style={verseResourceCommonStyle.image}
                    />
                  </View>
                  {/* <CommonImageCard
                    key={index}
                    backgroundColor={currentBgColor}
                    borderColor={currentTextColor}
                    textColor={currentTextColor}
                    waveButtonProps={waveButtonPropsSecondRoute}
                    onLongPress={() => handleLongPress(index)}
                    scheduleText={'Going to live on'}
                    date={item.date}
                    isSelected={selectedCard.includes(index)}
                    imageSource={image.imageUrl}
                    onCardPress={() => handleCardPress(index)}
                  /> */}
                </>
              );
            })}
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

  const [routes, setRoutes] = useState([
    {key: 'first', title: `Today's Verses`},
    {key: 'second', title: 'Upcoming'},
  ]);

  useEffect(() => {
    // Check if the user is not a super admin
    if (!StorageKeys.USER_TYPES.includes(logedInuserType)) {
      // Remove the route at index 1 (the 'Upcoming' route)
      setRoutes(prevRoutes => prevRoutes.filter((_, index) => index !== 1));
    }
  }, [logedInuserType]);

  const FirstRoute = () => (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={APIHandler} />
      }>
      {['English', 'Marathi', 'Hindi'].map((item, index) => (
        <CommonImageCard
          key={index}
          backgroundColor={currentBgColor}
          borderColor={currentTextColor}
          textColor={currentTextColor}
          scheduleText={'Live'}
          waveButtonProps={waveButtonPropsFirstRoute}
          date={item}
          imageSource={theme.assets.dailyVerbsBanner}
        />
      ))}
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
      {/* </CustomBottomSheet> */}
      <FlatList
        data={getScheduledVerses}
        // data={scheduleData}
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

  useEffect(() => {
    if (!StorageKeys.USER_TYPES.includes(logedInuserType)) {
      routes.slice(1, 2);
    }
  }, []);
  const scenes = {
    first: FirstRoute,
    second: SecondRoute,
  };

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
      <ConfirmAlert
        visible={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        alertTitle={alertText}
        onConfirm={() => {
          setIsConfirmModalVisible(false);
          setTimeout(() => {
            ToastAlertComp('success', `Success`, 'Post deleted successfully.');
          }, 1000);
          setIsLongPressed(false);
          setSelectedCard([]);
        }}
      />
      {isLoginPressed && (
        <MasterDeleteSelect
          selectedItem={selectedCard}
          onClosePress={() => {
            setIsLongPressed(false);
            setSelectedCard([]);
          }}
          onDeletePress={() => {
            setAlertText(
              `Are you sure you want to delete ${selectedCard.length} post?`,
            );
            setIsConfirmModalVisible(true);
          }}
        />
      )}

      <View style={verseResourceCommonStyle.tabViewContainer}>
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

export default Index;
