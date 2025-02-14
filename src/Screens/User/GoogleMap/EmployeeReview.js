import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {VectorIcon} from '../../../Components/VectorIcon';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import theme from '../../../utility/theme';

const EmployeeReview = ({reviews}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedReview, setExpandedReview] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;

  const slideReview = (index, direction) => {
    Animated.timing(translateX, {
      toValue: direction === 'left' ? getResWidth(-100) : getResWidth(100),
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(index);
      setExpandedReview(false);
      translateX.setValue(
        direction === 'left' ? getResWidth(100) : getResWidth(-100),
      );
      Animated.timing(translateX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  const currentReview = reviews[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text
          style={[
            styles.sectionTitle,
            {
              position: 'absolute',
              top: getResHeight(2),
              left: getResWidth(5),
            },
          ]}>
          User Reviews
        </Text>
        {/* Previous Button */}
        <TouchableOpacity
          style={[
            styles.arrowButton,
            {left: 10, opacity: currentIndex === 0 ? 0.5 : 1},
          ]}
          onPress={() =>
            currentIndex > 0 && slideReview(currentIndex - 1, 'left')
          }
          disabled={currentIndex === 0}>
          <VectorIcon
            type="MaterialIcons"
            name={'chevron-left'}
            size={getFontSize(3)}
            color={theme.color.white}
          />
        </TouchableOpacity>

        {/* Review Content */}
        <Animated.View
          style={[styles.contentContainer, {transform: [{translateX}]}]}>
          <Image
            source={{uri: currentReview.profilePic}}
            style={styles.reviewerImage}
          />
          <Text style={styles.reviewerName}>{currentReview.name}</Text>
          <Text style={styles.reviewRating}>⭐ {currentReview.rating} / 5</Text>
          <Text
            style={styles.reviewComment}
            numberOfLines={expandedReview ? null : 2}>
            "{currentReview.comment}"
          </Text>
          {currentReview.comment.length > 50 && (
            <TouchableOpacity
              onPress={() => setExpandedReview(!expandedReview)}>
              <Text style={styles.readMoreText}>
                {expandedReview ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Next Button */}
        <TouchableOpacity
          style={[
            styles.arrowButton,
            {right: 10, opacity: currentIndex === reviews.length - 1 ? 0.5 : 1},
          ]}
          onPress={() =>
            currentIndex < reviews.length - 1 &&
            slideReview(currentIndex + 1, 'right')
          }
          disabled={currentIndex === reviews.length - 1}>
          <VectorIcon
            type="MaterialIcons"
            name={'chevron-right'}
            size={getFontSize(3)}
            color={theme.color.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: getFontSize(1.9),
    fontFamily: theme.font.semiBold,
    color: theme.color.charcolBlack,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    alignItems: 'center',
    position: 'relative',
    height: 280,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  contentContainer: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
  },
  reviewerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  reviewerName: {
    fontSize: getFontSize(1.8),
    fontWeight: 'bold',
  },
  reviewRating: {
    fontSize: getFontSize(1.6),
    color: '#FFA500',
    marginBottom: 5,
  },
  reviewComment: {
    fontSize: getFontSize(1.6),
    color: 'gray',
    textAlign: 'center',
  },
  readMoreText: {
    color: '#007BFF',
    fontSize: getFontSize(1.6),
    fontWeight: 'bold',
    marginTop: 5,
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    backgroundColor: theme.color.secondary,
    borderRadius: 20,
    padding: 8,
    transform: [{translateY: -15}],
    zIndex: 99,
  },
});

export default EmployeeReview;
