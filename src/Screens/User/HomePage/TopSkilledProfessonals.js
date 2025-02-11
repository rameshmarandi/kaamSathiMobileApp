import React, {useEffect, useState, memo} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const skilledWorkers = [
  {
    id: 1,
    name: 'Amit Kumar',
    skill: 'Electrician',
    location: 'Delhi',
    experience: 5,
    rating: 4.8,
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Suresh Verma',
    skill: 'Plumber',
    location: 'Mumbai',
    experience: 3,
    rating: 4.5,
    image: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    name: 'Rajesh Singh',
    skill: 'Carpenter',
    location: 'Delhi',
    experience: 7,
    rating: 4.9,
    image: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 4,
    name: 'Pooja Sharma',
    skill: 'Painter',
    location: 'Delhi',
    experience: 4,
    rating: 4.6,
    image: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 5,
    name: 'Deepak Mehta',
    skill: 'Mechanic',
    location: 'Chennai',
    experience: 6,
    rating: 4.3,
    image: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 6,
    name: 'Anjali Chauhan',
    skill: 'Gardener',
    location: 'Delhi',
    experience: 2,
    rating: 4.7,
    image: 'https://i.pravatar.cc/150?img=6',
  },
];

const TopSkilledProfessonals = ({userLocation = 'Delhi'}) => {
  const [topWorkers, setTopWorkers] = useState([]);

  useEffect(() => {
    // Filter top-rated skilled workers based on user location
    const filteredWorkers = skilledWorkers
      .filter(
        worker => worker.location.toLowerCase() === userLocation.toLowerCase(),
      )
      .sort((a, b) => b.rating - a.rating); // Sort by rating (descending)

    setTopWorkers(filteredWorkers);
  }, [userLocation]);

  const renderItem =
    //   memo(

    ({item}) => (
      <TouchableOpacity disabled style={styles.card}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.skill}>{item.skill}</Text>
          <Text style={styles.rating}>
            ⭐ {item.rating} | {item.experience} yrs
          </Text>
        </View>
      </TouchableOpacity>
    );
  // );

  return (
    <View style={styles.container}>
      <FlatList
        data={topWorkers}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 10,
  },
  list: {
    paddingLeft: 10,
  },
  card: {
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  info: {
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  skill: {
    fontSize: 12,
    color: 'gray',
  },
  rating: {
    fontSize: 12,
    marginTop: 4,
    color: '#FFA500',
  },
});

export default TopSkilledProfessonals;
