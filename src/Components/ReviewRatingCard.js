import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import {VectorIcon} from './VectorIcon';

const {width} = Dimensions.get('window');

const reviews = [
  {
    id: '1',
    profileImage:
      'https://img.mensxp.com/media/content/2021/Mar/Models-Setting-Grooming-Goals-For-Men-14_605859946e40a.jpeg?w=720&h=1280&cc=1',
    title: 'Ramesh Marandi',
    description:
      'Amazing experience! The service was excellent and the product exceeded expectations.',
    rating: 5,
  },
  {
    id: '2',
    profileImage:
      'https://www.gngmodels.com/wp-content/uploads/2023/12/indian-male-models-9-682x1024.jpg',
    title: 'Dhyanchan Soren',
    description:
      'Good quality but the delivery was a bit delayed. Overall, satisfied with the purchase.',
    rating: 4,
  },
  {
    id: '3',
    profileImage:
      'https://i.etsystatic.com/20525733/r/il/2be8fb/4983658333/il_570xN.4983658333_glmn.jpg',
    title: 'Rajesh',
    description: 'Not satisfied. The product did not match the description.',
    rating: 2,
  },
  // Add more reviews here
];

const RatingStars = ({rating}) => {
  return (
    <View style={styles.ratingContainer}>
      {Array.from({length: 5}).map((_, index) => (
        <VectorIcon
          type={'FontAwesome'}
          key={index}
          name={index < rating ? 'star' : 'star-o'}
          size={16}
          color={index < rating ? '#FFD700' : '#d3d3d3'}
        />
      ))}
    </View>
  );
};

const ReviewCard = ({item}) => {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.profileImage,
        }}
        style={styles.profileImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>
        <RatingStars rating={item.rating} />
      </View>
    </View>
  );
};

const ReviewRatingCard = () => {
  return (
    <FlatList
      data={reviews}
      renderItem={({item}) => <ReviewCard item={item} />}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 240,
    marginRight: 16,
    width: width * 0.75,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ReviewRatingCard;
