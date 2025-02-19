import React, {useState, useCallback} from 'react';
import {View, SafeAreaView, FlatList, Text, StyleSheet} from 'react-native';
import theme from '../../utility/theme';

import {EmployeeCard} from '../User/GoogleMap/EmployeeFound';
import {getFontSize, getResWidth} from '../../utility/responsive';
import {HireNowDetailsModal} from '../../Components/ModalsComponent';
import CustomHeader from '../../Components/CustomHeader';

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

  // Handle Bookmark Toggle (Remove from List when Unbookmarked)
  const handleHeartPress = useCallback(id => {
    setBookmarkedItems(
      prevItems =>
        prevItems
          .map(item =>
            item.id === id ? {...item, isBookmarked: !item.isBookmarked} : item,
          )
          .filter(item => item.isBookmarked), // Remove if isBookmarked is false
    );
  }, []);

  // Render Employee Card
  const renderItem = useCallback(
    ({item}) => (
      <EmployeeCard
        id={item.id}
        distance={item.distance}
        isSelected={item.isBookmarked}
        workerDetails={item.workerDetails}
        onHeartPress={() => handleHeartPress(item.id)}
        onHireNowBtnPress={() => {
          setSelectedWorker(item);
          setIsModalVisible(true);
        }}
        viewBtnPress={() =>
          navigation.navigate('EmployeeProfileDetails', {
            worker: item.workerDetails,
          })
        }
      />
    ),
    [bookmarkedItems, handleHeartPress],
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle={`Bookmarks`}
      />
      {/* Hire Now Modal */}
      <HireNowDetailsModal
        isModalVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        selectedWorker={selectedWorker}
      />

      {/* Bookmarked Workers List */}
      <FlatList
        data={bookmarkedItems.filter(item => item.isBookmarked)} // Render only bookmarked employees
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: theme.color.dimBlack,
                  fontFamily: theme.font.medium,
                  fontSize: getFontSize(1.4),
                }}>
                No Bookmarked Workers
              </Text>
            </View>
          </>
        )}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white,
  },
  listContentContainer: {
    paddingTop: '5%',
  },
});

export default BookMarks;
