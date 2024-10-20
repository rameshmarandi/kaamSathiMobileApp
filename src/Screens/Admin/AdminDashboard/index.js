import React, {useState, useEffect, memo, useRef} from 'react';
import {
  View,
  SafeAreaView,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import CustomHeader from '../../../Components/CustomHeader.js';
import {StatusBarComp} from '../../../Components/commonComp.js';
import MarqueeComp from '../../../Components/MarqueeComp.js';
import SearchBarComp from '../../../Components/SearchBarComp.js';
import SquareCardComp from '../../../Components/SquareCardComp.js';
import useScrollDirection from '../../../Components/useScrollDirection';
import {adminDashboardCardData} from '../../../Components/StaticDataHander.js';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive/index.js';
import theme from '../../../utility/theme/index.js';
import AdminUpcomingEvents from '../AdminEvents/AdminUpcomingEvents.js';
import {VectorIcon} from '../../../Components/VectorIcon.js';
import {openInAppBrowser} from '../../../Components/InAppBrowserComp.js';
import AddMemberForm from '../Members/AddMemberForm.js';
import axios from 'axios';
import {LOCAL_BASE_URL} from '../../../Config/constants.js';
import storageKeys from '../../../Config/StorageKeys.js';

const initialState = {
  filteredData: adminDashboardCardData,
  isLoading: false,
  searchText: '',
  searchModalVisible: false,
  addNewMemberModalVisible: false,
};

const Index = memo(props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  const [state, setState] = useState(initialState);
  const {
    filteredData,
    addNewMemberModalVisible,
    isLoading,
    searchText,
    searchModalVisible,
  } = state;

  useEffect(() => {
    console.log(
      'API_URL',
      process.env.NODE_ENV,
      // process.env.API_URL
      // StorageKeys.API_BASE_URL,
      storageKeys.API_BASE_URL,
      // API_BASE_URL,
    );
    // apiHandler();
  }, []);

  const apiHandler = async () => {
    let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmZhZjM3ZWMyMGE4MTQ1NWZiZWMwZDAiLCJlbWFpbCI6InJhbWVzaDFAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJSYW1lc2ggS3VtYXIgTWFyYW5kaSIsImNodXJjaEJyYW5jaCI6IjY2ZmFmMTM4ZDQ1YjUxYzUzNjg3MjliOCIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTcyOTMzNTc1OCwiZXhwIjoxNzI5NDIyMTU4fQ.lsiKZnSCTC-xnr_K2-M5I9piuboCY49mi8Ywf5a-Nbg`;
    await axios
      .get(`${LOCAL_BASE_URL}/api/v1/user/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Adjust based on your API requirements
        },
      })
      .then(response => {
        console.log('Axios Newtowrk Response', response.data);
      })
      .catch(error => {
        console.error('Axios Newtowrk Error', error);
        // setError(error);
        // setLoading(false);
      });
  };

  const searchBarRef = useRef(null);

  const updateState = newState =>
    setState(prevState => ({...prevState, ...newState}));

  const handleSearch = text => {
    updateState({searchText: text});
  };

  useEffect(() => {
    const filtered = adminDashboardCardData
      .map(category => ({
        ...category,
        items: (category.items || []).filter(item =>
          item.title.toLowerCase().includes(searchText.toLowerCase()),
        ),
      }))
      .filter(category => category.items.length > 0);

    updateState({filteredData: filtered});
  }, [searchText]);

  const {scrollY, scrollDirection} = useScrollDirection();

  const transform =
    scrollDirection === 'up'
      ? {transform: [{translateY: -100}, {scale: 0.9}]}
      : {transform: [{translateY: 0}, {scale: 1}]};

  useEffect(() => {
    if (searchModalVisible) {
      // Use timeout to wait for the modal to be fully visible
      setTimeout(() => {
        searchBarRef.current?.focus();
      }, 100); // Adjust timeout as necessary
    }
  }, [searchModalVisible]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentBgColor,
      }}>
      <StatusBarComp />
      <ControlPanelSearchModal
        visible={searchModalVisible}
        onClose={() => {
          updateState({searchModalVisible: false, searchText: ''});
        }}
        handleSearch={handleSearch}
        searchText={searchText}
        filteredData={filteredData}
        onCardPress={item => {
          props.navigation.navigate(item.routeName);
          updateState({searchText: ''});
        }}
        currentBgColor={currentBgColor}
        currentTextColor={currentTextColor}
        searchBarRef={searchBarRef}
      />
      <CustomHeader
        Hamburger={() => {
          navigation.openDrawer();
          Keyboard.dismiss();
        }}
        onPressNotificaiton={() => {
          navigation.navigate('UserNotification');
        }}
        centerLogo={true}
      />
      <View>
        <AddMemberForm
          visible={addNewMemberModalVisible}
          closeModal={() => {
            setState(prevState => ({
              ...prevState,
              addNewMemberModalVisible: false,
            }));
          }}
          navigation={navigation}
        />
      </View>
      <MarqueeComp
        textRender={`I can do all things through Christ who strengthens me. [Philippians 4:13] जो मुझे सामर्थ देता है उस में मैं सब कुछ कर सकता हूं। [फिलिप्पियों 4:13]`}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          updateState({searchModalVisible: true});
        }}>
        <View style={{marginTop: '3%', paddingHorizontal: '1%'}}>
          <SearchBarComp placeholder="Search menus.." disabled={true} />
        </View>
      </TouchableWithoutFeedback>
      <View style={{flex: 1}}>
        <Animated.FlatList
          data={[0, 1]}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          renderItem={({item, index}) => {
            switch (index) {
              case 0:
                return (
                  <View style={styles.upcomingContainer}>
                    <AdminUpcomingEvents />
                  </View>
                );
              case 1:
                return (
                  <SquareCardComp
                    filteredData={filteredData}
                    onPress={item => {
                      if (item.routeName.includes('https')) {
                        openInAppBrowser(item.routeName);
                      }
                      if (item.routeName == 'AddMemberForm') {
                        setState(prevState => ({
                          ...prevState,
                          addNewMemberModalVisible: true,
                        }));
                      } else {
                        props.navigation.navigate(item.routeName);
                      }
                      console.log('Navigate_route', item.routeName);
                    }}
                  />
                );
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
});

const ControlPanelSearchModal = ({
  visible,
  onClose,
  handleSearch,
  searchText,
  searchBarRef,
  filteredData,
  currentBgColor,
  currentTextColor,
  onCardPress,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: currentBgColor,
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View
              style={{
                paddingTop: '5%',
                marginBottom: '3%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: '5%',
              }}>
              <TouchableOpacity onPress={onClose}>
                <VectorIcon
                  type={'Ionicons'}
                  name={'arrow-back-circle'}
                  size={getFontSize(5)}
                  color={currentTextColor}
                />
              </TouchableOpacity>
              <SearchBarComp
                ref={searchBarRef}
                placeholder="Search menus.."
                onChangeText={handleSearch}
                value={searchText}
                autoFocus={true}
                containerStyle={{
                  width: getResWidth(80),
                  height: getResHeight(2),
                  alignSelf: 'center',
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  backgroundColor: currentBgColor,
                  margin: 0,
                  alignItems: 'center',
                }}
              />
            </View>
            <SquareCardComp
              filteredData={filteredData}
              onPress={item => {
                onCardPress(item);
                onClose();
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  upcomingContainer: {
    marginHorizontal: getResWidth(5),
  },
});

export default Index;
