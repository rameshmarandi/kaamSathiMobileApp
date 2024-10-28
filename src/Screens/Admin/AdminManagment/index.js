// import React, {useState, memo, useEffect, useRef} from 'react';

// import {
//   View,
//   Text,
//   SafeAreaView,
//   ScrollView,
//   Image,
//   FlatList,
// } from 'react-native';
// import theme from '../../../utility/theme';
// import {useSelector} from 'react-redux';
// import CustomHeader from '../../../Components/CustomHeader';

// import {
//   ButtonIconComp,
//   EmptyUserProfile,
//   StatusBarComp,
// } from '../../../Components/commonComp';
// import {
//   getFontSize,
//   getResHeight,
//   getResWidth,
// } from '../../../utility/responsive';

// import SearchBarComp from '../../../Components/SearchBarComp';
// import MsgConfig from '../../../Config/MsgConfig';
// import {VectorIcon} from '../../../Components/VectorIcon';
// import SmallMenuComp from '../../../Components/SmallMenuComp';
// import ConfirmAlert from '../../../Components/ConfirmAlert';
// import CustomBottomSheet from '../../../Components/CustomBottomSheet';
// import WaveButton from '../../../Components/WaveButton';

// const cardDataArray = [
//   {id: 0, title: 'All Members', image: theme.assets.members, routeName: ''},
//   {
//     id: 1,
//     title: 'Admin Management',
//     image: theme.assets.adminManag,
//     routeName: '',
//   },
//   {id: 2, title: 'Momentous Posts', image: theme.assets.camera, routeName: ''},
//   {id: 3, title: 'Daily Verses', image: theme.assets.DBible, routeName: ''},
//   {
//     id: 4,
//     title: 'Notification Controls',
//     image: theme.assets.alert,
//     routeName: '',
//   },
//   {id: 5, title: 'Free Resources', image: theme.assets.pdf, routeName: ''},
//   {id: 6, title: 'Prayer Request', image: theme.assets.prayer, routeName: ''},
//   {id: 7, title: 'Contact us', image: theme.assets.contact, routeName: ''},
// ];

// const menuItems = [{title: 'Update'}, {title: 'Block'}, {title: 'Delete'}];

// const initialState = {
//   filteredData: cardDataArray,
//   isLoading: false,
//   searchText: '',
// };

// const index = memo(props => {
//   const {navigation} = props;
//   let {isDarkMode, currentBgColor, currentTextColor} = useSelector(
//     state => state.user,
//   );

//   const [state, setState] = useState(initialState);

//   const [showAlert, setShowAlert] = useState(false);

//   const sheetRef1 = useRef(null);
//   const sheetRef2 = useRef(null);

//   const bottomSheetRef = useRef(null);
//   const [bottomSheetContent, setBottomSheetContent] = useState(null);

//   const openBottomSheetWithContent = content => {
//     setBottomSheetContent(content);
//     bottomSheetRef.current?.open();
//   };

//   const updateState = newState =>
//     setState(prevState => ({...prevState, ...newState}));

//   const {filteredData, isLoading, searchText} = state;

//   const handleSearch = text => {
//     updateState({searchText: text});
//   };

//   useEffect(() => {
//     updateState({isLoading: true});
//     const filtered = cardDataArray
//       .filter(item =>
//         item.title.toLowerCase().includes(searchText.toLowerCase()),
//       )
//       .sort((a, b) => a.title.localeCompare(b.title));

//     updateState({filteredData: filtered});
//     setTimeout(() => {
//       updateState({isLoading: false});
//     }, 300);
//   }, [searchText]);

//   renderContent1 = () => {
//     return (
//       <>
//         <View>
//           <Text>Ramesh Test herer</Text>
//         </View>
//       </>
//     );
//   };

//   const singleUserCardData = item => {
//     // const {userBio} = item;

//     // console.log('sing_user', userBio);
//     return (
//       <View
//         style={{
//           flex: 1,
//           // padding: '5%',
//           alignItems: 'center',
//         }}>
//         <ScrollView
//           style={{
//             width: '100%',
//           }}>
//           <View
//             style={{
//               marginTop: getResHeight(12),
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <EmptyUserProfile
//               onPress={() => {
//                 alert('sdfsd');
//               }}
//             />
//           </View>

//           <View
//             style={{
//               marginTop: '5%',
//             }}>
//             <Text style={{color: 'red'}}>{`Name fof the`}</Text>
//           </View>
//           {/* <FormikHandler /> */}
//         </ScrollView>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: currentBgColor,
//       }}>
//       <View
//         style={
//           {
//             // marginTop: '4%',
//           }
//         }>
//         <CustomHeader
//           backPress={() => {
//             props.navigation.goBack();
//           }}
//           screenTitle={MsgConfig.AdminManag}
//           filterIcon={() => {}}
//         />
//       </View>
//       <View
//         style={{
//           position: 'absolute',
//           bottom: getResHeight(7),
//           right: getResWidth(7),
//         }}>
//         <WaveButton
//           onPress={() => {
//             props.navigation.navigate('Members');
//           }}
//         />
//       </View>
//       <ConfirmAlert
//         visible={showAlert}
//         onCancel={() => setShowAlert(false)}
//         onConfirm={() => {
//           setShowAlert(false);
//         }}
//       />
//       <StatusBarComp />

//       <View
//         style={{
//           marginTop: '3%',
//           paddingHorizontal: '1%',
//         }}>
//         <SearchBarComp
//           placeholder="Search all admin.."
//           isLoading={isLoading}
//           onChangeText={handleSearch}
//           value={searchText}
//         />
//       </View>

//       {/* <CustomBottomSheet
//         sheetRef={sheetRef1}
//         initialSnapIndex={-1}
//         snapPoints={['25%', '50%']}
//         renderContent={renderContent1}
//         headerTitle="Sheet 1"
//       /> */}

//       <CustomBottomSheet ref={bottomSheetRef} modalHeight={500}>
//         {bottomSheetContent}
//       </CustomBottomSheet>
//       <View
//         style={{
//           zIndex: -9999,
//           paddingBottom: getResHeight(10),
//           paddingHorizontal: '2%',
//           paddingTop: '2%',
//         }}>
//         <FlatList
//           data={[0, 1, 2, 3, 4, 5]}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{paddingBottom: '20%'}}
//           renderItem={({item, index}) => {
//             return (
//               <>
//                 <View
//                   style={[
//                     theme.styles.cardEffect,
//                     {
//                       width: getResWidth(90),
//                       backgroundColor:
//                         (index + 1) % 2 !== 0
//                           ? theme.color.dimGray
//                           : currentBgColor,
//                       borderWidth: 1,
//                       borderColor: currentTextColor,
//                       alignSelf: 'center',
//                       borderRadius: getResHeight(2),

//                       padding: getResHeight(2),
//                       marginBottom: '5%',
//                       flexDirection: 'row',
//                       flexWrap: 'wrap', // Enable wrapping
//                     },
//                   ]}>
//                   <View
//                     style={{
//                       position: 'absolute',
//                       top: getResHeight(1.4),
//                       right: getResWidth(2),
//                       zIndex: 9999,
//                     }}>
//                     <SmallMenuComp
//                       buttonLabel={openMenu => {
//                         return (
//                           <>
//                             <ButtonIconComp
//                               onPress={() => {
//                                 if (sheetRef1 && sheetRef1.current) {
//                                   sheetRef1.current.close();
//                                 }
//                                 openMenu();
//                               }}
//                               disabled={(index + 1) % 2 !== 0}
//                               icon={
//                                 <VectorIcon
//                                   type={'Entypo'}
//                                   name={'dots-three-vertical'}
//                                   size={getFontSize(2.1)}
//                                   color={currentTextColor}
//                                 />
//                               }
//                               containerStyle={{
//                                 width: getResHeight(5),
//                                 height: getResHeight(5),
//                                 backgroundColor:
//                                   (index + 1) % 2 !== 0
//                                     ? theme.color.dimGray
//                                     : currentBgColor,

//                                 borderRadius: getResHeight(100),
//                               }}
//                             />
//                           </>
//                         );
//                       }}
//                       menuItems={menuItems}
//                       onMenuPress={menuIndex => {
//                         if (menuIndex == 0) {
//                           // sheetRef1.current.expand();
//                           const res = singleUserCardData(item);
//                           console.log('userData', res);
//                           setTimeout(() => {
//                             openBottomSheetWithContent(res);
//                           }, 500);
//                         }
//                         if (menuIndex == 2) {
//                           setShowAlert(true);
//                         }
//                       }}
//                     />
//                   </View>
//                   <View
//                     style={{
//                       position: 'absolute',
//                       left: getResWidth(2),
//                       top: getResHeight(1.5),
//                       height: getResHeight(2),
//                       width: getResHeight(2),
//                       borderRadius: getResHeight(100),
//                       backgroundColor: (index + 1) % 2 !== 0 ? 'red' : 'green',
//                     }}
//                   />
//                   <View
//                     style={{
//                       width: getResWidth(26),
//                       // backgroundColor:"green"
//                     }}>
//                     <Image
//                       source={{
//                         uri: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1719',
//                       }}
//                       style={{
//                         height: getResHeight(10),
//                         width: getResHeight(10),
//                         borderRadius: getResHeight(100),
//                       }}
//                     />
//                   </View>

//                   <View
//                     style={{
//                       width: getResWidth(48), // Set the width to allow wrapping within this container
//                       marginLeft: '5%',
//                       flexWrap: 'wrap',
//                     }}>
//                     <Text
//                       style={{
//                         maxWidth: '100%',
//                         fontSize: getFontSize(2),
//                         fontFamily: theme.font.semiBold,
//                         color: currentTextColor,
//                       }}>
//                       Ramesh Marandi
//                     </Text>

//                     <Text
//                       style={{
//                         width: '98%',
//                         fontFamily: theme.font.medium,
//                         fontSize: getFontSize(1.5),
//                         color: currentTextColor,
//                       }}>
//                       ramesh.test@gmail.com
//                     </Text>
//                   </View>
//                 </View>
//               </>
//             );
//           }}
//         />
//       </View>
//     </SafeAreaView>
//   );
// });

// export default index;

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
  EmptyUserProfile,
  StatusBarComp,
} from '../../../Components/commonComp';
import {TextInput} from 'react-native';
import WaveButton from '../../../Components/WaveButton';
import {store} from '../../../redux/store';
import {getAllMembersAPIHander} from '../../../redux/reducer/Profile/ProfileAPI';
import {RefreshControl} from 'react-native';
import ImageView from 'react-native-image-viewing';
import debounce from 'lodash.debounce';
import NoDataFound from '../../../Components/NoDataFound';

const menuItems = [{title: 'Update'}, {title: 'Block'}, {title: 'Delete'}];

const initialState = {
  isLoading: false,
  searchText: '',
};

const Index = memo(props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  const {allMembers} = useSelector(state => state.profile);

  const [state, setState] = useState({
    ...initialState,
    filteredData: allMembers,
  });
  // const [userData, setUserData] = useState([...demoUsers]);
  const [showAlert, setShowAlert] = useState(false);
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
      await store.dispatch(getAllMembersAPIHander());
    } catch (error) {}
  };

  // Debounced function for filtering
  const filterMembers = useCallback(
    debounce(searchText => {
      updateState({isLoading: true});

      // Filter based on either the first name or the branch name
      const filtered = allMembers.filter(item => {
        const firstName = item.userBio['Full name']
          ?.split(' ')[0]
          .toLowerCase();
        const branchName = item.branchName?.toLowerCase(); // Ensure branch name is in userBio

        // Check if either first name or branch name contains the search text
        return (
          firstName?.includes(searchText.toLowerCase()) ||
          branchName?.includes(searchText.toLowerCase())
        );
      });

      updateState({filteredData: filtered, isLoading: false});
      console.log('Filtered Members:', filtered);
    }, 300),
    [allMembers],
  );

  useEffect(() => {
    filterMembers(searchText);
    // Cleanup function to cancel debounce on component unmount
    return () => {
      filterMembers.cancel();
    };
  }, [searchText, filterMembers]);

  const UserBioComponent = ({userBio}) => {
    // Convert userBio object to an array of key-value pairs
    const userBioArray = Object.entries(userBio).map(([key, value]) => ({
      key,
      value,
    }));

    // Render each item in the FlatList
    const renderItem = ({item}) => (
      <View style={styles.itemContainer}>
        <Text style={[styles.keyText, {color: currentTextColor}]}>
          {item.key}
        </Text>
        <Text style={[styles.valueText, {color: currentTextColor}]}>
          {item.value}
        </Text>
      </View>
    );

    return (
      <FlatList
        data={userBioArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

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
            <EmptyUserProfile onPress={() => alert('sdfsd')} />
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
        onCancel={() => setShowAlert(false)}
        onConfirm={() => setShowAlert(false)}
      />

      <Text
        style={{
          color: theme.color.green,
          fontFamily: theme.font.semiBold,
          marginLeft: getResWidth(5),
          // paddingTop: getResHeight(3),
        }}>
        Total admins :{' '}
        {searchText !== '' ? filteredData.length : allMembers.length}
      </Text>
      <View style={styles.searchBarContainer}>
        <SearchBarComp
          placeholder="Search all admins..."
          isLoading={isLoading}
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>

      <CustomBottomSheet ref={bottomSheetRef} modalHeight={500}>
        {bottomSheetContent}
      </CustomBottomSheet>

      <View style={[styles.flatListContainer]}>
        <FlatList
          data={searchText !== '' ? filteredData : allMembers}
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
          renderItem={({item}) => (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: currentBgColor,
                  borderColor: currentTextColor,
                },
              ]}>
              <View style={styles.cardContent}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    if (item.avatar !== '') {
                      setViewImageUrl(item.avatar);
                      setIsImageViewerModal(true);
                    }
                  }}
                  style={styles.avatarContainer}>
                  <Image source={{uri: item.avatar}} style={styles.avatar} />
                </TouchableOpacity>
                <View style={styles.userInfoContainer}>
                  <Text
                    style={[styles.userNameText, {color: currentTextColor}]}>
                    {item.userBio['Full name']}
                  </Text>
                  <Text style={styles.branchText}>
                    Branch name : {item.branchName}
                  </Text>
                </View>
                <View style={styles.menuButtonContainer}>
                  <SmallMenuComp
                    buttonLabel={openMenu => (
                      <ButtonIconComp
                        onPress={() => openMenu()}
                        icon={
                          <VectorIcon
                            type={'Entypo'}
                            name={'dots-three-vertical'}
                            size={getFontSize(2.1)}
                            color={currentTextColor}
                          />
                        }
                        containerStyle={styles.menuButton}
                      />
                    )}
                    menuItems={menuItems}
                    onMenuPress={menuIndex => {
                      if (menuIndex === 0) {
                        const res = singleUserCardData(item);
                        setTimeout(() => {
                          openBottomSheetWithContent(res);
                        }, 500);
                      }
                      if (menuIndex === 2) {
                        setShowAlert(true);
                      }
                    }}
                  />
                </View>
              </View>
              <View style={styles.userBioContainer}>
                <UserBioComponent userBio={item.userBio} />
              </View>
            </View>
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
  userCardContainer: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
  profileContainer: {
    marginTop: getResHeight(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    marginTop: '5%',
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
  },
  waveButtonContainer: {
    position: 'absolute',
    bottom: getResHeight(7),
    right: getResWidth(7),
  },
  searchBarContainer: {
    // marginTop: '3%',
    // paddingHorizontal: '1%',
  },
  flatListContainer: {
    zIndex: -9999,
    paddingBottom: getResHeight(10),
    paddingHorizontal: '2%',
    paddingTop: '2%',
  },
  flatListContentContainer: {
    paddingBottom: '20%',
  },
  card: {
    width: getResWidth(90),
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: getResHeight(2),
    marginBottom: getResHeight(2),
  },
  cardContent: {
    paddingVertical: getResHeight(2),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  avatarContainer: {
    width: getResWidth(26),
    paddingLeft: getResHeight(2),
  },
  avatar: {
    height: getResHeight(10),
    width: getResHeight(10),
    borderRadius: getResHeight(100),
    borderWidth: 2,
    borderColor: theme.color.green,
  },
  userInfoContainer: {
    width: getResWidth(48),
    marginLeft: '5%',
    flexWrap: 'wrap',
  },
  userNameText: {
    maxWidth: '100%',
    fontSize: getFontSize(2),
    fontFamily: theme.font.semiBold,
  },
  branchText: {
    width: '98%',
    fontFamily: theme.font.semiBold,
    fontSize: getFontSize(1.5),
    // color: 'white',
    color: theme.color.green,
  },
  menuButtonContainer: {
    position: 'absolute',
    top: getResHeight(1),
    right: getResWidth(-10),
    zIndex: 9999,
  },
  menuButton: {
    width: getResHeight(5),
    height: getResHeight(5),
    borderRadius: getResHeight(100),
  },
  userBioContainer: {
    borderTopWidth: 0.5,
    borderColor: 'white',
    width: '100%',
    paddingTop: '5%',
    flexDirection: 'row',
    paddingHorizontal: getResWidth(2),
    paddingVertical: getResHeight(2),
  },

  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: getResWidth(2),
    marginTop: getResHeight(1),
  },
  keyText: {
    width: getResWidth(40),
    fontFamily: theme.font.semiBold,
    fontSize: getFontSize(1.5),
  },
  valueText: {
    width: getResWidth(43),
    fontFamily: theme.font.regular,
    fontSize: getFontSize(1.5),
  },
});

export default Index;
