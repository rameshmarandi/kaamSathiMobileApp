import React, {useState, memo, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {getFontSize, getResHeight} from '../../../utility/responsive/index.js';
import theme from '../../../utility/theme/index.js';
import * as Animatable from 'react-native-animatable';
import EventsUserList from './EventsUserList.js';

let ImgURL =
  'https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png';

let ImgURL2 =
  'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg';
const users = [
  {
    id: '1',
    name: 'Abhishek Sinha',
    date: '30 August',
    imageUri: ImgURL,
  },
  {
    id: '2',
    name: 'John Doe',
    date: '15 September',
    imageUri:
      'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3V5fGVufDB8fDB8fHww',
  },
  {
    id: '3',
    name: 'Emily Clark',
    date: '22 October',
    imageUri:
      'https://us.123rf.com/450wm/4max/4max1806/4max180600013/103118611-hipster-handsome-male-model-with-beard-wearing-white-blank-t-shirt-and-a-baseball-cap-with-space-for.jpg?ver=6',
  },
  {
    id: '4',
    name: 'Michael Johnson',
    date: '5 November',
    imageUri:
      'https://us.123rf.com/450wm/kegfire/kegfire1707/kegfire170700011/81312695-bearded-man-with-glasses-posing-in-studio.jpg?ver=6',
  },
];

const users2 = [
  {
    id: '1',
    name: 'Abhishek Sinha',
    date: '30 August',
    imageUri: ImgURL2,
  },
  {
    id: '2',
    name: 'John Doe',
    date: '15 September',
    imageUri:
      'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3V5fGVufDB8fDB8fHww',
  },
  {
    id: '3',
    name: 'Emily Clark',
    date: '22 October',
    imageUri: ImgURL2,
  },
  {
    id: '4',
    name: 'Michael Johnson',
    date: '5 November',
    imageUri: ImgURL2,
  },
  {
    id: '5',
    name: 'Jessica Lee',
    date: '18 December',
    imageUri: ImgURL2,
  },
  {
    id: '6',
    name: 'David Brown',
    date: '27 January',
    imageUri: ImgURL2,
  },
  {
    id: '7',
    name: 'Sophia Martinez',
    date: '3 February',
    imageUri: ImgURL2,
  },
  {
    id: '8',
    name: 'Daniel Wilson',
    date: '12 March',
    imageUri: ImgURL2,
  },
  {
    id: '9',
    name: 'Olivia Davis',
    date: '24 April',
    imageUri: ImgURL2,
  },
  {
    id: '10',
    name: 'Lucas Anderson',
    date: '30 May',
    imageUri: ImgURL2,
  },
  {
    id: '11',
    name: 'Emma Thompson',
    date: '10 June',
    imageUri: ImgURL2,
  },
  {
    id: '12',
    name: 'William Roberts',
    date: '14 July',
    imageUri: ImgURL2,
  },
];
const users3 = [
  {
    id: '1',
    name: 'Abhishek Sinha',
    date: '30 August',
    imageUri:
      'https://i.pinimg.com/736x/80/e8/46/80e846cce034ab0381ef78feaec22a14.jpg',
  },
  {
    id: '2',
    name: 'John Doe',
    date: '15 September',
    imageUri:
      'https://images.pexels.com/photos/2174662/pexels-photo-2174662.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: '3',
    name: 'Emily Clark',
    date: '22 October',
    imageUri:
      'https://media.istockphoto.com/id/1306446747/photo/happy-romantic-young-couple-falling-in-love.jpg?s=612x612&w=0&k=20&c=3fBZAaoHNA1cRNT2klkJ7GwoYlplXZue4znrhXmvfXM=',
  },
  {
    id: '4',
    name: 'Michael Johnson',
    date: '5 November',
    imageUri:
      'https://st2.depositphotos.com/1017986/5275/i/950/depositphotos_52752035-stock-photo-smiling-couple-hugging-in-autumn.jpg',
  },
];

const AdminUpcomingEvents = memo(() => {
  const {currentBgColor, currentTextColor, isDarkMode} = useSelector(
    state => state.user,
  );
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const routes = [{title: 'Birthday'}, {title: 'Anniversaries'}];

  // Rendering the UI based on the selected tab
  const renderCompOnSelectedIndex = () => {
    switch (currentTabIndex) {
      case 0:
        return <BirthdayComp />;

      case 1:
        return <AnniversariesComp />;
    }
  };

  const BirthdayComp = useCallback(() => {
    return (
      <>
        <View>
          <Text
            style={[
              styles.tabTitle,
              {
                color: currentTextColor,
              },
            ]}>
            {`Birthdays today ( ${users.length} )`}
          </Text>
          <EventsUserList eventsUsersData={users} />
          <Text
            style={[
              styles.tabTitle,
              {
                color: currentTextColor,
              },
            ]}>
            {`Next 7 Days ( ${users2.length} )`}
          </Text>
          <EventsUserList eventsUsersData={users2} />
        </View>
      </>
    );
  }, [currentTabIndex]);
  const AnniversariesComp = useCallback(() => {
    return (
      <>
        <Text
          style={[
            styles.tabTitle,
            {
              color: currentTextColor,
            },
          ]}>
          {`Anniversaries today ( ${users3.length} )`}
        </Text>
        <EventsUserList eventsUsersData={users3} />
        <Text
          style={[
            styles.tabTitle,
            {
              color: currentTextColor,
            },
          ]}>
          {`Next 7 Days ( ${users2.length} )`}
        </Text>
        <EventsUserList eventsUsersData={users2} />
      </>
    );
  }, [currentTabIndex]);
  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: 1,
          borderColor: currentTextColor,
          //
          paddingVertical: getResHeight(1.5),
          borderRadius: getResHeight(1),
        },
      ]}>
      <View
        style={{
          paddingHorizontal: getResHeight(1.5),
        }}>
        <Text style={[styles.categoryTitle, {color: currentTextColor}]}>
          Upcoming Birthday & Anniversaries
        </Text>
        <View
          style={[
            styles.tabContainer,
            {
              borderColor: isDarkMode ? currentBgColor : currentTextColor,
              backgroundColor: isDarkMode ? currentTextColor : currentBgColor,
              borderWidth: 1,
            },
          ]}>
          {routes.map((item, index) => {
            const isActive = currentTabIndex === index;
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => setCurrentTabIndex(index)}>
                <View
                  style={[
                    styles.tab,
                    {
                      backgroundColor: isActive
                        ? currentBgColor
                        : currentTextColor,
                      borderColor: isActive ? currentBgColor : currentTextColor,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.tabText,
                      {
                        width: '100%',
                        color: isActive ? currentTextColor : currentBgColor,
                        fontFamily: isActive
                          ? theme.font.bold
                          : theme.font.semiBold,
                      },
                    ]}
                    numberOfLines={1}>
                    {item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
      {renderCompOnSelectedIndex()}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: '5%',
  },
  tabTitle: {
    marginVertical: getResHeight(1.3),
    fontFamily: theme.font.semiBold,
    fontSize: getFontSize(1.7),
    paddingHorizontal: getResHeight(2),
  },
  categoryTitle: {
    marginBottom: getResHeight(1.5),
    fontFamily: theme.font.semiBold,
    fontSize: getFontSize(1.7),
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '1%',
    borderRadius: 50,
    overflow: 'hidden', // Ensure the content inside does not overflow
  },
  tab: {
    width: '50%', // Each button takes up 50% of the parent width
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2%',
    marginVertical: '1%',
    borderRadius: 50,
    borderWidth: 1,
  },
  tabText: {
    fontSize: getFontSize(1.5),
    textAlign: 'center',
  },
});

export default AdminUpcomingEvents;
