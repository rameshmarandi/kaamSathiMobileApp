import React, {useState, useRef, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import {requestUserPermission} from '../../../utility/PermissionContoller';
import messaging from '@react-native-firebase/messaging';
import theme from '../../../utility/theme';
import SearchBarComp from '../../../Components/SearchBarComp';
import {VectorIcon} from '../../../Components/VectorIcon';
import GoogleUIComp from '../../../Components/GoogleMapComp';
import {skilledWorkers} from '../../../Components/StaticDataHander';
import DistanceSelectorModalComponent from './DistanceSelectorModalComponent';
import EmployeeModalComponent from './EmployeeFound';

const uniqueSkills = [
  ...new Set(skilledWorkers.map(worker => worker.skill.toLowerCase())),
];

const SearchOnMap = props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  const [searchText, setSearchText] = useState('');
  const [filteredKeys, setFilteredKeys] = useState(uniqueSkills);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

  const [isDistanceModalVisible, setDistanceModalVisible] = useState(false);

  const [selectedDistance, setSelectedDistance] = useState({
    id: 0,
    distance: '1 km',
  });

  const [isEmployeeModalVisible, setEmployeeModalVisible] = useState(false);

  const searchBarRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const initialize = async () => {
      await requestUserPermission();
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    };

    initialize();
  }, []);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const searchBarPlaceholder = useMemo(
    () => (selectedSkill ? selectedSkill : searchText),
    [selectedSkill, searchText],
  );

  const handleKeySearch = useCallback(text => {
    setSearchText(text);
    setIsSearchModalVisible(true);

    if (!text.trim()) {
      setFilteredKeys(uniqueSkills);
    } else {
      const filtered = uniqueSkills.filter(skill =>
        skill.includes(text.toLowerCase()),
      );
      setFilteredKeys(filtered);
    }

    setSelectedSkill('');
    setFilteredProfiles([]);
  }, []);

  const handleSkillSelection = useCallback(skill => {
    setSelectedSkill(skill);
    const profiles = skilledWorkers.filter(
      worker => worker.skill.toLowerCase() === skill,
    );
    setFilteredProfiles(profiles);
    setIsSearchModalVisible(false);
  }, []);

  const renderKey = useCallback(
    ({item}) => (
      <TouchableOpacity
        onPress={() => {
          handleSkillSelection(item);

          props.navigation.navigate('EmployeeFound');
        }}
        style={styles.keyItem}>
        <Text style={[styles.keyText, {color: currentTextColor}]}>
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </Text>
      </TouchableOpacity>
    ),
    [handleSkillSelection, currentTextColor],
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: currentBgColor}]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={[
          styles.header,
          {backgroundColor: theme.color.dardkModeOnBGColor},
        ]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <VectorIcon
            type="Ionicons"
            name="arrow-back-circle"
            size={getFontSize(5)}
            color={'white'}
          />
        </TouchableOpacity>
        <View
          style={
            {
              // width: getResWidth(50),
            }
          }>
          <SearchBarComp
            ref={searchBarRef}
            placeholder="Search skilled professionals..."
            onChangeText={handleKeySearch}
            value={searchBarPlaceholder}
            onClear={() => {
              setIsSearchModalVisible(false);
            }}
            autoFocus
            containerStyle={styles.searchBarContainer}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setDistanceModalVisible(true);
          }}
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontFamily: theme.font.semiBold,
              fontSize: getFontSize(1.9),
              color: theme.color.charcolBlack,
            }}>
            {selectedDistance.distance}
          </Text>
          <VectorIcon
            type="Ionicons"
            name={isDistanceModalVisible ? 'caret-up' : 'caret-down'}
            size={getFontSize(3)}
            color={theme.color.charcolBlack}
          />
        </TouchableOpacity>
      </View>

      {isSearchModalVisible && (
        <View style={styles.searchModal}>
          <FlatList
            data={filteredKeys}
            keyExtractor={keyExtractor}
            renderItem={renderKey}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContentContainer}
            ListEmptyComponent={
              <Text style={styles.noKeysText}>No keys found</Text>
            }
          />
        </View>
      )}

      <GoogleUIComp />
      <DistanceSelectorModalComponent
        isModalVisible={isDistanceModalVisible}
        onBackdropPress={() => {
          setDistanceModalVisible(false);
        }}
        selectedDistance={selectedDistance}
        handleSelectDistance={item => {
          setSelectedDistance(item);

          // setTimeout(() => {
          // setEmployeeModalVisible(true);
          props.navigation.navigate('EmployeeFound');
          // }, 500);
        }}
        onSelectDistance={item => {}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getResWidth(2),
    justifyContent: 'space-between',
  },
  searchBarContainer: {
    width: getResWidth(68),
    height: getResHeight(8),
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    margin: 0,
    alignItems: 'center',
  },
  searchModal: {
    width: '90%',
    alignSelf: 'center',
    minHeight: getResHeight(3),
    maxHeight: getResHeight(40),
    backgroundColor: 'white',
    position: 'absolute',
    top: getResHeight(8),
    zIndex: 100,
    borderBottomLeftRadius: getResHeight(2),
    borderBottomRightRadius: getResHeight(2),
    overflow: 'hidden',
  },
  listContentContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  keyItem: {
    borderBottomWidth: 0.8,
    borderColor: '#f3eeee',
  },
  keyText: {
    paddingVertical: getResHeight(1),
    paddingHorizontal: getResHeight(2),
    marginVertical: '1%',
    fontFamily: theme.font.medium,
    textAlign: 'center',
  },
  noKeysText: {
    textAlign: 'center',
    color: theme.color.charcolBlack,
    fontFamily: theme.font.medium,
    paddingTop: '2%',
    fontSize: getFontSize(1.6),
  },
  mapContainer: {
    flex: 1,
  },
});

export default SearchOnMap;
