import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import theme from '../../utility/theme';
import TabViewComp from '../../Components/TabViewComp';
import {VectorIcon} from '../../Components/VectorIcon';
import {ReviewModal} from '../../Components/ModalsComponent';
import {Button} from '../User/GoogleMap/EmployeeFound';

const BookedHistory = props => {
  const {navigation} = props;
  const [activeBookings, setActiveBookings] = useState([]);
  const [historyBookings, setHistoryBookings] = useState([]);
  const [simulatedDate, setSimulatedDate] = useState(Date.now());
  const [isReported, setIsReported] = useState([]);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);

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
    // setActiveBookings(prev =>
    //   prev.map(booking =>
    //     booking.id === id ? {...booking, status: 'Canceled'} : booking,
    //   ),
    // );
    setActiveBookings(prev => {
      const updatedBookings = prev.map(booking =>
        booking.id === id ? {...booking, status: 'Canceled'} : booking,
      );

      const canceledBooking = updatedBookings.find(
        booking => booking.id === id,
      );
      if (canceledBooking) {
        setHistoryBookings(prevHistory => [...prevHistory, canceledBooking]);
      }

      return updatedBookings.filter(booking => booking.id !== id);
    });
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
              return {...booking, progress: booking.progress + 10};
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
        }, 5000); // 5 minutes (300000ms)
      });

    return () => cancelTimers.forEach(timer => clearTimeout(timer));
  }, [activeBookings]);

  const BookingCard = ({data, viewBtnPress, onHireNowBtnPress}) => {
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
                    ? theme.color.primary
                    : data.status === 'Ongoing'
                    ? '#FFC107'
                    : data.status === 'Completed'
                    ? theme.color.primary
                    : '#9E9E9E',
              },
            ]}>
            <Text style={styles.statusText}>{data.status}</Text>
          </View>
        </View>

        {/* Display report and review button if completed? */}
        {data.status === 'Completed' && (
          <View style={styles.reviewContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.quickActionCard}
              onPress={() => {
                Alert.alert(
                  'Report User', // Title
                  isReported.includes(data.id)
                    ? 'Do you want to remove the report for this user?'
                    : 'Do you want to report this user?', // Message
                  [
                    {
                      text: 'No',
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => {
                        setIsReported(
                          prevState =>
                            prevState.includes(data.id)
                              ? prevState.filter(id => id !== data.id) // Remove if already reported
                              : [...prevState, data.id], // Add if not reported
                        );
                      },
                    },
                  ],
                );
              }}>
              <VectorIcon
                type={'Ionicons'}
                name={
                  isReported.includes(data.id) ? 'warning' : 'warning-outline'
                }
                size={getFontSize(2.8)}
                color={theme.color.redBRGA}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setIsReviewModalVisible(true);
              }}
              style={styles.quickActionCard}>
              <VectorIcon
                type={'MaterialIcons'}
                name={'reviews'}
                size={getFontSize(2.8)}
                color={theme.color.dimBlack}
              />
            </TouchableOpacity>
          </View>
        )}
        {/* Display the ongoing progress work */}
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              //
            },
            data.status !== 'Ongoing' && {
              justifyContent: 'flex-end',
            },
          ]}>
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
              <Text style={styles.progressText}>
                {data.progress}% completed
              </Text>
            </View>
          )}

          {data.status !== 'Canceled' && (
            <>
              {data.status !== 'Completed' && (
                <View style={styles.reviewContainer}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.quickActionCard}
                    onPress={() => {
                      const phoneNumber = 'tel:9876543210'; // Replace with dynamic labor number
                      Linking.openURL(phoneNumber);
                    }}>
                    <VectorIcon
                      type={'Feather'}
                      name={'phone-call'}
                      size={getFontSize(2.5)}
                      color={theme.color.dimBlack}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.5}
                    disabled={data.status === 'Confirmed' && data.cancelable}
                    onPress={() => {
                      const latitude = 28.6139; // Replace with dynamic latitude
                      const longitude = 77.209; // Replace with dynamic longitude
                      const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
                      Linking.openURL(googleMapsURL);
                    }}
                    style={[
                      styles.quickActionCard,

                      data.status === 'Confirmed' &&
                        data.cancelable && {
                          backgroundColor: '#e8e3e3',
                        },
                    ]}>
                    <VectorIcon
                      type={'MaterialCommunityIcons'}
                      name={'map-marker-radius'}
                      size={getFontSize(3)}
                      color={theme.color.dimBlack}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>

        {/* Display the hire again & view details button on the complete and canceled state? */}
        {(data.status === 'Completed' || data.status === 'Canceled') && (
          <>
            <View
              style={{
                flexDirection: 'row',
                marginTop: getResHeight(2),
              }}>
              <Button text="View Details" onPress={viewBtnPress} />
              <Button text="Hire Again" onPress={onHireNowBtnPress} isPrimary />
            </View>
          </>
        )}
        {data.status === 'Confirmed' && data.cancelable && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              Alert.alert(
                'Cancel Booking',
                'Are you sure you want to cancel this booking?',
                [
                  {
                    text: 'No',
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: () => cancelBooking(data.id),
                  },
                ],
              );
            }}
            style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
        )}

        {data.status === 'Confirmed' &&
          !data.cancelable &&
          isBookingDatePassed && (
            <TouchableOpacity
              activeOpacity={0.5}
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
        activeOpacity={0.5}
        style={styles.simulateButton}
        onPress={() => addNewBooking(1)}>
        <Text style={styles.buttonText}>Book for Tomorrow</Text>
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
        ListEmptyComponent={() => {
          return (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.noBookings}>No booking found!</Text>
              </View>
            </>
          );
        }}
      />
    </>
  );

  const SecondRoute = () => (
    <FlatList
      data={historyBookings}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <BookingCard
          data={item}
          onHireNowBtnPress={() => {
            addNewBooking();
          }}
          viewBtnPress={() => navigation.navigate('EmployeeProfileDetails')}
        />
      )}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={() => {
        return (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.noBookings}>No booking history found!</Text>
            </View>
          </>
        );
      }}
    />
  );

  const routes = [
    {key: 'first', title: 'My Bookings'},
    {key: 'second', title: 'History'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ReviewModal
        isModalVisible={isReviewModalVisible}
        onBackdropPress={() => setIsReviewModalVisible(false)}

        // selectedWorker={selectedWorker}
      />
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

    marginHorizontal: getResWidth(2),
    marginBottom: getResHeight(1.5),
    elevation: 4, // For subtle shadow on Android
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noBookings: {
    color: theme.color.dimBlack,
    fontFamily: theme.font.semiBold,
    fontSize: getFontSize(1.3),
  },
  quickActionCard: {
    height: getResHeight(5),
    width: getResHeight(5),
    borderColor: theme.color.dimGrey,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getResHeight(1),
    marginLeft: getResWidth(2),
  },
  reviewContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: getResHeight(1.5),
    //
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  profilePic: {
    width: getResWidth(12),
    height: getResWidth(12),
    borderRadius: getResWidth(6),
  },
  detailsContainer: {marginLeft: getResWidth(4), flex: 1},
  laborName: {
    fontSize: getFontSize(1.5),
    fontFamily: theme.font.bold,
    color: theme.color.black,
  },
  serviceType: {fontSize: getFontSize(1.5), color: theme.color.gray},
  infoText: {
    fontSize: getFontSize(1.5),
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
    fontSize: getFontSize(1.2),
    fontFamily: theme.font.medium,
  },
  progressContainer: {width: getResWidth(60)},
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
    fontFamily: theme.font.medium,
    color: theme.color.dimBlack,
  },
  cancelButton: {
    backgroundColor: '#FF5722',

    borderRadius: getResWidth(2),
    alignItems: 'center',
    marginTop: getResHeight(1),
    paddingVertical: getResHeight(1),
    color: theme.color.white,
    fontSize: getFontSize(1.4),
    fontFamily: theme.font.medium,
  },
  cancelButtonText: {
    color: theme.color.white,
    fontSize: getFontSize(1.4),
    fontFamily: theme.font.medium,
  },
  startWorkButton: {
    backgroundColor: '#4CAF50',
    // padding: getResHeight(1.5),
    paddingVertical: getResHeight(1),
    borderRadius: getResWidth(2),
    alignItems: 'center',
    marginTop: getResHeight(1),
  },
  startWorkButtonText: {
    color: theme.color.white,
    fontSize: getFontSize(1.4),
    fontFamily: theme.font.medium,
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
    fontFamily: theme.color.medium,
    fontSize: getFontSize(1.6),
  },
});

export default BookedHistory;
