import React, {useState} from 'react';
import {View, Text, SafeAreaView, Image, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {backgroundColorHandler} from '../../../Components/commonHelper';
import {getFontSize, getResHeight} from '../../../utility/responsive';
import theme from '../../../utility/theme';
import {StatusBarComp} from '../../../Components/commonComp';
import CustomHeader from '../../../Components/CustomHeader';
import MsgConfig from '../../../Config/MsgConfig';
import TabViewComp from '../../../Components/TabViewComp';

const UserNotification = props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const FirstRoute = () => (
    <NotificaitonCard
      currentBgColor={currentBgColor}
      currentTextColor={currentTextColor}
      currentTabIndex={currentTabIndex}
    />
  );

  const SecondRoute = () => (
    <NotificaitonCard
      currentBgColor={currentBgColor}
      currentTextColor={currentTextColor}
      currentTabIndex={currentTabIndex}
    />
  );

  const ThirdRoute = () => (
    <NotificaitonCard
      currentBgColor={currentBgColor}
      currentTextColor={currentTextColor}
      currentTabIndex={currentTabIndex}
    />
  );

  const routes = [
    {key: 'first', title: 'All'},
    {key: 'second', title: 'Daily verbs'},
    {key: 'third', title: 'Birthday'},
  ];

  const scenes = {
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentBgColor,
      }}>
      <StatusBarComp />

      <CustomHeader
        backPress={() => {
          navigation.goBack();
        }}
        screenTitle={MsgConfig.notification}
      />

      <View style={{flex: 1, marginTop: '3%'}}>
        <TabViewComp
          routes={routes}
          scenes={scenes}
          indicatorStyle={{
            backgroundColor: 'red',
          }}
          tabBarContainerStyle={{
            backgroundColor: currentBgColor,
            marginBottom: '4%',
          }}
          onIndexChange={tabIndex => {
            setCurrentTabIndex(tabIndex);
            // console.log('Current_tab_index: ' + currentTabIndex);
          }}
          labelStyle={{
            color: currentTextColor,

            fontFamily: theme.font.bold,
          }}
          sceneContainerStyle={{}}
        />
      </View>
    </SafeAreaView>
  );
};

const NotificaitonCard = props => {
  const {currentBgColor, currentTextColor, currentTabIndex} = props;
  let today_Verbs_Image_URL =
    'https://versefortheday.com/wp-content/uploads/2021/05/cropped-bible-verse-for-the-day-logo.png';

  // Define the original array containing all types of notifications
  // Original array containing all types of notifications
  const tempArray = [
    {type: 1, title: 'Happy Birthday', message: 'Dear , Ramesh Marandi'},
    {type: 2, title: 'Daily Verbs', message: 'Another daily message here'},
    {
      type: 1,
      title: 'Birthday Celebration',
      message: 'Wishing you a fantastic birthday!',
    },
    {
      type: 1,
      title: 'Birthday Greetings',
      message: 'May your day be filled with joy and laughter!',
    },
    {
      type: 2,
      title: 'Daily Inspiration',
      message: 'Stay positive and keep moving forward!',
    },
    {
      type: 1,
      title: 'Birthday Wishes',
      message: 'Sending you warm wishes on your special day!',
    },
    {
      type: 2,
      title: 'Daily Reflection',
      message: 'Take a moment to reflect on your journey and achievements.',
    },
    {
      type: 1,
      title: 'Birthday Joy',
      message: 'Celebrate life and cherish every moment!',
    },
    {
      type: 2,
      title: 'Daily Motivation',
      message: 'Set goals and work hard to achieve them.',
    },
    {
      type: 1,
      title: 'Birthday Blessings',
      message: 'May this year bring you happiness and success!',
    },
    {
      type: 2,
      title: 'Daily Affirmation',
      message: 'You are capable of achieving great things.',
    },
    {
      type: 1,
      title: 'Birthday Greetings',
      message: 'May your year be as wonderful as you are!',
    },
    {
      type: 2,
      title: 'Daily Insight',
      message: 'Seek wisdom and understanding in all that you do.',
    },
    {type: 1, title: 'Birthday Fun', message: 'Let the celebrations begin!'},
    {
      type: 2,
      title: 'Daily Focus',
      message: 'Focus on what truly matters in life.',
    },
    {
      type: 1,
      title: 'Birthday Happiness',
      message: 'Wishing you a day filled with laughter and love!',
    },
    {
      type: 2,
      title: 'Daily Strength',
      message: 'Draw strength from Him in times of weakness.',
    },
    {
      type: 1,
      title: 'Birthday Cheers',
      message: 'Here’s to another amazing year ahead!',
    },
    {type: 2, title: 'Daily Wisdom', message: 'Seek wisdom from above.'},
    {
      type: 1,
      title: 'Birthday Wishes',
      message: 'May all your dreams come true on this special day!',
    },
  ];

  // Filtered arrays based on currentTabIndex
  let filteredData = [];
  if (currentTabIndex === 0) {
    filteredData = tempArray; // Show all
  } else if (currentTabIndex === 1) {
    filteredData = tempArray.filter(item => item.type === 1); // Filter birthday
  } else if (currentTabIndex === 2) {
    filteredData = tempArray.filter(item => item.type === 2); // Filter daily verbs
  }
  const _renderComp = ({item, index}) => {
    console.log('item', item);

    return (
      <View
        style={{
          paddingVertical: '3%',
          marginBottom: '5%',
          paddingHorizontal: '3%',
          flexDirection: 'row',
          borderRadius: getResHeight(1),
          borderWidth: 0.5,
          borderColor: currentTextColor,
          flexWrap: 'wrap',
        }}>
        <View>
          <Image
            source={
              tempArray.includes(index)
                ? theme.assets.birthday
                : {uri: today_Verbs_Image_URL}
            }
            style={{
              height: getResHeight(7),
              width: getResHeight(7),
              backgroundColor: 'white',
              borderRadius: getResHeight(100),
              borderWidth: 0.2,
              borderColor: currentTextColor,
            }}
          />
        </View>
        <View style={{marginLeft: '4%', flex: 1}}>
          <Text
            style={{
              fontSize: getFontSize(2),
              color: currentTextColor,
              fontFamily: theme.font.bold,
            }}>
            {item.title}
            {/* {tempArray.includes(index) ? 'Happy Birthday' : `Today's Verse`} */}
          </Text>
          <Text
            style={{
              fontSize: getFontSize(1.4),
              color: currentTextColor,
              fontFamily: theme.font.regular,
            }}>
            {tempArray.includes(index)
              ? 'Dear , Ramesh Marandi'
              : 'For God so loved the world that ..'}
          </Text>
          <View>
            <Text
              style={{
                textDecorationColor: 'underline',
                color: currentTextColor,
              }}>
              Read more..
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      <FlatList
        data={filteredData} // Adjusted to generate an array of 16 items
        contentContainerStyle={{
          flexGrow: 1, // Ensure the FlatList takes full height
          marginTop: '5%',
          paddingHorizontal: '5%',
        }}
        keyExtractor={(item, index) => index.toString()} // Fixed keyExtractor usage
        renderItem={_renderComp}
      />
    </>
  );
};
export default UserNotification;
