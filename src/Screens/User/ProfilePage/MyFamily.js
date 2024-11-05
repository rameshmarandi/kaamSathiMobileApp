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
import SmallMenuComp from '../../../Components/SmallMenuComp';
import ConfirmAlert from '../../../Components/ConfirmAlert';
import CustomBottomSheet from '../../../Components/CustomBottomSheet';
import {VectorIcon} from '../../../Components/VectorIcon';
import theme from '../../../utility/theme';
import {Surface} from 'react-native-paper';
import MsgConfig from '../../../Config/MsgConfig';
import {
  ButtonIconComp,
  CustomAlertModal,
  EmptyUserProfile,
  StatusBarComp,
} from '../../../Components/commonComp';
import {TextInput} from 'react-native';
import WaveButton from '../../../Components/WaveButton';
import {store} from '../../../redux/store';
import {
  blockUserAPIHander,
  deleteFamilyAPIHander,
  deleteUserAPIHander,
  getAllMembersAPIHander,
  myProfileAPIHander,
  updateUserRolesAPIHander,
} from '../../../redux/reducer/Profile/ProfileAPI';
import {RefreshControl} from 'react-native';
import ImageView from 'react-native-image-viewing';
import debounce from 'lodash.debounce';
import NoDataFound from '../../../Components/NoDataFound';
import ToastAlertComp from '../../../Components/ToastAlertComp';
import {UserBioComponent, UserCard} from '../../../Helpers/CommonCard';
import AddFamilyForm from '../../Admin/Members/AddFamilyForm';

const initialState = {
  isLoading: false,
  searchText: '',
};

const MyFamily = memo(props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, logedInuserType, currentTextColor} =
    useSelector(state => state.user);

  const {myFamilyMembers} = useSelector(state => state.profile);

  const [state, setState] = useState({
    ...initialState,
    filteredData: myFamilyMembers,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertIcons, setAlertIcons] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedMenuID, setSelectedMenuID] = useState('');
  const [addNewMemberModalVisible, setAddNewMemberModalVisible] =
    useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isImageViewerModal, setIsImageViewerModal] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState('');

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
      await store.dispatch(myProfileAPIHander());
    } catch (error) {}
  };

  // Debounced function for filtering
  const filterMembers = useCallback(
    debounce(searchText => {
      updateState({isLoading: true});

      // Filter based on either the first name or the branch name
      const filtered = myFamilyMembers.filter(item => {
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
    [myFamilyMembers],
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
      <View style={{}}>
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
    return [
      {id: 4, title: 'Update'},
      {id: 5, title: 'Delete'},
    ];
  };

  const MenuItemOnPressHandler = item => {
    setSelectedMenuID(item.id);
    switch (item.id) {
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

      case 4:
        const res = singleUserCardData(selectedCard);
        console.log('userData', res);
        setTimeout(() => {
          openBottomSheetWithContent(res);
        }, 500);
    }
  };

  // API calls

  const handleDelete = async () => {
    // Delete API call
    try {
      const payload = {
        familyMemberId: selectedCard.id,
      };

      const res = await store.dispatch(deleteFamilyAPIHander(payload));
      if (res.payload == true) {
        setAlertMessage({
          status: 'success',

          alertMsg: 'Family member deleted successfully.',
        });
        setIsAlertVisible(true);

        updateState({isLoading: false});
      }
    } catch (error) {
      console.error('User_delete_api_faild:', error);
    }
  };
  const handleClose = () => {
    setIsAlertVisible(false);
  };
  const alertConfirmHandler = () => {
    setShowAlert(false);
    try {
      switch (selectedMenuID) {
        case 5:
          handleDelete();
      }
    } catch (error) {}
  };
  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: currentBgColor}]}>
      <StatusBarComp />
      <View>
        <CustomHeader
          backPress={() => navigation.goBack()}
          screenTitle={MsgConfig.allFamily}
        />
      </View>
      <ImageView
        images={images}
        imageIndex={0}
        visible={isImageViewerModal}
        onRequestClose={() => setIsImageViewerModal(false)}
      />
      <View style={styles.waveButtonContainer}>
        <WaveButton onPress={() => setAddNewMemberModalVisible(true)} />
      </View>
      <View>
        <CustomAlertModal
          visible={isAlertVisible}
          message={alertMessage}
          duration={1500} // duration in milliseconds
          onClose={handleClose}
        />
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
        <AddFamilyForm
          visible={addNewMemberModalVisible}
          closeModal={() => {
            setAddNewMemberModalVisible(false);
          }}
          navigation={navigation}
        />
      </View>
      <Text
        style={{
          color: theme.color.green,
          fontFamily: theme.font.semiBold,
          marginLeft: getResWidth(5),
          // paddingTop: getResHeight(3),
        }}>
        Total family members :{' '}
        {searchText !== ''
          ? Array.isArray(filteredData) && filteredData?.length
          : myFamilyMembers?.length}
      </Text>
      <View style={styles.searchBarContainer}>
        <SearchBarComp
          placeholder="Search all family members..."
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>

      <CustomBottomSheet ref={bottomSheetRef} modalHeight={500}>
        {bottomSheetContent}
      </CustomBottomSheet>

      <View style={[styles.flatListContainer]}>
        <FlatList
          data={searchText !== '' ? filteredData : myFamilyMembers}
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
          // contentContainerStyle={styles.flatListContentContaine}
          renderItem={({item, index}) => {
            return (
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
            );
          }}
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
    paddingBottom: getResHeight(20),
    paddingHorizontal: '2%',
    paddingTop: '2%',
  },
});

export default MyFamily;
