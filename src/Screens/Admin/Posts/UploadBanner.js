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
  CommonButtonComp,
  StatusBarComp,
  CommonImageCard,
  ButtonIconComp,
} from '../../../Components/commonComp';
import WaveButton from '../../../Components/WaveButton';
import TabViewComp from '../../../Components/TabViewComp';
import ToastAlertComp from '../../../Components/ToastAlertComp';
import MasterDeleteSelect from '../../../Components/MasterDeleteSelect';
// import DailyVersUploadForm from './DailyVersUploadForm';
import {verseResourceCommonStyle} from '../../Styles/verseResourceCommonStyle';
import DailyVersUploadForm from '../DailyVerses/DailyVersUploadForm';
import UploadBannerForm from './UploadBannerForm';
import {store} from '../../../redux/store';
import {adminGetBannerAPIHander} from '../../../redux/reducer/Banner/BannerAPI';
import {DailyVerbs} from '../../ScreenComp/DailyVersesComp';
import {dateFormatHander} from '../../../Components/commonHelper';
import SmallMenuComp from '../../../Components/SmallMenuComp';
import {RefreshControl} from 'react-native';
import ImageView from 'react-native-image-viewing';
const Index = memo(({navigation}) => {
  const {currentBgColor, currentTextColor} = useSelector(state => state.user);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isUploadResModalOpen, setIsUploadResModalOpen] = useState(false);
  const [isLoginPressed, setIsLongPressed] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [alertText, setAlertText] = useState(null);
  const [selectedCard, setSelectedCard] = useState([]);
  const {getBanner, adminGetBanner} = store.getState().banner;
  const bottomSheetRef = useRef(null);
  const [selectedMenuID, setSelectedMenuID] = useState('');
  const [alertIcons, setAlertIcons] = useState('');
  const [isImageViewerModal, setIsImageViewerModal] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const openBottomSheetWithContent = useCallback(() => {
    setIsUploadResModalOpen(true);
  }, []);

  useEffect(() => {
    APIHandler();
  });

  const APIHandler = async () => {
    try {
      await store.dispatch(adminGetBannerAPIHander());
    } catch (error) {}
  };
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
  const images = [
    {
      uri: viewImageUrl,
    },
  ];

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
                  {currentTabIndex == 1
                    ? dateFormatHander(item.scheduledDate, 'DD MMM YYYY')
                    : dateFormatHander(item.deleteTime, 'DD MMM YYYY hh:mm')}
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
                        menuItems={[
                          // {id: 4, title: 'Update'},
                          {id: 7, title: 'Publish now'},
                          {id: 5, title: 'Delete'},
                        ]}
                        // menuItems={handleMunuData(item)}
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
              <View
                style={{
                  marginBottom: '4%',
                }}>
                {/* <Text
                  style={{
                    color: currentTextColor,

                    fontFamily: theme.font.semiBold,
                    fontSize: getFontSize(1.8),
                    marginBottom: '3%',
                  }}>
                  {image.language}
                </Text> */}
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setViewImageUrl(item.imageUrl);
                    setIsImageViewerModal(true);
                  }}>
                  <View style={verseResourceCommonStyle.imageContainer}>
                    <Image
                      source={{uri: item.imageUrl}}
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
                          {item.viewCount}
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
                          {item.comments.length}
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

  console.log('adminGetBanner_at_fotnendise', adminGetBanner);
  const FirstRoute = () => (
    <FlatList
      data={adminGetBanner?.publishedBanners?.data}
      renderItem={renderItem}
      keyExtractor={item => item._id.toString()}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => APIHandler(false)}
        />
      }
      contentContainerStyle={verseResourceCommonStyle.flatListContainer}
    />
  );

  const SecondRoute = () => (
    <>
      <UploadBannerForm
        visible={isUploadResModalOpen}
        onRequestClose={() => {
          setIsUploadResModalOpen(false);
        }}
        navigation={navigation}
      />
      {/* </CustomBottomSheet> */}
      <FlatList
        data={adminGetBanner?.unPublishedBanners?.data}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => APIHandler(false)}
          />
        }
        keyExtractor={item => item._id.toString()}
        contentContainerStyle={verseResourceCommonStyle.flatListContainer}
      />
    </>
  );

  const routes = [
    {key: 'first', title: `Special Moments`},
    {key: 'second', title: 'Scheduled Posts'},
  ];

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
        screenTitle={MsgConfig.postsUploadBanner}
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

      <ImageView
        images={images}
        imageIndex={0}
        visible={isImageViewerModal}
        onRequestClose={() => setIsImageViewerModal(false)}
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
        <Text
          style={{
            color: currentTextColor,
            fontFamily: theme.font.regular,
            paddingHorizontal: '5%',
            fontSize: getFontSize(1.3),
            marginTop: '2%',
          }}>
          {`Note : The schedule post will publish after 12 AM\nNote : The published post will expire in next 24 hours`}
        </Text>
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
