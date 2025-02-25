import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
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

import CustomButton from '../../../Components/CustomButton';
import {HireNowDetailsModal} from '../../../Components/ModalsComponent';

const EmployeeProfileDetails = ({navigation, route}) => {
  const {isDarkMode} = useSelector(state => state.user);
  // const {worker} = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedDistance, setSelectedDistance] = useState({
    id: 0,
    distance: '1 km',
  });

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
        comment:
          'Very patient and skilled. Fixed all issues without any hassle.',
      },
    ],
  };
  const ProfileDetailRow = ({label, value}) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{`${label} :`}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const headerHeight = useRef(new Animated.Value(1)).current; // 1: Visible, 0: Hidden

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
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (currentScrollY < lastScrollY.current - 5) {
      // Slight scroll up → Show Header
      Animated.timing(headerHeight, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    lastScrollY.current = currentScrollY;
  };
  return (
    <SafeAreaView style={styles.safeArea}>
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
          screenTitle="User profile"
        />
      </Animated.View>

      <HireNowDetailsModal
        isModalVisible={isModalVisible}
        onBackdropPress={() => {
          setIsModalVisible(false);
        }}
        selectedDistance={selectedDistance}
        handleSelectDistance={item => {
          setSelectedDistance(item);

          props.navigation.navigate('EmployeeFound');
        }}
        onSelectDistance={item => {}}
      />

      <Animated.FlatList
        data={[0, 2, 3, 4, 5, 6]}
        keyExtractor={item => item.toString()} // Ensures unique keys
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: getResHeight(8),
          paddingBottom: getResHeight(10),
        }}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          switch (index) {
            case 0:
              return (
                <>
                  <View style={styles.profileCard}>
                    <View style={styles.profileHeader}>
                      <Image
                        source={{
                          uri: 'https://i3.wp.com/www.thebalancemoney.com/thmb/BTv9xPg48VpnxeRm8qkCkO_Fjwg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1209681524-1fe805ac87ca4fed9e57a20f020733cb.jpg?ssl=1',
                        }}
                        style={styles.profileImage}
                      />
                      <Text style={styles.name}>{worker.name}</Text>
                    </View>

                    {[
                      {label: 'Languages', value: 'Hindi, English, Bengali'},
                      {label: 'Distance', value: '10 KM'},
                      {
                        label: 'Skills',
                        value: 'Electrician, Plumber, Carpenter',
                      },
                      {label: 'Location', value: 'Rajpur'},
                      {label: 'Experience', value: '5 Years'},
                      {label: 'Rating', value: '⭐ 4.5 /5.0'},
                    ].map((detail, idx) => (
                      <ProfileDetailRow key={idx} {...detail} />
                    ))}
                  </View>
                </>
              );
            case 1:
              return (
                <>
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <Text style={styles.aboutText}>
                      {worker.about ||
                        'Passionate carpenter with a decade of experience in crafting high-quality furniture and custom woodwork. Specialized in creating elegant and durable designs tailored to clients'}
                    </Text>
                  </View>
                </>
              );
            case 2:
              return <ContactInfo />;
            case 3:
              return <EmployeeReview reviews={worker.reviews} />;
            default:
              return null; // Ensures no unexpected cases break the UI
          }
        }}
      />
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
       
      </ScrollView> */}

      <CustomButton
        title={'Book now'}
        onPress={() => {
          setIsModalVisible(true);
        }}
        // disabled
        // loading={true}
      />
    </SafeAreaView>
  );
};

const ContactInfo = () => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>Contact Details</Text>
    <View style={styles.contactContainer}>
      <View style={styles.contactRow}>
        <VectorIcon
          type="Ionicons"
          name="call"
          size={getFontSize(2.5)}
          color={theme.color.charcolBlack}
        />
        <Text style={styles.contactText}>+91 7887706698</Text>
      </View>

      <View style={styles.contactRow}>
        <VectorIcon
          type="MaterialCommunityIcons"
          name="email"
          size={getFontSize(2.5)}
          color={theme.color.charcolBlack}
        />
        <Text style={styles.contactText}>ramesh.marandi@gmail.com</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.color.white,
  },
  scrollContent: {
    paddingBottom: getResHeight(2),
  },
  profileCard: {
    backgroundColor: '#fff',
    width: getResWidth(90),
    padding: getResWidth(4),
    borderRadius: getResHeight(1),
    elevation: 5,
    marginTop: getResHeight(2),
    alignSelf: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: getResHeight(0.5),
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
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: getResHeight(0.5),
  },
  detailLabel: {
    fontSize: getFontSize(1.7),
    fontFamily: theme.font.semiBold,
    color: theme.color.charcolBlack,
    minWidth: getResWidth(20),
  },
  detailValue: {
    fontSize: getFontSize(1.5),
    fontFamily: theme.font.medium,
    color: theme.color.charcolBlack,
    marginLeft: getResWidth(1),
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: getResHeight(1),
    padding: getResHeight(2),
    elevation: 3,
    marginTop: getResHeight(2),
    width: '90%',
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: getFontSize(1.9),
    fontFamily: theme.font.semiBold,
    color: theme.color.charcolBlack,
    marginBottom: getResHeight(1),
  },
  aboutText: {
    fontSize: getFontSize(1.7),
    fontFamily: theme.font.medium,
    color: 'gray',
    lineHeight: getFontSize(2.5),
  },
  contactContainer: {
    // borderRadius: 12,
    // padding: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getResHeight(1),
  },
  contactText: {
    fontSize: getFontSize(1.6),
    fontFamily: theme.font.medium,
    color: theme.color.charcolBlack,
    marginLeft: getResWidth(2),
  },
  // footer: {
  //   paddingVertical: getResHeight(1.5),
  //   backgroundColor: theme.color.white,
  // },
  // hireButton: {
  //   width: getResWidth(90),
  //   alignSelf: 'center',
  //   backgroundColor: theme.color.secondary,
  //   borderRadius: getResHeight(1),
  //   paddingVertical: getResHeight(1),
  // },
  // hireButtonText: {
  //   fontSize: getFontSize(1.8),
  //   fontFamily: theme.font.semiBold,
  //   color: theme.color.white,
  //   textAlign: 'center',
  // },
});

export default EmployeeProfileDetails;
