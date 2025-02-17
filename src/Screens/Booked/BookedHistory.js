import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import theme from '../../utility/theme';
import TabViewComp from '../../Components/TabViewComp';

const BookedHistory = () => {
  const [activeBookings, setActiveBookings] = useState([]);
  const [historyBookings, setHistoryBookings] = useState([]);
  const [simulatedDate, setSimulatedDate] = useState(Date.now());

  // Add new booking with future date
  const addNewBooking = daysToAdd => {
    const newDate = new Date(simulatedDate);
    newDate.setDate(newDate.getDate() + daysToAdd);

    const newBooking = {
      id: Date.now().toString(),
      laborName: 'Ramesh Kumar',
      profilePic:
        'https://www.shutterstock.com/image-photo/engineer-worker-standing-confident-on-260nw-2223884221.jpg',
      serviceType: 'Electrician',
      bookingTimestamp: newDate.getTime(),
      bookingTime: '10:30 AM',
      location: 'Mumbai, Maharashtra',
      status: 'Confirmed',
      cancelable: true,
      progress: 0,
      startTime: null,
    };

    setActiveBookings(prev => [...prev, newBooking]);
  };

  // Cancel booking
  const cancelBooking = id => {
    setActiveBookings(prev =>
      prev.map(booking =>
        booking.id === id ? {...booking, status: 'Canceled'} : booking,
      ),
    );
  };

  // Start work progress
  const startWork = id => {
    setActiveBookings(prev =>
      prev.map(booking => {
        if (booking.id === id) {
          return {
            ...booking,
            status: 'Ongoing',
            startTime: Date.now(),
            progress: 0,
          };
        }
        return booking;
      }),
    );

    const interval = setInterval(() => {
      setActiveBookings(prev => {
        const updatedBookings = prev.map(booking => {
          if (booking.id === id) {
            if (booking.progress < 100) {
              return {...booking, progress: booking.progress + 1};
            }
            if (booking.progress >= 100) {
              clearInterval(interval);
              const completedBooking = {...booking, status: 'Completed'};
              setHistoryBookings(prevHistory => [
                ...prevHistory,
                completedBooking,
              ]);
              return completedBooking;
            }
          }
          return booking;
        });
        return updatedBookings.filter(b => b.status !== 'Completed');
      });
    }, 600); // 1% every 600ms = 1 minute total
  };

  // Auto-remove cancel button after 5 minutes
  useEffect(() => {
    const cancelTimers = activeBookings
      .filter(booking => booking.status === 'Confirmed' && booking.cancelable)
      .map(booking => {
        return setTimeout(() => {
          setActiveBookings(prev =>
            prev.map(b =>
              b.id === booking.id ? {...b, cancelable: false} : b,
            ),
          );
        }, 15000); // 5 minutes (300000ms)
      });

    return () => cancelTimers.forEach(timer => clearTimeout(timer));
  }, [activeBookings]);

  const BookingCard = ({data}) => {
    const isBookingDatePassed = true;
    // Date.now() >= data.bookingTimestamp;
    const bookingDate = new Date(data.bookingTimestamp).toLocaleDateString(
      'en-GB',
    );

    return (
      <View style={styles.cardContainer}>
        <View style={styles.row}>
          <Image source={{uri: data.profilePic}} style={styles.profilePic} />
          <View style={styles.detailsContainer}>
            <Text style={styles.laborName}>{data.laborName}</Text>
            <Text style={styles.serviceType}>{data.serviceType}</Text>
            <Text style={styles.infoText}>
              {bookingDate} | {data.bookingTime}
            </Text>
            <Text style={styles.infoText}>{data.location}</Text>
          </View>
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor:
                  data.status === 'Confirmed'
                    ? '#4CAF50'
                    : data.status === 'Ongoing'
                    ? '#FFC107'
                    : data.status === 'Completed'
                    ? '#2196F3'
                    : '#9E9E9E',
              },
            ]}>
            <Text style={styles.statusText}>{data.status}</Text>
          </View>
        </View>

        {data.status === 'Ongoing' && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${data.progress}%`,
                    backgroundColor:
                      data.progress === 100 ? '#4CAF50' : '#FFC107',
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{data.progress}% completed</Text>
          </View>
        )}

        {data.status === 'Confirmed' && data.cancelable && (
          <TouchableOpacity
            onPress={() => cancelBooking(data.id)}
            style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
        )}

        {data.status === 'Confirmed' &&
          !data.cancelable &&
          isBookingDatePassed && (
            <TouchableOpacity
              onPress={() => startWork(data.id)}
              style={styles.startWorkButton}>
              <Text style={styles.startWorkButtonText}>Start Work</Text>
            </TouchableOpacity>
          )}
      </View>
    );
  };

  // Control buttons for simulation
  const SimulationControls = () => (
    <View style={styles.controlButtons}>
      <TouchableOpacity
        style={styles.simulateButton}
        onPress={() => addNewBooking(1)}>
        <Text style={styles.buttonText}>Book for Tomorrow</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.simulateButton}
        onPress={() => {
          const newDate = new Date(simulatedDate);
          newDate.setDate(newDate.getDate() + 1);
          setSimulatedDate(newDate.getTime());
        }}>
        <Text style={styles.buttonText}>Simulate Next Day</Text>
      </TouchableOpacity>
    </View>
  );

  const FirstRoute = () => (
    <>
      <SimulationControls />
      <FlatList
        data={activeBookings.filter(b => b.status !== 'Completed')}
        keyExtractor={item => item.id}
        renderItem={({item}) => <BookingCard data={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </>
  );

  const SecondRoute = () => (
    <FlatList
      data={historyBookings}
      keyExtractor={item => item.id}
      renderItem={({item}) => <BookingCard data={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );

  const routes = [
    {key: 'first', title: 'Active Bookings'},
    {key: 'second', title: 'History'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TabViewComp
        routes={routes}
        scenes={{first: FirstRoute, second: SecondRoute}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: theme.color.white},
  listContainer: {padding: getResWidth(3)},
  cardContainer: {
    backgroundColor: theme.color.white,
    borderRadius: getResWidth(2),
    padding: getResWidth(4),
    marginBottom: getResHeight(2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  profilePic: {
    width: getResWidth(12),
    height: getResWidth(12),
    borderRadius: getResWidth(6),
  },
  detailsContainer: {marginLeft: getResWidth(4), flex: 1},
  laborName: {
    fontSize: getFontSize(2),
    fontFamily: theme.font.bold,
    color: theme.color.black,
  },
  serviceType: {fontSize: getFontSize(1.6), color: theme.color.gray},
  infoText: {
    fontSize: getFontSize(1.4),
    color: theme.color.darkGray,
    marginTop: getResHeight(0.5),
  },
  statusContainer: {
    paddingVertical: getResHeight(0.5),
    paddingHorizontal: getResWidth(2),
    borderRadius: getResWidth(2),
  },
  statusText: {
    color: theme.color.white,
    fontSize: getFontSize(1.5),
    fontFamily: theme.font.bold,
  },
  progressContainer: {marginTop: getResHeight(1)},
  progressBarBackground: {
    height: getResHeight(1.5),
    backgroundColor: '#F5F5F5', // Light gray background
    borderRadius: getResWidth(1),
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: getResWidth(1),
  },
  progressText: {
    marginTop: getResHeight(1),
    fontSize: getFontSize(1.4),
    textAlign: 'center',
    color: theme.color.darkGray,
  },
  cancelButton: {
    backgroundColor: '#FF5722',
    padding: getResHeight(1.5),
    borderRadius: getResWidth(2),
    alignItems: 'center',
    marginTop: getResHeight(1),
  },
  cancelButtonText: {
    color: theme.color.white,
    fontSize: getFontSize(1.6),
    fontFamily: theme.font.bold,
  },
  startWorkButton: {
    backgroundColor: '#4CAF50',
    padding: getResHeight(1.5),
    borderRadius: getResWidth(2),
    alignItems: 'center',
    marginTop: getResHeight(1),
  },
  startWorkButtonText: {
    color: theme.color.white,
    fontSize: getFontSize(1.6),
    fontFamily: theme.font.bold,
  },
  controlButtons: {
    padding: getResWidth(3),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  simulateButton: {
    backgroundColor: '#3F51B5',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BookedHistory;
