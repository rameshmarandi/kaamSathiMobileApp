import React, {useState, useRef, useCallback, memo} from 'react';
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
import {getResHeight, getResWidth} from '../../../utility/responsive';
import CustomHeader from '../../../Components/CustomHeader';
import ConfirmAlert from '../../../Components/ConfirmAlert';
import CustomBottomSheet from '../../../Components/CustomBottomSheet';
import {VectorIcon} from '../../../Components/VectorIcon';
import theme from '../../../utility/theme';
import MsgConfig from '../../../Config/MsgConfig';
import {CommonButtonComp, StatusBarComp} from '../../../Components/commonComp';
import WaveButton from '../../../Components/WaveButton';
import TabViewComp from '../../../Components/TabViewComp';
import ToastAlertComp from '../../../Components/ToastAlertComp';
import MasterDeleteSelect from '../../../Components/MasterDeleteSelect';
import DailyVersUploadForm from './DailyVersUploadForm';
import {verseResourceCommonStyle} from '../../Styles/verseResourceCommonStyle';

const Card = memo(
  ({
    backgroundColor,
    borderColor,
    textColor,
    onLongPress,
    onCardPress,
    waveButtonProps,
    scheduleText,
    date,
    imageSource,
    isSelected,
  }) => (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={onCardPress}
      activeOpacity={0.8}>
      <View
        style={[
          verseResourceCommonStyle.card,
          {
            backgroundColor,
            borderColor,
          },
        ]}>
        {isSelected && (
          <View
            style={[
              verseResourceCommonStyle.overlay,
              {backgroundColor: 'rgba(255, 255, 255, 0.5)'},
            ]}
          />
        )}
        <View style={verseResourceCommonStyle.cardHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <WaveButton {...waveButtonProps} />
            <Text
              style={[
                verseResourceCommonStyle.boldText,
                {
                  color: textColor,
                  marginLeft: 10,
                },
              ]}>
              {scheduleText}
            </Text>
          </View>
          <Text
            style={[verseResourceCommonStyle.regularText, {color: textColor}]}>
            {date}
          </Text>
        </View>
        <View style={verseResourceCommonStyle.imageContainer}>
          <Image
            source={imageSource}
            resizeMode="cover"
            style={verseResourceCommonStyle.image}
          />
        </View>
      </View>
    </TouchableOpacity>
  ),
);

const Index = memo(({navigation}) => {
  const {currentBgColor, currentTextColor} = useSelector(state => state.user);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isUploadResModalOpen, setIsUploadResModalOpen] = useState(false);
  const [isLoginPressed, setIsLongPressed] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [alertText, setAlertText] = useState(null);
  const [selectedCard, setSelectedCard] = useState([]);

  const bottomSheetRef = useRef(null);

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

  const renderItem = useCallback(
    ({item, index}) => (
      <Card
        key={index}
        backgroundColor={currentBgColor}
        borderColor={currentTextColor}
        textColor={currentTextColor}
        waveButtonProps={waveButtonPropsSecondRoute}
        onLongPress={() => handleLongPress(index)}
        scheduleText={'Going live on'}
        date={item.date}
        isSelected={selectedCard.includes(index)}
        imageSource={theme.assets.dailyVerbsBanner}
        onCardPress={() => handleCardPress(index)}
      />
    ),
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
    <ScrollView>
      {['English', 'Marathi', 'Hindi'].map((item, index) => (
        <Card
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
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <CustomBottomSheet ref={bottomSheetRef} modalHeight={getResHeight(90)}> */}
      {/* <DailyVersUploadForm
          closeBottomSheetWithContent={closeBottomSheetWithContent}
        /> */}

      <DailyVersUploadForm
        visible={isUploadResModalOpen}
        closeBottomSheetWithContent={() => {
          setIsUploadResModalOpen(false);
        }}
        navigation={navigation}
      />
      {/* </CustomBottomSheet> */}
      <FlatList
        data={scheduleData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={verseResourceCommonStyle.flatListContainer}
      />
    </ScrollView>
  );

  const routes = [
    {key: 'first', title: `Today's Verses`},
    {key: 'second', title: 'Upcoming'},
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

export default Index;
