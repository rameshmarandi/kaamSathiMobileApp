import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight} from '../../../utility/responsive';
import theme from '../../../utility/theme';
import {StatusBarComp, trimText} from '../../../Components/commonComp';
import CustomHeader from '../../../Components/CustomHeader';
import MsgConfig from '../../../Config/MsgConfig';
import TabViewComp from '../../../Components/TabViewComp';
import NoDataFound from '../../../Components/NoDataFound';
import {store} from '../../../redux/store';
import {
  deleteNotificationAPIHander,
  getNotificationAPIHander,
  readNotificationAPIHander,
} from '../../../redux/reducer/Notification/NotificationAPI';
import {RefreshControl} from 'react-native';
import MasterDeleteSelect from '../../../Components/MasterDeleteSelect';
import {getShortTimeAgo} from '../../../Components/commonHelper';
import moment from 'moment';
import {DateFormator} from '../../../Helpers/CommonHelpers';

const UserNotification = ({navigation}) => {
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]); // Track selected notification IDs
  const {groupedNotifications} = useSelector(
    state => state.notification.getNotification,
  );

  useEffect(() => {
    APICalling();
  }, []);

  const APICalling = async () => {
    try {
      await store.dispatch(getNotificationAPIHander());
    } catch (error) {}
  };

  const notificationTabs = [
    {key: 'first', title: 'All', data: groupedNotifications?.All},
    {
      key: 'second',
      title: 'Daily Verse',
      data: groupedNotifications?.DailyVerse,
    },
    {key: 'third', title: 'Birthday', data: groupedNotifications?.Birthday},
    {
      key: 'fourth',
      title: 'Anniversary',
      data: groupedNotifications?.Anniversary,
    },
    {
      key: 'fifth',
      title: 'Transactions',
      data: groupedNotifications?.TransactionSuccess,
    },
    {key: 'sixth', title: 'Others', data: groupedNotifications?.Others},
  ];

  const handleTabIndexChange = useCallback(index => {
    console.log('get_curet', index);
    setCurrentTabIndex(index);
    setIsLongPressed(false);
    setSelectedIds([]);
  }, []);

  const toggleCardSelection = id => {
    setSelectedIds(prevState => {
      if (prevState.includes(id)) {
        // Deselect if already selected
        return prevState.filter(item => item !== id);
      } else {
        // Select the card
        return [...prevState, id];
      }
    });
  };

  const isReadNotification = async id => {
    try {
      const payload = {
        notificationID: id,
      };

      await store.dispatch(readNotificationAPIHander(payload));
    } catch (error) {}
  };
  const getNotificationImage = eventType => {
    const images = {
      DailyVerse:
        'https://cdn3d.iconscout.com/3d/premium/thumb/bible-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--christian-holy-book-miscellaneous-pack-illustrations-4122966.png',
      Birthday:
        'https://www.shutterstock.com/shutterstock/photos/2290920757/display_1500/stock-vector-vector-d-icon-party-popper-cartoon-emoji-of-birthday-confetti-explosion-simple-minimal-2290920757.jpg',
      Anniversary:
        'https://cdn3d.iconscout.com/3d/premium/thumb/anniversary-date-3d-icon-download-in-png-blend-fbx-gltf-file-formats--calendar-event-valentine-valentines-day-pack-festival-days-icons-6210503.png',
      TransactionSuccess:
        'https://media.istockphoto.com/id/639735440/vector/rupee-currency-icon-3d-rendering-illustration.jpg?s=612x612&w=0&k=20&c=fmu01_RFom-7N2ezxLPNi18z6lGyTLcqTUYtyb8iqmw=',
      Default:
        'https://cdn3d.iconscout.com/3d/premium/thumb/notifications-3d-icon-download-in-png-blend-fbx-gltf-file-formats--notification-bell-alarm-user-interface-pack-icons-5034125.png',
    };
    return images[eventType] || images.Default;
  };

  const renderNotificationCard = useCallback(
    ({item}) => {
      const notificationImage = getNotificationImage(item.eventType);
      const isSelected = selectedIds.includes(item._id); // Check if this card is selected
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onLongPress={() => {
            setIsLongPressed(true);
            toggleCardSelection(item._id);
          }} // Toggle selection on long press
          onPress={() => {
            if (isLongPressed) {
              toggleCardSelection(item._id);
            } else {
              isReadNotification(item._id);
            }
          }} // Toggle selection on normal press
          style={{
            paddingVertical: '4%',
            marginBottom: '2%',
            paddingHorizontal: '5%',
            marginHorizontal: '2%',
            flexDirection: 'row',
            borderBottomWidth: 0.3,
            borderColor: 'grey',
            borderRadius: getResHeight(2),
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            backgroundColor: isSelected
              ? 'rgba(255, 255, 255, 0.5)'
              : !item.isRead
              ? 'rgba(150, 149, 149, 0.199)'
              : 'transparent', // Apply overlay on selection
          }}>
          <View>
            <Image
              source={{uri: notificationImage}}
              style={{
                height: getResHeight(6),
                width: getResHeight(6),
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
                fontSize: getFontSize(1.5),
                color: currentTextColor,
                fontFamily: theme.font.medium,
              }}>
              {/* {trimText(item.message)} */}
              {item.message}
            </Text>
            {/* <Text
              style={{
                fontSize: getFontSize(1.4),
                color: currentTextColor,
                fontFamily: theme.font.regular,
              }}
            /> */}
            {/* <View>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: currentTextColor,
                }}>
                Read more..
              </Text>
            </View> */}

            <Text
              style={{
                color: currentTextColor,
                fontFamily: theme.font.bold,
                fontSize: getFontSize(1.5),
                justifyContent: 'flex-end',
                marginTop: '5%',
              }}>
              {`${DateFormator(
                item.createdAt,
                'DD-MMM-YYYY',
              )}   (${getShortTimeAgo(moment(item.createdAt))})`}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [selectedIds, currentTextColor], // Re-render when selectedIds or currentTextColor change
  );

  const handleDeleteNotifications = async () => {
    try {
      const payload = {
        notificationID: selectedIds,
      };
      await store.dispatch(deleteNotificationAPIHander(payload));
      setIsLongPressed(false);
      setSelectedIds([]);
    } catch (error) {}
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: currentBgColor}}>
      <StatusBarComp />
      <CustomHeader
        backPress={() => {
          navigation.goBack();
        }}
        screenTitle={MsgConfig.notification}
        onPressNotificaiton={() => {
          // navigation.navigate('UserNotification');
        }}
      />

      {selectedIds.length > 0 && (
        <MasterDeleteSelect
          selectedItem={selectedIds}
          onClosePress={() => {
            setIsLongPressed(false);
            setSelectedIds([]);
          }} // Reset selection when closing
          onDeletePress={handleDeleteNotifications}
        />
      )}

      <View style={{flex: 1, marginTop: '3%'}}>
        <TabViewComp
          routes={notificationTabs.map(({key, title}) => ({
            key,
            title,
          }))}
          scenes={notificationTabs.reduce((acc, {key, data}) => {
            acc[key] = () => (
              <FlatList
                data={data}
                contentContainerStyle={{
                  flexGrow: 1,
                  // marginTop: '5%',
                  // paddingHorizontal: '5%',
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => APICalling()}
                  />
                }
                keyExtractor={(item, index) => item._id} // Use unique ID for keyExtractor
                renderItem={renderNotificationCard}
                ListEmptyComponent={() => (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: getResHeight(-20),
                    }}>
                    <NoDataFound />
                  </View>
                )}
              />
            );
            return acc;
          }, {})}
          indicatorStyle={{backgroundColor: 'red'}}
          tabBarContainerStyle={{
            backgroundColor: currentBgColor,
            marginBottom: '4%',
          }}
          onIndexChange={handleTabIndexChange}
          labelStyle={{
            color: currentTextColor,
            fontSize: getFontSize(1.5),
            fontFamily: theme.font.medium,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(UserNotification);
