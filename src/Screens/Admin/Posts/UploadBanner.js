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
} from '../../../Components/commonComp';
import WaveButton from '../../../Components/WaveButton';
import TabViewComp from '../../../Components/TabViewComp';
import ToastAlertComp from '../../../Components/ToastAlertComp';
import MasterDeleteSelect from '../../../Components/MasterDeleteSelect';
// import DailyVersUploadForm from './DailyVersUploadForm';
import {verseResourceCommonStyle} from '../../Styles/verseResourceCommonStyle';
import DailyVersUploadForm from '../DailyVerses/DailyVersUploadForm';

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
    {
      id: 1,
      date: '12 October 2024 | 06 AM',
      imgeURL:
        'https://cdn.pixabay.com/photo/2023/03/06/10/17/ai-generated-7833194_640.jpg',
    },
    {
      id: 2,
      date: '14 October 2024 | 07 PM',

      imgeURL:
        'https://cdn2.momjunction.com/wp-content/uploads/2018/02/1st-Birthday-Wishes-For-Son4.jpg.webp',
    },
    {
      id: 3,
      date: '16 October 2024 | 05 AM',

      imgeURL:
        'https://parade.com/.image/t_share/MTkwNTgxNDczNjkxMTgyMjA1/30-birthday-party.jpg',
    },

    {
      id: 4,
      date: '18 October 2024 | 08 PM',

      imgeURL:
        'https://www.shaadidukaan.com/vogue/wp-content/uploads/2019/08/wedding-Feature-Image.jpg',
    },
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
      <CommonImageCard
        key={index}
        backgroundColor={currentBgColor}
        borderColor={currentTextColor}
        textColor={currentTextColor}
        waveButtonProps={waveButtonPropsSecondRoute}
        onLongPress={() => handleLongPress(index)}
        // scheduleText={'Going live on'}
        scheduleText={'Go live on '}
        date={item.date}
        isSelected={selectedCard.includes(index)}
        imageSource={
          item.imgeURL !== 'undefined' && item.imgeURL.includes('https://')
            ? {uri: item.imgeURL}
            : theme.assets.dailyVerbsBanner
        }
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
  const specialMomentCard = useCallback(
    ({item, index}) => (
      <CommonImageCard
        key={index}
        backgroundColor={currentBgColor}
        borderColor={currentTextColor}
        textColor={currentTextColor}
        waveButtonProps={waveButtonPropsFirstRoute}
        onLongPress={() => handleLongPress(index)}
        // scheduleText={'Going live on'}
        scheduleText={'Live'}
        date={`Expire on : ${item.date}`}
        isSelected={selectedCard.includes(index)}
        isFooterVisilbe={true}
        imageSource={
          item.imgeURL !== 'undefined' && item.imgeURL.includes('https://')
            ? {uri: item.imgeURL}
            : theme.assets.dailyVerbsBanner
        }
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
      <FlatList
        data={scheduleData}
        renderItem={specialMomentCard}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={verseResourceCommonStyle.flatListContainer}
      />
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
          Note : The posts will expire in next 24 hours
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

export default Index;
