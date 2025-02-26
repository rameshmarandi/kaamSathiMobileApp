import React, {useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  SafeAreaView,
} from 'react-native';
import {VectorIcon} from '../../../Components/VectorIcon';
import CustomHeader from '../../../Components/CustomHeader';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import theme from '../../../utility/theme';
import MsgConfig from '../../../Config/MsgConfig';
import {HireNowDetailsModal} from '../../../Components/ModalsComponent';

const distances = [
  ...Array.from({length: 15}, (_, index) => `${index + 1} km`),
  ...Array.from({length: 17}, (_, index) => `${(index + 4) * 5} km`),
];

export const Button = ({text, onPress, isPrimary}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[
      styles.button,
      isPrimary ? styles.primaryButton : styles.secondaryButton,
    ]}>
    <Text style={[styles.buttonText, isPrimary && styles.primaryButtonText]}>
      {text}
    </Text>
  </TouchableOpacity>
);

export const EmployeeCard = React.memo(
  ({
    item,
    viewBtnPress,
    onHireNowBtnPress,
    index,
    isSelected,
    onHeartPress,
  }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleHeartPress = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
      onHeartPress(index);
    };

    return (
      <View style={[styles.card, index === 0 && styles.firstCard]}>
        <View style={styles.cardContent}>
          <View
            style={{
              position: 'relative',
            }}>
            <Image
              source={{
                uri: 'https://www.gngmodels.com/wp-content/uploads/2023/12/indian-male-models-11-682x1024.jpg',
              }}
              style={[
                styles.profileImage,
                {
                  position: 'relative',
                },
              ]}
            />
            <View
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: getResHeight(0.2), // Adjusted for responsiveness
                right: getResWidth(1.5), // Adjusted for responsiveness
                height: getResHeight(4),
                width: getResHeight(4),
                borderRadius: getResHeight(2), // Ensures circular shape
                backgroundColor: 'white',
                borderColor: theme.color.primary,
                borderWidth: 2,
              }}>
              <VectorIcon
                type="MaterialIcons"
                name={'verified'}
                size={getFontSize(2.4)}
                color={theme.color.primary}
              />
            </View>
          </View>
          <View style={styles.detailsContainer}>
            {[
              {label: 'Name', value: 'Ramesh Marandi'},
              {label: 'Languages', value: 'Hindi, English, Bengali'},
              {label: 'Distance', value: item},
              {
                label: 'Skills',
                value: 'Electrician, Plumber',
              },
              {label: 'Rating', value: '4.5'},
            ].map((detail, idx) => (
              <View key={idx} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{`${detail.label}:`}</Text>
                <Text style={styles.detailValue}>{detail.value}</Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity
          onPress={handleHeartPress}
          style={styles.heartIconContainer}>
          <Animated.View style={{transform: [{scale: scaleAnim}]}}>
            <VectorIcon
              type="MaterialCommunityIcons"
              name={isSelected ? 'heart' : 'cards-heart-outline'}
              size={getFontSize(3)}
              color={isSelected ? 'red' : theme.color.charcolBlack}
            />
          </Animated.View>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button text="View Details" onPress={viewBtnPress} />
          <Button text="Hire Now" onPress={onHireNowBtnPress} isPrimary />
        </View>
      </View>
    );
  },
);

const EmployeeFound = ({navigation}) => {
  const [selectedHearts, setSelectedHearts] = useState([]);

  const handleHeartPress = useCallback(index => {
    setSelectedHearts(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
    );
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedDistance, setSelectedDistance] = useState({
    id: 0,
    distance: '1 km',
  });

  // Handle Scroll Event
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const headerHeight = useRef(new Animated.Value(1)).current; // 1: Visible, 0: Hidden

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

  const renderItem = useCallback(
    ({item, index}) => (
      <EmployeeCard
        item={item}
        index={index}
        isSelected={selectedHearts.includes(index)}
        onHeartPress={handleHeartPress}
        onHireNowBtnPress={() => {
          setIsModalVisible(true);
        }}
        viewBtnPress={() =>
          navigation.navigate('EmployeeProfileDetails', {worker: item})
        }
      />
    ),
    [selectedHearts, handleHeartPress],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          {position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10},
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
          screenTitle={`10 electrician ${MsgConfig.searchLabour}`}
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
        data={distances}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: getResHeight(8),
          paddingBottom: getResHeight(10),
        }}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.whiteBg,
  },
  card: {
    width: getResWidth(90),
    alignSelf: 'center',
    backgroundColor: theme.color.white,
    borderRadius: getResWidth(3),
    padding: getResWidth(4),
    marginBottom: getResHeight(1.8),
    elevation: 4, // For subtle shadow on Android
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  firstCard: {marginTop: '4%'},
  cardContent: {
    flexDirection: 'row',
    marginTop: getResHeight(1.8),
    // alignItems: 'center',
  },
  profileImage: {
    height: getResHeight(14),
    width: getResHeight(14),
    borderRadius: getResHeight(7),
    borderWidth: 3,
    borderColor: theme.color.primary,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: getResWidth(3),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: getResHeight(0.2),
  },
  detailLabel: {
    width: getResWidth(20.5),
    fontSize: getFontSize(1.2),
    fontFamily: theme.font.semiBold,
    color: theme.color.charcolBlack,
  },
  detailValue: {
    flex: 1,
    fontSize: getFontSize(1.2),
    fontFamily: theme.font.medium,
    color: theme.color.charcolBlack,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getResHeight(2.5),
  },
  button: {
    flex: 1,
    paddingVertical: getResHeight(1),
    borderRadius: getResWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: getResWidth(1),
  },
  primaryButton: {
    backgroundColor: theme.color.secondary,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: theme.color.secondary,
    backgroundColor: theme.color.white,
  },
  buttonText: {
    fontSize: getFontSize(1.3),
    fontFamily: theme.font.semiBold,
    textAlign: 'center',
    color: theme.color.charcolBlack,
  },
  primaryButtonText: {
    color: theme.color.white,
  },
  heartIconContainer: {
    position: 'absolute',
    top: getResHeight(1),
    right: getResWidth(3),
  },
});

export default EmployeeFound;
