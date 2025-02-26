import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

const notificationsData = [
  {
    id: '1',
    title: 'Payment Received',
    message: 'You received $100',
    date: moment(),
  },
  {
    id: '2',
    title: 'New Message',
    message: 'John sent you a message',
    date: moment().subtract(3, 'hours'),
  },
  {
    id: '3',
    title: 'Update Available',
    message: 'New version is ready',
    date: moment().subtract(1, 'days'),
  },
  {
    id: '4',
    title: 'Security Alert',
    message: 'Unusual login detected',
    date: moment().subtract(2, 'days'),
  },
];

const index = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  const deleteNotification = id => {
    const updatedList = notifications.filter(item => item.id !== id);
    setNotifications(updatedList);
  };

  const renderRightActions = id => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteNotification(id)}>
      <Icon name="delete" size={24} color="#fff" />
    </TouchableOpacity>
  );

  const groupNotifications = () => {
    const today = [];
    const yesterday = [];
    const earlier = [];

    notifications.forEach(item => {
      const diffDays = moment().diff(item.date, 'days');
      if (diffDays === 0) {
        today.push(item);
      } else if (diffDays === 1) {
        yesterday.push(item);
      } else {
        earlier.push(item);
      }
    });

    return {today, yesterday, earlier};
  };

  const renderSection = (title, data) => {
    if (data.length === 0) return null; // Auto-hide empty sections

    return (
      <>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <GestureHandlerRootView>
              <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                <View style={styles.notificationCard}>
                  <Icon
                    name="bell-ring-outline"
                    size={26}
                    color="#007AFF"
                    style={styles.icon}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.message}>{item.message}</Text>
                    <Text style={styles.date}>
                      {moment(item.date).fromNow()}
                    </Text>
                  </View>
                </View>
              </Swipeable>
            </GestureHandlerRootView>
          )}
        />
      </>
    );
  };

  const {today, yesterday, earlier} = groupNotifications();

  return (
    <View style={styles.container}>
      {renderSection('Today', today)}
      {renderSection('Yesterday', yesterday)}
      {renderSection('Earlier', earlier)}

      {notifications.length === 0 && (
        <View style={styles.emptyContainer}>
          <Icon name="bell-off-outline" size={50} color="#aaa" />
          <Text style={styles.emptyText}>No notifications</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F4F4F4', padding: 16},
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    // marginTop: 10,
    // marginBottom: 6,
    // paddingLeft: 6,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  icon: {marginRight: 12},
  textContainer: {flex: 1},
  title: {fontSize: 16, fontWeight: 'bold', color: '#222'},
  message: {fontSize: 14, color: '#555', marginTop: 2},
  date: {fontSize: 12, color: '#888', marginTop: 4},
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E63946',
    width: 70,
    borderRadius: 12,
  },
  emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  emptyText: {fontSize: 16, color: '#888', marginTop: 10},
});

export default index;
