import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  SectionList,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight} from '../../../utility/responsive';
import theme from '../../../utility/theme';
import {StatusBarComp} from '../../../Components/commonComp';
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
import moment from 'moment';
import MasterDeleteSelect from '../../../Components/MasterDeleteSelect';
import ConfirmAlert from '../../../Components/ConfirmAlert';
import {VectorIcon} from '../../../Components/VectorIcon';

const UserNotification = ({navigation}) => {
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]); // Track selected notification IDs
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [alertText, setAlertText] = useState(null);
  const {groupedNotifications} = useSelector(
    state => state.notification.getNotification,
  );

  useEffect(() => {
    APICalling();
    setCurrentTabIndex(0);
  }, []);

  const APICalling = async () => {
    try {
      await store.dispatch(getNotificationAPIHander());
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

  const groupNotificationsByDate = notifications => {
    if (!notifications || notifications.length === 0) return [];
    const grouped = notifications.reduce((acc, notification) => {
      const date = moment(notification.createdAt).format('DD-MMM-YYYY');
      if (!acc[date]) acc[date] = [];
      acc[date].push(notification);
      return acc;
    }, {});

    return Object.keys(grouped).map(date => ({
      title: date,
      data: grouped[date],
    }));
  };

  const handleTabIndexChange = useCallback(index => {
    setCurrentTabIndex(index);
    setIsLongPressed(false);
    setSelectedIds([]);
  }, []);

  const toggleCardSelection = id => {
    setSelectedIds(prevState => {
      if (prevState.includes(id)) {
        return prevState.filter(item => item !== id);
      } else {
        return [...prevState, id];
      }
    });
  };

  const isReadNotification = async id => {
    try {
      const payload = {notificationID: id};
      await store.dispatch(readNotificationAPIHander(payload));
    } catch (error) {}
  };
  const deleteNotification = async () => {
    try {
      await store.dispatch(
        deleteNotificationAPIHander({
          notificationID: selectedIds,
        }),
      );
    } catch (error) {}
  };
  const renderNotificationCard = ({item}) => {
    const notificationImage = getNotificationImage(item.eventType);
    const isSelected = selectedIds.includes(item._id);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onLongPress={() => {
          setIsLongPressed(true);
          toggleCardSelection(item._id);
        }}
        onPress={() => {
          if (isLongPressed) {
            toggleCardSelection(item._id);
          } else {
            isReadNotification(item._id);
          }
        }}
        style={{
          paddingVertical: '4%',
          marginBottom: '2%',
          paddingHorizontal: '5%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 0.3,
          borderColor: 'grey',
          backgroundColor: isSelected
            ? 'rgba(255, 255, 255, 0.5)'
            : // :
              // !item.isRead
              // ? 'rgba(150, 149, 149, 0.199)'
              'transparent',
        }}>
        {!item.isRead && (
          <View
            style={{
              height: 5,
              width: 5,
              backgroundColor: 'white',
              position: 'absolute',
              left: 5,
              borderRadius: getResHeight(100),
              // marginRight: '3%',
            }}
          />
        )}

        <Image
          source={{uri: notificationImage}}
          style={{
            height: getResHeight(6),
            width: getResHeight(6),
            borderRadius: getResHeight(100),
            borderWidth: 0.2,
            borderColor: currentTextColor,
          }}
        />
        <View style={{marginLeft: '4%', flex: 1}}>
          <Text
            style={{
              fontSize: getFontSize(1.5),
              color: currentTextColor,
              fontFamily: theme.font.medium,
            }}>
            {item.message}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({section: {title}}) => (
    <View
      style={{
        paddingTop: getResHeight(1.5),
        paddingHorizontal: '5%',
        marginVertical: getResHeight(1),
        borderRadius: getResHeight(1),
      }}>
      <Text
        style={{
          fontSize: getFontSize(1.8),
          color: currentTextColor, // Adapt to the current theme's text color
          fontFamily: theme.font.bold,
          textAlign: 'center',
          textTransform: 'uppercase', // Modern text styling
          letterSpacing: 1.2, // Slight spacing for clean appearance
        }}>
        {title}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: currentBgColor}}>
      <StatusBarComp />
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle={MsgConfig.notification}
        onPressNotificaiton={() => {}}
      />
      {isLongPressed && (
        <MasterDeleteSelect
          selectedItem={selectedIds}
          onClosePress={() => {
            setIsLongPressed(false);

            setSelectedIds([]);
          }}
          onDeletePress={() => {
            setAlertText(
              `Are you sure you want to delete ${selectedIds.length} notifications?`,
            );
            setIsConfirmModalVisible(true);
          }}
        />
      )}

      <ConfirmAlert
        visible={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        alertTitle={alertText}
        alertIcon={
          <VectorIcon
            type={'MaterialIcons'}
            name={'delete-forever'}
            size={getFontSize(5.1)}
            color={theme.color.error}
          />
        }
        onConfirm={() => {
          deleteNotification();
          setIsConfirmModalVisible(false);
          setSelectedIds([]);
          setIsLongPressed(false);
        }}
      />
      <View style={{flex: 1, marginTop: '3%'}}>
        <TabViewComp
          routes={notificationTabs.map(({key, title}) => ({
            key,
            title,
          }))}
          scenes={notificationTabs.reduce((acc, {key, data}) => {
            acc[key] = () => (
              <SectionList
                sections={groupNotificationsByDate(data)}
                keyExtractor={item => item._id}
                renderItem={renderNotificationCard}
                renderSectionHeader={renderSectionHeader}
                ListEmptyComponent={() => (
                  <NoDataFound style={{marginTop: getResHeight(-20)}} />
                )}
                refreshControl={
                  <RefreshControl refreshing={false} onRefresh={APICalling} />
                }
              />
            );
            return acc;
          }, {})}
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
