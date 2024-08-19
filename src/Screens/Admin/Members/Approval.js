import React, {useState, memo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  getResHeight,
  getFontSize,
  getResWidth,
} from '../../../utility/responsive';
import {useSelector} from 'react-redux';
import theme from '../../../utility/theme';
import CustomHeader from '../../../Components/CustomHeader';
// import {getResHeight, getFontSize} from '../utility/responsive'; // Assuming you have responsive utilities

const sampleData = [
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  // Add more sample data as needed
];

const ApprovalCard = memo(
  ({item, onAccept, onReject, currentBgColor, currentTextColor}) => {
    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: currentBgColor,
            borderWidth: 0.5,
            borderColor: currentTextColor,
          },
        ]}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.name,
              {
                color: currentTextColor,
              },
            ]}>
            {item.name}
          </Text>
          <Text
            style={[
              styles.textStyles,
              {color: currentTextColor},
              {},
            ]}>{`Gender : Male`}</Text>
          <Text
            style={[
              styles.textStyles,
              {color: currentTextColor},
              {},
            ]}>{`Dob : 7 Aug 2021`}</Text>
          <Text
            style={[
              styles.textStyles,
              {color: currentTextColor},
              {},
            ]}>{`Mobile : 9999999887`}</Text>
          <Text
            style={[
              styles.textStyles,
              {color: currentTextColor},
              {},
            ]}>{`DOJ : 5 Aug 2024`}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.rejectButton]}
              onPress={() => onReject(item.id)}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    // color: currentTextColor,
                  },
                ]}>
                Reject
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              onPress={() => onAccept(item.id)}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    // color: currentTextColor,
                  },
                ]}>
                Accept
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#f3f3f3',
            height: getResHeight(2.5),
            width: getResWidth(19),
            position: 'absolute',
            right: getResHeight(0),
            top: 0,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: 10,
          }}>
          <Text
            style={[
              {
                color: currentBgColor,
                fontSize: getFontSize(1.3),
                fontFamily: theme.font.semiBold,
              },
            ]}>
            6h ago
          </Text>
        </View>
      </View>
    );
  },
);

const Approval = memo(props => {
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  const {navigation} = props;
  const handleAccept = id => {
    // Handle accept logic
    console.log(`Accepted request with ID: ${id}`);
  };

  const handleReject = id => {
    // Handle reject logic
    console.log(`Rejected request with ID: ${id}`);
  };

  const renderItem = ({item}) => (
    <ApprovalCard
      item={item}
      onAccept={handleAccept}
      onReject={handleReject}
      currentTextColor={currentTextColor}
      currentBgColor={currentBgColor}
    />
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentBgColor,
        },
      ]}>
      <CustomHeader
        Hamburger={() => {
          navigation.openDrawer();
          // Keyboard.dismiss();
        }}
        onPressNotificaiton={() => {
          navigation.navigate('UserNotification');
        }}
        centerLogo={true}
      />
      <View
        style={{
          paddingHorizontal: '3%',
        }}>
        <FlatList
          data={sampleData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // padding: getResHeight(2),
  },
  list: {
    // paddingBottom: getResHeight(2),
  },

  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: getResHeight(2),
    elevation: 3,
    marginBottom: getResHeight(1),
    overflow: 'hidden',
    // alignItems: 'center',
    padding: getResHeight(1),
    margin: getResHeight(0.4),
  },
  image: {
    width: getResHeight(10),
    height: getResHeight(10),
    borderRadius: 50,
    marginRight: getResHeight(2),
    backgroundColor: '#f2f2f2',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: getFontSize(2.1),
    fontFamily: theme.font.bold,
  },
  textStyles: {
    fontFamily: theme.font.medium,
    fontSize: getFontSize(1.7),
    marginBottom: getResHeight(0.5),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    borderRadius: 5,
    paddingVertical: getResHeight(1),
    marginHorizontal: getResHeight(0.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#ff4d4d',
  },
  acceptButton: {
    backgroundColor: '#54D454',
  },
  buttonText: {
    color: 'white',
    fontFamily: theme.font.medium,
    fontSize: getFontSize(1.5),
  },
});

export default Approval;
