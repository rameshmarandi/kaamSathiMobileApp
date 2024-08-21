import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import UserProfile from './UserProfile'; // Import the UserProfile component

const EventsUserList = props => {
  const {eventsUsersData} = props;
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={eventsUsersData}
        renderItem={({item}) => (
          <UserProfile
            name={item.name}
            date={item.date}
            imageUri={item.imageUri}
          />
        )}
        horizontal // Makes the FlatList horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        // numColumns={2} // Display two profiles per row
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  flatList: {
    justifyContent: 'space-between',
  },
});

export default EventsUserList;
