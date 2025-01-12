// import React, {useState, useEffect, memo, useRef} from 'react';
// import {
//   View,
//   SafeAreaView,
//   Animated,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Modal,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   TextInput,
//   Text,
//   StyleSheet,
// } from 'react-native';
// import {useSelector} from 'react-redux';
// import CustomHeader from '../../../Components/CustomHeader.js';
// import {StatusBarComp} from '../../../Components/commonComp.js';
// import MarqueeComp from '../../../Components/MarqueeComp.js';
// import SearchBarComp from '../../../Components/SearchBarComp.js';
// import SquareCardComp from '../../../Components/SquareCardComp.js';
// import useScrollDirection from '../../../Components/useScrollDirection';
// import {adminDashboardCardData} from '../../../Components/StaticDataHander.js';
// import {
//   getFontSize,
//   getResHeight,
//   getResWidth,
// } from '../../../utility/responsive/index.js';

// import AdminUpcomingEvents from '../AdminEvents/AdminUpcomingEvents.js';
// import {VectorIcon} from '../../../Components/VectorIcon.js';
// import {openInAppBrowser} from '../../../Components/InAppBrowserComp.js';
// import AddMemberForm from '../Members/AddMemberForm.js';
// import axios from 'axios';
// import {LOCAL_BASE_URL} from '../../../Config/constants.js';
// import storageKeys from '../../../Config/StorageKeys.js';
// import {checkIsAdmin} from '../../../Helpers/CommonHelpers.js';
// import {handleNetworkRequests} from '../../../utility/ NetworkUtils.js';
// import {store} from '../../../redux/store.js';
// import {
//   getNewApplicationAPIHander,
//   myProfileAPIHander,
// } from '../../../redux/reducer/Profile/ProfileAPI.js';
// import DailyVersesComp from '../../ScreenComp/DailyVersesComp.js';

// // import {initiatePayment} from '../../../Components/PaymentHandler.js';
// import CustomBottomSheet from '../../../Components/CustomBottomSheet.js';
// import {formatCurrency} from '../../../Components/commonHelper.js';
// import theme from '../../../utility/theme/index.js';
// import {Formik} from 'formik';
// import {ActivityIndicator} from 'react-native';
// import {createTransactionAPIHandler} from '../../../redux/reducer/Transactions/transactionAPI.js';
// import {getNotificationAPIHander} from '../../../redux/reducer/Notification/NotificationAPI.js';
// import BannerComponent from '../../../Components/BannerComponent.js';
// import {getBannerAPIHander} from '../../../redux/reducer/Banner/BannerAPI.js';

// const initialState = {
//   adminDashboardCardData: adminDashboardCardData,
//   isLoading: false,
//   searchText: '',
//   searchModalVisible: false,
//   addNewMemberModalVisible: false,
// };

// const Index = memo(props => {
//   const {navigation} = props;
//   const {
//     isDarkMode,
//     loginUser,
//     logedInuserType,
//     currentBgColor,
//     currentTextColor,
//   } = useSelector(state => state.user);
//   const {myProfile} = useSelector(state => state.profile);
//   const [state, setState] = useState(initialState);
//   const [isPayBtnLoading, setIsPayBtnLoading] = useState(false);
//   const {
//     filteredData,
//     addNewMemberModalVisible,
//     isLoading,
//     searchText,
//     searchModalVisible,
//   } = state;
//   let maxAmount = 30000;

//   useEffect(() => {
//     _apiCalling();
//     checkIsAdmin();
//     console.log('LoginUser_Details', logedInuserType);
//   }, []);

//   const _apiCalling = async props => {
//     // Define essential requests
//     const essentialRequests = [
//       () => store.dispatch(getBannerAPIHander()),
//       () => store.dispatch(getNotificationAPIHander()),
//       () => store.dispatch(getNewApplicationAPIHander()),

//       () => store.dispatch(myProfileAPIHander()),

//       // Add other essential requests here
//     ];

//     // Call utility method for handling network requests
//     try {
//       await handleNetworkRequests({
//         essentialRequests,
//       });
//     } catch (err) {
//       console.log('Admin_Dashboard_Error', {err});
//       // store.dispatch({ type: 'API_CALL_ERROR', payload: { error: err.message } });
//     }
//   };
//   const [scrollY] = useState(new Animated.Value(0)); // Initialize scrollY as an Animated.Value

//   // Interpolating translateY for both marquee and search bar
//   const marqueeTranslateY = scrollY.interpolate({
//     inputRange: [0, 150], // Start hiding when the user scrolls more than 150 units
//     outputRange: [0, -120], // Move the header off-screen (adjust this value)
//     extrapolate: 'clamp', // Ensure it doesn't translate beyond the defined range
//   });

//   const searchBarTranslateY = scrollY.interpolate({
//     inputRange: [0, 150],
//     outputRange: [0, -80], // Move the search bar off-screen (adjust this value too)
//     extrapolate: 'clamp',
//   });

//   // Hide the marquee and search bar after scroll exceeds 150 units
//   const hideHeaderThreshold = 150;
//   const isHeaderVisible = scrollY.interpolate({
//     inputRange: [0, hideHeaderThreshold],
//     outputRange: [1, 0], // 1 means visible, 0 means hidden
//     extrapolate: 'clamp',
//   });

//   const searchBarRef = useRef(null);
//   const bottomSheetRef = useRef(null);
//   const updateState = newState =>
//     setState(prevState => ({...prevState, ...newState}));

//   const handleSearch = text => {
//     updateState({searchText: text});
//   };

//   useEffect(() => {
//     const filtered = adminDashboardCardData
//       .map(category => ({
//         ...category,
//         items: (category.items || []).filter(item =>
//           item.title.toLowerCase().includes(searchText.toLowerCase()),
//         ),
//       }))
//       .filter(category => category.items.length > 0);

//     updateState({filteredData: filtered});
//   }, [searchText]);

//   // const transform =
//   //   scrollDirection === 'up'
//   //     ? {transform: [{translateY: -100}, {scale: 0.9}]}
//   //     : {transform: [{translateY: 0}, {scale: 1}]};

//   useEffect(() => {
//     if (searchModalVisible) {
//       // Use timeout to wait for the modal to be fully visible
//       setTimeout(() => {
//         searchBarRef.current?.focus();
//       }, 100); // Adjust timeout as necessary
//     }
//   }, [searchModalVisible]);

//   const openBottomSheetWithContent = content => {
//     bottomSheetRef.current?.open();
//   };
//   const [inputWidth] = React.useState(new Animated.Value(250)); // Starting width

//   const initialValues = {
//     amount: '',
//   };

//   const handleSubmit = values => {
//     try {
//       setIsPayBtnLoading(true);
//       // setTimeout(() => {
//       //   bottomSheetRef.current?.close();
//       //   initiatePayment(
//       //     values.amount,
//       //     myProfile,
//       //     async data => {
//       //       // console.log('Payment_Success_front', data);
//       //       if (data?.razorpay_payment_id) {
//       //         const res = await store.dispatch(
//       //           createTransactionAPIHandler({
//       //             amount: values.amount,
//       //             transactionID: data?.razorpay_payment_id,
//       //             donationMessage: 'Church offering',
//       //             paymentStatus: 'success',
//       //           }),
//       //         );
//       //       }
//       //     },
//       //     async data => {
//       //       console.error('API_FES', data);
//       //     },
//       //   );
//       //   setIsPayBtnLoading(false);
//       // }, 300);
//     } catch (error) {
//       console.error('Initialite_payment_error', error);
//     }
//   };

//   const formatCurrency = value => {
//     let val = value.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
//     if (val.length === 0) return ''; // Return ₹0 if no value

//     val = Number(val).toLocaleString('en-IN'); // Format the number to currency (Indian format)
//     return val;
//   };

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: currentBgColor,
//       }}>
//       <StatusBarComp />
//       <ControlPanelSearchModal
//         visible={searchModalVisible}
//         onClose={() => {
//           updateState({searchModalVisible: false, searchText: ''});
//         }}
//         handleSearch={handleSearch}
//         searchText={searchText}
//         filteredData={filteredData}
//         onCardPress={item => {
//           props.navigation.navigate(item.routeName);
//           updateState({searchText: ''});
//         }}
//         currentBgColor={currentBgColor}
//         currentTextColor={currentTextColor}
//         searchBarRef={searchBarRef}
//       />
//       <Animated.View style={{transform: [{translateY: marqueeTranslateY}]}}>
//         <CustomHeader
//           Hamburger={() => {
//             navigation.openDrawer();
//             Keyboard.dismiss();
//           }}
//           onPressNotificaiton={() => {
//             navigation.navigate('UserNotification');
//           }}
//           centerLogo={true}
//         />
//       </Animated.View>
//       <View>
//         <AddMemberForm
//           visible={addNewMemberModalVisible}
//           closeModal={() => {
//             setState(prevState => ({
//               ...prevState,
//               addNewMemberModalVisible: false,
//             }));
//           }}
//           navigation={navigation}
//         />
//       </View>

//       <CustomBottomSheet ref={bottomSheetRef} modalHeight={getResHeight(30)}>
//         <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//           {({
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             setFieldValue,
//             errors,
//             touched,
//             setFieldError,
//             values,
//           }) => (
//             <View style={styles.container}>
//               <View style={styles.inputWrapper}>
//                 {/* Currency symbol on the left of input */}
//                 <Text
//                   style={[
//                     styles.currencySymbol,
//                     {
//                       color: currentTextColor,
//                     },
//                   ]}>
//                   ₹
//                 </Text>
//                 <TextInput
//                   style={[
//                     styles.input,
//                     {color: currentTextColor},
//                     {width: inputWidth},
//                   ]}
//                   autoFocus={true}
//                   selectionColor={currentTextColor}
//                   cursorColor={currentTextColor}
//                   placeholderTextColor="grey"
//                   value={formatCurrency(values.amount)}
//                   onChangeText={text => {
//                     const numericText = text.replace(/[^0-9]/g, '');

//                     const numericValue = parseInt(numericText, 10) || '';
//                     if (numericValue <= maxAmount) {
//                       setFieldError('amount', '');

//                       setFieldValue('amount', numericValue.toString());
//                     } else {
//                       setFieldError(
//                         'amount',
//                         `Amount cannot exceed ₹${maxAmount}`,
//                       );
//                     }
//                   }}
//                   onBlur={handleBlur('amount')}
//                   keyboardType="numeric"
//                   placeholder="0"
//                   returnKeyType="done"
//                 />
//               </View>
//               {errors.amount && (
//                 <Text
//                   style={{
//                     color: 'red',
//                   }}>
//                   {errors.amount}
//                 </Text>
//               )}

//               {isPayBtnLoading ? (
//                 <>
//                   <ActivityIndicator
//                     size={getFontSize(3)}
//                     color={currentTextColor}
//                   />
//                 </>
//               ) : (
//                 <>
//                   <TouchableOpacity
//                     activeOpacity={0.9}
//                     style={[
//                       styles.buttonContainer,
//                       {
//                         backgroundColor: currentBgColor,
//                         borderWidth: 1,
//                         borderColor: currentTextColor,
//                       },
//                     ]}
//                     onPress={handleSubmit}>
//                     <Text style={styles.buttonText}>Pay Now</Text>
//                   </TouchableOpacity>
//                 </>
//               )}
//             </View>
//           )}
//         </Formik>
//       </CustomBottomSheet>

//       {/* <MarqueeComp
//         textRender={`I can do all things through Christ who strengthens me. [Philippians 4:13] जो मुझे सामर्थ देता है उस में मैं सब कुछ कर सकता हूं। [फिलिप्पियों 4:13]`}
//       />
//       <TouchableWithoutFeedback
//         onPress={() => {
//           updateState({searchModalVisible: true});
//         }}>
//         <View style={{marginTop: '3%', paddingHorizontal: '1%'}}>
//           <SearchBarComp placeholder="Search menus.." disabled={true} />
//         </View>
//       </TouchableWithoutFeedback> */}
//       <View style={{flex: 1}}>
//         {/* Conditionally render Marquee and SearchBar */}
//         <Animated.View
//           style={{
//             // If header is not visible, move it off the screen and remove it from layout
//             transform: [{translateY: marqueeTranslateY}],
//             height: scrollY.interpolate({
//               inputRange: [0, hideHeaderThreshold],
//               outputRange: [getResHeight(3), 0], // Adjust height to ensure space is freed
//               extrapolate: 'clamp',
//             }),
//           }}>
//           <MarqueeComp
//             textRender={`I can do all things through Christ who strengthens me. [Philippians 4:13] जो मुझे सामर्थ देता है उस में मैं सब कुछ कर सकता हूं। [फिलिप्पियों 4:13]`}
//           />
//         </Animated.View>

//         <Animated.View
//           style={{
//             marginTop: '5%',
//             paddingHorizontal: '1%',
//             // Move search bar out of the layout when it's not visible
//             transform: [{translateY: searchBarTranslateY}],
//             height: scrollY.interpolate({
//               inputRange: [0, hideHeaderThreshold],
//               outputRange: [getResHeight(10), 0], // Adjust height to ensure space is freed
//               extrapolate: 'clamp',
//             }),
//           }}>
//           <TouchableWithoutFeedback
//             onPress={() => {
//               setState({searchModalVisible: true});
//             }}>
//             <SearchBarComp placeholder="Search menus.." disabled={true} />
//           </TouchableWithoutFeedback>
//         </Animated.View>

//         {/* Animated FlatList */}
//         <Animated.FlatList
//           data={[0, 1, 2, 3, 4]}
//           showsVerticalScrollIndicator={false}
//           onScroll={Animated.event(
//             [{nativeEvent: {contentOffset: {y: scrollY}}}],
//             {useNativeDriver: false},
//           )}
//           renderItem={({item, index}) => {
//             switch (index) {
//               case 0:
//                 return (
//                   <View style={{}}>
//                     <BannerComponent {...props} />
//                     <DailyVersesComp {...props} />
//                   </View>
//                 );
//               case 3:
//                 return (
//                   <View style={{}}>
//                     <AdminUpcomingEvents />
//                   </View>
//                 );
//               case 2:
//                 return (
//                   <View style={{marginTop: getResHeight(5)}}>
//                     <SquareCardComp
//                       filteredData={filteredData}
//                       onPress={item => {
//                         try {
//                           if (item.routeName == 'razorpay') {
//                             openBottomSheetWithContent();
//                           }
//                           if (item.routeName.includes('https')) {
//                             openInAppBrowser(item.routeName);
//                           }
//                           if (item.routeName == 'AddMemberForm') {
//                             setState(prevState => ({
//                               ...prevState,
//                               addNewMemberModalVisible: true,
//                             }));
//                           } else {
//                             props.navigation.navigate(item.routeName);
//                           }
//                           console.log('Navigate_route', item.routeName);
//                         } catch (error) {
//                           console.log('Admin_dashboard_error', error);
//                         }
//                       }}
//                     />
//                   </View>
//                 );
//             }
//           }}
//         />
//       </View>
//     </SafeAreaView>
//   );
// });

// const ControlPanelSearchModal = ({
//   visible,
//   onClose,
//   handleSearch,
//   searchText,
//   searchBarRef,
//   filteredData,
//   currentBgColor,
//   currentTextColor,
//   onCardPress,
// }) => {
//   return (
//     <Modal
//       animationType="fade"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}>
//       <SafeAreaView
//         style={{
//           flex: 1,
//           backgroundColor: currentBgColor,
//         }}>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           style={{flex: 1}}>
//           <View style={{flex: 1}}>
//             <View
//               style={{
//                 paddingTop: '5%',
//                 marginBottom: '3%',
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 paddingHorizontal: '5%',
//               }}>
//               <TouchableOpacity onPress={onClose}>
//                 <VectorIcon
//                   type={'Ionicons'}
//                   name={'arrow-back-circle'}
//                   size={getFontSize(5)}
//                   color={currentTextColor}
//                 />
//               </TouchableOpacity>
//               <SearchBarComp
//                 ref={searchBarRef}
//                 placeholder="Search menus.."
//                 onChangeText={handleSearch}
//                 value={searchText}
//                 autoFocus={true}
//                 containerStyle={{
//                   width: getResWidth(80),
//                   height: getResHeight(2),
//                   alignSelf: 'center',
//                   borderTopWidth: 0,
//                   borderBottomWidth: 0,
//                   backgroundColor: currentBgColor,
//                   margin: 0,
//                   alignItems: 'center',
//                 }}
//               />
//             </View>
//             <SquareCardComp
//               filteredData={filteredData}
//               onPress={item => {
//                 onCardPress(item);
//                 onClose();
//               }}
//             />
//           </View>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//     // borderBottomWidth: 1,
//     // borderBottomColor: '#ccc',
//     paddingBottom: 5,
//   },
//   currencySymbol: {
//     fontSize: getFontSize(5),
//     fontFamily: theme.font.borderBottomColor,
//     marginRight: 5,
//   },
//   input: {
//     fontSize: getFontSize(5),
//     fontFamily: theme.font.borderBottomColor,
//     // paddingHorizontal: 10,
//     // minWidth: 25, // Set a minimum width to avoid shrinking too much
//     textAlign: 'left', // Ensure the number aligns properly to the left after ₹ symbol
//   },
//   buttonContainer: {
//     marginTop: 20,
//     paddingVertical: 12,
//     // backgroundColor: '#4CAF50', // Button color, GPay-like green
//     width: '100%',
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default Index;

import {View, Text} from 'react-native';
import React from 'react';

const index = () => {
  return (
    <View>
      <Text>Admin dashboard</Text>
    </View>
  );
};

export default index;
