import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import theme from '../../utility/theme';

import {EmployeeCard} from '../User/GoogleMap/EmployeeFound';
import {getFontSize, getResWidth} from '../../utility/responsive';
import {HireNowDetailsModal} from '../../Components/ModalsComponent';
import CustomHeader from '../../Components/CustomHeader';
import NoDataFound from '../../Components/NoDataFound';
import {useFocusEffect} from '@react-navigation/native';
import {store} from '../../redux/store';
import {setCurrentActiveTab} from '../../redux/reducer/Auth';
import {initiatePayment} from '../../Components/PaymentHandler';

// Static Data with isBookmarked flag
const employees = [
  {
    id: 1,
    distance: '2 km',
    isBookmarked: true,
    workerDetails: {name: 'John Doe', skill: 'Carpenter'},
  },
  {
    id: 2,
    distance: '5 km',
    isBookmarked: true,
    workerDetails: {name: 'Alice Smith', skill: 'Plumber'},
  },
  {
    id: 3,
    distance: '10 km',
    isBookmarked: true,
    workerDetails: {name: 'Bob Williams', skill: 'Electrician'},
  },
  {
    id: 4,
    distance: '15 km',
    isBookmarked: true,
    workerDetails: {name: 'Emma Brown', skill: 'Painter'},
  },
  {
    id: 5,
    distance: '20 km',
    isBookmarked: true,
    workerDetails: {name: 'David Wilson', skill: 'Welder'},
  },
  {
    id: 6,
    distance: '25 km',
    isBookmarked: true,
    workerDetails: {name: 'Sophia Martinez', skill: 'Mechanic'},
  },
  {
    id: 7,
    distance: '30 km',
    isBookmarked: true,
    workerDetails: {name: 'Michael Johnson', skill: 'Technician'},
  },
  {
    id: 8,
    distance: '35 km',
    isBookmarked: true,
    workerDetails: {name: 'Olivia Taylor', skill: 'Plasterer'},
  },
  {
    id: 9,
    distance: '40 km',
    isBookmarked: true,
    workerDetails: {name: 'James Anderson', skill: 'Mason'},
  },
  {
    id: 10,
    distance: '45 km',
    isBookmarked: true,
    workerDetails: {name: 'Emily Thomas', skill: 'Roofer'},
  },
];

const BookMarks = ({navigation}) => {
  const [bookmarkedItems, setBookmarkedItems] = useState(employees);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const headerHeight = useRef(new Animated.Value(1)).current; // 1: Visible, 0: Hidden

  const flatListRef = useRef(null);

  // Scroll to top when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      store.dispatch(setCurrentActiveTab(2));
      Animated.timing(headerHeight, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({animated: true, offset: 0});
      }
    }, []),
  );

  // Handle Bookmark Toggle (Remove from List when Unbookmarked)
  const handleHeartPress = id => {
    setBookmarkedItems(prevItems =>
      prevItems
        .map(item =>
          item.id === id ? {...item, isBookmarked: !item.isBookmarked} : item,
        )
        .filter(item => item.isBookmarked),
    );
  };

  // Handle Scroll Event
  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false},
  );

  // Detect Scroll Direction
  const handleMomentumScrollEnd = event => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (currentScrollY > lastScrollY.current + 10) {
      // Scrolling down → Hide Header
      Animated.timing(headerHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else if (currentScrollY < lastScrollY.current - 5) {
      // Slight scroll up → Show Header
      Animated.timing(headerHeight, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    lastScrollY.current = currentScrollY;
  };
  const handlePaymentGateway = values => {
    try {
      // setIsPayBtnLoading(true);
      // setTimeout(() => {
      // bottomSheetRef.current?.close();
      initiatePayment(
        '100',
        {},
        async data => {
          // console.log('Payment_Success_front', data);
          if (data?.razorpay_payment_id) {
            // const res = await store.dispatch(
            //   createTransactionAPIHandler({
            //     amount: values.amount,
            //     transactionID: data?.razorpay_payment_id,
            //     donationMessage: 'Church offering',
            //     paymentStatus: 'success',
            //   }),
            // );
          }
        },
        async data => {
          console.error('API_FES', data);
        },
      );
      // setIsPayBtnLoading(false);
      // }, 300);
    } catch (error) {
      console.error('Initialite_payment_error', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Header */}
      <Animated.View
        style={[
          styles.headerContainer,
          {
            transform: [
              {
                translateY: headerHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-60, 0],
                }),
              },
            ],
          },
        ]}>
        <CustomHeader
          backPress={() => navigation.goBack()}
          screenTitle="Bookmarks"
        />
      </Animated.View>

      {/* Hire Now Modal */}
      <HireNowDetailsModal
        isModalVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        selectedWorker={selectedWorker}
      />

      {/* Bookmarked Workers List */}
      <Animated.FlatList
        ref={flatListRef}
        data={bookmarkedItems.filter(item => item.isBookmarked)}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <EmployeeCard
            id={item.id}
            distance={item.distance}
            isSelected={item.isBookmarked}
            workerDetails={item.workerDetails}
            onHeartPress={() => handleHeartPress(item.id)}
            onHireNowBtnPress={() => {
              handlePaymentGateway();
              // setSelectedWorker(item);
              // setIsModalVisible(true);
            }}
            viewBtnPress={() =>
              navigation.navigate('EmployeeProfileDetails', {
                worker: item.workerDetails,
              })
            }
          />
        )}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <NoDataFound />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.whiteBg,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  listContentContainer: {
    paddingTop: 70, // Ensure the list starts below the header
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: theme.color.dimBlack,
    fontFamily: theme.font.medium,
    fontSize: getFontSize(1.4),
  },
});

export default BookMarks;
