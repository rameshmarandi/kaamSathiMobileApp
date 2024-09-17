import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  getResHeight,
  getResWidth,
  getFontSize,
} from '../../../utility/responsive';
import CustomHeader from '../../../Components/CustomHeader';
import {VectorIcon} from '../../../Components/VectorIcon';
import GoogleUIComp from '../../../Components/GoogleMapComp';
import CustomBottomSheet from '../../../Components/CustomBottomSheet';
import {AutoScrollBtnCom} from '../../../Components/AutoScrollBtnCom';
import theme from '../../../utility/theme';

const ChurchMap = React.memo(props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  const [selectedChurch, setSelectedChurch] = useState(null);
  const bottomSheetRef = useRef(null);

  // const churches = [
  //   {id: '2', name: 'Ambegano', latitude: 18.59179, longitude: 73.81964},

  //   {
  //     id: '1',
  //     name: 'Pimple guruv',
  //     latitude: 18.5890345,
  //     longitude: 73.7925924,
  //   },
  //   {id: '3', name: 'Beed', latitude: 18.989088, longitude: 75.760078},
  //   {id: '2', name: 'Ambegano', latitude: 18.59179, longitude: 73.81964},

  //   {
  //     id: '1',
  //     name: 'Pimple guruv',
  //     latitude: 18.5890345,
  //     longitude: 73.7925924,
  //   },
  //   {id: '3', name: 'Beed', latitude: 18.989088, longitude: 75.760078},
  //   {id: '2', name: 'Ambegano', latitude: 18.59179, longitude: 73.81964},

  //   {
  //     id: '1',
  //     name: 'Pimple guruv',
  //     latitude: 18.5890345,
  //     longitude: 73.7925924,
  //   },
  //   {id: '3', name: 'Beed', latitude: 18.989088, longitude: 75.760078},
  //   {id: '2', name: 'Ambegano', latitude: 18.59179, longitude: 73.81964},

  //   {
  //     id: '1',
  //     name: 'Pimple guruv',
  //     latitude: 18.5890345,
  //     longitude: 73.7925924,
  //   },
  //   {id: '3', name: 'Beed', latitude: 18.989088, longitude: 75.760078},
  // ];
  const churches = [
    {id: '1', name: 'Ambegaon', latitude: 18.59179, longitude: 73.81964},
    {
      id: '2',
      name: 'Pimple Gurav',
      latitude: 18.5890345,
      longitude: 73.7925924,
    },
    {id: '3', name: 'Beed', latitude: 18.989088, longitude: 75.760078},
    {id: '4', name: 'Pune', latitude: 18.5204, longitude: 73.8567},
    {id: '5', name: 'Mumbai', latitude: 19.076, longitude: 72.8777},
    {id: '6', name: 'Ahmedabad', latitude: 23.0225, longitude: 72.5714},
    {id: '7', name: 'Bangalore', latitude: 12.9716, longitude: 77.5946},
    {id: '8', name: 'Kolkata', latitude: 22.5726, longitude: 88.3639},
    {id: '9', name: 'Chennai', latitude: 13.0827, longitude: 80.2707},
    {id: '10', name: 'Jaipur', latitude: 26.9124, longitude: 75.7873},
    {id: '11', name: 'Hyderabad', latitude: 17.385, longitude: 78.4867},
    {id: '12', name: 'Lucknow', latitude: 26.8467, longitude: 80.9462},
    {id: '13', name: 'Bhopal', latitude: 23.2599, longitude: 77.4126},
    {id: '14', name: 'Surat', latitude: 21.1702, longitude: 72.8311},
    {id: '15', name: 'Nagpur', latitude: 21.1458, longitude: 79.0882},
  ];

  const handleCardPress = useCallback(
    church => {
      setSelectedChurch(church);
    },
    [handleCardPress, selectedChurch],
  );
  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: currentBgColor}}>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle="Church Map"
      />

      <View
        style={{
          width: '100%',
          height: getResHeight(50),
        }}>
        <GoogleUIComp selectedChurch={selectedChurch} />
      </View>

      <Text
        style={{
          color: currentTextColor,
          marginTop: getResHeight(3),
          fontFamily: theme.font.bold,
          paddingHorizontal: '5%',
        }}>
        All church branch list
      </Text>

      <AutoScrollBtnCom
        data={churches}
        selectedTab={selectedItem}
        onPress={(item, index) => {
          handleCardPress(item);
          setSelectedItem(index);
        }}
      />
      <View>
        <CustomBottomSheet ref={bottomSheetRef} modalHeight={getResHeight(90)}>
          {/* Content for bottom sheet */}
        </CustomBottomSheet>
      </View>
    </SafeAreaView>
  );
});

export default ChurchMap;
