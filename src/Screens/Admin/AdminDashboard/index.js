import React, {useState, useEffect, memo} from 'react';
import {View, SafeAreaView, Animated, Keyboard} from 'react-native';
import {useSelector} from 'react-redux';
import CustomHeader from '../../../Components/CustomHeader.js';
import {StatusBarComp} from '../../../Components/commonComp.js';
import MarqueeComp from '../../../Components/MarqueeComp.js';
import SearchBarComp from '../../../Components/SearchBarComp.js';
import SquareCardComp from '../../../Components/SquareCardComp.js';
import useScrollDirection from '../../../Components/useScrollDirection';
import {adminDashboardCardData} from '../../../Components/StaticDataHander.js';

const initialState = {
  filteredData: adminDashboardCardData,
  isLoading: false,
  searchText: '',
};

const index = memo(props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  const [state, setState] = useState(initialState);
  const {filteredData, isLoading, searchText} = state;

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
      <View style={{marginTop: '3%', paddingHorizontal: '1%'}}>
        <SearchBarComp
          placeholder="Search menus.."
          isLoading={isLoading}
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>

      <View style={{flex: 1}}>
        <Animated.FlatList
          data={[0]}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          renderItem={() => (
            <SquareCardComp
              filteredData={filteredData}
              onPress={item => {
                console.log('Navigate_route', item.routeName);
                props.navigation.navigate(item.routeName);
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
});

export default index;
