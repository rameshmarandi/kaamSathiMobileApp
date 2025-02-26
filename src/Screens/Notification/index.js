import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Animated,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getFontSize} from '../../utility/responsive';
import {StatusBarComp} from '../../Components/commonComp';
import CustomHeader from '../../Components/CustomHeader';
import Icon from 'react-native-vector-icons/Feather'; // Using Vector Icons

const index = ({navigation}) => {
  const {currentBgColor, currentTextColor} = useSelector(state => state.user);
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      _id: '1',
      message: 'New message received!',
      createdAt: new Date().toISOString(),
    },
    {
      _id: '2',
      message: 'Your order has been shipped.',
      createdAt: new Date().toISOString(),
    },
    {
      _id: '3',
      message: 'Reminder: Meeting at 3 PM',
      createdAt: new Date().toISOString(),
    },
  ]);

  const loadNotifications = async () => {
    setRefreshing(true);
    try {
      // Fetch notifications from API and update state here
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  // Delete Notification from the array
  const handleDeleteNotification = useCallback(id => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notif => notif._id !== id),
    );
  }, []);

  const renderItem = ({item}) => {
    const fadeAnim = new Animated.Value(1); // Initial opacity

    return (
      <Animated.View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
          opacity: fadeAnim,
          transform: [{scale: fadeAnim}],
        }}>
        <Image
          source={{
            uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/notifications-3d-icon-5034125.png',
          }}
          style={{width: 40, height: 40, marginRight: 16, borderRadius: 20}}
        />
        <View style={{flex: 1}}>
          <Text style={{color: currentTextColor, fontSize: getFontSize(1.8)}}>
            {item.message}
          </Text>
          <Text
            style={{color: '#666', fontSize: getFontSize(1.4), marginTop: 4}}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        {/* Delete Button */}
        <TouchableOpacity onPress={() => handleDeleteNotification(item._id)}>
          <Icon name="trash-2" size={24} color="red" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: currentBgColor}}>
      <StatusBarComp />
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle={'Notifications'}
      />

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadNotifications}
          />
        }
        ListEmptyComponent={
          <View style={{padding: 20, alignItems: 'center'}}>
            <Text style={{color: currentTextColor}}>
              No notifications found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default React.memo(index);
