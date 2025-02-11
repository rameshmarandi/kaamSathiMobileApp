import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import {VectorIcon} from '../../../Components/VectorIcon';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import theme from '../../../utility/theme';
import {useSelector} from 'react-redux';
import EmployeeReview from './EmployeeReview';
import {BlurView} from '@react-native-community/blur';

const worker = {
  id: 1,
  name: 'Amit Kumar',
  skill: 'Electrician',
  location: 'Delhi',
  experience: 5,
  rating: 4.7,
  reviews: [
    {
      id: 1,
      name: 'Rahul Sharma',
      profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 5,
      comment: 'Great electrician! Fixed all my wiring issues in no time.',
    },
    {
      id: 2,
      name: 'Priya Verma',
      profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 4,
      comment: 'Good service, but took a little longer than expected.',
    },
    {
      id: 3,
      name: 'Vikram Singh',
      profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
      rating: 5,
      comment: 'Very professional and skilled. Highly recommended!',
    },
    {
      id: 4,
      name: 'Anjali Mehta',
      profilePic: 'https://randomuser.me/api/portraits/women/4.jpg',
      rating: 4.5,
      comment:
        'Amit is very knowledgeable and efficient. Did a great job with my new switchboard.',
    },
    {
      id: 5,
      name: 'Suresh Gupta',
      profilePic: 'https://randomuser.me/api/portraits/men/5.jpg',
      rating: 3.5,
      comment:
        'Work was good, but he arrived late. Communication could be better.',
    },
    {
      id: 6,
      name: 'Neha Kapoor',
      profilePic: 'https://randomuser.me/api/portraits/women/6.jpg',
      rating: 5,
      comment:
        'Excellent service! Very polite and professional. Will definitely hire again.',
    },
    {
      id: 7,
      name: 'Ravi Dubey',
      profilePic: 'https://randomuser.me/api/portraits/men/7.jpg',
      rating: 4.8,
      comment: 'Fixed my inverter wiring quickly. Knows his work well!',
    },
    {
      id: 8,
      name: 'Pooja Tiwari',
      profilePic: 'https://randomuser.me/api/portraits/women/8.jpg',
      rating: 4.2,
      comment: 'Did a neat job, but the pricing was slightly high.',
    },
    {
      id: 9,
      name: 'Arun Mishra',
      profilePic: 'https://randomuser.me/api/portraits/men/9.jpg',
      rating: 4.9,
      comment:
        'Best electrician I have hired so far! Really impressed with his expertise.',
    },
    {
      id: 10,
      name: 'Megha Choudhary',
      profilePic: 'https://randomuser.me/api/portraits/women/10.jpg',
      rating: 4.6,
      comment: 'Very patient and skilled. Fixed all issues without any hassle.',
    },
  ],
};

const EmployeeProfileDetails = props => {
  const {route, navigation} = props;
  // const {worker} = route.params; // Pass worker data via navigation
  let {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.color.white,
        }}>
        <CustomHeader
          backPress={() => navigation.goBack()}
          screenTitle={`User profile`}
          // filterIcon={() => {}}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          style={
            {
              // paddingBottom: getResHeight(310),
            }
          }>
          <View style={styles.profileCard}>
            <View
              style={{
                alignItems: 'center',
                marginBottom: getResHeight(0.5),
              }}>
              <Image
                source={{
                  uri: 'https://t4.ftcdn.net/jpg/02/20/30/97/360_F_220309764_saqqOIGaPKdnjmQacHmNkDOezY0uyOFg.jpg',
                }}
                style={styles.profileImage}
              />
              {/* <Image source={{uri: worker.image}} style={styles.profileImage} /> */}
              <Text style={styles.name}>Ramesh Marandi</Text>
            </View>

            {[
              {label: 'Languages', value: 'Hindi, English, Bengali'},
              {label: 'Distance', value: '10 KM'},
              {label: 'Skills', value: 'Electrician, Plumber, Carpenter'},
              {label: 'Location', value: 'Rajpur'},
              {label: 'Experience', value: '5 Years'},
              {label: 'Rating', value: '⭐ 4.5 /5.0'},
            ].map((detail, idx) => (
              <View key={idx} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{`${detail.label} :`}</Text>
                <Text style={styles.detailValue}>{detail.value}</Text>
              </View>
            ))}
          </View>

          {/* second card */}

          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>About</Text>

            <Text style={styles.aboutText}>
              {worker.about ||
                `I am a skilled and experienced painter with a strong passion for transforming spaces through high-quality painting and finishing work. With 10 years in the industry, I specialize in both residential and commercial painting, delivering exceptional craftsmanship, attention to detail, and durable finishes. From surface preparation to the final coat, I take pride in ensuring every project meets the highest standards of quality and client satisfaction. Whether it's interior or exterior painting, I am committed to using the best materials and techniques to achieve a flawless result. Let’s bring color and life to your space!`}
            </Text>
          </View>
          {/* COntact details */}
          <ContactInfo />
          {/* <View
            style={[
              styles.detailsSection,
              {
                marginBottom: 60,
              },
            ]}>
            <Text style={styles.sectionTitle}>User Reviews</Text>
            <FlatList
              data={worker.reviews}
              keyExtractor={item => item.id.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={styles.reviewCard}>
                  <Image
                    source={{uri: item.profilePic}}
                    style={styles.reviewerImage}
                  />
                  <Text style={styles.reviewerName}>{item.name}</Text>
                  <Text style={styles.reviewRating}>⭐ {item.rating} / 5</Text>
                  <Text style={styles.reviewComment} numberOfLines={2}>
                    "{item.comment}"
                  </Text>
                </View>
              )}
            />
          </View> */}

          <EmployeeReview reviews={worker.reviews || []} />
        </ScrollView>
        <View
          style={{
            width: '100%',
            paddingBottom: getResHeight(3),

            backgroundColor: theme.color.white,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: getResWidth(90),
              alignSelf: 'center',

              backgroundColor: theme.color.secondary,
              borderRadius: 100,

              paddingVertical: getResHeight(1),

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.hireButtonText,
                {
                  color: theme.color.charcolBlack,
                },
              ]}>
              Hire Now
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const ContactInfo = () => {
  return (
    <View style={styles.detailsSection}>
      {/* Unblurred Title */}
      <Text style={styles.sectionTitle}>Contact Details</Text>

      {/* Blurred Container */}
      <View style={styles.blurContainer}>
        {/* Blur Overlay */}
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={25}
          overlayColor="transparent"
          reducedTransparencyFallbackColor="rgba(255,255,255,0.7)"
        />
        {/* Content */}
        <View style={styles.contentWrapper}>
          {/* Phone Row */}
          <View style={styles.contactRow}>
            <VectorIcon
              type="Ionicons"
              name="call"
              size={getFontSize(3)}
              color={theme.color.charcolBlack}
            />
            <Text style={styles.contactText}>+91 7887706698</Text>
          </View>

          {/* Email Row */}
          <View style={styles.contactRow}>
            <VectorIcon
              type="MaterialCommunityIcons"
              name="email"
              size={getFontSize(3)}
              color={theme.color.charcolBlack}
            />
            <Text style={styles.contactText}>ramesh.marandi@gmail.com</Text>
          </View>
        </View>

        {/* Lock Icon */}
        {/* <VectorIcon
          type="Ionicons"
          name="lock-closed"
          size={getFontSize(2.8)}
          color={theme.color.charcolBlack}
          style={styles.lockIcon}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //
  detailsSection: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: getFontSize(4),
    fontWeight: 'bold',
    marginBottom: 12,
    color: theme.color.charcolBlack,
  },
  blurContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fallback for Android
    padding: 16,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  contactText: {
    fontSize: getFontSize(2.8),
    color: theme.color.charcolBlack,
    marginLeft: 12,
  },
  lockIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: 'rgba(223, 0, 0, 0.3)',
    padding: 4,
    borderRadius: 20,
  },
  //
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    // paddingBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: getResWidth(3),
    marginVertical: getResHeight(0.5),
  },
  detailLabel: {
    fontSize: getFontSize(1.7),
    fontFamily: theme.font.semiBold,
    color: theme.color.charcolBlack,
  },
  detailValue: {
    fontSize: getFontSize(1.5),
    fontFamily: theme.font.medium,
    color: theme.color.charcolBlack,
    marginLeft: getResWidth(1),
  },
  profileCard: {
    backgroundColor: '#fff',
    width: getResWidth(90),

    padding: getResWidth(4),
    borderRadius: getResHeight(1),
    elevation: 5,
    marginTop: getResHeight(2),
  },
  profileImage: {
    width: getResHeight(17),
    height: getResHeight(17),
    borderRadius: getResHeight(100),
    marginBottom: getResHeight(1.3),
  },
  name: {
    fontSize: getFontSize(1.9),
    fontFamily: theme.font.extraBold,
    letterSpacing: 1,
    color: theme.color.charcolBlack,
  },
  skill: {
    fontSize: getFontSize(1.7),
    fontFamily: theme.font.medium,
    color: 'gray',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  experience: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: '#FFA500',
    marginBottom: 10,
  },
  detailsSection: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: getFontSize(1.9),
    fontFamily: theme.font.semiBold,
    color: theme.color.charcolBlack,
    marginBottom: 8,
  },
  aboutText: {
    fontSize: getFontSize(1.7),
    fontFamily: theme.font.medium,
    color: 'gray',
    marginBottom: 15,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    fontSize: getFontSize(1.6),
    fontFamily: theme.font.medium,
    color: theme.color.charcolBlack,
    marginLeft: 10,
  },

  hireButtonText: {
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: getFontSize(1.8),
    fontFamily: theme.font.medium,
  },

  // User Review sections
});

export default EmployeeProfileDetails;
