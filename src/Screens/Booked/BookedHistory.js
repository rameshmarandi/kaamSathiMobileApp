import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
// import {MaterialIcons, FontAwesome5} from '@expo/vector-icons';
import CustomHeader from '../../Components/CustomHeader';
import theme from '../../utility/theme';
import {getResHeight, getResWidth, getFontSize} from '../../utility/responsive';

const fetchBookingHistory = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Ramesh Marandi',
          service: 'Electrician',
          serviceType: 'Home Repair',
          workType: 'Wiring & Switches',
          urgency: 'High',
          bookDateTime: '2024-02-10 | 10:30 AM',
          amount: '$50',
          status: 'Completed',
          image:
            'https://www.gngmodels.com/wp-content/uploads/2023/12/indian-male-models-11-682x1024.jpg',
        },
        {
          id: '2',
          name: 'Amit Kumar',
          service: 'Plumber',
          serviceType: 'Water Supply',
          workType: 'Leak Fixing',
          urgency: 'Medium',
          bookDateTime: '2024-02-08 | 3:45 PM',
          amount: '$40',
          status: 'Pending',
          image:
            'https://www.gngmodels.com/wp-content/uploads/2023/12/indian-male-models-11-682x1024.jpg',
        },
      ]);
    }, 1500);
  });
};

const BookedHistory = ({navigation}) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    const data = await fetchBookingHistory();
    setHistory(data);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  const renderItem = useCallback(({item}) => {
    return (
      <View style={styles.card}>
        <Image source={{uri: item.image}} style={styles.profileImage} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.row}>
            {/* <MaterialIcons name="build" size={16} color={theme.color.primary} /> */}
            <Text style={styles.text}>{item.service}</Text>
          </View>
          <View style={styles.row}>
            {/* <FontAwesome5 name="tools" size={14} color={theme.color.darkGray} /> */}
            <Text style={styles.text}>{item.workType}</Text>
          </View>
          <View style={[styles.badge, getUrgencyStyle(item.urgency)]}>
            <Text style={styles.badgeText}>{item.urgency} Urgency</Text>
          </View>
          <Text style={styles.amount}>{item.amount}</Text>
          <Text
            style={[
              styles.status,
              item.status === 'Completed' ? styles.completed : styles.pending,
            ]}>
            {item.status}
          </Text>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.color.secondary}
          style={{marginTop: 20}}
        />
      ) : (
        <FlatList
          data={history}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const getUrgencyStyle = urgency => {
  switch (urgency) {
    case 'High':
      return {backgroundColor: 'red'};
    case 'Medium':
      return {backgroundColor: 'orange'};
    case 'Low':
      return {backgroundColor: 'green'};
    default:
      return {backgroundColor: 'gray'};
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white,
    padding: getResWidth(3),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: theme.color.white,
    borderRadius: getResWidth(4),
    marginVertical: getResHeight(1.5),
    padding: getResWidth(4),
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  profileImage: {
    width: getResHeight(14),
    height: getResHeight(14),
    borderRadius: getResHeight(7),
  },
  details: {
    flex: 1,
    marginLeft: getResWidth(4),
  },
  name: {
    fontSize: getFontSize(2.2),
    fontFamily: theme.font.bold,
    color: theme.color.charcolBlack,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getResHeight(0.8),
  },
  text: {
    fontSize: getFontSize(1.8),
    fontFamily: theme.font.medium,
    color: theme.color.darkGray,
    marginLeft: getResWidth(2),
  },
  badge: {
    paddingHorizontal: getResWidth(3),
    paddingVertical: getResHeight(0.8),
    borderRadius: getResWidth(3),
    marginTop: getResHeight(1.2),
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: 'white',
    fontSize: getFontSize(1.6),
    fontFamily: theme.font.medium,
  },
  amount: {
    fontSize: getFontSize(2),
    fontFamily: theme.font.bold,
    color: theme.color.primary,
    marginTop: getResHeight(1.2),
  },
  status: {
    marginTop: getResHeight(1),
    padding: getResHeight(0.8),
    borderRadius: getResWidth(2),
    textAlign: 'center',
    color: 'white',
  },
  completed: {backgroundColor: 'green'},
  pending: {backgroundColor: 'orange'},
});

export default BookedHistory;
