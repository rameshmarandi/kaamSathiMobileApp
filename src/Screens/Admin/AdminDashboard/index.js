import React, {useState, useEffect, memo} from 'react';
import {
  View,
  SafeAreaView,
  Animated,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import CustomHeader from '../../../Components/CustomHeader.js';
import {StatusBarComp} from '../../../Components/commonComp.js';
import MarqueeComp from '../../../Components/MarqueeComp.js';
import SearchBarComp from '../../../Components/SearchBarComp.js';
import SquareCardComp from '../../../Components/SquareCardComp.js';
import useScrollDirection from '../../../Components/useScrollDirection';
import {adminDashboardCardData} from '../../../Components/StaticDataHander.js';
import {StyleSheet} from 'react-native';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive/index.js';
import theme from '../../../utility/theme/index.js';
import AdminUpcomingEvents from '../AdminEvents/AdminUpcomingEvents.js';
import {VectorIcon} from '../../../Components/VectorIcon.js';

const initialState = {
  filteredData: adminDashboardCardData,
  isLoading: false,
  searchText: '',
  searchModalVisible: false,
};

const index = memo(props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  const [state, setState] = useState(initialState);
  // const [searchModalVisible, setSearchModalVisible] = useState(false);
  const {filteredData, isLoading, searchText, searchModalVisible} = state;

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
          setState(prevState => ({...prevState, searchModalVisible: false}));
          updateState({searchText: ''});
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

      <MarqueeComp textRender={`Nice to see you back, Mr Ramesh`} />
      <TouchableWithoutFeedback
        onPress={() => {
          // setSearchModalVisible(true);
          setState(prevState => ({...prevState, searchModalVisible: true}));
        }}>
        <View style={{marginTop: '3%', paddingHorizontal: '1%'}}>
          <SearchBarComp
            placeholder="Search menus.."
            // isLoading={isLoading}
            // onChangeText={handleSearch}
            // value={searchText}
            disabled={true}
          />
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
                  <>
                    <View style={styles.upcomingContainer}>
                      <AdminUpcomingEvents />
                    </View>
                  </>
                );
              case 1:
                return (
                  <SquareCardComp
                    filteredData={filteredData}
                    onPress={item => {
                      console.log('Navigate_route', item.routeName);
                      props.navigation.navigate(item.routeName);
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
  children,
  handleSearch,
  searchText,
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
                style={{}}
              />
            </TouchableOpacity>
            <SearchBarComp
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
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  upcomingContainer: {
    marginHorizontal: getResWidth(5),
  },
});

export default index;
