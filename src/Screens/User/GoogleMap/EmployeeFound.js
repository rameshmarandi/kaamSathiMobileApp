import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import {VectorIcon} from '../../../Components/VectorIcon';
import CustomHeader from '../../../Components/CustomHeader';
import Modal from 'react-native-modal';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import theme from '../../../utility/theme';
import MsgConfig from '../../../Config/MsgConfig';

const distances = [
  ...Array.from({length: 15}, (_, index) => `${index + 1} km`),
  ...Array.from({length: 17}, (_, index) => `${(index + 4) * 5} km`),
];

const Button = ({text, onPress, isPrimary}) => (
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

const EmployeeCard = React.memo(
  ({item, viewBtnPress, index, isSelected, onHeartPress}) => {
    return (
      <View
        // activeOpacity={1}
        style={[styles.card, index === 0 && styles.firstCard]}>
        <View style={styles.cardContainer}>
          <Image
            source={{
              uri: 'https://www.gngmodels.com/wp-content/uploads/2023/12/indian-male-models-11-682x1024.jpg',
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={{}}>
          {[
            {label: 'Name', value: 'Ramesh Marandi'},
            {label: 'Languages', value: 'Hindi, English, Bengali'},
            {label: 'Distance', value: item},
            {label: 'Skills', value: 'Electrician, Plumber, Carpenter'},
            {label: 'Rating', value: '4.5'},
          ].map((detail, idx) => (
            <View key={idx} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{`${detail.label} :`}</Text>
              <Text style={styles.detailValue}>{detail.value}</Text>
            </View>
          ))}
          <View style={styles.buttonContainer}>
            <Button text="View Details" onPress={viewBtnPress} />
            <Button text="Hire Now" onPress={() => {}} isPrimary />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => onHeartPress(index)}
          style={styles.heartIconContainer}>
          <VectorIcon
            type="MaterialCommunityIcons"
            name={isSelected ? 'heart' : 'cards-heart-outline'}
            size={getFontSize(2.8)}
            color={isSelected ? 'red' : theme.color.charcolBlack}
          />
        </TouchableOpacity>
      </View>
    );
  },
);

const EmployeeFound = ({navigation}) => {
  const [selectedHearts, setSelectedHearts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const employeeDetails = {
    name: 'Ramesh Marandi',
    languages: 'Hindi, English, Bengali',
    distance: '10 km',
    rating: '4.5',
  };

  const handleHeartPress = useCallback(index => {
    setSelectedHearts(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
    );
  }, []);

  const renderItem = useCallback(
    ({item, index}) => (
      <EmployeeCard
        item={item}
        index={index}
        isSelected={selectedHearts.includes(index)}
        onHeartPress={handleHeartPress}
        viewBtnPress={() => {
          // setModalVisible(true);

          navigation.navigate('EmployeeProfileDetails', {
            worker: item,
          });
        }}
      />
    ),
    [selectedHearts, handleHeartPress],
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle={`10 electrician ${MsgConfig.searchLabour}`}
        filterIcon={() => {}}
      />

      <FlatList
        data={distances}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      {/* <EmployeeDetailsModal
        isDetailsModalVisible={isModalVisible}
        onBackPress={() => setModalVisible(false)}
        employeeDetails={employeeDetails}
      /> */}
    </SafeAreaView>
  );
};

// const EmployeeDetailsModal = ({
//   isDetailsModalVisible,
//   onBackPress,
//   employeeDetails,
// }) => {
//   return (
//     <Modal
//       isVisible={isDetailsModalVisible}
//       onBackdropPress={onBackPress}
//       onBackButtonPress={onBackPress}
//       animationIn="fadeIn"
//       animationOut="fadeOut"
//       useNativeDriver={true}
//       style={styles.modal}>

//     </Modal>
//   );
// };

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    width: '100%',
    maxHeight: getResHeight(130),
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  //Modal end
  container: {
    flex: 1,
    backgroundColor: theme.color.white,
  },
  card: {
    borderWidth: 1,
    borderColor: theme.color.placeholder,
    marginHorizontal: getResWidth(5),
    paddingHorizontal: getResWidth(3),
    paddingVertical: getResWidth(3),
    borderRadius: getResWidth(2),
    marginBottom: getResHeight(1.4),
    position: 'relative',
    flexDirection: 'row',
  },
  firstCard: {
    marginTop: '3.5%',
  },
  cardContainer: {
    // width: '40%',
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  profileImage: {
    height: getResHeight(16),
    width: getResHeight(14),
    borderRadius: 10,
    marginRight: getResWidth(1),
  },
  detailRow: {
    flexDirection: 'row',
    marginLeft: getResWidth(3),
    marginVertical: getResHeight(0.5),
  },
  detailLabel: {
    fontSize: getFontSize(1.2),
    fontFamily: theme.font.semiBold,
    color: theme.color.charcolBlack,
  },
  detailValue: {
    fontSize: getFontSize(1.4),
    fontFamily: theme.font.medium,
    color: theme.color.charcolBlack,
    marginLeft: getResWidth(1),
  },
  buttonContainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getResHeight(1),
  },
  button: {
    // width: 90,
    paddingHorizontal: getResWidth(4),
    paddingVertical: getResHeight(1),
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: theme.color.secondary,
    width: 100,
  },
  secondaryButton: {
    borderWidth: 1,
    // width: 0,
    borderColor: theme.color.secondary,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: getFontSize(1.3),
    fontFamily: theme.font.semiBold,
    textAlign: 'center',
    color: 'black',
  },
  primaryButtonText: {
    color: theme.color.charcolBlack,
  },
  heartIconContainer: {
    position: 'absolute',
    right: '2%',
    top: '4%',
  },
});

export default EmployeeFound;
