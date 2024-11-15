import React, {useState, useEffect, memo} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getDailyVersesAPIHander} from '../../redux/reducer/DailyVerses/dailyVersesAPI';
import {checkIsNotEmptyArray} from '../../Components/commonHelper';
import TabViewComp from '../../Components/TabViewComp';
import SectionHeader from '../../Components/SectionHeader';
import MsgConfig from '../../Config/MsgConfig';
import {getResHeight, getResWidth} from '../../utility/responsive';
import theme from '../../utility/theme';

const DailyVersesComp = props => {
  const {navigation} = props;
  const dispatch = useDispatch();

  // Local state
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [selectedLng, setSelectedLng] = useState([]);

  // Redux state
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  const {dailyVerses} = useSelector(state => state.dailyVerses);

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
  }, [currentTabIndex, dailyVerses]);

  const routes = [
    {key: 'third', title: 'Marathi'},
    {key: 'first', title: 'Hindi'},
    {key: 'second', title: 'English'},
  ];

  const scenes = {
    first: () => <DailyVerbs dailyVerseData={selectedLng} />,
    second: () => <DailyVerbs dailyVerseData={selectedLng} />,
    third: () => <DailyVerbs dailyVerseData={selectedLng} />,
  };
  console.log('dailyVerses_at', selectedLng);
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
};

const DailyVerbs = memo(({dailyVerseData}) => {
  return (
    <View style={styles.verseContainer}>
      <Image
        source={
          dailyVerseData?.imageUrl
            ? {uri: dailyVerseData.imageUrl}
            : theme.assets.dailyVerbsBanner
        }
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    marginTop: getResHeight(1),
    height: getResHeight(52),
    width: '100%',
  },
  verseContainer: {
    height: '100%',
    width: '95%',
    borderRadius: getResHeight(1.3),
    overflow: 'hidden',
    marginBottom: getResHeight(5),
    alignSelf: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
});

export default DailyVersesComp;
