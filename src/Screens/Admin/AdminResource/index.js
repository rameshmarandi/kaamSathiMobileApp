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
import theme from '../../../utility/theme';
import MsgConfig from '../../../Config/MsgConfig';
import WaveButton from '../../../Components/WaveButton';
import TabViewComp from '../../../Components/TabViewComp';
import ToastAlertComp from '../../../Components/ToastAlertComp';
import MasterDeleteSelect from '../../../Components/MasterDeleteSelect';
import UploadStudyResource from './UploadStudyResource';
import {verseResourceCommonStyle} from '../../Styles/verseResourceCommonStyle';
import {adminStudyResouce} from '../../../Components/StaticDataHander';
import {VectorIcon} from '../../../Components/VectorIcon';
import {trimText} from '../../../Components/commonComp';
import PDFDownload from '../../../Components/PDFDownload';
import StorageKeys from '../../../Config/StorageKeys';

// Memoized Card Component
const Card = memo(
  ({
    backgroundColor,
    borderColor,
    textColor,
    onLongPress,
    onCardPress,
    currentItem,
    isSelected,
  }) => (
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
              height: getResHeight(20),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: backgroundColor,
            },
          ]}>
          {currentItem.posterUrl == '' ? (
            <>
              <VectorIcon
                type={'AntDesign'}
                name={'pdffile1'}
                size={getFontSize(8)}
                color={'red'}
              />
            </>
          ) : (
            <Image
              source={{
                uri: `${currentItem.posterUrl}`,
              }}
              resizeMode="cover"
              style={verseResourceCommonStyle.image}
            />
          )}
        </View>
        <Text
          style={[
            styles.boldText,
            {backgroundColor: '#ede2e2', color: backgroundColor},
          ]}>
          {trimText(currentItem.title, 22)}
        </Text>
      </View>
    </TouchableOpacity>
  ),
);

const Index = memo(({navigation}) => {
  const {isDarkMode, currentBgColor, logedInuserType, currentTextColor} =
    useSelector(state => state.user);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const [isUploadStudyModalOpen, setIsUploadStudyModalOpen] = useState(false);
  const [isVisisblePDFModal, setisVisisblePDFModal] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [alertText, setAlertText] = useState(null);
  const [selectedCard, setSelectedCard] = useState([]);

  const [hindiData, setHindiData] = useState([]);
  const [englishData, setEnglishData] = useState([]);
  const [marathiData, setMarathiData] = useState([]);

  const bottomSheetRef = useRef(null);

  // Filteration for the diffrent lang
  useEffect(() => {
    // Filter data based on language tags
    setHindiData(adminStudyResouce.filter(item => item.tag === 'Hindi'));
    setEnglishData(adminStudyResouce.filter(item => item.tag === 'English'));
    setMarathiData(adminStudyResouce.filter(item => item.tag === 'Marathi'));
  }, []);

  const handleCardPress = useCallback(
    index => {
      if (isLoginPressed) {
        setSelectedCard(prevSelectedCard =>
          prevSelectedCard.includes(index)
            ? prevSelectedCard.filter(item => item !== index)
            : [...prevSelectedCard, index],
        );
      } else {
        bottomSheetRef.current?.open();
      }
    },
    [isLoginPressed],
  );

  const handleLongPress = useCallback(index => {
    setSelectedCard([index]);
    setIsLoginPressed(true);
  }, []);

  const renderItem = useCallback(
    ({item}) => (
      <Card
        key={item.id}
        backgroundColor={currentBgColor}
        borderColor={currentTextColor}
        textColor={currentTextColor}
        currentItem={item}
        onLongPress={() => handleLongPress(item.id)}
        onCardPress={
          () => {
            if (isLoginPressed) {
              handleCardPress(item.id);
            } else {
              setisVisisblePDFModal(true);
            }
          }
          //
        }
        isSelected={selectedCard.includes(item.id)}
      />
    ),
    [
      handleCardPress,
      handleLongPress,
      currentBgColor,
      currentTextColor,
      selectedCard,
    ],
  );

  const FirstRoute = () => (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={adminStudyResouce}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.flatListContainer}
    />
  );

  const SecondRoute = () => (
    // <ScrollView showsVerticalScrollIndicator={false}>
    <>
      <UploadStudyResource
        visible={isUploadStudyModalOpen}
        closeBottomSheetWithContent={() => {
          setIsUploadStudyModalOpen(false);
        }}
        navigation={navigation}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={englishData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
      {/* </ScrollView> */}
    </>
  );

  const ThirdRoute = () => (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={marathiData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.flatListContainer}
    />
  );

  const FourRoute = () => (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={hindiData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.flatListContainer}
    />
  );

  const routes = [
    {key: 'first', title: 'All'},
    {key: 'second', title: 'English'},
    {key: 'third', title: 'Marathi'},
    {key: 'four', title: 'Hindi'},
  ];

  const scenes = {
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    four: FourRoute,
  };

  return (
    <SafeAreaView
      style={[
        verseResourceCommonStyle.safeArea,
        {backgroundColor: currentBgColor},
      ]}>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle={MsgConfig.adminResouce}
      />
      <PDFDownload
        isVisisble={isVisisblePDFModal}
        pdfLink={
          'https://www.cfcindia.org/resources/hi/books/pdf/the-lord-and-his-church.pdf'
        }
        // pdfLink={`${BASE_URL_IMAGE}${showDoc}`}
        showDownloadBtn={true}
        onClose={() => {
          setisVisisblePDFModal(false);
        }}
        onRequestClose={() => {
          setisVisisblePDFModal(false);
        }}
      />

      <ConfirmAlert
        visible={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        alertTitle={alertText}
        onConfirm={() => {
          setIsConfirmModalVisible(false);
          setTimeout(
            () =>
              ToastAlertComp(
                'success',
                'Success',
                'Post deleted successfully.',
              ),
            1000,
          );
          setIsLoginPressed(false);
          setSelectedCard([]);
        }}
      />
      {isLoginPressed && (
        <MasterDeleteSelect
          selectedItem={selectedCard}
          onClosePress={() => {
            setIsLoginPressed(false);
            setSelectedCard([]);
          }}
          onDeletePress={() => {
            setAlertText(
              `Are you sure you want to delete ${selectedCard.length} PDF?`,
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
          {!isLoginPressed && (
            <View
              style={{
                position: 'absolute',
                bottom: getResHeight(7),
                right: getResWidth(7),
              }}>
              <WaveButton onPress={() => setIsUploadStudyModalOpen(true)} />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  card: {
    width: getResWidth(45),
    height: getResHeight(27),
    marginBottom: getResHeight(1.8),
    borderRadius: getResWidth(3),
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  flatListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  boldText: {
    fontFamily: theme.font.semiBold,
    fontSize: getFontSize(1.5),
    padding: '4%',
  },

  imgStyle: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

export default Index;
