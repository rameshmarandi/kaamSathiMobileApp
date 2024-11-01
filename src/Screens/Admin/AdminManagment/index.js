import React, {useState, useRef, useCallback, useEffect, memo} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  getResHeight,
  getResWidth,
  getFontSize,
} from '../../../utility/responsive';
import CustomHeader from '../../../Components/CustomHeader';
import SearchBarComp from '../../../Components/SearchBarComp';

import ConfirmAlert from '../../../Components/ConfirmAlert';
import CustomBottomSheet from '../../../Components/CustomBottomSheet';
import {VectorIcon} from '../../../Components/VectorIcon';
import theme from '../../../utility/theme';
import {Surface} from 'react-native-paper';
import MsgConfig from '../../../Config/MsgConfig';
import {
  ButtonIconComp,
  EmptyUserProfile,
  StatusBarComp,
} from '../../../Components/commonComp';
import {TextInput} from 'react-native';
import WaveButton from '../../../Components/WaveButton';
import {store} from '../../../redux/store';
import {
  blockUserAPIHander,
  deleteUserAPIHander,
  getAllAdminsAPIHander,
  updateUserRolesAPIHander,
} from '../../../redux/reducer/Profile/ProfileAPI';
import {RefreshControl} from 'react-native';
import ImageView from 'react-native-image-viewing';
import debounce from 'lodash.debounce';
import NoDataFound from '../../../Components/NoDataFound';
import ToastAlertComp from '../../../Components/ToastAlertComp';
import {UserBioComponent, UserCard} from '../../../Helpers/CommonCard';

const initialState = {
  isLoading: false,
  searchText: '',
};
const menuItems = [
  {id: 1, title: 'Super admin'},
  {id: 2, title: 'Branch admin'},
  {id: 3, title: 'Block'},
  {id: 4, title: 'Update'},
  {id: 5, title: 'Delete'},
];

const Index = memo(props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, logedInuserType, currentTextColor} =
    useSelector(state => state.user);

  const {allAdmins} = useSelector(state => state.profile);

  const [state, setState] = useState({
    ...initialState,
    filteredData: allAdmins,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertIcons, setAlertIcons] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedMenuID, setSelectedMenuID] = useState('');

  const [isImageViewerModal, setIsImageViewerModal] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState('');

  const sheetRef1 = useRef(null);

  const updateState = newState =>
    setState(prevState => ({...prevState, ...newState}));
  const {filteredData, isLoading, searchText} = state;

  const handleSearch = text => {
    updateState({searchText: text});
  };

  // Image viewer
  const images = [
    {
      uri: viewImageUrl,
    },
  ];

  useEffect(() => {
    APIHandler();
  }, []);

  const APIHandler = async () => {
    try {
      await store.dispatch(getAllAdminsAPIHander());
    } catch (error) {}
  };

  // Debounced function for filtering
  const filterMembers = useCallback(
    debounce(searchText => {
      updateState({isLoading: true});

      // Filter based on either the first name or the branch name
      const filtered = allAdmins.filter(item => {
        const firstName = item.userBio['Full name']
          ?.split(' ')[0]
          .toLowerCase();
        const branchName = item.branchName?.toLowerCase(); // Ensure branch name is in userBio
        const designation = item.role?.toLowerCase(); // Ensure branch name is in userBio

        // Check if either first name or branch name contains the search text
        return (
          firstName?.includes(searchText.toLowerCase()) ||
          branchName?.includes(searchText.toLowerCase()) ||
          designation?.includes(searchText.toLowerCase())
        );
      });

      updateState({filteredData: filtered, isLoading: false});
      console.log('Filtered Members:', filtered);
    }, 300),
    [allAdmins],
  );

  useEffect(() => {
    filterMembers(searchText);
    // Cleanup function to cancel debounce on component unmount
    return () => {
      filterMembers.cancel();
    };
  }, [searchText, filterMembers]);

  const bottomSheetRef = useRef(null);
  const [bottomSheetContent, setBottomSheetContent] = useState(null);

  const openBottomSheetWithContent = content => {
    setBottomSheetContent(content);
    bottomSheetRef.current?.open();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const singleUserCardData = item => {
    const {userBio} = item;

    return (
      <View style={styles.userCardContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.profileContainer}>
            <EmptyUserProfile onPress={() => alert('')} />
          </View>
          <View style={styles.nameContainer}>
            <Text style={{color: currentTextColor}}>
              {userBio['Full name']}
            </Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            onChangeText={() => {}}
            onBlur={() => {}}
            value={''}
          />
        </ScrollView>
      </View>
    );
  };

  const handleMunuData = userDetails => {
    console.log('All_Admins:', userDetails);
    let updatedMenuItems = []; // Initialize empty array
    const blockText = userDetails.isBlocked ? 'Unblock' : 'Block'; // Determine text based on isBlocked status

    if (logedInuserType === 'branch_admin') {
      // Branch Admin sees only specific items
      updatedMenuItems = [
        {id: 3, title: blockText},
        {id: 4, title: 'Update'},
        {id: 5, title: 'Delete'},
      ];
    } else if (logedInuserType === 'super_admin') {
      if (userDetails.role == 'member' && !userDetails.isBlocked) {
        // If user is a regular member
        updatedMenuItems = [...menuItems]; // All options available
      } else if (userDetails.role == 'member' && userDetails.isBlocked) {
        updatedMenuItems = menuItems
          .filter(item => item.id !== 1 && item.id !== 2)
          .map(
            item => (item.id === 3 ? {...item, title: blockText} : item), // Update "Block" text
          );
      } else {
        // User already has a role (Super Admin or Branch Admin)
        updatedMenuItems = [
          {id: 3, title: blockText},
          {id: 4, title: 'Update'},
          {id: 5, title: 'Delete'},
          {id: 6, title: 'Remove Admin'}, // Add "Remove Admin" option
        ];
      }
    }
    return updatedMenuItems;
  };

  const MenuItemOnPressHandler = item => {
    setSelectedMenuID(item.id);
    switch (item.id) {
      case 3:
        setAlertIcons(
          <VectorIcon
            type={'Entypo'}
            name={'block'}
            size={getFontSize(4.1)}
            color={theme.color.error}
          />,
        );
        setAlertMsg('Are you sure you want to block this member?');
        setShowAlert(true);

        break;
      case 5:
        setAlertIcons(
          <VectorIcon
            type={'MaterialIcons'}
            name={'delete-forever'}
            size={getFontSize(5.1)}
            color={theme.color.error}
          />,
        );
        setAlertMsg('Are you sure you want to delete this member?');
        setShowAlert(true);
        break;
      case 6:
        setAlertIcons(
          <VectorIcon
            type={'Ionicons'}
            name={'person-remove'}
            size={getFontSize(5.1)}
            color={theme.color.error}
          />,
        );
        setAlertMsg('Are you sure you want to remove this admin?');
        setShowAlert(true);
        break;
      case 1:
        setAlertIcons(
          <VectorIcon
            type={'Ionicons'}
            name={'person-add'}
            size={getFontSize(5.1)}
            color={theme.color.green}
          />,
        );
        setAlertMsg('Are you sure you want to add as super admin?');
        setShowAlert(true);
        break;
      case 2:
        setAlertIcons(
          <VectorIcon
            type={'Ionicons'}
            name={'person-add'}
            size={getFontSize(5.1)}
            color={theme.color.green}
          />,
        );
        setAlertMsg('Are you sure you want to add as branch admin?');
        setShowAlert(true);
        break;
      case 4:
        const res = singleUserCardData(selectedCard);
        console.log('userData', res);
        setTimeout(() => {
          openBottomSheetWithContent(res);
        }, 500);
    }
  };

  // API calls
  const handleBlock = async () => {
    // Block API call

    try {
      // blockUserAPIHander;
      updateState({isLoading: true});
      const payload = {
        userID: selectedCard.id,
      };
      const res = await store.dispatch(blockUserAPIHander(payload));

      if (res.payload.error) {
        updateState({isLoading: false});
        ToastAlertComp('error', res.payload.error.message);
      } else if (res.payload) {
        updateState({isLoading: false});
        ToastAlertComp('success', res.payload);
      }
    } catch (error) {
      console.error('User_back_api_faild:', error);
    }
  };
  const handleDelete = async () => {
    // Delete API call
    try {
      updateState({isLoading: true});
      const payload = {
        _id: selectedCard.id,
      };
      const res = await store.dispatch(deleteUserAPIHander(payload));
      if (res.payload == true) {
        updateState({isLoading: false});
      }
    } catch (error) {
      console.error('User_delete_api_faild:', error);
    }
  };
  const handleRemoveAdmin = async () => {
    // Remove Admin API call
    try {
      updateState({isLoading: true});
      const payload = {
        _id: selectedCard.id,
        role: 0,
      };

      const res = await store.dispatch(updateUserRolesAPIHander(payload));

      if (res.payload == true) {
        updateState({isLoading: false});
      }
    } catch (error) {
      updateState({isLoading: false});
    }
  };
  const handleAddAdmin = async selectedRole => {
    updateState({isLoading: true});
    // Add Admin API call

    try {
      const payload = {
        _id: selectedCard.id,
        role: selectedRole == 1 ? 2 : 1,
      };

      const res = await store.dispatch(updateUserRolesAPIHander(payload));
      if (res.payload == true) {
        updateState({isLoading: false});
      }
    } catch (error) {
      updateState({isLoading: false});
    }
  };

  const alertConfirmHandler = () => {
    setShowAlert(false);
    try {
      switch (selectedMenuID) {
        case 3:
          handleBlock();
          break;
        case 5:
          handleDelete();
          break;
        case 6:
          handleRemoveAdmin();
          break;
        case 1:
          handleAddAdmin(selectedMenuID);
          break;
        case 2:
          handleAddAdmin(selectedMenuID);
          break;
      }
    } catch (error) {}
  };
  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: currentBgColor}]}>
      <StatusBarComp />
      <View>
        <CustomHeader
          backPress={() => navigation.goBack()}
          screenTitle={MsgConfig.AdminManag}
          filterIcon={() => {}}
        />
      </View>
      <ImageView
        images={images}
        imageIndex={0}
        visible={isImageViewerModal}
        onRequestClose={() => setIsImageViewerModal(false)}
      />
      <View style={styles.waveButtonContainer}>
        <WaveButton
          onPress={() => props.navigation.navigate('AddMemberForm')}
        />
      </View>
      <ConfirmAlert
        visible={showAlert}
        alertTitle={alertMsg}
        alertIcon={alertIcons}
        onCancel={() => {
          setAlertIcons('');
          setAlertMsg('');
          setShowAlert(false);
        }}
        onConfirm={alertConfirmHandler}
      />

      <Text
        style={{
          color: theme.color.green,
          fontFamily: theme.font.semiBold,
          marginLeft: getResWidth(5),
          // paddingTop: getResHeight(3),
        }}>
        Total members :{' '}
        {searchText !== '' ? filteredData.length : allAdmins.length}
      </Text>
      <View style={styles.searchBarContainer}>
        <SearchBarComp
          placeholder="Search all members..."
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>

      <CustomBottomSheet ref={bottomSheetRef} modalHeight={500}>
        {bottomSheetContent}
      </CustomBottomSheet>

      <View style={[styles.flatListContainer]}>
        <FlatList
          data={searchText !== '' ? filteredData : allAdmins}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => APIHandler(false)}
            />
          }
          ListEmptyComponent={() => {
            return (
              <>
                <View
                  style={{
                    marginTop: getResHeight(-10),
                  }}>
                  <NoDataFound />
                </View>
              </>
            );
          }}
          contentContainerStyle={styles.flatListContentContainer}
          renderItem={({item, index}) => (
            <UserCard
              item={item}
              isLoading={isLoading}
              selectedCard={selectedCard}
              currentBgColor={currentBgColor}
              currentTextColor={currentTextColor}
              setSelectedCard={setSelectedCard}
              handleMunuData={handleMunuData}
              MenuItemOnPressHandler={MenuItemOnPressHandler}
              setViewImageUrl={setViewImageUrl}
              setIsImageViewerModal={setIsImageViewerModal}
              openBottomSheetWithContent={openBottomSheetWithContent}
              setShowAlert={setShowAlert}
              theme={theme}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
});
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  waveButtonContainer: {
    position: 'absolute',
    bottom: getResHeight(7),
    right: getResWidth(7),
  },
  searchBarContainer: {},
  flatListContainer: {
    zIndex: -9999,
    paddingBottom: getResHeight(10),
    paddingHorizontal: '2%',
    paddingTop: '2%',
  },
});
export default Index;
