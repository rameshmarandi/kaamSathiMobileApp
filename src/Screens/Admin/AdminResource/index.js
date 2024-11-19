import React, {useState, useRef, useCallback, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import CustomHeader from '../../../Components/CustomHeader';
import ConfirmAlert from '../../../Components/ConfirmAlert';
import theme from '../../../utility/theme';
import MsgConfig from '../../../Config/MsgConfig';
import WaveButton from '../../../Components/WaveButton';
import TabViewComp from '../../../Components/TabViewComp';
import ToastAlertComp from '../../../Components/ToastAlertComp';
import MasterDeleteSelect from '../../../Components/MasterDeleteSelect';
import {verseResourceCommonStyle} from '../../Styles/verseResourceCommonStyle';
import {VectorIcon} from '../../../Components/VectorIcon';
import PDFDownload from '../../../Components/PDFDownload';
import StorageKeys from '../../../Config/StorageKeys';
import {store} from '../../../redux/store';
import {
  deleteResourceAPIHander,
  getResourceAPIHander,
} from '../../../redux/reducer/Resources/resourcesAPI';
import NoDataFound from '../../../Components/NoDataFound';
import UploadStudyResource from './UploadStudyResource';
import {CustomAlertModal} from '../../../Components/commonComp';

const Index = ({navigation}) => {
  const {isDarkMode, currentBgColor, logedInuserType, currentTextColor} =
    useSelector(state => state.user);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const [isVisisblePDFModal, setisVisisblePDFModal] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [alertText, setAlertText] = useState(null);
  const [selectedCard, setSelectedCard] = useState([]);
  const [documentDetials, setDocumentDetails] = useState('');
  const [isUploadModalVisislbe, setIsUploadModalVisislbe] = useState(false);
  const [alertIcons, setAlertIcons] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  useEffect(() => {
    APIHandler();
  }, []);

  const APIHandler = async () => {
    try {
      await store.dispatch(getResourceAPIHander());
    } catch (error) {}
  };

  const {getResource} = useSelector(state => state.resource);

  const handleCardPress = useCallback(index => {
    setSelectedCard(prevSelectedCard =>
      prevSelectedCard.includes(index)
        ? prevSelectedCard.filter(item => item !== index)
        : [...prevSelectedCard, index],
    );
  }, []);

  useEffect(() => {
    setSelectedCard([]);
    setIsLoginPressed(false);
  }, [currentTabIndex]);

  const Card = ({
    backgroundColor,
    borderColor,
    currentItem,
    isSelected,
    onLongPress,
    onCardPress,
  }) => {
    return (
      <TouchableOpacity
        onLongPress={onLongPress}
        onPress={onCardPress}
        activeOpacity={0.8}>
        <View style={[styles.card, {backgroundColor, borderColor}]}>
          {isSelected && (
            <View
              style={[
                verseResourceCommonStyle.overlay,
                {backgroundColor: 'rgba(255, 255, 255, 0.5)'},
              ]}
            />
          )}
          <View
            style={[
              verseResourceCommonStyle.imageContainer,
              styles.imgStyle,
              {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor,
              },
            ]}>
            {currentItem.posterUrl === '' ? (
              <VectorIcon
                type={'AntDesign'}
                name={'pdffile1'}
                size={getFontSize(8)}
                color={theme.color.error}
              />
            ) : (
              <Image
                source={{uri: `${currentItem.thumbnil}`}}
                resizeMode="cover"
                style={verseResourceCommonStyle.image}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = useCallback(
    ({item}) => (
      <Card
        backgroundColor={currentBgColor}
        borderColor={currentTextColor}
        currentItem={item}
        isSelected={selectedCard.includes(item._id)}
        onLongPress={() => {
          setSelectedCard([item._id]);
          setIsLoginPressed(true);
        }}
        onCardPress={() => {
          if (isLoginPressed) {
            handleCardPress(item._id);
          } else {
            setisVisisblePDFModal(true);
            setDocumentDetails(item);
          }
        }}
      />
    ),
    [currentBgColor, currentTextColor, isLoginPressed, selectedCard],
  );

  const combinedResources = useMemo(
    () => getResource.reduce((acc, item) => acc.concat(item.resources), []),
    [getResource],
  );

  const createScene = useCallback(
    langId => () => {
      const langResources =
        getResource.find(item => item._id === langId)?.resources || [];
      return (
        <FlatList
          data={langResources}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => APIHandler()} />
          }
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
        />
      );
    },
    [getResource, renderItem],
  );

  const combinedRoutes = useMemo(
    () =>
      getResource.map(item => ({
        key: item._id,
        title: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      })),
    [getResource],
  );

  const combinedScenes = useMemo(
    () =>
      getResource.reduce(
        (scenes, item) => ({
          ...scenes,
          [item._id]: createScene(item._id),
        }),
        {},
      ),
    [getResource, createScene],
  );
  const closeUploadModal = () => {
    setIsUploadModalVisislbe(false);
  };
  const handleClose = () => {
    setIsAlertVisible(false);
  };
  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: currentBgColor}]}>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle={MsgConfig.adminResouce}
      />
      <View>
        <PDFDownload
          isVisisble={isVisisblePDFModal}
          pdfLink={documentDetials.document}
          showDownloadBtn={true}
          onClose={() => {
            setisVisisblePDFModal(false);
          }}
          onRequestClose={() => {
            setisVisisblePDFModal(false);
          }}
        />
        <UploadStudyResource
          visible={isUploadModalVisislbe}
          closeBottomSheetWithContent={closeUploadModal}
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
          // alertTitle={alertText}
          alertTitle={alertMessage}
          isBtnLoading={isBtnLoading}
          alertIcon={alertIcons}
          onConfirm={async () => {
            try {
              setIsBtnLoading(true);

              const res = await store.dispatch(
                deleteResourceAPIHander({resourceId: selectedCard}),
              );

              if (res.payload === true) {
                setIsConfirmModalVisible(false);

                setAlertMessage({
                  status: 'success',

                  alertMsg: 'PDF deleted successfully',
                });

                setIsAlertVisible(true);
                setIsBtnLoading(false);
                setIsLoginPressed(false);
                setSelectedCard([]);
              }
            } catch (error) {
              setIsAlertVisible(false);
              setIsBtnLoading(false);
              setIsLoginPressed(false);
              setSelectedCard([]);
              setIsConfirmModalVisible(false);
              setIsBtnLoading(false);
            }
          }}
        />
      </View>
      {isLoginPressed && (
        <MasterDeleteSelect
          selectedItem={selectedCard}
          onClosePress={() => {
            setIsLoginPressed(false);
            setSelectedCard([]);
          }}
          onDeletePress={() => {
            setAlertIcons(
              <VectorIcon
                type={'MaterialIcons'}
                name={'delete-forever'}
                size={getFontSize(5.1)}
                color={theme.color.error}
              />,
            );
            setAlertMessage(
              `Are you sure you want to delete ${selectedCard.length} PDF?`,
            );

            setIsConfirmModalVisible(true);
          }}
        />
      )}
      {combinedRoutes.length === 0 ? (
        <NoDataFound />
      ) : (
        <View style={verseResourceCommonStyle.tabViewContainer}>
          <TabViewComp
            routes={combinedRoutes}
            scenes={combinedScenes}
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
      )}
      {StorageKeys.USER_TYPES.includes(logedInuserType) && !isLoginPressed && (
        <View style={styles.floatingButton}>
          <WaveButton onPress={() => setIsUploadModalVisislbe(true)} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  card: {
    width: getResWidth(43),
    height: getResHeight(27),

    borderRadius: getResWidth(3),
    borderWidth: 1,
    overflow: 'hidden',
    marginHorizontal: 8,
  },

  columnWrapperStyle: {
    justifyContent: 'space-between', // Ensures proper spacing between columns
    marginBottom: getResHeight(2), // Spacing between rows
  },

  imgStyle: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },

  floatingButton: {
    position: 'absolute',
    bottom: getResHeight(7),
    right: getResWidth(7),
  },
});

export default Index;
