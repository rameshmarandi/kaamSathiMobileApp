import React, {useState, useEffect, memo} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getDailyVersesAPIHander,
  viewPostAPIHander,
} from '../../redux/reducer/DailyVerses/dailyVersesAPI';
import {checkIsNotEmptyArray} from '../../Components/commonHelper';
import TabViewComp from '../../Components/TabViewComp';
import SectionHeader from '../../Components/SectionHeader';
import MsgConfig from '../../Config/MsgConfig';
import {getResHeight, getResWidth} from '../../utility/responsive';
import theme from '../../utility/theme';
import {store} from '../../redux/store';
import {setSelectedDailyVerse} from '../../redux/reducer/DailyVerses';

const DailyVersesComp = memo(props => {
  const {navigation} = props;
  const dispatch = useDispatch();

  // Local state
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [selectedLng, setSelectedLng] = useState([]);

  // Redux state
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  const {dailyVerses, selectedDailyVerse} = useSelector(
    state => state.dailyVerses,
  );

  // Fetch data on mount
  useEffect(() => {
    dispatch(getDailyVersesAPIHander());
  }, [dispatch]);

  // Handle tab change
  const handleTabChange = index => {
    setCurrentTabIndex(index);
  };

  // Set language-specific data when dailyVerses change or currentTabIndex changes
  useEffect(() => {
    if (
      !checkIsNotEmptyArray(dailyVerses) ||
      !checkIsNotEmptyArray(dailyVerses[0].images)
    ) {
      return;
    }

    const currentRoute = routes[currentTabIndex];
    const matchedImage = dailyVerses[0].images.find(
      image => image.language === currentRoute.title,
    );

    if (matchedImage) {
      setSelectedLng(matchedImage);
    }

    // postViewAPIHandler(); // View API handler
  }, [currentTabIndex, dailyVerses]);

  const postViewAPIHandler = async () => {
    await store.dispatch(
      viewPostAPIHander({
        id: selectedLng._id,
      }),
    );
  };
  const routes = [
    {key: 'third', title: 'Marathi'},
    {key: 'first', title: 'Hindi'},
    {key: 'second', title: 'English'},
  ];

  const scenes = {
    first: () => (
      <DailyVerbs
        dailyVerseData={selectedLng}
        onPress={() => {
          store.dispatch(setSelectedDailyVerse(selectedLng));
          navigation.navigate('VerseDetails');
        }}
      />
    ),
    second: () => (
      <DailyVerbs
        dailyVerseData={selectedLng}
        onPress={() => {
          store.dispatch(setSelectedDailyVerse(selectedLng));
          navigation.navigate('VerseDetails');
        }}
      />
    ),
    third: () => (
      <DailyVerbs
        dailyVerseData={selectedLng}
        onPress={() => {
          store.dispatch(setSelectedDailyVerse(selectedLng));
          navigation.navigate('VerseDetails');
        }}
      />
    ),
  };

  return (
    <>
      {selectedLng.length == 0 ? null : (
        <>
          <View style={styles.container}>
            <View
              style={{
                paddingHorizontal: getResWidth(3),
                marginTop: getResHeight(3),
              }}>
              <SectionHeader sectionTitle={MsgConfig.firstHeaderText} />
            </View>
            <View style={styles.tabContainer}>
              <TabViewComp
                routes={routes}
                scenes={scenes}
                indicatorStyle={{backgroundColor: currentTextColor}}
                onIndexChange={handleTabChange}
                tabBarContainerStyle={{
                  backgroundColor: currentBgColor,
                  marginBottom: '4%',
                }}
                labelStyle={{
                  color: currentTextColor,
                  fontFamily: theme.font.semiBold,
                }}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
});

export const DailyVerbs = memo(props => {
  const {dailyVerseData, onPress, imageResize} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.verseContainer}>
      <Image
        source={
          dailyVerseData?.imageUrl
            ? {uri: dailyVerseData.imageUrl}
            : theme.assets.dailyVerbsBanner
        }
        resizeMode={imageResize ? imageResize : 'cover'}
        style={styles.image}
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    marginTop: getResHeight(1),
    height: getResHeight(48),
    overflow: 'hidden',
    width: '100%',
    marginBottom: '5%',
  },
  verseContainer: {
    height: '100%',
    width: '98%',
    borderRadius: getResHeight(1.3),
    overflow: 'hidden',
    marginBottom: getResHeight(5),
    paddingHorizontal: getResWidth(3),
    alignSelf: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: getResHeight(1.3),
  },
});

export default DailyVersesComp;
